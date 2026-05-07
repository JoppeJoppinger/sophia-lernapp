#!/usr/bin/env python3
"""
Sophia's Schul-Chat-Server — mit echter GitHub Copilot KI
Port: 8767
"""
from flask import Flask, request, jsonify
from flask_cors import CORS
import json, os, re, subprocess, urllib.request, urllib.error
from datetime import datetime

app = Flask(__name__)
CORS(app)

PENDING_FILE = '/root/.openclaw/workspace/sophia-lernapp/pending-questions.json'
TOKEN_FILE   = os.path.expanduser('~/.openclaw/credentials/github-copilot.token.json')
COPILOT_URL  = 'https://api.githubcopilot.com/chat/completions'

# ---- Token Management ----
_token_cache = {'token': None, 'exp': 0}

def get_token() -> str:
    import time
    now_ms = int(time.time() * 1000)
    if _token_cache['token'] and _token_cache['exp'] > now_ms + 30000:
        return _token_cache['token']
    try:
        with open(TOKEN_FILE) as f:
            d = json.load(f)
        _token_cache['token'] = d['token']
        _token_cache['exp']   = d.get('expiresAt', 0)
        return _token_cache['token']
    except Exception as e:
        print(f'Token-Fehler: {e}')
        return None

# ---- Unangemessene Inhalte (absolut gesperrt) ----
BLOCKED_KEYWORDS = [
    'sex','porn','porno','nackt','nackte','erotik','18+',
    'alkohol','bier','wein','saufen','drogen','kiffen','weed','gras',
    'waffe','messer','töten','umbringen','selbstmord','suizid',
    'hass','rassismus','nazi','hitler',
]

def is_blocked(msg: str) -> bool:
    m = msg.lower()
    return any(kw in m for kw in BLOCKED_KEYWORDS)

def save_pending(msg: str):
    pending = []
    if os.path.exists(PENDING_FILE):
        try:
            with open(PENDING_FILE) as f:
                pending = json.load(f)
        except:
            pass
    pending.append({'question': msg, 'timestamp': datetime.now().isoformat(), 'answered': False})
    with open(PENDING_FILE, 'w') as f:
        json.dump(pending, f, ensure_ascii=False, indent=2)

SYSTEM_PROMPT = """Du bist Sophias freundliche Assistentin. Sophia ist 13-14 Jahre alt und geht aufs bayerische Gymnasium (Klasse 8).

Du hilfst bei allem was für ein Mädchen in ihrem Alter passt:
- Schulfragen (Mathe, Physik, Chemie, Bio, Deutsch, Geschichte, Geo, Latein, Englisch)
- Allgemeine Wissensfragen
- Normale Unterhaltung und Alltagsthemen
- Hobbys, Interessen, Freunde, Schulleben
- Tipps und Empfehlungen (Bücher, Filme, Musik, Rezepte, Sport...)
- Kreative Aufgaben (Geschichten, Gedichte, Ideen...)

Wie du antwortest:
- Immer auf Deutsch
- Locker, freundlich, auf Augenhöhe — wie eine coole ältere Schwester
- Kompakt (max. 150 Wörter), Emojis sparsam aber passend
- Keine Ironie, kein Sarkasmus
- Bei Schulfragen: konkrete Merktipps geben

Grenzen (nie darüber reden):
- Keine sexuellen Inhalte
- Kein Alkohol, keine Drogen
- Keine Gewalt oder gefährliche Themen
Bei solchen Themen: freundlich ablenken und das Thema wechseln.
"""

def ask_copilot(message: str, history: list = None) -> str:
    token = get_token()
    if not token:
        return "Ich bin kurz nicht erreichbar — versuch's gleich nochmal! 😅"

    messages = [{'role': 'system', 'content': SYSTEM_PROMPT}]
    if history:
        messages.extend(history[-6:])  # max. letzte 3 Paare
    messages.append({'role': 'user', 'content': message})

    payload = json.dumps({
        'model': 'claude-haiku-4.5',
        'messages': messages,
        'max_tokens': 400,
        'temperature': 0.7,
    }).encode('utf-8')

    req = urllib.request.Request(
        COPILOT_URL,
        data=payload,
        headers={
            'Authorization': f'Bearer {token}',
            'Content-Type':  'application/json',
            'Copilot-Integration-Id': 'vscode-chat',
        },
        method='POST'
    )
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            return data['choices'][0]['message']['content'].strip()
    except urllib.error.HTTPError as e:
        body = e.read().decode('utf-8', errors='replace')
        print(f'Copilot HTTP-Fehler {e.code}: {body[:200]}')
        return "Ich bin kurz beschäftigt — frag mich gleich nochmal! 🙏"
    except Exception as e:
        print(f'Copilot-Fehler: {e}')
        return "Ich bin kurz nicht erreichbar — versuch's gleich nochmal! 😅"

# ---- Routen ----
@app.route('/chat', methods=['POST'])
def chat():
    data    = request.json or {}
    message = (data.get('message') or '').strip()
    history = data.get('history') or []

    if not message:
        return jsonify({'error': 'Keine Nachricht'}), 400

    if is_blocked(message):
        save_pending(message)
        return jsonify({
            'response': 'Das ist nichts für mich 😊 Lass uns lieber über was anderes reden!',
            'type': 'blocked',
            'forwarded': True,
        })

    response = ask_copilot(message, history)
    return jsonify({'response': response, 'type': 'chat', 'forwarded': False})

@app.route('/pending', methods=['GET'])
def get_pending():
    if os.path.exists(PENDING_FILE):
        try:
            with open(PENDING_FILE) as f:
                return jsonify(json.load(f))
        except:
            pass
    return jsonify([])

@app.route('/health', methods=['GET'])
def health():
    tok = get_token()
    return jsonify({'status': 'ok', 'service': 'sophia-chat', 'ai': bool(tok)})

if __name__ == '__main__':
    print('Sophia Chat-Server startet auf Port 8767...')
    tok = get_token()
    print(f'Token: {"✅ OK" if tok else "❌ Fehlt"}')
    app.run(host='0.0.0.0', port=8767, debug=False)
