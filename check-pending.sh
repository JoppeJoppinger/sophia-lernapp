#!/bin/bash
# Prüfe ob Sophia Fragen hat die weitergeleitet wurden
FILE="/root/.openclaw/workspace/sophia-lernapp/pending-questions.json"
if [ -f "$FILE" ]; then
  COUNT=$(python3 -c "import json; d=json.load(open('$FILE')); print(len([x for x in d if not x.get('answered')]))" 2>/dev/null)
  if [ "$COUNT" -gt "0" ]; then
    echo "📩 Sophia hat $COUNT neue Frage(n) die du beantworten solltest:"
    python3 -c "
import json
d=json.load(open('$FILE'))
for i,q in enumerate([x for x in d if not x.get('answered')], 1):
    print(f'  {i}. {q[\"question\"]} ({q[\"timestamp\"][:10]})')
"
  fi
fi
