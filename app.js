// ========================
// STATE
// ========================
let currentSubject = null;
let currentTopic = null;
let currentView = 'home'; // home | subject | topic | latin | quiz | trainer

let quizState = { questions: [], idx: 0, score: 0, wrong: [] };
let trainerState = { pool: [], idx: 0, mode: 'card', flipped: false, score: 0, total: 0, filter: 'all' };
let progress = JSON.parse(localStorage.getItem('sophiaProgress') || '{}');

function saveProgress(key, val) {
  progress[key] = val;
  localStorage.setItem('sophiaProgress', JSON.stringify(progress));
}

// ========================
// NAVIGATION
// ========================
function showHome() {
  currentSubject = null; currentTopic = null; currentView = 'home';
  updateBreadcrumb([]);
  const grid = Object.entries(SUBJECTS).map(([key, s]) => {
    const done = progress[key+'_done'] || 0;
    const total = s.topics ? s.topics.length : (s.grammar ? s.grammar.length : 0);
    return `<div class="card" onclick="showSubject('${key}')" style="border-color:${s.color}">
      <div class="card-emoji">${s.emoji}</div>
      <div class="card-name">${s.name}</div>
      <div class="card-sub" style="color:${s.color}">${done}/${total} Themen</div>
    </div>`;
  }).join('');
  document.getElementById('content').innerHTML = `
    <h2 class="welcome">👋 Hallo Sophia! Was lernst du heute?</h2>
    <div class="subject-grid">${grid}</div>
  `;
}

function showSubject(key) {
  currentSubject = key;
  currentView = 'subject';
  const s = SUBJECTS[key];
  updateBreadcrumb([{label: s.name, fn: `showSubject('${key}')`}]);

  if (key === 'latein') {
    showLatinHome();
    return;
  }

  const topics = s.topics.map(t => {
    const done = progress[key+'_'+t.id] ? '✅' : '';
    return `<div class="card topic-card" onclick="showTopic('${key}','${t.id}')" style="border-color:${s.color}">
      <span style="font-size:1.4rem">${done || '📖'}</span>
      <div><strong>${t.name}</strong></div>
    </div>`;
  }).join('');

  document.getElementById('content').innerHTML = `
    <h2 style="color:${s.color}">${s.emoji} ${s.name}</h2>
    <p style="opacity:.7">Klasse 8 Bayern — wähle ein Thema:</p>
    <div class="topic-grid">${topics}</div>
    <div style="margin-top:1.5rem;text-align:center">
      <button onclick="showExamModeSelection('${key}')" style="background:#2a2a3a;border:1px solid ${s.color};color:${s.color}">📝 Schulaufgabe starten</button>
    </div>
  `;
}

function showTopic(subjectKey, topicId) {
  const s = SUBJECTS[subjectKey];
  const t = s.topics.find(x => x.id === topicId);
  currentSubject = subjectKey; currentTopic = topicId; currentView = 'topic';
  updateBreadcrumb([
    {label: s.name, fn: `showSubject('${subjectKey}')`},
    {label: t.name, fn: `showTopic('${subjectKey}','${topicId}')`}
  ]);

  const detailsHtml = t.details ? t.details.map(d => `<li>${d}</li>`).join('') : '';

  let exerciseHtml = '';
  if (t.generator) {
    const ex = t.generator();
    exerciseHtml = `
      <div class="exercise-box">
        <h3>🧮 Aufgabe</h3>
        <p id="ex-problem">${ex.problem}</p>
        <button onclick="checkExercise('${subjectKey}','${topicId}')">Lösung prüfen</button>
        <input type="number" id="ex-answer" placeholder="Deine Antwort..." style="margin-left:8px;padding:8px;background:#1a1a2e;color:#fff;border:1px solid #444;border-radius:6px">
        <div id="ex-feedback" style="margin-top:8px"></div>
        <small style="opacity:.5;display:block;margin-top:4px">💡 Tipp: ${ex.hint}</small>
        <button onclick="newExercise('${subjectKey}','${topicId}')" style="background:#333;margin-top:8px">Neue Aufgabe 🔄</button>
      </div>`;
    window._currentEx = ex;
  }

  let canvasHtml = '';
  if (subjectKey === 'math' && (topicId === 'lineare-funktionen' || topicId === 'funktionen')) {
    canvasHtml = `<div class="canvas-wrap">
      <canvas id="graphCanvas" width="320" height="280"></canvas>
      <div style="margin-top:8px;display:flex;gap:8px;flex-wrap:wrap">
        <input id="func-input" placeholder="z.B. 2*x+1" style="padding:8px;background:#1a1a2e;color:#fff;border:1px solid #444;border-radius:6px;flex:1">
        <button onclick="drawGraph()">Zeichnen</button>
      </div>
      <p style="opacity:.5;font-size:.8rem">JavaScript-Syntax: 2*x+1, x**2-3, Math.abs(x)</p>
    </div>`;
    setTimeout(() => drawCoordinateSystem(), 50);
  }

  document.getElementById('content').innerHTML = `
    <h2 style="color:${s.color}">${s.emoji} ${t.name}</h2>
    <div class="intro-box">${t.intro}</div>
    ${detailsHtml ? `<ul class="detail-list">${detailsHtml}</ul>` : ''}
    ${canvasHtml}
    ${exerciseHtml}
    <div style="margin-top:1.5rem;display:flex;gap:10px;flex-wrap:wrap">
      <button onclick="startQuiz('${subjectKey}','${topicId}')" style="background:${s.color};color:#000">🎯 Quiz starten</button>
      <button onclick="markDone('${subjectKey}','${topicId}')" style="background:#2a2a3a">✅ Als gelernt markieren</button>
    </div>
  `;
}

function markDone(sk, tid) {
  saveProgress(sk+'_'+tid, true);
  const s = SUBJECTS[sk];
  const done = s.topics.filter(t => progress[sk+'_'+t.id]).length;
  saveProgress(sk+'_done', done);
  document.querySelector('[onclick="markDone(\''+sk+'\',\''+tid+'\')"]').textContent = '✅ Gelernt!';
}

// ========================
// EXERCISE ENGINE
// ========================
function newExercise(sk, tid) {
  const t = SUBJECTS[sk].topics.find(x => x.id === tid);
  const ex = t.generator();
  window._currentEx = ex;
  document.getElementById('ex-problem').textContent = ex.problem;
  document.getElementById('ex-answer').value = '';
  document.getElementById('ex-feedback').textContent = '';
  document.querySelector('[onclick="newExercise(\''+sk+'\',\''+tid+'\')"]').previousElementSibling.textContent = '💡 Tipp: '+ex.hint;
}

function checkExercise(sk, tid) {
  const ex = window._currentEx;
  const answer = document.getElementById('ex-answer').value.trim();
  const fb = document.getElementById('ex-feedback');
  const sol = String(ex.solution);
  if (answer === sol || parseFloat(answer) === parseFloat(sol)) {
    fb.innerHTML = '<span style="color:#39ff14">✅ Richtig! Super gemacht!</span>';
  } else {
    fb.innerHTML = `<span style="color:#ff4444">❌ Leider falsch. Lösung: ${ex.solution}</span>`;
  }
}

// ========================
// THEMEN-AUSWAHLSCREEN
// ========================

/**
 * Zeigt den Themen-Auswahlscreen vor jedem Quiz.
 * @param {string} subjectKey - Fach-Schlüssel
 * @param {Array}  availableTopics - Array von {id, name, section?, quiz[]}
 * @param {Array}  preSelected - Array von IDs die vorausgewählt sein sollen
 * @param {string} topicId - ursprünglicher topicId-Parameter (für Zurück-Navigation)
 */
function showTopicSelectionScreen(subjectKey, availableTopics, preSelected, topicId) {
  const s = SUBJECTS[subjectKey];

  // Physik-Themen nach Abschnitt gruppieren
  const isPhysik = subjectKey === 'physik';
  let topicsHtml = '';

  if (isPhysik) {
    // Gruppierung nach section
    const sections = {};
    availableTopics.forEach(t => {
      const sec = t.section || 'sonstige';
      if (!sections[sec]) sections[sec] = [];
      sections[sec].push(t);
    });
    for (const [sec, topics] of Object.entries(sections)) {
      const sectionLabel = sec === 'optik' ? '🔭 Optik' : sec === 'mechanik' ? '⚙️ Mechanik' : '📚 ' + sec;
      topicsHtml += `<div class="topic-sel-section">${sectionLabel}</div>`;
      topicsHtml += topics.map(t => {
        const checked = preSelected.includes(t.id) ? 'checked' : '';
        return `<label class="topic-sel-item">
          <input type="checkbox" class="topic-cb" value="${t.id}" ${checked} onchange="updateStartBtn()">
          <span>${t.name}</span>
        </label>`;
      }).join('');
    }
  } else {
    topicsHtml = availableTopics.map(t => {
      const checked = preSelected.includes(t.id) ? 'checked' : '';
      return `<label class="topic-sel-item">
        <input type="checkbox" class="topic-cb" value="${t.id}" ${checked} onchange="updateStartBtn()">
        <span>${t.name}</span>
      </label>`;
    }).join('');
  }

  // Zurück-Ziel bestimmen
  const backFn = topicId && topicId !== '_all'
    ? `showTopic('${subjectKey}','${topicId}')`
    : `showSubject('${subjectKey}')`;

  document.getElementById('content').innerHTML = `
    <div class="topic-sel-box">
      <h2 style="color:${s.color}">${s.emoji} Quiz — Themen wählen</h2>
      <p style="opacity:.7;margin-bottom:1rem">Welche Themen sollen im Quiz vorkommen?</p>
      <div style="display:flex;gap:10px;margin-bottom:1rem;flex-wrap:wrap">
        <button onclick="selectAllTopics(true)" style="background:#2a2a3a;font-size:.85rem;padding:7px 14px">☑️ Alle</button>
        <button onclick="selectAllTopics(false)" style="background:#2a2a3a;font-size:.85rem;padding:7px 14px">☐ Keine</button>
      </div>
      <div class="topic-sel-list" id="topic-sel-list">
        ${topicsHtml}
      </div>
      <div style="margin-top:1.5rem;display:flex;gap:10px;flex-wrap:wrap">
        <button id="start-quiz-btn" onclick="launchTopicSelectionQuiz('${subjectKey}')" style="background:${s.color};color:#000">🎯 Quiz starten</button>
        <button onclick="${backFn}" style="background:#333">← Zurück</button>
      </div>
      <p id="sel-warning" style="color:#ff8c00;margin-top:.7rem;font-size:.85rem;display:none">⚠️ Mindestens 1 Thema muss ausgewählt sein!</p>
    </div>
  `;

  // Store für späteren Start
  window._topicSelSubject = subjectKey;
  window._topicSelTopics = availableTopics;
  updateStartBtn();
}

/** Alle Checkboxen an/ab-wählen */
function selectAllTopics(checked) {
  document.querySelectorAll('.topic-cb').forEach(cb => cb.checked = checked);
  updateStartBtn();
}

/** Start-Button aktivieren/deaktivieren je nach Auswahl */
function updateStartBtn() {
  const checked = document.querySelectorAll('.topic-cb:checked').length;
  const btn = document.getElementById('start-quiz-btn');
  const warn = document.getElementById('sel-warning');
  if (btn) btn.disabled = checked === 0;
  if (warn) warn.style.display = checked === 0 ? 'block' : 'none';
}

/** Quiz mit den gewählten Topics starten */
function launchTopicSelectionQuiz(subjectKey) {
  const selectedIds = [...document.querySelectorAll('.topic-cb:checked')].map(cb => cb.value);
  if (!selectedIds.length) return;

  const allTopics = window._topicSelTopics;
  let questions = [];
  allTopics
    .filter(t => selectedIds.includes(t.id))
    .forEach(t => {
      if (t.quiz) questions = questions.concat(t.quiz.map(q => ({...q, topic: t.name})));
    });

  questions.sort(() => Math.random() - 0.5);
  const topicId = selectedIds.length === 1 ? selectedIds[0] : '_all';
  quizState = { questions, idx: 0, score: 0, wrong: [], subjectKey, topicId };
  renderQuestion();
}

// ========================
// QUIZ ENGINE
// ========================
function startQuiz(subjectKey, topicId) {
  const s = SUBJECTS[subjectKey];

  // Latein-Quiz direkt starten (hat andere Struktur)
  if (topicId === '_latin') {
    const questions = [...s.quiz].sort(() => Math.random() - 0.5);
    quizState = { questions, idx: 0, score: 0, wrong: [], subjectKey, topicId };
    renderQuestion();
    return;
  }

  // Themen für den Auswahlscreen bestimmen
  const allTopics = s.topics.filter(t => t.quiz && t.quiz.length > 0);

  // Bei "_all" alle vorauswählen, bei konkretem Topic nur dieses
  const preSelected = topicId === '_all'
    ? allTopics.map(t => t.id)
    : [topicId];

  showTopicSelectionScreen(subjectKey, allTopics, preSelected, topicId);
}

function renderQuestion() {
  const { questions, idx } = quizState;
  if (idx >= questions.length) { showQuizResult(); return; }
  const q = questions[idx];
  const s = SUBJECTS[quizState.subjectKey];
  const opts = q.opts.map((o, i) =>
    `<button class="quiz-opt" onclick="answerQuiz(${i})">${o}</button>`
  ).join('');
  document.getElementById('content').innerHTML = `
    <div class="quiz-box">
      <div class="quiz-progress" style="background:${s.color}20;border:1px solid ${s.color}40;padding:8px;border-radius:8px;margin-bottom:1rem">
        Frage ${idx+1} / ${questions.length} — Punkte: ${quizState.score}
      </div>
      <h3>${q.q}</h3>
      <div class="quiz-opts">${opts}</div>
    </div>
  `;
}

function answerQuiz(chosen) {
  const q = quizState.questions[quizState.idx];
  const btns = document.querySelectorAll('.quiz-opt');
  btns.forEach((b, i) => {
    b.disabled = true;
    if (i === q.a) b.style.background = '#39ff14'; b.style.color = '#000';
    if (i === chosen && chosen !== q.a) { btns[chosen].style.background = '#ff4444'; }
  });
  if (chosen === q.a) {
    quizState.score++;
  } else {
    quizState.wrong.push({q: q.q, correct: q.opts[q.a], chosen: q.opts[chosen]});
  }
  setTimeout(() => { quizState.idx++; renderQuestion(); }, 900);
}

function showQuizResult() {
  const { score, questions, wrong, subjectKey, topicId } = quizState;
  const pct = Math.round(score/questions.length*100);
  const emoji = pct >= 80 ? '🌟' : pct >= 60 ? '👍' : '💪';
  const wrongHtml = wrong.length ? `
    <h4>Falsch beantwortet:</h4>
    ${wrong.map(w => `<div class="wrong-item">
      <strong>${w.q}</strong><br>
      ✅ ${w.correct} | ❌ ${w.chosen}
    </div>`).join('')}` : '<p style="color:#39ff14">Perfekt — keine Fehler!</p>';

  // Belohnungssystem: Bei >= 80% ein Spiel für 5 Minuten freischalten
  let rewardHtml = '';
  if (pct >= 80) {
    const game = Math.random() < 0.5 ? 'snake' : 'tetris';
    const unlockUntil = Date.now() + 5 * 60 * 1000; // 300 Sekunden
    localStorage.setItem('reward_unlocked_until', String(unlockUntil));
    localStorage.setItem('reward_game', game);
    updateRewardIndicator();
    const gameName = game === 'snake' ? '🐍 Snake' : '🟦 Tetris';
    rewardHtml = `
      <div class="reward-banner">
        <div class="reward-banner-title">🎮 Belohnung freigeschaltet!</div>
        <div>${gameName} für 5 Minuten spielen!</div>
        <button onclick="openGame()" style="margin-top:.7rem;background:#ffd700;color:#000">Jetzt spielen! 🎮</button>
      </div>`;
  }

  document.getElementById('content').innerHTML = `
    <div class="quiz-result">
      <div style="font-size:3rem">${emoji}</div>
      <h2>${score} / ${questions.length} — ${pct}%</h2>
      <p>${pct>=80?'Ausgezeichnet!':pct>=60?'Gut gemacht!':'Weiter üben!'}</p>
      ${rewardHtml}
      ${wrongHtml}
      <div style="margin-top:1.5rem;display:flex;gap:10px;flex-wrap:wrap;justify-content:center">
        <button onclick="startQuiz('${subjectKey}','${topicId}')">🔄 Nochmal</button>
        <button onclick="showSubject('${subjectKey}')" style="background:#333">← Zurück</button>
      </div>
    </div>
  `;
}

// ========================
// LATEIN HOME
// ========================
function showLatinHome() {
  const s = SUBJECTS.latein;
  updateBreadcrumb([{label: 'Latein', fn: "showSubject('latein')"}]);
  document.getElementById('content').innerHTML = `
    <h2 style="color:${s.color}">🏛️ Latein</h2>
    <div class="topic-grid">
      <div class="card topic-card" onclick="showLatinTrainer('all')" style="border-color:${s.color}">
        <span style="font-size:1.8rem">📚</span>
        <div><strong>Vokabeltrainer</strong></div>
        <div style="color:${s.color};font-size:.8rem">${LATIN_VOCAB.length} Vokabeln</div>
      </div>
      <div class="card topic-card" onclick="startQuiz('latein','_latin')" style="border-color:${s.color}">
        <span style="font-size:1.8rem">🎯</span>
        <div><strong>Grammatik-Quiz</strong></div>
        <div style="color:${s.color};font-size:.8rem">AcI, Konjunktiv, Gerundiv</div>
      </div>
      ${s.grammar.map(g => `
        <div class="card topic-card" onclick="showGrammar('${g.id}')" style="border-color:${s.color}">
          <span style="font-size:1.4rem">📜</span>
          <div><strong>${g.name}</strong></div>
        </div>
      `).join('')}
    </div>
  `;
}

function showGrammar(grammarId) {
  const g = SUBJECTS.latein.grammar.find(x => x.id === grammarId);
  const s = SUBJECTS.latein;
  updateBreadcrumb([
    {label:'Latein', fn:"showSubject('latein')"},
    {label:g.name, fn:`showGrammar('${grammarId}')`}
  ]);
  const examples = g.examples.map(e => `<div class="example-item">📌 ${e}</div>`).join('');
  const verbsList = g.verbs ? `<div class="verbs-list"><strong>Verben die AcI einleiten:</strong> ${g.verbs.join(', ')}</div>` : '';
  const deponents = g.list ? `<div class="verbs-list"><strong>Deponenten:</strong> ${g.list.join(', ')}</div>` : '';
  document.getElementById('content').innerHTML = `
    <h2 style="color:${s.color}">${g.name}</h2>
    <div class="intro-box">${g.content}</div>
    <h3>Beispiele:</h3>
    ${examples}
    ${verbsList}${deponents}
    <button onclick="showLatinHome()" style="margin-top:1rem;background:#333">← Zurück zu Latein</button>
  `;
}

// ========================
// VOKABELTRAINER
// ========================
function showLatinTrainer(filter) {
  trainerState.filter = filter || 'all';
  const s = SUBJECTS.latein;
  updateBreadcrumb([
    {label:'Latein', fn:"showSubject('latein')"},
    {label:'Vokabeltrainer', fn:"showLatinTrainer('all')"}
  ]);

  document.getElementById('content').innerHTML = `
    <h2 style="color:${s.color}">📚 Vokabeltrainer</h2>
    <div class="trainer-controls" style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:1rem">
      <select id="type-filter" onchange="filterTrainer()" style="padding:8px;background:#1a1a2e;color:#fff;border:1px solid #444;border-radius:6px">
        <option value="all">Alle Wortarten</option>
        <option value="verb">Verben</option>
        <option value="noun">Substantive</option>
        <option value="adj">Adjektive</option>
        <option value="adv">Adverbien</option>
        <option value="prep">Präpositionen</option>
      </select>
      <select id="chapter-filter" onchange="filterTrainer()" style="padding:8px;background:#1a1a2e;color:#fff;border:1px solid #444;border-radius:6px">
        <option value="0">Alle Kapitel</option>
        ${[...new Set(LATIN_VOCAB.map(v=>v.chapter))].sort((a,b)=>a-b).map(c=>`<option value="${c}">Kap. ${c}</option>`).join('')}
      </select>
      <select id="mode-select" onchange="changeTrainerMode()" style="padding:8px;background:#1a1a2e;color:#fff;border:1px solid #444;border-radius:6px">
        <option value="card">Karteikarte</option>
        <option value="type">Tippen</option>
        <option value="mc">Multiple Choice</option>
      </select>
    </div>
    <div id="trainer-area"></div>
  `;
  filterTrainer();
}

function filterTrainer() {
  const type = document.getElementById('type-filter')?.value || 'all';
  const chapter = parseInt(document.getElementById('chapter-filter')?.value || '0');
  const mode = document.getElementById('mode-select')?.value || 'card';

  let pool = LATIN_VOCAB;
  if (type !== 'all') pool = pool.filter(v => v.type === type);
  if (chapter > 0) pool = pool.filter(v => v.chapter === chapter);
  pool = [...pool].sort(() => Math.random() - 0.5);

  trainerState = { pool, idx: 0, mode, flipped: false, score: 0, total: 0, filter: type };
  renderCard();
}

function changeTrainerMode() {
  trainerState.mode = document.getElementById('mode-select').value;
  trainerState.idx = 0;
  trainerState.flipped = false;
  renderCard();
}

function renderCard() {
  const { pool, idx, mode, flipped, score, total } = trainerState;
  if (!pool.length) {
    document.getElementById('trainer-area').innerHTML = '<p>Keine Vokabeln gefunden. Filter anpassen!</p>';
    return;
  }
  const v = pool[idx % pool.length];
  const progress_pct = total > 0 ? Math.round(score/total*100) : 0;

  const statsBar = `<div class="stats-bar">
    Karte ${(idx%pool.length)+1}/${pool.length} | ✅ ${score}/${total} (${progress_pct}%)
  </div>`;

  if (mode === 'card') {
    document.getElementById('trainer-area').innerHTML = `
      ${statsBar}
      <div class="vocab-card ${flipped?'flipped':''}" onclick="flipCard()">
        <div class="card-front">
          <div class="vocab-lat">${v.lat}</div>
          ${v.gen ? `<div class="vocab-gen">${v.gen}</div>` : ''}
          <div class="vocab-type">${v.type} · Kap. ${v.chapter}</div>
          <div class="flip-hint">Tippe zum Umdrehen</div>
        </div>
        <div class="card-back">
          <div class="vocab-de">${v.de}</div>
          <div class="vocab-type">${v.type} · Kap. ${v.chapter}</div>
        </div>
      </div>
      ${flipped ? `<div class="answer-btns">
        <button onclick="rateCard(false)" style="background:#ff4444">❌ Falsch</button>
        <button onclick="rateCard(true)" style="background:#39ff14;color:#000">✅ Richtig</button>
      </div>` : ''}
    `;
  } else if (mode === 'type') {
    document.getElementById('trainer-area').innerHTML = `
      ${statsBar}
      <div class="vocab-card no-click">
        <div class="vocab-lat">${v.lat}</div>
        ${v.gen ? `<div class="vocab-gen">${v.gen}</div>` : ''}
        <div class="vocab-type">${v.type} · Kap. ${v.chapter}</div>
      </div>
      <div style="margin-top:1rem;display:flex;gap:8px;flex-wrap:wrap">
        <input id="type-answer" placeholder="Deutsche Übersetzung..." 
          style="flex:1;padding:10px;background:#1a1a2e;color:#fff;border:1px solid #444;border-radius:6px"
          onkeydown="if(event.key==='Enter')checkTypeAnswer()">
        <button onclick="checkTypeAnswer()">Prüfen</button>
      </div>
      <div id="type-feedback" style="margin-top:8px"></div>
    `;
    setTimeout(() => document.getElementById('type-answer')?.focus(), 50);
  } else if (mode === 'mc') {
    // 4 random options including correct
    const others = LATIN_VOCAB.filter(x => x !== v).sort(() => Math.random()-.5).slice(0,3);
    const opts = [...others, v].sort(() => Math.random()-.5);
    const btns = opts.map((o, i) =>
      `<button class="mc-btn" onclick="checkMC(${i},${opts.indexOf(v)})">${o.de}</button>`
    ).join('');
    document.getElementById('trainer-area').innerHTML = `
      ${statsBar}
      <div class="vocab-card no-click">
        <div class="vocab-lat">${v.lat}</div>
        ${v.gen ? `<div class="vocab-gen">${v.gen}</div>` : ''}
        <div class="vocab-type">${v.type} · Kap. ${v.chapter}</div>
      </div>
      <div class="mc-grid">${btns}</div>
    `;
  }
}

function flipCard() {
  trainerState.flipped = !trainerState.flipped;
  renderCard();
}

function rateCard(correct) {
  trainerState.total++;
  if (correct) trainerState.score++;
  trainerState.flipped = false;
  trainerState.idx++;
  if (trainerState.idx >= trainerState.pool.length) {
    showTrainerResult();
    return;
  }
  renderCard();
}

function checkTypeAnswer() {
  const input = document.getElementById('type-answer');
  const v = trainerState.pool[trainerState.idx % trainerState.pool.length];
  const answer = input.value.trim().toLowerCase();
  const correct = v.de.toLowerCase();
  // Check if answer contains key word from correct answer
  const isCorrect = correct.split(',').some(part => answer.includes(part.trim().split(' ')[0]));
  trainerState.total++;
  if (isCorrect) trainerState.score++;

  document.getElementById('type-feedback').innerHTML = isCorrect
    ? `<span style="color:#39ff14">✅ Richtig! "${v.de}"</span>`
    : `<span style="color:#ff4444">❌ Falsch. Richtig: "${v.de}"</span>`;

  setTimeout(() => {
    trainerState.flipped = false;
    trainerState.idx++;
    if (trainerState.idx >= trainerState.pool.length) { showTrainerResult(); return; }
    renderCard();
  }, 1200);
}

function checkMC(chosen, correct) {
  const btns = document.querySelectorAll('.mc-btn');
  btns.forEach((b, i) => {
    b.disabled = true;
    if (i === correct) { b.style.background='#39ff14'; b.style.color='#000'; }
    if (i === chosen && chosen !== correct) b.style.background='#ff4444';
  });
  trainerState.total++;
  if (chosen === correct) trainerState.score++;
  setTimeout(() => {
    trainerState.idx++;
    if (trainerState.idx >= trainerState.pool.length) { showTrainerResult(); return; }
    renderCard();
  }, 900);
}

function showTrainerResult() {
  const { score, total } = trainerState;
  const pct = total > 0 ? Math.round(score/total*100) : 0;
  document.getElementById('trainer-area').innerHTML = `
    <div class="quiz-result">
      <div style="font-size:3rem">${pct>=80?'🌟':pct>=60?'👍':'💪'}</div>
      <h2>${score} / ${total} — ${pct}%</h2>
      <p>${pct>=80?'Excellent! Du kennst die Vokabeln wirklich!':pct>=60?'Gut, weiter so!':'Öfter üben, dann klappts!'}</p>
      <div style="margin-top:1rem;display:flex;gap:8px;flex-wrap:wrap;justify-content:center">
        <button onclick="filterTrainer()">🔄 Nochmal</button>
        <button onclick="showLatinHome()" style="background:#333">← Zurück</button>
      </div>
    </div>
  `;
}

// ========================
// CANVAS / GRAPH
// ========================
function drawCoordinateSystem() {
  const canvas = document.getElementById('graphCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  const cx = w/2, cy = h/2;
  const scale = 25;

  ctx.fillStyle = '#0d0d1a';
  ctx.fillRect(0,0,w,h);

  // Grid
  ctx.strokeStyle = '#2a2a3a';
  ctx.lineWidth = 1;
  for (let x = cx % scale; x < w; x += scale) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,h); ctx.stroke(); }
  for (let y = cy % scale; y < h; y += scale) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(w,y); ctx.stroke(); }

  // Axes
  ctx.strokeStyle = '#555';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0,cy); ctx.lineTo(w,cy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx,0); ctx.lineTo(cx,h); ctx.stroke();

  // Labels
  ctx.fillStyle = '#555';
  ctx.font = '11px monospace';
  for (let i = -Math.floor(cx/scale); i <= Math.floor((w-cx)/scale); i++) {
    if (i !== 0) ctx.fillText(i, cx + i*scale - 4, cy + 14);
  }
  for (let i = -Math.floor(cy/scale); i <= Math.floor((h-cy)/scale); i++) {
    if (i !== 0) ctx.fillText(-i, cx + 4, cy + i*scale + 4);
  }

  // Axis labels
  ctx.fillStyle = '#00e5ff';
  ctx.font = 'bold 13px monospace';
  ctx.fillText('x', w-12, cy-6);
  ctx.fillText('y', cx+6, 12);

  window._graphCtx = ctx;
  window._graphCx = cx;
  window._graphCy = cy;
  window._graphScale = scale;
  window._graphW = w;
  window._graphH = h;
}

function drawGraph() {
  const input = document.getElementById('func-input')?.value?.trim();
  if (!input) return;
  const ctx = window._graphCtx;
  if (!ctx) return;

  const { _graphCx: cx, _graphCy: cy, _graphScale: scale, _graphW: w, _graphH: h } = window;

  // Redraw system
  drawCoordinateSystem();

  ctx.strokeStyle = '#00e5ff';
  ctx.lineWidth = 2.5;
  ctx.beginPath();

  let started = false;
  const fn = new Function('x', `try { return ${input}; } catch(e) { return NaN; }`);

  for (let px = 0; px < w; px++) {
    const x = (px - cx) / scale;
    const y = fn(x);
    if (isNaN(y) || !isFinite(y) || Math.abs(y) > 1000) { started = false; continue; }
    const py = cy - y * scale;
    if (!started) { ctx.moveTo(px, py); started = true; }
    else ctx.lineTo(px, py);
  }
  ctx.stroke();
}

// ========================
// BREADCRUMB
// ========================
function updateBreadcrumb(crumbs) {
  const bc = document.getElementById('breadcrumb');
  let html = `<span class="bc-item" onclick="showHome()">🏠 Home</span>`;
  crumbs.forEach((c, i) => {
    html += ` <span class="bc-sep">›</span> `;
    if (i < crumbs.length - 1) {
      html += `<span class="bc-item" onclick="${c.fn}">${c.label}</span>`;
    } else {
      html += `<span class="bc-current">${c.label}</span>`;
    }
  });
  bc.innerHTML = html;
}

// ========================
// ========================
// SCHULAUFGABEN-MODUS
// ========================

/** Exam-State: hält alle Daten des laufenden Schulaufgabenmodus */
let examState = {
  subjectKey: null,
  topics: [],        // Array von {id, name, color, questions: [], answered: [], score: 0, passed: false}
  currentTopicIdx: 0,
  currentQIdx: 0,
  totalPassed: 0
};

/**
 * Baut die Fragen-Liste für ein Thema zusammen:
 * - 1-2 Multiple-Choice Fragen aus dem quiz-Array
 * - 1-2 Rechenaufgaben / Freitextaufgaben aus EXAM_GENERATORS
 * Gesamt: 2-3 Aufgaben pro Thema
 */
function buildExamQuestions(subjectKey, topicId) {
  const s = SUBJECTS[subjectKey];
  // Physik hat eigene Themenstruktur
  let topic = null;
  if (subjectKey === 'physik') {
    topic = s.topics.find(t => t.id === topicId);
  } else if (s.topics) {
    topic = s.topics.find(t => t.id === topicId);
  } else if (s.grammar) {
    topic = s.grammar.find(t => t.id === topicId);
  }

  const questions = [];

  // MC-Fragen aus Quiz-Array (max. 1-2)
  if (topic && topic.quiz && topic.quiz.length > 0) {
    const shuffled = [...topic.quiz].sort(() => Math.random() - 0.5);
    const mcCount = Math.min(2, shuffled.length);
    for (let i = 0; i < mcCount; i++) {
      const q = shuffled[i];
      // Sicherstellen: 4 Optionen (ggf. auffüllen)
      let opts = [...q.opts];
      questions.push({ type: 'mc', q: q.q, opts, a: q.a });
    }
  }

  // Generator-Aufgaben aus EXAM_GENERATORS (1-2 Aufgaben)
  const gens = EXAM_GENERATORS && EXAM_GENERATORS[topicId];
  if (gens && gens.length > 0) {
    const shuffledGens = [...gens].sort(() => Math.random() - 0.5);
    const genCount = Math.min(2, shuffledGens.length);
    for (let i = 0; i < genCount; i++) {
      try {
        const ex = shuffledGens[i]();
        questions.push({
          type: ex.isFreetext ? 'freetext' : 'number',
          problem: ex.problem,
          solution: ex.solution,
          hint: ex.hint,
          unit: ex.unit || '',
          synonyms: ex.synonyms || []
        });
      } catch(e) { console.warn('Exam generator error:', topicId, e); }
    }
  }

  // Wenn gar keine Fragen: Fallback mit einer MC-Frage (falls vorhanden)
  if (questions.length === 0 && topic && topic.quiz && topic.quiz.length > 0) {
    const q = topic.quiz[0];
    questions.push({ type: 'mc', q: q.q, opts: [...q.opts], a: q.a });
  }

  // Mischen und auf max. 3 begrenzen
  return questions.sort(() => Math.random() - 0.5).slice(0, 3);
}

/**
 * Zeigt den Themenauswahl-Screen für den Schulaufgabenmodus
 * @param {string} subjectKey
 */
function showExamModeSelection(subjectKey) {
  const s = SUBJECTS[subjectKey];
  let availableTopics = [];

  if (subjectKey === 'physik') {
    availableTopics = s.topics.map(t => ({ id: t.id, name: t.name }));
  } else if (subjectKey === 'latein') {
    availableTopics = (s.grammar || []).map(g => ({ id: g.id, name: g.name }));
  } else if (s.topics) {
    availableTopics = s.topics.map(t => ({ id: t.id, name: t.name }));
  }

  // Nur Themen mit Fragen anbieten
  availableTopics = availableTopics.filter(t => {
    const gens = EXAM_GENERATORS && EXAM_GENERATORS[t.id];
    const topic = (subjectKey === 'physik' ? s.topics : (s.topics || s.grammar || []));
    const topicObj = topic ? topic.find(x => x.id === t.id) : null;
    return (gens && gens.length > 0) || (topicObj && topicObj.quiz && topicObj.quiz.length > 0);
  });

  updateBreadcrumb([
    {label: s.name, fn: `showSubject('${subjectKey}')`},
    {label: '📝 Schulaufgabe', fn: `showExamModeSelection('${subjectKey}')`}
  ]);

  const topicChecks = availableTopics.map(t => `
    <label class="exam-topic-checkbox" style="border-color:${s.color}">
      <input type="checkbox" class="exam-topic-check" value="${t.id}" checked>
      <span>${t.name}</span>
    </label>
  `).join('');

  document.getElementById('content').innerHTML = `
    <div class="exam-selection-box">
      <h2 style="color:${s.color}">${s.emoji} Schulaufgabe — ${s.name}</h2>
      <div class="exam-notice">📋 <strong>Echte Schulaufgabe!</strong> Du wirst zu jedem Thema 2–3 Aufgaben bekommen. Bei ≥ 66% pro Thema ist es bestanden. Wenn du ≥ 3 Themen bestehst, gibt es <strong>10 Minuten Spielzeit</strong>! 🎮</div>
      <h3 style="margin-top:1.2rem">Themen auswählen:</h3>
      <div class="exam-topic-list">${topicChecks}</div>
      <div style="margin-top:1.5rem;display:flex;gap:10px;flex-wrap:wrap">
        <button onclick="startExamModeFromSelection('${subjectKey}')" style="background:${s.color};color:#000">📝 Schulaufgabe starten</button>
        <button onclick="showSubject('${subjectKey}')" style="background:#333">← Zurück</button>
      </div>
    </div>
  `;
}

/**
 * Liest die Checkboxen aus und startet den Schulaufgabenmodus
 */
function startExamModeFromSelection(subjectKey) {
  const checked = Array.from(document.querySelectorAll('.exam-topic-check:checked')).map(cb => cb.value);
  if (checked.length === 0) {
    alert('Bitte mindestens ein Thema auswählen!');
    return;
  }
  startExamMode(subjectKey, checked);
}

/**
 * Startet den Schulaufgabenmodus mit den ausgewählten Themen
 * @param {string} subjectKey
 * @param {string[]} selectedTopicIds
 */
function startExamMode(subjectKey, selectedTopicIds) {
  const s = SUBJECTS[subjectKey];
  let allTopics = [];
  if (subjectKey === 'physik') {
    allTopics = s.topics;
  } else if (subjectKey === 'latein') {
    allTopics = s.grammar || [];
  } else {
    allTopics = s.topics || [];
  }

  const topicsWithQuestions = selectedTopicIds.map(id => {
    const t = allTopics.find(x => x.id === id);
    const name = t ? t.name : id;
    const questions = buildExamQuestions(subjectKey, id);
    return { id, name, color: s.color, questions, answered: [], score: 0, passed: false };
  }).filter(t => t.questions.length > 0);

  if (topicsWithQuestions.length === 0) {
    alert('Keine Aufgaben für die gewählten Themen gefunden.');
    return;
  }

  examState = {
    subjectKey,
    topics: topicsWithQuestions,
    currentTopicIdx: 0,
    currentQIdx: 0,
    totalPassed: 0
  };

  renderExamQuestion();
}

/**
 * Rendert die aktuelle Exam-Frage
 */
function renderExamQuestion() {
  const { topics, currentTopicIdx, currentQIdx, subjectKey } = examState;
  const s = SUBJECTS[subjectKey];

  if (currentTopicIdx >= topics.length) {
    showExamResult();
    return;
  }

  const topic = topics[currentTopicIdx];

  if (currentQIdx >= topic.questions.length) {
    // Thema abgeschlossen
    showExamTopicResult();
    return;
  }

  const q = topic.questions[currentQIdx];
  const totalTopics = topics.length;
  const totalQ = topic.questions.length;

  let questionHtml = '';

  if (q.type === 'mc') {
    // Multiple Choice
    const opts = q.opts.map((o, i) =>
      `<button class="quiz-opt exam-mc-opt" onclick="submitExamAnswer(${i})">${o}</button>`
    ).join('');
    questionHtml = `
      <h3 class="exam-question-text">${q.q}</h3>
      <div class="quiz-opts">${opts}</div>
    `;
  } else if (q.type === 'number') {
    // Rechenaufgabe mit Zahleingabe
    questionHtml = `
      <h3 class="exam-question-text">${q.problem}</h3>
      <div class="exam-input-row">
        <input type="number" id="exam-answer-input" class="exam-input" placeholder="Deine Antwort..." onkeydown="if(event.key==='Enter')submitExamAnswerText()">
        ${q.unit ? `<span class="exam-unit">${q.unit}</span>` : ''}
      </div>
      <small class="exam-hint">💡 Tipp: ${q.hint}</small>
      <div style="margin-top:1rem">
        <button id="exam-submit-btn" onclick="submitExamAnswerText()" style="background:${s.color};color:#000">Prüfen ✓</button>
      </div>
    `;
  } else {
    // Freitext
    questionHtml = `
      <h3 class="exam-question-text">${q.problem}</h3>
      <div class="exam-input-row">
        <input type="text" id="exam-answer-input" class="exam-input" placeholder="Deine Antwort..." onkeydown="if(event.key==='Enter')submitExamAnswerText()">
      </div>
      <small class="exam-hint">💡 Tipp: ${q.hint}</small>
      <div style="margin-top:1rem">
        <button id="exam-submit-btn" onclick="submitExamAnswerText()" style="background:${s.color};color:#000">Prüfen ✓</button>
      </div>
    `;
  }

  document.getElementById('content').innerHTML = `
    <div class="exam-progress" style="border-color:${s.color}40">
      <span>📝 Thema ${currentTopicIdx+1}/${totalTopics}: <strong>${topic.name}</strong></span>
      <span style="color:${s.color}">Frage ${currentQIdx+1}/${totalQ}</span>
    </div>
    <div class="exam-question-box" style="border-color:${s.color}40">
      ${questionHtml}
      <div id="exam-feedback" class="exam-feedback" style="display:none"></div>
    </div>
  `;

  // Fokus auf Input setzen wenn vorhanden
  setTimeout(() => {
    const inp = document.getElementById('exam-answer-input');
    if (inp) inp.focus();
  }, 100);
}

/**
 * Prüft Multiple-Choice-Antwort
 * @param {number} chosen - Index der gewählten Option
 */
function submitExamAnswer(chosen) {
  const { topics, currentTopicIdx, currentQIdx } = examState;
  const topic = topics[currentTopicIdx];
  const q = topic.questions[currentQIdx];
  const s = SUBJECTS[examState.subjectKey];

  const correct = chosen === q.a;
  if (correct) topic.score++;
  topic.answered.push({ correct, chosen });

  // Buttons einfärben
  const btns = document.querySelectorAll('.exam-mc-opt');
  btns.forEach((b, i) => {
    b.disabled = true;
    if (i === q.a) { b.style.background = '#39ff14'; b.style.color = '#000'; }
    if (i === chosen && !correct) { b.style.background = '#ff4444'; b.style.color = '#fff'; }
  });

  // Feedback anzeigen
  const fb = document.getElementById('exam-feedback');
  fb.style.display = 'block';
  fb.innerHTML = correct
    ? `<div class="exam-feedback-correct">✅ Richtig!</div>`
    : `<div class="exam-feedback-wrong">❌ Falsch! Richtig: <strong>${q.opts[q.a]}</strong></div>`;

  // Weiter-Button
  fb.innerHTML += `<button onclick="nextExamQuestion()" style="margin-top:.8rem;background:${s.color};color:#000">Weiter →</button>`;
}

/**
 * Prüft Text/Zahleingabe
 */
async function submitExamAnswerText() {
  const { topics, currentTopicIdx, currentQIdx } = examState;
  const topic = topics[currentTopicIdx];
  const q = topic.questions[currentQIdx];
  const s = SUBJECTS[examState.subjectKey];

  const inputEl = document.getElementById('exam-answer-input');
  if (!inputEl) return;
  const raw = inputEl.value.trim();
  if (!raw) return;

  inputEl.disabled = true;
  document.querySelectorAll('#exam-submit-btn').forEach(b => b.disabled = true);

  let correct = false;
  let feedbackText = '';

  if (q.type === 'number') {
    // Numerischer Vergleich mit Toleranz ±0.01
    const userVal = parseFloat(raw.replace(',', '.'));
    const solVal  = parseFloat(String(q.solution).replace(',', '.'));
    correct = !isNaN(userVal) && Math.abs(userVal - solVal) <= 0.01;
    feedbackText = correct ? '' : `Richtige Antwort: ${q.solution}${q.unit ? ' ' + q.unit : ''}`;
    showExamFeedback(correct, feedbackText, q, s, topic, raw);

  } else {
    // Freitext → KI-Bewertung
    const fb = document.getElementById('exam-feedback');
    fb.style.display = 'block';
    fb.innerHTML = '<span style="color:#888">🤔 KI prüft deine Antwort...</span>';

    try {
      const resp = await fetch(`http://${location.hostname}:8767/check-answer`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          question:   q.problem,
          solution:   String(q.solution),
          userAnswer: raw,
          subject:    SUBJECTS[examState.subjectKey]?.name || 'Schule'
        })
      });
      const data = await resp.json();
      correct = data.correct;
      feedbackText = data.correct ? (data.feedback || '') : `${data.feedback || ''} — Musterlösung: ${q.solution}`;
    } catch (e) {
      // Netzwerkfehler → statischer Fallback
      const norm = raw.toLowerCase().trim();
      const sol  = String(q.solution).toLowerCase().trim();
      const syns = (q.synonyms || []).map(x => x.toLowerCase());
      correct = norm === sol || syns.some(sy => norm.includes(sy) || sy.includes(norm)) || (sol.includes(norm) && norm.length >= 3);
      feedbackText = correct ? '' : `Musterlösung: ${q.solution}`;
    }
    showExamFeedback(correct, feedbackText, q, s, topic, raw);
  }
}

function showExamFeedback(correct, feedbackText, q, s, topic, raw) {
  if (correct) topic.score++;
  topic.answered.push({ correct, userAnswer: raw });

  const fb = document.getElementById('exam-feedback');
  fb.style.display = 'block';
  fb.innerHTML = correct
    ? `<div class="exam-feedback-correct">✅ Richtig!${feedbackText ? ' ' + feedbackText : ''}</div>`
    : `<div class="exam-feedback-wrong">❌ Leider falsch. ${feedbackText}</div>`;
  fb.innerHTML += `<button onclick="nextExamQuestion()" style="margin-top:.8rem;background:${s.color};color:#000">Weiter →</button>`;
}

/**
 * Zur nächsten Frage
 */
function nextExamQuestion() {
  examState.currentQIdx++;
  renderExamQuestion();
}

/**
 * Zeigt das Ergebnis für das aktuelle Thema (vor dem nächsten Thema)
 */
function showExamTopicResult() {
  const { topics, currentTopicIdx, subjectKey } = examState;
  const topic = topics[currentTopicIdx];
  const s = SUBJECTS[subjectKey];
  const pct = topic.questions.length > 0 ? Math.round(topic.score / topic.questions.length * 100) : 0;
  topic.passed = pct >= 66;
  if (topic.passed) examState.totalPassed++;

  const isLast = currentTopicIdx >= topics.length - 1;

  document.getElementById('content').innerHTML = `
    <div class="exam-topic-result" style="border-color:${s.color}40">
      <h3 style="color:${s.color}">${topic.name}</h3>
      <div style="font-size:2rem;margin:.5rem 0">${topic.passed ? '✅' : '❌'}</div>
      <p>${topic.score} / ${topic.questions.length} richtig (${pct}%)</p>
      <p style="color:${topic.passed ? '#39ff14' : '#ff8800'}">${topic.passed ? 'Thema bestanden! 🎉' : 'Nicht bestanden (mind. 66% nötig)'}</p>
      <button onclick="${isLast ? 'showExamResult()' : 'nextExamTopic()'}" style="margin-top:1rem;background:${s.color};color:#000">
        ${isLast ? '🏁 Gesamtergebnis anzeigen' : 'Nächstes Thema →'}
      </button>
    </div>
  `;
}

/**
 * Weiter zum nächsten Thema
 */
function nextExamTopic() {
  examState.currentTopicIdx++;
  examState.currentQIdx = 0;
  renderExamQuestion();
}

/**
 * Zeigt das Gesamtergebnis des Schulaufgabenmodus
 */
function showExamResult() {
  const { topics, subjectKey, totalPassed } = examState;
  const s = SUBJECTS[subjectKey];

  // Letzte Thema-Auswertung falls noch nicht gezählt
  const lastTopic = topics[topics.length - 1];
  if (lastTopic && lastTopic.answered.length > 0 && !lastTopic.passed && lastTopic.score === undefined) {
    const pct = Math.round(lastTopic.score / lastTopic.questions.length * 100);
    lastTopic.passed = pct >= 66;
    if (lastTopic.passed) examState.totalPassed++;
  }

  const passed = examState.totalPassed;
  const total = topics.length;
  const bigWin = passed >= 3;

  let rewardHtml = '';
  if (bigWin) {
    unlockGame(600); // 10 Minuten
    rewardHtml = `
      <div class="reward-banner" style="margin:1rem 0">
        <div class="reward-banner-title">🎮 Super! 10 Minuten Spielzeit freigeschaltet!</div>
        <div>Du hast ${passed} Themen bestanden!</div>
        <button onclick="openGame()" style="margin-top:.7rem;background:#ffd700;color:#000">Jetzt spielen! 🎮</button>
      </div>`;
  }

  const topicRows = topics.map(t => {
    const pct = t.questions.length > 0 ? Math.round(t.score / t.questions.length * 100) : 0;
    const icon = t.passed ? '✅' : '❌';
    return `<div class="exam-result-row">${icon} <strong>${t.name}</strong> — ${t.score}/${t.questions.length} (${pct}%)</div>`;
  }).join('');

  document.getElementById('content').innerHTML = `
    <div class="exam-result-box">
      <div style="font-size:3rem">${bigWin ? '🌟' : passed >= 1 ? '👍' : '💪'}</div>
      <h2 style="color:${s.color}">Schulaufgabe abgeschlossen!</h2>
      <p>${passed} von ${total} Themen bestanden</p>
      ${rewardHtml}
      <div class="exam-topics-summary">
        <h4>Themen-Übersicht:</h4>
        ${topicRows}
      </div>
      <div style="margin-top:1.5rem;display:flex;gap:10px;flex-wrap:wrap;justify-content:center">
        <button onclick="showExamModeSelection('${subjectKey}')" style="background:${s.color};color:#000">🔄 Nochmal</button>
        <button onclick="showSubject('${subjectKey}')" style="background:#333">← Zurück zum Fach</button>
      </div>
    </div>
  `;
}

/**
 * Schaltet ein Spiel für die angegebene Anzahl Sekunden frei
 * @param {number} seconds
 */
function unlockGame(seconds) {
  const game = Math.random() < 0.5 ? 'snake' : 'tetris';
  const unlockUntil = Date.now() + seconds * 1000;
  localStorage.setItem('reward_unlocked_until', String(unlockUntil));
  localStorage.setItem('reward_game', game);
  updateRewardIndicator();
}

// ========================
// INIT
// ========================
document.addEventListener('DOMContentLoaded', () => {
  showHome();
  updateRewardIndicator(); // Belohnungs-Timer prüfen beim Start
});

// ========================
// PHYSIK INTEGRATION
// ========================

// --- Physik state ---
let physikLinseType = 'sammel';
let physikEyeMode = 'normal';
let physikGeschwAnim = null;
let physikGeschwX = 60;
let physikGeschwT = 0;
let physikGeschwLastTime = null;
let physikCurrentTopicId = null;
let physikWurfAnim = null;
let physikWurfPlaying = false;
let physikWurfT = 0;
let physikWurfTrail = [];
let physikWurfLastTime = null;

// Show physik subject (special handling)
const _origShowSubject = showSubject;
showSubject = function(key) {
  if (key === 'physik') {
    stopPhysikAnimations();
    currentSubject = key;
    currentView = 'subject';
    const s = SUBJECTS.physik;
    updateBreadcrumb([{label: s.name, fn: "showSubject('physik')"}]);
    showPhysikHome();
  } else {
    stopPhysikAnimations();
    _origShowSubject(key);
  }
};

function stopPhysikAnimations() {
  if (physikGeschwAnim) { cancelAnimationFrame(physikGeschwAnim); physikGeschwAnim = null; }
  if (physikWurfAnim) { cancelAnimationFrame(physikWurfAnim); physikWurfAnim = null; }
  physikWurfPlaying = false;
}

function showPhysikHome() {
  const s = SUBJECTS.physik;
  const topics = s.topics;

  const optikTopics = topics.filter(t => t.section === 'optik');
  const mechanikTopics = topics.filter(t => t.section === 'mechanik');

  function topicCard(t) {
    const done = progress['physik_' + t.id] ? '✅' : t.icon;
    return `<div class="card topic-card" onclick="showPhysikTopic('${t.id}')" style="border-color:${s.color}">
      <span style="font-size:1.4rem">${done}</span>
      <div><strong>${t.name}</strong></div>
    </div>`;
  }

  document.getElementById('content').innerHTML = `
    <h2 style="color:${s.color}">${s.emoji} ${s.name}</h2>
    <p style="opacity:.7">Klasse 8 Bayern — Optik &amp; Mechanik:</p>
    <div class="physik-section-header">🔬 Optik (6 Themen)</div>
    <div class="topic-grid">${optikTopics.map(topicCard).join('')}</div>
    <div class="physik-section-header" style="margin-top:1.5rem">⚙️ Mechanik (5 Themen)</div>
    <div class="topic-grid">${mechanikTopics.map(topicCard).join('')}</div>
    <div style="margin-top:1.5rem;text-align:center;display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
      <button onclick="startPhysikQuiz()" style="background:#b44fff;color:#fff">🎯 Physik-Quiz starten</button>
      <button onclick="showExamModeSelection('physik')" style="background:#2a2a3a;border:1px solid #b44fff;color:#b44fff">📝 Schulaufgabe starten</button>
    </div>
  `;
}

function showPhysikTopic(topicId) {
  stopPhysikAnimations();
  physikCurrentTopicId = topicId;
  const s = SUBJECTS.physik;
  const t = s.topics.find(x => x.id === topicId);
  updateBreadcrumb([
    {label: s.name, fn: "showSubject('physik')"},
    {label: t.name, fn: `showPhysikTopic('${topicId}')`}
  ]);

  // Build controls HTML
  let controlsHtml = '';
  if (t.controls) {
    const ctrlItems = t.controls.map(c => {
      if (c.type === 'range') {
        return `<div class="physik-ctrl-group">
          <label>${c.label}: <span id="${c.valId}" style="color:#ffd700">${c.value}${c.unit}</span></label>
          <input type="range" id="${c.id}" min="${c.min}" max="${c.max}" value="${c.value}"
            oninput="${c.fn}()" style="width:160px">
        </div>`;
      } else if (c.type === 'button') {
        return `<button id="${c.id}" onclick="${c.fn}()" style="background:#1a1a2e;color:#00e5ff;border:1px solid #00e5ff;font-size:.8rem;padding:6px 12px">${c.label}</button>`;
      } else if (c.type === 'radio') {
        const btns = c.options.map((o, i) =>
          `<button class="physik-radio-btn${o.val==='normal'?' active':''}" onclick="setAugeModePhys('${o.val}',this)">${o.label}</button>`
        ).join('');
        return `<div class="physik-ctrl-group"><span>${c.label}:</span><div class="physik-radio-group">${btns}</div></div>`;
      } else if (c.type === 'checkbox') {
        return `<label class="physik-check-group">
          <input type="checkbox" id="${c.id}" onchange="${c.fn}()">
          ${c.label}
        </label>`;
      }
      return '';
    }).join('');
    controlsHtml = `<div class="physik-controls">${ctrlItems}</div>`;
  }

  // Build merkbox HTML
  const merkItems = t.merkbox ? t.merkbox.map(m => `<li>${m}</li>`).join('') : '';

  const totalreflBadge = topicId === 'totalreflexion' ?
    `<div style="text-align:center"><div id="phys-total-badge" class="totalrefl-badge off">Normaler Durchgang</div></div>` : '';

  document.getElementById('content').innerHTML = `
    <h2 style="color:${s.color}">${t.icon} ${t.name}</h2>
    <div class="intro-box">${t.intro}</div>

    <div class="physik-canvas-wrap">
      <canvas id="${t.canvas}" width="${t.canvasW}" height="${t.canvasH}" style="max-width:100%"></canvas>
      ${totalreflBadge}
      ${controlsHtml}
    </div>

    ${merkItems ? `<div class="physik-merkbox"><div class="physik-merkbox-title">📌 Merke</div><ul>${merkItems}</ul></div>` : ''}

    <div style="margin-top:.8rem;text-align:center">
      <button onclick="togglePhysikDeep('${topicId}')" id="phys-deep-btn-${topicId}" style="background:#1a1a2e;color:#00e5ff;border:1px solid #3a3a6a;font-size:.82rem;padding:6px 14px">📖 Tiefere Erklärung anzeigen</button>
    </div>
    <div id="phys-deep-${topicId}" class="physik-deep">
      <strong style="color:#b44fff">${t.deepTitle}</strong><br><br>
      ${t.deep}
    </div>

    <div style="margin-top:1.5rem;display:flex;gap:10px;flex-wrap:wrap">
      <button onclick="startPhysikTopicQuiz('${topicId}')" style="background:#b44fff;color:#fff">🎯 Quiz starten</button>
      <button onclick="markPhysikDone('${topicId}')" style="background:#2a2a3a">&#x2705; Als gelernt markieren</button>
      <button onclick="showPhysikHome()" style="background:#2a2a3a">← Zurück</button>
    </div>
  `;

  // Draw canvas after DOM ready
  setTimeout(() => {
    physikLinseType = 'sammel';
    physikEyeMode = 'normal';
    if (topicId === 'lichtausbreitung') drawLichtPhys();
    else if (topicId === 'reflexion') drawReflexPhys();
    else if (topicId === 'brechung') drawBrechPhys();
    else if (topicId === 'totalreflexion') drawTotalPhys();
    else if (topicId === 'linsen') drawLinsePhys();
    else if (topicId === 'auge') drawAugePhys();
    else if (topicId === 'geschwindigkeit') initGeschwPhys();
    else if (topicId === 'diagramme') drawDiagrammePhys();
    else if (topicId === 'newton') drawNewtonPhys();
    else if (topicId === 'vektoren') drawVektorenPhys();
    else if (topicId === 'wurfbewegung') { physikWurfT=0; physikWurfTrail=[]; drawWurfPhys(); }
  }, 50);
}

function togglePhysikDeep(tid) {
  const el = document.getElementById('phys-deep-' + tid);
  const btn = document.getElementById('phys-deep-btn-' + tid);
  if (el.style.display === 'block' || el.style.display === '') {
    const isHidden = el.style.display === 'none';
    el.style.display = isHidden ? 'block' : 'none';
    btn.textContent = isHidden ? '📖 Tiefere Erklärung ausblenden' : '📖 Tiefere Erklärung anzeigen';
  } else {
    el.style.display = 'block';
    btn.textContent = '📖 Tiefere Erklärung ausblenden';
  }
}

function markPhysikDone(tid) {
  saveProgress('physik_' + tid, true);
  const s = SUBJECTS.physik;
  const done = s.topics.filter(t => progress['physik_' + t.id]).length;
  saveProgress('physik_done', done);
  const btn = document.querySelector('[onclick="markPhysikDone(\''+tid+'\')"');
  if (btn) btn.textContent = '✅ Gelernt!';
}

function startPhysikQuiz() {
  // Themen-Auswahlscreen für alle Physik-Topics
  const allTopics = SUBJECTS.physik.topics.filter(t => t.quiz && t.quiz.length > 0);
  showTopicSelectionScreen('physik', allTopics, allTopics.map(t => t.id), '_all');
}

function startPhysikTopicQuiz(topicId) {
  // Themen-Auswahlscreen mit nur diesem Topic vorausgewählt
  const allTopics = SUBJECTS.physik.topics.filter(t => t.quiz && t.quiz.length > 0);
  showTopicSelectionScreen('physik', allTopics, [topicId], topicId);
}

// ========================
// PHYSIK CANVAS HELPERS
// ========================
function physDegRad(d) { return d * Math.PI / 180; }
function physRadDeg(r) { return r * 180 / Math.PI; }

function physSetupCanvas(id) {
  const canvas = document.getElementById(id);
  if (!canvas) return null;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  return { canvas, ctx, W: canvas.width, H: canvas.height };
}

function physDrawArrow(ctx, x1, y1, x2, y2, color, width=2) {
  ctx.save();
  ctx.strokeStyle = color; ctx.lineWidth = width;
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  const angle = Math.atan2(y2-y1, x2-x1), hs = 10;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - hs*Math.cos(angle-0.4), y2 - hs*Math.sin(angle-0.4));
  ctx.lineTo(x2 - hs*Math.cos(angle+0.4), y2 - hs*Math.sin(angle+0.4));
  ctx.closePath(); ctx.fill(); ctx.restore();
}

function physDashLine(ctx, x1, y1, x2, y2, color, dash=[6,4]) {
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = 1.5;
  ctx.setLineDash(dash); ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
  ctx.setLineDash([]); ctx.restore();
}

function physLabel(ctx, text, x, y, color='#fff', size=13, align='center') {
  ctx.save(); ctx.fillStyle = color; ctx.font = `${size}px Segoe UI, sans-serif`;
  ctx.textAlign = align; ctx.fillText(text, x, y); ctx.restore();
}

function physArcAngle(ctx, cx, cy, r, a1, a2, color) {
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.arc(cx, cy, r, a1, a2); ctx.stroke(); ctx.restore();
}

// ========================
// OPTIK CANVAS FUNCTIONS
// ========================

function drawLichtPhys() {
  const r = physSetupCanvas('c-phys-licht'); if (!r) return;
  const { ctx, W, H } = r;
  ctx.fillStyle = '#080820'; ctx.fillRect(0, 0, W, H);
  const sx = 80, sy = 80;
  ctx.save(); ctx.fillStyle = '#ffd700'; ctx.shadowColor = '#ffd700'; ctx.shadowBlur = 20;
  ctx.beginPath(); ctx.arc(sx, sy, 22, 0, Math.PI*2); ctx.fill(); ctx.restore();
  physLabel(ctx, '☀️ Sender', sx, sy+38, '#ffd700', 12);
  const rays = [{tx:280,ty:130,col:'#ffd700'},{tx:360,ty:80,col:'#ffd700'},{tx:200,ty:190,col:'#ffd700'}];
  rays.forEach(ray => physDrawArrow(ctx, sx+18, sy, ray.tx, ray.ty, ray.col, 2));
  ctx.fillStyle = '#334'; ctx.strokeStyle = '#556'; ctx.lineWidth = 2;
  ctx.fillRect(268, 100, 28, 80); ctx.strokeRect(268, 100, 28, 80);
  physLabel(ctx, '🧱', 282, 148, '#fff', 18);
  ctx.save(); ctx.fillStyle = 'rgba(0,0,0,0.55)';
  ctx.beginPath(); ctx.moveTo(296,100); ctx.lineTo(420,60); ctx.lineTo(420,200); ctx.lineTo(296,180);
  ctx.closePath(); ctx.fill(); ctx.restore();
  physLabel(ctx, '🌑 Schatten', 370, 135, '#556', 12);
  const ex = 430, ey = 200;
  ctx.save(); ctx.fillStyle = '#00e5ff'; ctx.shadowColor = '#00e5ff'; ctx.shadowBlur = 12;
  ctx.beginPath(); ctx.ellipse(ex, ey, 22, 14, 0, 0, Math.PI*2); ctx.fill(); ctx.restore();
  ctx.fillStyle = '#003344'; ctx.beginPath(); ctx.arc(ex, ey, 8, 0, Math.PI*2); ctx.fill();
  physLabel(ctx, '👁 Empfänger', ex, ey+28, '#00e5ff', 12);
  physDrawArrow(ctx, 200, 190, ex-24, ey+6, '#ffd700', 2);
  physLabel(ctx, '⚡ c = 300.000 km/s', 120, H-12, '#b44fff', 12);
}

function drawReflexPhys() {
  const r = physSetupCanvas('c-phys-reflex'); if (!r) return;
  const { ctx, W, H } = r;
  const angle = parseInt(document.getElementById('phys-reflex-slider')?.value || 40);
  const valEl = document.getElementById('phys-reflex-val');
  if (valEl) valEl.textContent = angle + '°';
  ctx.fillStyle = '#080820'; ctx.fillRect(0, 0, W, H);
  const mirrorY = H/2+10, cx = W/2;
  ctx.save(); ctx.strokeStyle = '#aaa'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(60, mirrorY); ctx.lineTo(W-60, mirrorY); ctx.stroke();
  ctx.strokeStyle = 'rgba(180,180,255,0.15)'; ctx.lineWidth = 8; ctx.stroke(); ctx.restore();
  physLabel(ctx, '🪞 Spiegel', W-90, mirrorY+18, '#aaa', 12);
  physDashLine(ctx, cx, mirrorY-110, cx, mirrorY+80, '#ffffff88');
  physLabel(ctx, 'Normale', cx+5, mirrorY-115, '#ffffff88', 11, 'left');
  const rad = physDegRad(angle), len = 130;
  const ix = cx - len*Math.sin(rad), iy = mirrorY - len*Math.cos(rad);
  physDrawArrow(ctx, ix, iy, cx, mirrorY, '#ffd700', 2.5);
  const rx2 = cx + len*Math.sin(rad), ry2 = mirrorY - len*Math.cos(rad);
  physDrawArrow(ctx, cx, mirrorY, rx2, ry2, '#ff8c00', 2.5);
  if (angle > 3) {
    physArcAngle(ctx, cx, mirrorY, 40, -Math.PI/2-rad, -Math.PI/2, '#ffd700');
    const la = physDegRad(angle/2);
    physLabel(ctx, `α=${angle}°`, cx-50*Math.sin(la)-8, mirrorY-50*Math.cos(la), '#ffd700', 12);
    physArcAngle(ctx, cx, mirrorY, 40, -Math.PI/2, -Math.PI/2+rad, '#ff8c00');
    physLabel(ctx, `α'=${angle}°`, cx+50*Math.sin(la)+8, mirrorY-50*Math.cos(la), '#ff8c00', 12);
  }
  physLabel(ctx, 'Einfallswinkel = Ausfallswinkel', cx, H-10, '#ffd70099', 12);
}

function drawBrechPhys() {
  const r = physSetupCanvas('c-phys-brech'); if (!r) return;
  const { ctx, W, H } = r;
  const angle = parseInt(document.getElementById('phys-brech-slider')?.value || 40);
  const valEl = document.getElementById('phys-brech-val');
  if (valEl) valEl.textContent = angle + '°';
  ctx.fillStyle = '#0a1030'; ctx.fillRect(0, 0, W, H/2);
  physLabel(ctx, 'Luft  (n = 1,00)', 60, 20, '#8888aa', 12, 'left');
  ctx.fillStyle = '#041830'; ctx.fillRect(0, H/2, W, H/2);
  physLabel(ctx, 'Wasser  (n = 1,33)', 60, H/2+20, '#00b4c8', 12, 'left');
  ctx.save(); ctx.strokeStyle = '#00e5ff'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, H/2); ctx.lineTo(W, H/2); ctx.stroke(); ctx.restore();
  const cx = W/2, cy = H/2, rad1 = physDegRad(angle), len = 110;
  const sinB = Math.sin(rad1)/1.33, rad2 = Math.asin(Math.min(sinB,1));
  physDashLine(ctx, cx, cy-100, cx, cy+100, '#ffffff55');
  const ix = cx-len*Math.sin(rad1), iy = cy-len*Math.cos(rad1);
  physDrawArrow(ctx, ix, iy, cx, cy, '#ffd700', 2.5);
  physDrawArrow(ctx, cx, cy, cx+len*Math.sin(rad2), cy+len*Math.cos(rad2), '#00e5ff', 2.5);
  if (angle > 3) {
    physArcAngle(ctx, cx, cy, 38, -Math.PI/2-rad1, -Math.PI/2, '#ffd700');
    physLabel(ctx, `α=${angle}°`, cx-50, cy-20, '#ffd700', 11);
    const beta = Math.round(physRadDeg(rad2));
    physArcAngle(ctx, cx, cy, 38, Math.PI/2, Math.PI/2+rad2, '#00e5ff');
    physLabel(ctx, `β=${beta}°`, cx+45, cy+25, '#00e5ff', 11);
  }
  physLabel(ctx, 'n₁·sin(α) = n₂·sin(β)', cx, H-8, '#b44fff', 12);
}

function drawTotalPhys() {
  const r = physSetupCanvas('c-phys-total'); if (!r) return;
  const { ctx, W, H } = r;
  const angle = parseInt(document.getElementById('phys-total-slider')?.value || 30);
  const valEl = document.getElementById('phys-total-val');
  if (valEl) valEl.textContent = angle + '°';
  const n1 = 1.33, n2 = 1.0;
  const critAngle = physRadDeg(Math.asin(n2/n1));
  const isTotalRefl = angle > critAngle;
  const badge = document.getElementById('phys-total-badge');
  if (badge) { badge.className = 'totalrefl-badge ' + (isTotalRefl ? 'on' : 'off'); badge.textContent = isTotalRefl ? '🌈 Totalreflexion!' : 'Normaler Durchgang'; }
  ctx.fillStyle = '#041830'; ctx.fillRect(0, 0, W, H/2);
  physLabel(ctx, 'Wasser  (n = 1,33)', 60, 20, '#00b4c8', 12, 'left');
  ctx.fillStyle = '#0a1030'; ctx.fillRect(0, H/2, W, H/2);
  physLabel(ctx, 'Luft  (n = 1,00)', 60, H/2+20, '#8888aa', 12, 'left');
  ctx.save(); ctx.strokeStyle = isTotalRefl ? '#ff8c00' : '#00e5ff'; ctx.lineWidth = isTotalRefl ? 3 : 2;
  if (isTotalRefl) { ctx.shadowColor='#ff8c00'; ctx.shadowBlur=8; }
  ctx.beginPath(); ctx.moveTo(0, H/2); ctx.lineTo(W, H/2); ctx.stroke(); ctx.restore();
  const cx = W/2, cy = H/2, rad1 = physDegRad(angle), len = 110;
  physDashLine(ctx, cx, cy-100, cx, cy+80, '#ffffff55');
  physDrawArrow(ctx, cx-len*Math.sin(rad1), cy-len*Math.cos(rad1), cx, cy, '#ffd700', 2.5);
  const critRad = physDegRad(critAngle);
  ctx.save(); ctx.strokeStyle='#ff440044'; ctx.lineWidth=1; ctx.setLineDash([4,4]);
  ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx+120*Math.sin(critRad),cy-120*Math.cos(critRad)); ctx.stroke();
  ctx.setLineDash([]); ctx.restore();
  physLabel(ctx, `αkrit≊${Math.round(critAngle)}°`, cx+90, cy-60, '#ff440088', 10);
  if (isTotalRefl) {
    ctx.save(); ctx.shadowColor='#ff8c00'; ctx.shadowBlur=12;
    physDrawArrow(ctx, cx, cy, cx+len*Math.sin(rad1), cy-len*Math.cos(rad1), '#ff8c00', 2.5); ctx.restore();
    physArcAngle(ctx, cx, cy, 38, -Math.PI/2-rad1, -Math.PI/2, '#ffd700');
    physArcAngle(ctx, cx, cy, 38, -Math.PI/2, -Math.PI/2+rad1, '#ff8c00');
    physLabel(ctx, `α=${angle}°`, cx-52, cy-22, '#ffd700', 11);
    physLabel(ctx, `α'=${angle}°`, cx+52, cy-22, '#ff8c00', 11);
    physLabel(ctx, '✨ Gesamtes Licht wird reflektiert!', cx, cy+50, '#ff8c00', 12);
  } else {
    const sinB2 = (n1/n2)*Math.sin(rad1), rad2 = sinB2<1?Math.asin(sinB2):Math.PI/2;
    physDrawArrow(ctx, cx, cy, cx+len*Math.sin(rad2), cy+len*Math.cos(rad2), '#00e5ff', 2);
    ctx.save(); ctx.globalAlpha=0.35;
    physDrawArrow(ctx, cx, cy, cx+60*Math.sin(rad1), cy-60*Math.cos(rad1), '#ff8c00', 1.5); ctx.restore();
    if (angle > 3) {
      physArcAngle(ctx, cx, cy, 38, -Math.PI/2-rad1, -Math.PI/2, '#ffd700');
      physLabel(ctx, `α=${angle}°`, cx-50, cy-22, '#ffd700', 11);
      physArcAngle(ctx, cx, cy, 38, Math.PI/2, Math.PI/2+rad2, '#00e5ff');
      physLabel(ctx, `β=${Math.round(physRadDeg(rad2))}°`, cx+50, cy+25, '#00e5ff', 11);
    }
  }
}

function toggleLinsePhys() {
  physikLinseType = physikLinseType === 'sammel' ? 'zerstreu' : 'sammel';
  const btn = document.getElementById('phys-linse-toggle');
  if (btn) btn.textContent = physikLinseType === 'sammel' ? '🔄 Zerstreuungslinse' : '🔄 Sammellinse';
  drawLinsePhys();
}

function drawLinsePhys() {
  const r = physSetupCanvas('c-phys-linse'); if (!r) return;
  const { ctx, W, H } = r;
  const sliderVal = parseInt(document.getElementById('phys-linse-slider')?.value || 25);
  const fPx = 90, gVal = sliderVal/10;
  const valEl = document.getElementById('phys-linse-val');
  if (valEl) valEl.textContent = gVal.toFixed(1) + 'f';
  const g = gVal * fPx;
  ctx.fillStyle = '#070715'; ctx.fillRect(0, 0, W, H);
  const cx = W/2, cy = H/2;
  physDashLine(ctx, 10, cy, W-10, cy, '#ffffff33', [4,6]);
  const f1x = cx-fPx, f2x = cx+fPx;
  ctx.fillStyle = '#ffd700';
  ctx.beginPath(); ctx.arc(f2x, cy, 4, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(f1x, cy, 4, 0, Math.PI*2); ctx.fill();
  physLabel(ctx, 'F', f1x, cy+16, '#ffd700', 11);
  physLabel(ctx, "F'", f2x, cy+16, '#ffd700', 11);
  const objX = cx-g, objH = 55;
  if (objX > 20) {
    ctx.strokeStyle = '#ff8c00'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(objX, cy); ctx.lineTo(objX, cy-objH); ctx.stroke();
    ctx.fillStyle = '#ff8c00'; ctx.beginPath(); ctx.moveTo(objX, cy-objH); ctx.lineTo(objX-5, cy-objH+10); ctx.lineTo(objX+5, cy-objH+10); ctx.closePath(); ctx.fill();
    physLabel(ctx, 'G', objX-12, cy-objH/2, '#ff8c00', 11);
  }
  const lensH = 120;
  ctx.save();
  if (physikLinseType === 'sammel') {
    ctx.strokeStyle = '#00e5ff'; ctx.lineWidth = 3; ctx.shadowColor = '#00e5ff'; ctx.shadowBlur = 10;
    ctx.beginPath(); ctx.moveTo(cx, cy-lensH/2); ctx.bezierCurveTo(cx+28,cy-lensH/4,cx+28,cy+lensH/4,cx,cy+lensH/2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, cy-lensH/2); ctx.bezierCurveTo(cx-28,cy-lensH/4,cx-28,cy+lensH/4,cx,cy+lensH/2); ctx.stroke();
  } else {
    ctx.strokeStyle = '#b44fff'; ctx.lineWidth = 3; ctx.shadowColor = '#b44fff'; ctx.shadowBlur = 10;
    ctx.beginPath(); ctx.moveTo(cx, cy-lensH/2); ctx.bezierCurveTo(cx-18,cy-lensH/4,cx-18,cy+lensH/4,cx,cy+lensH/2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, cy-lensH/2); ctx.bezierCurveTo(cx+18,cy-lensH/4,cx+18,cy+lensH/4,cx,cy+lensH/2); ctx.stroke();
  }
  ctx.restore();
  physLabel(ctx, physikLinseType==='sammel'?'🔵 Sammellinse':'🔴 Zerstreuungslinse', cx, cy+lensH/2+18, physikLinseType==='sammel'?'#00e5ff':'#b44fff', 11);
  if (physikLinseType === 'sammel' && objX > 15 && g > 0) {
    const tipX = objX, tipY = cy-objH;
    const b = 1/(1/fPx-1/g);
    const imgX = cx+b, imgYtip = b>0 ? cy+objH*(b/g) : cy-objH*(Math.abs(b)/g);
    // Parallel ray
    ctx.save(); ctx.strokeStyle='#39ff14'; ctx.lineWidth=1.8;
    ctx.beginPath(); ctx.moveTo(tipX,tipY); ctx.lineTo(cx,tipY); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx,tipY);
    if (b>0&&imgX<W-10) { ctx.lineTo(imgX,imgYtip); } else { const dxR=f2x-cx,dyR=cy-tipY; ctx.lineTo(cx+(W-cx)*dxR/dxR,tipY+dyR*(W-cx)/dxR); }
    ctx.stroke(); ctx.restore();
    // Center ray
    ctx.save(); ctx.strokeStyle='#ffd700'; ctx.lineWidth=1.8;
    ctx.beginPath(); ctx.moveTo(tipX,tipY); ctx.lineTo(cx,cy); ctx.stroke();
    const mDirX=cx-tipX,mDirY=cy-tipY;
    ctx.beginPath(); ctx.moveTo(cx,cy);
    if (b>0&&imgX<W-10) { ctx.lineTo(imgX,imgYtip); } else { ctx.lineTo(cx+mDirX*(W-cx)/mDirX,cy+mDirY*(W-cx)/mDirX); }
    ctx.stroke(); ctx.restore();
    // F-ray
    const tFdy=(cy-tipY)/(f1x-tipX), yAtLens=tipY+tFdy*(cx-tipX);
    ctx.save(); ctx.strokeStyle='#b44fff'; ctx.lineWidth=1.8;
    ctx.beginPath(); ctx.moveTo(tipX,tipY); ctx.lineTo(cx,yAtLens); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx,yAtLens);
    if (b>0&&imgX<W-10) { ctx.lineTo(imgX,yAtLens); } else { ctx.lineTo(W-10,yAtLens); }
    ctx.stroke(); ctx.restore();
    // Image
    if (b>0&&imgX>cx+5&&imgX<W-15) {
      ctx.save(); ctx.strokeStyle='#00e5ff'; ctx.lineWidth=2.5;
      ctx.beginPath(); ctx.moveTo(imgX,cy); ctx.lineTo(imgX,imgYtip); ctx.stroke();
      ctx.fillStyle='#00e5ff'; ctx.beginPath(); ctx.moveTo(imgX,imgYtip); ctx.lineTo(imgX-4,imgYtip+(imgYtip<cy?-10:10)); ctx.lineTo(imgX+4,imgYtip+(imgYtip<cy?-10:10)); ctx.closePath(); ctx.fill();
      physLabel(ctx, "Bild B'", imgX+12, cy-objH/3, '#00e5ff', 11); ctx.restore();
    } else if (b<0) {
      const virtX=cx+b, virtYtip=cy+objH*(Math.abs(b)/g);
      if (virtX>15) {
        ctx.save(); ctx.globalAlpha=0.5; ctx.strokeStyle='#00e5ff'; ctx.lineWidth=1.5; ctx.setLineDash([4,4]);
        ctx.beginPath(); ctx.moveTo(virtX,cy); ctx.lineTo(virtX,virtYtip); ctx.stroke(); ctx.setLineDash([]); ctx.restore();
        physLabel(ctx, 'virtuelles Bild', virtX-10, cy-30, '#00e5ff88', 10);
      }
    }
  } else if (physikLinseType === 'zerstreu') {
    const nRays = 5;
    for (let i = 0; i < nRays; i++) {
      const yIn = cy-40+i*20, vfX = cx-fPx;
      const dirX=cx-vfX, dirY=yIn-cy;
      ctx.save(); ctx.strokeStyle='#ffd700'; ctx.lineWidth=1.5;
      ctx.beginPath(); ctx.moveTo(30,yIn); ctx.lineTo(cx,yIn); ctx.stroke(); ctx.restore();
      ctx.save(); ctx.strokeStyle='#b44fff'; ctx.lineWidth=1.5;
      ctx.beginPath(); ctx.moveTo(cx,yIn); ctx.lineTo(cx+dirX*(W-cx)/dirX*0.85,yIn+dirY*(W-cx)/dirX*0.85); ctx.stroke(); ctx.restore();
    }
  }
}

function setAugeModePhys(mode, btn) {
  physikEyeMode = mode;
  document.querySelectorAll('.physik-radio-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  drawAugePhys();
}

function drawAugePhys() {
  const r = physSetupCanvas('c-phys-auge'); if (!r) return;
  const { ctx, W, H } = r;
  const brille = document.getElementById('phys-brille-check')?.checked || false;
  ctx.fillStyle = '#07071a'; ctx.fillRect(0, 0, W, H);
  const cx = W/2+40, cy = H/2, ew = 110, eh = 80;
  let retinaOffset = 0;
  if (physikEyeMode==='kurz') retinaOffset = 14;
  if (physikEyeMode==='weit') retinaOffset = -12;
  const brilleX = cx-ew/2-50;
  if (brille && physikEyeMode !== 'normal') {
    ctx.save(); ctx.strokeStyle = physikEyeMode==='kurz' ? '#b44fff' : '#00e5ff'; ctx.lineWidth = 2.5;
    ctx.shadowColor = physikEyeMode==='kurz' ? '#b44fff' : '#00e5ff'; ctx.shadowBlur = 8;
    if (physikEyeMode==='kurz') {
      ctx.beginPath(); ctx.moveTo(brilleX,cy-35); ctx.bezierCurveTo(brilleX+10,cy-15,brilleX+10,cy+15,brilleX,cy+35); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(brilleX,cy-35); ctx.bezierCurveTo(brilleX-10,cy-15,brilleX-10,cy+15,brilleX,cy+35); ctx.stroke();
    } else {
      ctx.beginPath(); ctx.moveTo(brilleX,cy-35); ctx.bezierCurveTo(brilleX+18,cy-15,brilleX+18,cy+15,brilleX,cy+35); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(brilleX,cy-35); ctx.bezierCurveTo(brilleX-18,cy-15,brilleX-18,cy+15,brilleX,cy+35); ctx.stroke();
    }
    ctx.restore();
    physLabel(ctx, physikEyeMode==='kurz'?'Zerstreuungslinse':'Sammellinse', brilleX, cy+50, physikEyeMode==='kurz'?'#b44fff':'#00e5ff', 10);
  }
  // Eye
  ctx.save(); ctx.strokeStyle='#aaaacc'; ctx.lineWidth=2.5;
  ctx.beginPath(); ctx.ellipse(cx+retinaOffset/2, cy, ew/2+retinaOffset/2, eh/2, 0, 0, Math.PI*2); ctx.stroke();
  ctx.fillStyle='#0a0a22'; ctx.fill(); ctx.restore();
  ctx.fillStyle='#1a3a8a'; ctx.beginPath(); ctx.arc(cx-ew/2+28,cy,20,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#111'; ctx.beginPath(); ctx.arc(cx-ew/2+28,cy,11,0,Math.PI*2); ctx.fill();
  const lensX=cx-ew/2+42;
  ctx.save(); ctx.strokeStyle='#ffd70099'; ctx.lineWidth=2;
  ctx.beginPath(); ctx.moveTo(lensX,cy-16); ctx.bezierCurveTo(lensX+14,cy-8,lensX+14,cy+8,lensX,cy+16); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(lensX,cy-16); ctx.bezierCurveTo(lensX-10,cy-8,lensX-10,cy+8,lensX,cy+16); ctx.stroke(); ctx.restore();
  const retinaX=cx+ew/2+retinaOffset-6;
  ctx.save(); ctx.strokeStyle='#ff8c00'; ctx.lineWidth=3;
  ctx.beginPath(); ctx.arc(cx+retinaOffset/2,cy,ew/2+retinaOffset/2-6,-0.6,0.6); ctx.stroke(); ctx.restore();
  physLabel(ctx, 'Netzhaut', retinaX+14, cy+4, '#ff8c00', 10, 'left');
  // Light rays
  const numRays=5, startX=brille&&physikEyeMode!=='normal'?brilleX:cx-ew/2-80, lensEntryX=cx-ew/2+30;
  let focusX, focusY;
  if (physikEyeMode==='normal') { focusX=retinaX; focusY=cy; }
  else if (physikEyeMode==='kurz') { focusX=brille?retinaX:retinaX-30; focusY=cy; }
  else { focusX=brille?retinaX:retinaX+35; focusY=cy; }
  for (let i=0;i<numRays;i++) {
    const t2=(i/(numRays-1)), inY=cy-28+t2*56;
    ctx.save(); ctx.strokeStyle='#ffd700cc'; ctx.lineWidth=1.5;
    if (brille&&physikEyeMode!=='normal') {
      ctx.beginPath(); ctx.moveTo(startX-30,inY); ctx.lineTo(brilleX,inY); ctx.stroke();
      let midY=physikEyeMode==='kurz'?inY+(inY-cy)*0.3:inY-(inY-cy)*0.25;
      ctx.beginPath(); ctx.moveTo(brilleX,inY); ctx.lineTo(lensEntryX,midY); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(lensEntryX,midY); ctx.lineTo(focusX,focusY); ctx.stroke();
    } else {
      ctx.beginPath(); ctx.moveTo(startX,inY); ctx.lineTo(lensEntryX,inY); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(lensEntryX,inY); ctx.lineTo(focusX,focusY); ctx.stroke();
    }
    ctx.restore();
  }
  const isOnRetina=Math.abs(focusX-retinaX)<8;
  ctx.save(); ctx.fillStyle=isOnRetina?'#39ff14':'#ff4444'; ctx.shadowColor=ctx.fillStyle; ctx.shadowBlur=12;
  ctx.beginPath(); ctx.arc(focusX,focusY,5,0,Math.PI*2); ctx.fill(); ctx.restore();
  let statusTxt='',statusCol='';
  if (physikEyeMode==='normal') { statusTxt='✅ Fokus auf der Netzhaut'; statusCol='#39ff14'; }
  else if (physikEyeMode==='kurz') { statusTxt=brille?'✅ Korrigiert (Zerstreuungslinse)':'❌ Fokus vor Netzhaut (Kurzsichtig)'; statusCol=brille?'#39ff14':'#ff4444'; }
  else { statusTxt=brille?'✅ Korrigiert (Sammellinse)':'❌ Fokus hinter Netzhaut (Weitsichtig)'; statusCol=brille?'#39ff14':'#ff4444'; }
  physLabel(ctx, statusTxt, W/2, H-10, statusCol, 11);
}

// ========================
// MECHANIK CANVAS FUNCTIONS
// ========================

function updateGeschwPhys() {
  const val = document.getElementById('phys-geschw-slider')?.value || 60;
  const valEl = document.getElementById('phys-geschw-val');
  if (valEl) valEl.textContent = val + ' km/h';
}

function initGeschwPhys() {
  physikGeschwX = 60; physikGeschwT = 0; physikGeschwLastTime = null;
  if (physikGeschwAnim) cancelAnimationFrame(physikGeschwAnim);
  animGeschwPhys();
}

function animGeschwPhys(timestamp) {
  const canvas = document.getElementById('c-phys-geschw');
  if (!canvas || physikCurrentTopicId !== 'geschwindigkeit') { physikGeschwAnim = null; return; }
  if (!timestamp) { physikGeschwAnim = requestAnimationFrame(animGeschwPhys); return; }
  if (!physikGeschwLastTime) physikGeschwLastTime = timestamp;
  const dt = Math.min((timestamp - physikGeschwLastTime)/1000, 0.05);
  physikGeschwLastTime = timestamp;
  const kmh = parseInt(document.getElementById('phys-geschw-slider')?.value || 60);
  const ms = kmh/3.6;
  physikGeschwX += ms*0.15*dt*60;
  physikGeschwT += dt;
  const W=canvas.width, H=canvas.height, ctx=canvas.getContext('2d');
  ctx.clearRect(0,0,W,H);
  ctx.fillStyle='#0a1428'; ctx.fillRect(0,0,W,H);
  ctx.fillStyle='#1a1a2a'; ctx.fillRect(0,H*0.6,W,H*0.4);
  ctx.fillStyle='#2a2a3a'; ctx.fillRect(0,H*0.6,W,8);
  ctx.save(); ctx.strokeStyle='#ffd700'; ctx.lineWidth=3; ctx.setLineDash([30,20]);
  ctx.lineDashOffset=-(physikGeschwX%50);
  ctx.beginPath(); ctx.moveTo(0,H*0.78); ctx.lineTo(W,H*0.78); ctx.stroke(); ctx.setLineDash([]); ctx.restore();
  if (physikGeschwX > W+80) { physikGeschwX=-80; physikGeschwT=0; }
  const carX=physikGeschwX-40, carY=H*0.6-38;
  ctx.fillStyle='#ff4444'; ctx.beginPath(); ctx.roundRect(carX,carY+16,80,24,4); ctx.fill();
  ctx.fillStyle='#ff6666'; ctx.beginPath(); ctx.roundRect(carX+14,carY+4,50,16,4); ctx.fill();
  ctx.fillStyle='#88ccff'; ctx.fillRect(carX+16,carY+6,18,12); ctx.fillRect(carX+38,carY+6,18,12);
  ctx.fillStyle='#222';
  ctx.beginPath(); ctx.arc(carX+16,carY+40,8,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(carX+62,carY+40,8,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#555';
  ctx.beginPath(); ctx.arc(carX+16,carY+40,4,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(carX+62,carY+40,4,0,Math.PI*2); ctx.fill();
  physLabel(ctx, `v = ${kmh} km/h = ${ms.toFixed(1)} m/s`, W/2, 22, '#ffd700', 13);
  physLabel(ctx, `t=${physikGeschwT.toFixed(1)}s  s=${(ms*physikGeschwT).toFixed(0)}m  v=s/t`, W/2, 42, '#00e5ff', 12);
  physikGeschwAnim = requestAnimationFrame(animGeschwPhys);
}

function drawDiagrammePhys() {
  const r = physSetupCanvas('c-phys-diagramm'); if (!r) return;
  const { ctx, W, H } = r;
  const v = parseInt(document.getElementById('phys-diagramm-slider')?.value || 10);
  const valEl = document.getElementById('phys-diagramm-val');
  if (valEl) valEl.textContent = v + ' m/s';
  ctx.fillStyle = '#080820'; ctx.fillRect(0,0,W,H);
  const pad=40, midX=W/2;
  const lW=midX-pad-10, lH=H-pad*2, lX=pad, lY=pad;
  const rX=midX+10, rY=pad, rW=W-midX-20, rH=H-pad*2;
  function drawAx(x,y,w,h,xl,yl) {
    ctx.save(); ctx.strokeStyle='#444466'; ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x,y+h); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x,y+h); ctx.lineTo(x+w,y+h); ctx.stroke(); ctx.restore();
    physLabel(ctx,yl,x-6,y,'#8888aa',11,'right'); physLabel(ctx,xl,x+w+4,y+h+2,'#8888aa',11,'left');
    physLabel(ctx,'0',x-6,y+h+4,'#555577',10,'right');
  }
  drawAx(lX,lY,lW,lH,'t [s]','s [m]');
  physLabel(ctx,'s-t-Diagramm',lX+lW/2,lY-14,'#ffd700',12);
  const tMax=10,sMax=v*tMax,sScale=lH/(sMax*1.1),tScale=lW/tMax;
  ctx.save(); ctx.strokeStyle='#ffd700'; ctx.lineWidth=2;
  ctx.beginPath(); ctx.moveTo(lX,lY+lH); ctx.lineTo(lX+lW,lY+lH-v*tMax*sScale); ctx.stroke(); ctx.restore();
  physLabel(ctx,`Steigung=${v}m/s`,lX+lW/2,lY+lH/2,'#ffd70099',10);
  const dotX=lX+5*tScale, dotY=lY+lH-v*5*sScale;
  ctx.fillStyle='#ffd700'; ctx.beginPath(); ctx.arc(dotX,dotY,5,0,Math.PI*2); ctx.fill();
  physDashLine(ctx,dotX,dotY,dotX,lY+lH,'#ffd70066'); physDashLine(ctx,lX,dotY,dotX,dotY,'#ffd70066');
  drawAx(rX,rY,rW,rH,'t [s]','v [m/s]');
  physLabel(ctx,'v-t-Diagramm',rX+rW/2,rY-14,'#00e5ff',12);
  const vMax=20,vScale=rH/(vMax*1.1),vLineY=rY+rH-v*vScale;
  ctx.save(); ctx.strokeStyle='#00e5ff'; ctx.lineWidth=2;
  ctx.beginPath(); ctx.moveTo(rX,vLineY); ctx.lineTo(rX+rW,vLineY); ctx.stroke(); ctx.restore();
  ctx.save(); ctx.fillStyle='rgba(0,229,255,0.08)';
  ctx.beginPath(); ctx.moveTo(rX,vLineY); ctx.lineTo(rX+rW,vLineY); ctx.lineTo(rX+rW,rY+rH); ctx.lineTo(rX,rY+rH); ctx.closePath(); ctx.fill(); ctx.restore();
  physLabel(ctx,`v=${v}m/s`,rX+rW-10,vLineY-8,'#00e5ff',11,'right');
  physLabel(ctx,'Fläche=s',rX+rW/2,rY+rH-12,'#00e5ff55',10);
}

function drawNewtonPhys() {
  const r = physSetupCanvas('c-phys-newton'); if (!r) return;
  const { ctx, W, H } = r;
  const m = parseInt(document.getElementById('phys-newton-m')?.value || 5);
  const F = parseInt(document.getElementById('phys-newton-f')?.value || 20);
  const mEl=document.getElementById('phys-newton-m-val'), fEl=document.getElementById('phys-newton-f-val');
  if (mEl) mEl.textContent=m+' kg'; if (fEl) fEl.textContent=F+' N';
  const a = F/m;
  ctx.fillStyle='#080820'; ctx.fillRect(0,0,W,H);
  const topH=H*0.55;
  ctx.fillStyle='#1a1a3a'; ctx.fillRect(0,0,W,topH);
  ctx.fillStyle='#222244'; ctx.fillRect(0,topH-8,W,8);
  const blockW=60+m*2, blockH=40+m, blockX=W/2-blockW/2, blockY=topH-8-blockH;
  ctx.fillStyle='#334466'; ctx.strokeStyle='#5566aa'; ctx.lineWidth=2;
  ctx.fillRect(blockX,blockY,blockW,blockH); ctx.strokeRect(blockX,blockY,blockW,blockH);
  physLabel(ctx,`m=${m}kg`,W/2,blockY+blockH/2+5,'#aabbdd',12);
  const arrowLen=Math.min(F*1.2,160), arrowStartX=blockX+blockW+5, arrowY=blockY+blockH/2;
  physDrawArrow(ctx,arrowStartX,arrowY,arrowStartX+arrowLen,arrowY,'#ffd700',3);
  physLabel(ctx,`F=${F}N`,arrowStartX+arrowLen/2,arrowY-14,'#ffd700',12);
  const accLen=Math.min(a*8,120);
  physDrawArrow(ctx,blockX+blockW/2,blockY+blockH+6,blockX+blockW/2+accLen,blockY+blockH+6,'#00e5ff',2.5);
  physLabel(ctx,`a=F/m=${a.toFixed(1)}m/s²`,W/2,blockY+blockH+28,'#00e5ff',12);
  physLabel(ctx,'F=m·a',W-80,24,'#ffd70088',13);
  const botY=topH+10;
  ctx.fillStyle='#0a0a1a'; ctx.fillRect(0,topH,W,H-topH);
  const b1X=W/2-100, b2X=W/2+40, bY=botY+(H-topH)*0.25;
  ctx.fillStyle='#ff4444'; ctx.fillRect(b1X,bY,60,35); physLabel(ctx,'A',b1X+30,bY+22,'#fff',14);
  ctx.fillStyle='#4444ff'; ctx.fillRect(b2X,bY,60,35); physLabel(ctx,'B',b2X+30,bY+22,'#fff',14);
  physDrawArrow(ctx,b1X-5,bY+17,b1X-55,bY+17,'#ff4444',2.5);
  physDrawArrow(ctx,b2X+65,bY+17,b2X+115,bY+17,'#4488ff',2.5);
  physLabel(ctx,'F₁₂ = −F₂₁',W/2,bY+60,'#ff8c00',13);
  physLabel(ctx,'Actio = Reactio',W/2,bY+78,'#ff8c0088',11);
}

function drawVektorenPhys() {
  const r = physSetupCanvas('c-phys-vektor'); if (!r) return;
  const { ctx, W, H } = r;
  const f1=parseInt(document.getElementById('phys-v-f1')?.value||40);
  const a1=parseInt(document.getElementById('phys-v-a1')?.value||30);
  const f2=parseInt(document.getElementById('phys-v-f2')?.value||30);
  const a2=parseInt(document.getElementById('phys-v-a2')?.value||120);
  ['phys-v-f1-val','phys-v-a1-val','phys-v-f2-val','phys-v-a2-val'].forEach((id,i)=>{
    const el=document.getElementById(id); if(el)el.textContent=[f1+' N',a1+'°',f2+' N',a2+'°'][i];
  });
  ctx.fillStyle='#080820'; ctx.fillRect(0,0,W,H);
  const ox=120, oy=H/2, scale=1.5;
  const r1=physDegRad(a1),r2=physDegRad(a2);
  const v1x=f1*Math.cos(r1)*scale,v1y=-f1*Math.sin(r1)*scale;
  const v2x=f2*Math.cos(r2)*scale,v2y=-f2*Math.sin(r2)*scale;
  const rx3=v1x+v2x,ry3=v1y+v2y,rMag=Math.sqrt(rx3*rx3+ry3*ry3)/scale;
  const rAngle=Math.round(physRadDeg(Math.atan2(-ry3,rx3)));
  ctx.fillStyle='#fff'; ctx.beginPath(); ctx.arc(ox,oy,4,0,Math.PI*2); ctx.fill();
  physDrawArrow(ctx,ox,oy,ox+v1x,oy+v1y,'#ffd700',2.5);
  physLabel(ctx,`F₁=${f1}N ∠${a1}°`,ox+v1x/2+6,oy+v1y/2-6,'#ffd700',11);
  physDrawArrow(ctx,ox,oy,ox+v2x,oy+v2y,'#00e5ff',2.5);
  physLabel(ctx,`F₂=${f2}N ∠${a2}°`,ox+v2x/2-6,oy+v2y/2+14,'#00e5ff',11);
  physDashLine(ctx,ox+v1x,oy+v1y,ox+v1x+v2x,oy+v1y+v2y,'#ffffff44');
  physDashLine(ctx,ox+v2x,oy+v2y,ox+v2x+v1x,oy+v2y+v1y,'#ffffff44');
  physDrawArrow(ctx,ox,oy,ox+rx3,oy+ry3,'#39ff14',3.5);
  physLabel(ctx,`|R|=${rMag.toFixed(1)}N, ∠${((rAngle%360)+360)%360}°`,ox+rx3/2+12,oy+ry3/2+20,'#39ff14',12);
}

function getWurfPhysParams() {
  const alpha=parseInt(document.getElementById('phys-wurf-alpha')?.value||45);
  const v0=parseInt(document.getElementById('phys-wurf-v0')?.value||20);
  const g=9.81, rad=physDegRad(alpha);
  const vx=v0*Math.cos(rad), vy0=v0*Math.sin(rad);
  const tFlight=2*vy0/g, range=vx*tFlight, hMax=vy0*vy0/(2*g);
  return {alpha,v0,g,vx,vy0,tFlight,range,hMax};
}

function resetWurfPhys() {
  const aEl=document.getElementById('phys-wurf-alpha-val'), vEl=document.getElementById('phys-wurf-v0-val');
  if (aEl) aEl.textContent=document.getElementById('phys-wurf-alpha')?.value+'°';
  if (vEl) vEl.textContent=document.getElementById('phys-wurf-v0')?.value+' m/s';
  physikWurfT=0; physikWurfTrail=[];
  if (!physikWurfPlaying) drawWurfPhys();
}

function toggleWurfPhys() {
  physikWurfPlaying = !physikWurfPlaying;
  const btn=document.getElementById('phys-wurf-play-btn');
  if (btn) btn.textContent=physikWurfPlaying?'⏸ Pause':'▶ Play';
  if (physikWurfPlaying) { physikWurfT=0; physikWurfTrail=[]; physikWurfLastTime=null; animWurfPhys(); }
}

function drawWurfPhys() {
  const canvas=document.getElementById('c-phys-wurf'); if (!canvas) return;
  const ctx=canvas.getContext('2d'), W=canvas.width, H=canvas.height;
  const {alpha,v0,g,vx,vy0,tFlight,range,hMax}=getWurfPhysParams();
  ctx.clearRect(0,0,W,H); ctx.fillStyle='#080820'; ctx.fillRect(0,0,W,H);
  const groundY=H-30, originX=40;
  const scaleX=(W-80)/Math.max(range,1), scaleY=(groundY-30)/Math.max(hMax*1.2,1);
  ctx.fillStyle='#193a19'; ctx.fillRect(0,groundY,W,H-groundY);
  ctx.fillStyle='#39ff1433'; ctx.fillRect(0,groundY,W,4);
  // Thrower
  ctx.fillStyle='#ff8c00'; ctx.beginPath();
  ctx.moveTo(originX-8,groundY); ctx.lineTo(originX+8,groundY); ctx.lineTo(originX,groundY-18);
  ctx.closePath(); ctx.fill();
  // Parabola (dashed)
  ctx.save(); ctx.strokeStyle='#ffffff22'; ctx.lineWidth=1.5; ctx.setLineDash([4,4]);
  ctx.beginPath();
  for (let step=0;step<=60;step++) {
    const t=step/60*tFlight, x=originX+vx*t*scaleX, y=groundY-(vy0*t-0.5*g*t*t)*scaleY;
    if(step===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
  }
  ctx.stroke(); ctx.setLineDash([]); ctx.restore();
  physLabel(ctx,`Weite:${range.toFixed(1)}m`,W/2,groundY+22,'#39ff14',12);
  physLabel(ctx,`H_max:${hMax.toFixed(1)}m`,W-10,20,'#00e5ff',12,'right');
  physLabel(ctx,`α=${alpha}°, v₀=${v0}m/s`,10,20,'#ffd700',12,'left');
}

function animWurfPhys(timestamp) {
  const canvas=document.getElementById('c-phys-wurf');
  if (!canvas||physikCurrentTopicId!=='wurfbewegung') { physikWurfAnim=null; physikWurfPlaying=false; return; }
  if (!physikWurfLastTime) physikWurfLastTime=timestamp;
  const dt=Math.min((timestamp-physikWurfLastTime)/1000,0.05);
  physikWurfLastTime=timestamp; physikWurfT+=dt*1.5;
  const {alpha,v0,g,vx,vy0,tFlight,range,hMax}=getWurfPhysParams();
  if (physikWurfT>tFlight+0.1) { physikWurfT=0; physikWurfTrail=[]; physikWurfLastTime=null; }
  const ctx=canvas.getContext('2d'), W=canvas.width, H=canvas.height;
  ctx.clearRect(0,0,W,H); ctx.fillStyle='#080820'; ctx.fillRect(0,0,W,H);
  const groundY=H-30, originX=40;
  const scaleX=(W-80)/Math.max(range,1), scaleY=(groundY-30)/Math.max(hMax*1.2,1);
  ctx.fillStyle='#193a19'; ctx.fillRect(0,groundY,W,H-groundY);
  ctx.fillStyle='#39ff1433'; ctx.fillRect(0,groundY,W,4);
  ctx.fillStyle='#ff8c00'; ctx.beginPath();
  ctx.moveTo(originX-8,groundY); ctx.lineTo(originX+8,groundY); ctx.lineTo(originX,groundY-18);
  ctx.closePath(); ctx.fill();
  const t2=Math.min(physikWurfT,tFlight);
  const bx=originX+vx*t2*scaleX, by=groundY-(vy0*t2-0.5*g*t2*t2)*scaleY;
  physikWurfTrail.push({x:bx,y:by});
  ctx.save();
  for(let i=1;i<physikWurfTrail.length;i++){
    const al=i/physikWurfTrail.length;
    ctx.strokeStyle=`rgba(180,100,255,${al*0.8})`; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(physikWurfTrail[i-1].x,physikWurfTrail[i-1].y); ctx.lineTo(physikWurfTrail[i].x,physikWurfTrail[i].y); ctx.stroke();
  }
  ctx.restore();
  if (t2<tFlight) {
    ctx.save(); ctx.fillStyle='#ffd700'; ctx.shadowColor='#ffd700'; ctx.shadowBlur=10;
    ctx.beginPath(); ctx.arc(bx,by,7,0,Math.PI*2); ctx.fill(); ctx.restore();
    const vecScale=3, vCurY=vy0-g*t2;
    physDrawArrow(ctx,bx,by,bx+vx*vecScale,by,'#ffd700',1.5);
    physDrawArrow(ctx,bx,by,bx,by-vCurY*vecScale,'#ff4444',1.5);
  }
  physLabel(ctx,`Weite:${range.toFixed(1)}m`,W/2,groundY+22,'#39ff14',12);
  physLabel(ctx,`t=${t2.toFixed(1)}s`,10,20,'#ffd700',12,'left');
  if (physikWurfPlaying) physikWurfAnim=requestAnimationFrame(animWurfPhys);
  else physikWurfLastTime=null;
}

// ===== CHAT =====
const CHAT_API = `http://${location.hostname || '192.168.2.38'}:8767/chat`;
const chatHistory = []; // Gesprächsverlauf für Kontext

function toggleChat() {
  const win = document.getElementById('chat-window');
  win.classList.toggle('open');
  if (win.classList.contains('open')) {
    document.getElementById('chat-input').focus();
    document.getElementById('chat-messages').scrollTop = 999999;
  }
}

function formatBotMessage(text) {
  // Markdown-Basics rendern
  return text
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code style="background:#1e1e3f;padding:1px 5px;border-radius:4px;font-size:0.85em">$1</code>')
    .replace(/^#{1,3} (.+)$/gm, '<strong style="color:#b44fff">$1</strong>')
    .replace(/\n---\n/g, '<hr style="border-color:#3a3a6a;margin:8px 0">')
    .replace(/\n/g, '<br>');
}

async function sendChat() {
  const input = document.getElementById('chat-input');
  const message = input.value.trim();
  if (!message) return;

  const msgBox = document.getElementById('chat-messages');

  // User-Nachricht
  const userDiv = document.createElement('div');
  userDiv.className = 'msg user';
  userDiv.innerHTML = `<div class="sender">Du ✏️</div>${escapeHtml(message)}`;
  msgBox.appendChild(userDiv);
  input.value = '';
  msgBox.scrollTop = msgBox.scrollHeight;

  // Typing-Indikator
  const typingDiv = document.createElement('div');
  typingDiv.className = 'msg bot typing';
  typingDiv.innerHTML = '<span class="dot">●</span><span class="dot">●</span><span class="dot">●</span>';
  msgBox.appendChild(typingDiv);
  msgBox.scrollTop = msgBox.scrollHeight;

  try {
    const resp = await fetch(CHAT_API, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ message, history: chatHistory })
    });
    const data = await resp.json();
    typingDiv.remove();

    // History aktuell halten (max. 10 Einträge)
    chatHistory.push({ role: 'user', content: message });
    chatHistory.push({ role: 'assistant', content: data.response });
    if (chatHistory.length > 10) chatHistory.splice(0, 2);

    const botDiv = document.createElement('div');
    botDiv.className = data.forwarded ? 'msg bot forwarded' : 'msg bot';
    botDiv.innerHTML = `<div class="sender">🎓 Schul-Assistentin</div>${formatBotMessage(data.response)}`;
    msgBox.appendChild(botDiv);
  } catch (e) {
    typingDiv.remove();
    console.error('Chat-Fehler:', e, 'URL:', CHAT_API);
    const errDiv = document.createElement('div');
    errDiv.className = 'msg bot';
    errDiv.innerHTML = `<div class="sender">🎓 Schul-Assistentin</div>Ups, kurzer Verbindungsfehler — bitte nochmal versuchen! 🔄<br><small style="opacity:.5">${e.message}</small>`;
    msgBox.appendChild(errDiv);
  }
  msgBox.scrollTop = msgBox.scrollHeight;
}

function escapeHtml(text) {
  return text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// ========================
// BELOHNUNGSSYSTEM
// ========================

let _rewardTimerInterval = null;

/**
 * Aktualisiert das Belohnungs-Icon im Header.
 * Wird beim Start und nach jedem Quiz aufgerufen.
 */
function updateRewardIndicator() {
  const unlockUntil = parseInt(localStorage.getItem('reward_unlocked_until') || '0');
  const game = localStorage.getItem('reward_game') || 'snake';
  const indicator = document.getElementById('reward-indicator');
  if (!indicator) return;

  const now = Date.now();
  if (unlockUntil > now) {
    // Spiel ist freigeschaltet
    const secs = Math.ceil((unlockUntil - now) / 1000);
    const min = Math.floor(secs / 60);
    const sec = secs % 60;
    const gameIcon = game === 'snake' ? '🐍' : '🟦';
    indicator.style.display = 'flex';
    indicator.innerHTML = `<span onclick="openGame()" title="Spiel spielen!" style="cursor:pointer">${gameIcon} <span id="reward-timer">${min}:${sec.toString().padStart(2,'0')}</span></span>`;

    // Timer starten falls nicht schon laufend
    if (!_rewardTimerInterval) {
      _rewardTimerInterval = setInterval(() => {
        const u = parseInt(localStorage.getItem('reward_unlocked_until') || '0');
        const remaining = u - Date.now();
        if (remaining <= 0) {
          clearInterval(_rewardTimerInterval);
          _rewardTimerInterval = null;
          const ind = document.getElementById('reward-indicator');
          if (ind) ind.style.display = 'none';
          // Spiel schließen falls offen
          closeGame();
          return;
        }
        const s = Math.ceil(remaining / 1000);
        const m = Math.floor(s / 60);
        const ss = s % 60;
        const el = document.getElementById('reward-timer');
        if (el) el.textContent = `${m}:${ss.toString().padStart(2,'0')}`;
      }, 1000);
    }
  } else {
    // Kein Spiel freigeschaltet
    indicator.style.display = 'none';
    if (_rewardTimerInterval) {
      clearInterval(_rewardTimerInterval);
      _rewardTimerInterval = null;
    }
  }
}

/** Öffnet das freigeschaltete Spiel im Overlay */
function openGame() {
  const unlockUntil = parseInt(localStorage.getItem('reward_unlocked_until') || '0');
  if (Date.now() > unlockUntil) return; // Abgelaufen

  const game = localStorage.getItem('reward_game') || 'snake';
  const overlay = document.getElementById('game-overlay');
  const canvas = document.getElementById('game-canvas');
  const title = document.getElementById('game-title');
  if (!overlay) return;

  overlay.style.display = 'flex';
  if (title) title.textContent = game === 'snake' ? '🐍 Snake' : '🟦 Tetris';

  if (game === 'snake') {
    startSnake(canvas);
  } else {
    startTetris(canvas);
  }
}

/** Schließt das Spiel-Overlay */
function closeGame() {
  const overlay = document.getElementById('game-overlay');
  if (overlay) overlay.style.display = 'none';
  stopSnake();
  stopTetris();
}

// ========================
// SNAKE SPIEL
// ========================

let snakeGame = null; // Referenz auf den laufenden Snake-Game-State

/**
 * Startet Snake auf dem gegebenen Canvas.
 * @param {HTMLCanvasElement} canvas
 */
function startSnake(canvas) {
  stopSnake(); // Vorheriges Spiel stoppen

  const CELL = 20;     // Zellgröße in Pixeln
  const COLS = Math.floor(canvas.width / CELL);
  const ROWS = Math.floor(canvas.height / CELL);
  const ctx = canvas.getContext('2d');

  // Initialer Zustand
  let snake = [
    { x: Math.floor(COLS/2), y: Math.floor(ROWS/2) },
    { x: Math.floor(COLS/2)-1, y: Math.floor(ROWS/2) },
    { x: Math.floor(COLS/2)-2, y: Math.floor(ROWS/2) }
  ];
  let dir = { x: 1, y: 0 };    // Bewegungsrichtung
  let nextDir = { x: 1, y: 0 }; // Nächste Richtung (puffer für schnelle Eingaben)
  let food = placeSnakeFood();
  let score = 0;
  let running = true;
  let speed = 150; // ms pro Schritt
  let frameId = null;
  let lastTime = 0;

  /** Zufällige Futter-Position (nicht auf Schlange) */
  function placeSnakeFood() {
    let pos;
    do {
      pos = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
    } while (snake.some(s => s.x === pos.x && s.y === pos.y));
    return pos;
  }

  /** Zeichnet alles */
  function draw() {
    // Hintergrund
    ctx.fillStyle = '#0a0a15';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Gitter (dezent)
    ctx.strokeStyle = '#1a1a2e';
    ctx.lineWidth = 0.5;
    for (let x = 0; x < COLS; x++) {
      for (let y = 0; y < ROWS; y++) {
        ctx.strokeRect(x*CELL, y*CELL, CELL, CELL);
      }
    }

    // Futter
    const fx = food.x * CELL + CELL/2;
    const fy = food.y * CELL + CELL/2;
    ctx.fillStyle = '#ff4444';
    ctx.beginPath();
    ctx.arc(fx, fy, CELL/2 - 2, 0, Math.PI*2);
    ctx.fill();

    // Schlange
    snake.forEach((seg, i) => {
      const gradient = ctx.createLinearGradient(
        seg.x*CELL, seg.y*CELL,
        seg.x*CELL + CELL, seg.y*CELL + CELL
      );
      gradient.addColorStop(0, i === 0 ? '#00e5ff' : '#00b8d4');
      gradient.addColorStop(1, i === 0 ? '#00b8d4' : '#006080');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.roundRect(seg.x*CELL+1, seg.y*CELL+1, CELL-2, CELL-2, 4);
      ctx.fill();

      // Augen am Kopf
      if (i === 0) {
        ctx.fillStyle = '#fff';
        const eyeOff = 4;
        if (dir.x === 1) { ctx.fillRect(seg.x*CELL+12, seg.y*CELL+4, 3, 3); ctx.fillRect(seg.x*CELL+12, seg.y*CELL+13, 3, 3); }
        if (dir.x === -1) { ctx.fillRect(seg.x*CELL+5, seg.y*CELL+4, 3, 3); ctx.fillRect(seg.x*CELL+5, seg.y*CELL+13, 3, 3); }
        if (dir.y === 1) { ctx.fillRect(seg.x*CELL+4, seg.y*CELL+12, 3, 3); ctx.fillRect(seg.x*CELL+13, seg.y*CELL+12, 3, 3); }
        if (dir.y === -1) { ctx.fillRect(seg.x*CELL+4, seg.y*CELL+5, 3, 3); ctx.fillRect(seg.x*CELL+13, seg.y*CELL+5, 3, 3); }
      }
    });

    // Score
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(4, 4, 110, 24);
    ctx.fillStyle = '#00e5ff';
    ctx.font = 'bold 14px Segoe UI, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`Score: ${score}`, 10, 21);
  }

  /** Game-Over-Screen zeichnen */
  function drawGameOver() {
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ff4444';
    ctx.font = 'bold 28px Segoe UI, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', canvas.width/2, canvas.height/2 - 20);
    ctx.fillStyle = '#e0e0f0';
    ctx.font = '18px Segoe UI, sans-serif';
    ctx.fillText(`Score: ${score}`, canvas.width/2, canvas.height/2 + 15);
    ctx.fillStyle = '#00e5ff';
    ctx.font = '14px Segoe UI, sans-serif';
    ctx.fillText('Nochmal? Tippe eine Taste oder tippe auf den Screen', canvas.width/2, canvas.height/2 + 45);
  }

  /** Einen Schritt der Schlange berechnen */
  function step() {
    dir = { ...nextDir };
    const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

    // Wandkollision
    if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
      running = false;
      draw();
      drawGameOver();
      return;
    }
    // Eigenkollision
    if (snake.some(s => s.x === head.x && s.y === head.y)) {
      running = false;
      draw();
      drawGameOver();
      return;
    }

    snake.unshift(head);

    // Futter gefressen?
    if (head.x === food.x && head.y === food.y) {
      score++;
      food = placeSnakeFood();
      // Geschwindigkeit erhöhen (min 60ms)
      speed = Math.max(60, 150 - score * 5);
    } else {
      snake.pop(); // Schwanz kürzen wenn kein Futter
    }

    draw();
  }

  /** Spielschleife */
  function loop(timestamp) {
    if (!running) return;
    if (timestamp - lastTime >= speed) {
      step();
      lastTime = timestamp;
    }
    frameId = requestAnimationFrame(loop);
  }

  /** Tastatur-Steuerung */
  function onKey(e) {
    if (!snakeGame) return;
    const keyMap = {
      'ArrowUp': {x:0,y:-1}, 'w': {x:0,y:-1}, 'W': {x:0,y:-1},
      'ArrowDown': {x:0,y:1}, 's': {x:0,y:1}, 'S': {x:0,y:1},
      'ArrowLeft': {x:-1,y:0}, 'a': {x:-1,y:0}, 'A': {x:-1,y:0},
      'ArrowRight': {x:1,y:0}, 'd': {x:1,y:0}, 'D': {x:1,y:0}
    };
    const newDir = keyMap[e.key];
    if (!newDir) return;
    e.preventDefault();
    // 180-Grad-Umkehr verhindern
    if (newDir.x === -dir.x && newDir.y === -dir.y) return;
    nextDir = newDir;

    // Nach Game-Over: Neustart
    if (!running) restartSnake();
  }

  /** Touch-Swipe-Steuerung */
  let touchStart = null;
  function onTouchStart(e) {
    touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }
  function onTouchEnd(e) {
    if (!touchStart || !snakeGame) return;
    const dx = e.changedTouches[0].clientX - touchStart.x;
    const dy = e.changedTouches[0].clientY - touchStart.y;
    if (Math.abs(dx) > Math.abs(dy)) {
      const newDir = dx > 0 ? {x:1,y:0} : {x:-1,y:0};
      if (!(newDir.x === -dir.x)) nextDir = newDir;
    } else {
      const newDir = dy > 0 ? {x:0,y:1} : {x:0,y:-1};
      if (!(newDir.y === -dir.y)) nextDir = newDir;
    }
    if (!running) restartSnake();
    touchStart = null;
  }

  function restartSnake() {
    // Neues Spiel auf gleichem Canvas starten
    stopSnake();
    startSnake(canvas);
  }

  // Event-Listener registrieren
  document.addEventListener('keydown', onKey);
  canvas.addEventListener('touchstart', onTouchStart, { passive: true });
  canvas.addEventListener('touchend', onTouchEnd, { passive: true });
  canvas.addEventListener('click', () => { if (!running) restartSnake(); });

  // Spiel-State global speichern (für stopSnake)
  snakeGame = {
    stop() {
      running = false;
      if (frameId) cancelAnimationFrame(frameId);
      frameId = null;
      document.removeEventListener('keydown', onKey);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchend', onTouchEnd);
    }
  };

  // Los!
  draw();
  frameId = requestAnimationFrame(loop);
}

/** Stoppt ein laufendes Snake-Spiel */
function stopSnake() {
  if (snakeGame) {
    snakeGame.stop();
    snakeGame = null;
  }
}

// ========================
// TETRIS SPIEL
// ========================

let tetrisGame = null;

/**
 * Alle 7 Standard-Tetrominos (Rotations-Arrays).
 * Jedes Piece ist ein Array von Rotationen,
 * jede Rotation ein Array von [row, col]-Offsets.
 */
const TETROMINOS = [
  // I
  { color: '#00e5ff', shapes: [
    [[0,0],[0,1],[0,2],[0,3]],
    [[0,0],[1,0],[2,0],[3,0]]
  ]},
  // O
  { color: '#ffd700', shapes: [
    [[0,0],[0,1],[1,0],[1,1]]
  ]},
  // T
  { color: '#b44fff', shapes: [
    [[0,1],[1,0],[1,1],[1,2]],
    [[0,0],[1,0],[2,0],[1,1]],
    [[0,0],[0,1],[0,2],[1,1]],
    [[0,1],[1,1],[2,1],[1,0]]
  ]},
  // S
  { color: '#39ff14', shapes: [
    [[0,1],[0,2],[1,0],[1,1]],
    [[0,0],[1,0],[1,1],[2,1]]
  ]},
  // Z
  { color: '#ff4444', shapes: [
    [[0,0],[0,1],[1,1],[1,2]],
    [[0,1],[1,0],[1,1],[2,0]]
  ]},
  // J
  { color: '#ff8c00', shapes: [
    [[0,0],[1,0],[1,1],[1,2]],
    [[0,0],[0,1],[1,0],[2,0]],
    [[0,0],[0,1],[0,2],[1,2]],
    [[0,1],[1,1],[2,0],[2,1]]
  ]},
  // L
  { color: '#4488ff', shapes: [
    [[0,2],[1,0],[1,1],[1,2]],
    [[0,0],[1,0],[2,0],[2,1]],
    [[0,0],[0,1],[0,2],[1,0]],
    [[0,0],[0,1],[1,1],[2,1]]
  ]}
];

/**
 * Startet Tetris auf dem gegebenen Canvas.
 * @param {HTMLCanvasElement} canvas
 */
function startTetris(canvas) {
  stopTetris();

  const CELL = 24;    // Pixelgröße pro Zelle
  const COLS = 10;    // Tetris-Standard: 10 Spalten
  const ROWS = 20;    // Tetris-Standard: 20 Reihen

  // Canvas auf Spielfeldgröße setzen
  canvas.width = COLS * CELL + 120; // Extra-Breite für Info-Panel
  canvas.height = ROWS * CELL;
  const ctx = canvas.getContext('2d');

  // Spielfeld: 2D-Array (0 = leer, sonst Farbe)
  let board = Array.from({length: ROWS}, () => Array(COLS).fill(0));
  let score = 0;
  let level = 1;
  let lines = 0;
  let running = true;
  let dropInterval = 800; // ms
  let lastDrop = 0;
  let frameId = null;
  let gameOver = false;

  // Aktuelles und nächstes Piece
  let current = null;
  let next = null;

  /** Zufälliges Tetromino erstellen */
  function randomPiece() {
    const idx = Math.floor(Math.random() * TETROMINOS.length);
    const t = TETROMINOS[idx];
    return {
      type: idx,
      color: t.color,
      shapes: t.shapes,
      rot: 0,
      row: 0,
      col: Math.floor(COLS/2) - 2
    };
  }

  /** Gibt die aktuellen Blöcke eines Pieces zurück */
  function getBlocks(piece) {
    return piece.shapes[piece.rot % piece.shapes.length].map(([r, c]) => ({
      row: piece.row + r,
      col: piece.col + c
    }));
  }

  /** Prüft ob eine Position gültig ist */
  function isValid(piece) {
    return getBlocks(piece).every(b =>
      b.col >= 0 && b.col < COLS && b.row < ROWS &&
      (b.row < 0 || board[b.row][b.col] === 0)
    );
  }

  /** Piece ins Board einbauen */
  function placePiece() {
    getBlocks(current).forEach(b => {
      if (b.row >= 0) board[b.row][b.col] = current.color;
    });

    // Volle Reihen suchen und löschen
    let cleared = 0;
    for (let r = ROWS-1; r >= 0; r--) {
      if (board[r].every(c => c !== 0)) {
        board.splice(r, 1);
        board.unshift(Array(COLS).fill(0));
        cleared++;
        r++; // gleiche Reihe nochmal prüfen
      }
    }

    // Score-Berechnung (Tetris-Standard)
    const scoreMap = [0, 40, 100, 300, 1200];
    score += (scoreMap[cleared] || 0) * level;
    lines += cleared;
    level = Math.floor(lines / 10) + 1;
    dropInterval = Math.max(100, 800 - (level-1) * 70);

    // Nächstes Piece spawnen
    current = next;
    next = randomPiece();

    // Game Over prüfen
    if (!isValid(current)) {
      gameOver = true;
      running = false;
    }
  }

  /** Zeichnet das Spielfeld und alles drum herum */
  function draw() {
    const FW = COLS * CELL; // Spielfeld-Breite

    // Hintergrund
    ctx.fillStyle = '#0a0a15';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Spielfeld-Hintergrund
    ctx.fillStyle = '#0d0d1a';
    ctx.fillRect(0, 0, FW, canvas.height);

    // Gitter
    ctx.strokeStyle = '#1a1a2e';
    ctx.lineWidth = 0.5;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        ctx.strokeRect(c*CELL, r*CELL, CELL, CELL);
      }
    }

    // Board-Blöcke zeichnen
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (board[r][c]) {
          drawBlock(ctx, c*CELL, r*CELL, CELL, board[r][c]);
        }
      }
    }

    // Ghost-Piece (wo landet das Piece?)
    if (current) {
      const ghost = { ...current, row: current.row };
      while (isValid({ ...ghost, row: ghost.row + 1 })) ghost.row++;
      getBlocks(ghost).forEach(b => {
        if (b.row >= 0) {
          ctx.fillStyle = current.color + '33';
          ctx.strokeStyle = current.color + '66';
          ctx.lineWidth = 1;
          ctx.fillRect(b.col*CELL+1, b.row*CELL+1, CELL-2, CELL-2);
          ctx.strokeRect(b.col*CELL+1, b.row*CELL+1, CELL-2, CELL-2);
        }
      });
    }

    // Aktuelles Piece zeichnen
    if (current) {
      getBlocks(current).forEach(b => {
        if (b.row >= 0) drawBlock(ctx, b.col*CELL, b.row*CELL, CELL, current.color);
      });
    }

    // Trennlinie zum Info-Panel
    ctx.strokeStyle = '#2a2a3a';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(FW, 0);
    ctx.lineTo(FW, canvas.height);
    ctx.stroke();

    // Info-Panel (rechts)
    const px = FW + 10;
    ctx.fillStyle = '#e0e0f0';
    ctx.font = 'bold 13px Segoe UI, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('SCORE', px, 25);
    ctx.fillStyle = '#00e5ff';
    ctx.font = 'bold 16px Segoe UI, sans-serif';
    ctx.fillText(score, px, 45);

    ctx.fillStyle = '#e0e0f0';
    ctx.font = 'bold 13px Segoe UI, sans-serif';
    ctx.fillText('LEVEL', px, 75);
    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 16px Segoe UI, sans-serif';
    ctx.fillText(level, px, 95);

    ctx.fillStyle = '#e0e0f0';
    ctx.font = 'bold 13px Segoe UI, sans-serif';
    ctx.fillText('LINES', px, 125);
    ctx.fillStyle = '#39ff14';
    ctx.font = 'bold 16px Segoe UI, sans-serif';
    ctx.fillText(lines, px, 145);

    // Nächstes Piece
    ctx.fillStyle = '#e0e0f0';
    ctx.font = 'bold 11px Segoe UI, sans-serif';
    ctx.fillText('NÄCHSTES', px, 175);
    if (next) {
      const previewBlocks = next.shapes[0];
      const minC = Math.min(...previewBlocks.map(b=>b[1]));
      const minR = Math.min(...previewBlocks.map(b=>b[0]));
      previewBlocks.forEach(([r,c]) => {
        drawBlock(ctx, px + (c-minC)*16, 185 + (r-minR)*16, 14, next.color);
      });
    }

    // Game Over Overlay
    if (gameOver) {
      ctx.fillStyle = 'rgba(0,0,0,0.75)';
      ctx.fillRect(0, 0, FW, canvas.height);
      ctx.fillStyle = '#ff4444';
      ctx.font = 'bold 26px Segoe UI, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', FW/2, canvas.height/2 - 30);
      ctx.fillStyle = '#e0e0f0';
      ctx.font = '16px Segoe UI, sans-serif';
      ctx.fillText(`Score: ${score}`, FW/2, canvas.height/2 + 5);
      ctx.fillStyle = '#00e5ff';
      ctx.font = '12px Segoe UI, sans-serif';
      ctx.fillText('Taste drücken zum Neustart', FW/2, canvas.height/2 + 35);
    }
  }

  /** Zeichnet einen einzelnen Block mit Highlight-Effekt */
  function drawBlock(ctx, x, y, size, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x+1, y+1, size-2, size-2);
    // Highlight oben/links
    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    ctx.fillRect(x+2, y+2, size-4, 3);
    ctx.fillRect(x+2, y+2, 3, size-4);
    // Schatten unten/rechts
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillRect(x+2, y+size-4, size-4, 3);
    ctx.fillRect(x+size-4, y+2, 3, size-4);
  }

  /** Spielschleife */
  function loop(timestamp) {
    if (!running) {
      draw(); // einmal zeichnen für Game-Over-Screen
      return;
    }
    if (timestamp - lastDrop >= dropInterval) {
      // Piece nach unten bewegen
      const moved = { ...current, row: current.row + 1 };
      if (isValid(moved)) {
        current = moved;
      } else {
        placePiece();
      }
      lastDrop = timestamp;
    }
    draw();
    frameId = requestAnimationFrame(loop);
  }

  /** Tastatursteuerung */
  function onKey(e) {
    if (!tetrisGame) return;
    if (gameOver) {
      // Neustart
      stopTetris();
      startTetris(canvas);
      return;
    }
    switch(e.key) {
      case 'ArrowLeft': {
        const m = { ...current, col: current.col - 1 };
        if (isValid(m)) current = m;
        e.preventDefault(); break;
      }
      case 'ArrowRight': {
        const m = { ...current, col: current.col + 1 };
        if (isValid(m)) current = m;
        e.preventDefault(); break;
      }
      case 'ArrowDown': {
        const m = { ...current, row: current.row + 1 };
        if (isValid(m)) { current = m; lastDrop = performance.now(); }
        e.preventDefault(); break;
      }
      case 'ArrowUp': case ' ': {
        // Rotieren
        const rotated = { ...current, rot: (current.rot + 1) % current.shapes.length };
        if (isValid(rotated)) current = rotated;
        e.preventDefault(); break;
      }
      case 'ArrowUp': {
        // Hard Drop (Leertaste)
        while (isValid({ ...current, row: current.row + 1 })) current.row++;
        placePiece();
        e.preventDefault(); break;
      }
    }
    draw();
  }

  /** Touch-Swipe-Steuerung */
  let touchStartT = null;
  function onTouchStartT(e) {
    touchStartT = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }
  function onTouchEndT(e) {
    if (!touchStartT || !tetrisGame) return;
    const dx = e.changedTouches[0].clientX - touchStartT.x;
    const dy = e.changedTouches[0].clientY - touchStartT.y;
    if (Math.abs(dx) > Math.abs(dy)) {
      if (Math.abs(dx) > 20) {
        const m = { ...current, col: current.col + (dx > 0 ? 1 : -1) };
        if (isValid(m)) current = m;
      }
    } else {
      if (dy > 30) {
        // Swipe nach unten: schneller fallen
        while (isValid({ ...current, row: current.row + 1 })) current.row++;
        placePiece();
      } else if (dy < -30) {
        // Swipe nach oben: rotieren
        const rotated = { ...current, rot: (current.rot + 1) % current.shapes.length };
        if (isValid(rotated)) current = rotated;
      }
    }
    touchStartT = null;
    draw();
  }

  // Event-Listener
  document.addEventListener('keydown', onKey);
  canvas.addEventListener('touchstart', onTouchStartT, { passive: true });
  canvas.addEventListener('touchend', onTouchEndT, { passive: true });

  // Spiel-State global
  tetrisGame = {
    stop() {
      running = false;
      if (frameId) cancelAnimationFrame(frameId);
      frameId = null;
      document.removeEventListener('keydown', onKey);
      canvas.removeEventListener('touchstart', onTouchStartT);
      canvas.removeEventListener('touchend', onTouchEndT);
    }
  };

  // Erste Pieces erstellen und starten
  current = randomPiece();
  next = randomPiece();
  frameId = requestAnimationFrame(loop);
}

/** Stoppt ein laufendes Tetris-Spiel */
function stopTetris() {
  if (tetrisGame) {
    tetrisGame.stop();
    tetrisGame = null;
  }
}

// ===== CHAT-FENSTER RESIZE =====
(function() {
  const handle = document.getElementById('chat-resize-handle');
  const win    = document.getElementById('chat-window');
  if (!handle || !win) return;

  let dragging = false;
  let startX, startY, startW, startH;

  // Größe aus localStorage laden
  const saved = JSON.parse(localStorage.getItem('chat_size') || 'null');
  if (saved) {
    win.style.width  = saved.w + 'px';
    win.style.height = saved.h + 'px';
  }

  handle.addEventListener('mousedown', e => {
    e.preventDefault();
    dragging = true;
    startX = e.clientX;
    startY = e.clientY;
    startW = win.offsetWidth;
    startH = win.offsetHeight;
    document.body.style.userSelect = 'none';
  });

  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    // Handle ist oben-links → nach links ziehen = breiter, nach oben = höher
    const dw = startX - e.clientX;
    const dh = startY - e.clientY;
    const newW = Math.min(Math.max(startW + dw, 260), window.innerWidth  * 0.9);
    const newH = Math.min(Math.max(startH + dh, 300), window.innerHeight * 0.85);
    win.style.width  = newW + 'px';
    win.style.height = newH + 'px';
  });

  document.addEventListener('mouseup', () => {
    if (!dragging) return;
    dragging = false;
    document.body.style.userSelect = '';
    // Größe speichern
    localStorage.setItem('chat_size', JSON.stringify({
      w: win.offsetWidth,
      h: win.offsetHeight
    }));
  });

  // Touch-Support
  handle.addEventListener('touchstart', e => {
    const t = e.touches[0];
    dragging = true;
    startX = t.clientX; startY = t.clientY;
    startW = win.offsetWidth; startH = win.offsetHeight;
  }, { passive: true });

  document.addEventListener('touchmove', e => {
    if (!dragging) return;
    const t = e.touches[0];
    const dw = startX - t.clientX;
    const dh = startY - t.clientY;
    const newW = Math.min(Math.max(startW + dw, 260), window.innerWidth  * 0.9);
    const newH = Math.min(Math.max(startH + dh, 300), window.innerHeight * 0.85);
    win.style.width  = newW + 'px';
    win.style.height = newH + 'px';
  }, { passive: true });

  document.addEventListener('touchend', () => {
    if (!dragging) return;
    dragging = false;
    localStorage.setItem('chat_size', JSON.stringify({
      w: win.offsetWidth,
      h: win.offsetHeight
    }));
  });
})();

// ===== UPDATE-BENACHRICHTIGUNG =====
(function() {
  // Beim Start aktuelle Version einlesen und merken
  let currentVersion = null;
  let dismissed = false;

  async function checkForUpdate() {
    try {
      // Cache umgehen via Timestamp-Parameter
      const resp = await fetch(`/version.json?t=${Date.now()}`);
      if (!resp.ok) return;
      const data = await resp.json();

      if (currentVersion === null) {
        // Erster Aufruf → Version merken, noch kein Banner
        currentVersion = data.version + '_' + data.ts;
        return;
      }

      const fetched = data.version + '_' + data.ts;
      if (fetched !== currentVersion && !dismissed) {
        // Neue Version erkannt → Banner zeigen
        const banner = document.getElementById('update-banner');
        if (banner) banner.style.display = 'flex';
      }
    } catch (e) {
      // Netzwerkfehler ignorieren
    }
  }

  // Sofort beim Start + alle 2 Minuten prüfen
  checkForUpdate();
  setInterval(checkForUpdate, 2 * 60 * 1000);
})();

function doReload() {
  window.location.reload(true);
}

function dismissUpdate() {
  const banner = document.getElementById('update-banner');
  if (banner) banner.style.display = 'none';
  // dismissed merken bis nächste neue Version
  window._updateDismissed = true;
}
