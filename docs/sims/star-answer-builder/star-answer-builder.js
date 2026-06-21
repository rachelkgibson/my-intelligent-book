// STAR Answer Builder — HTML/JS MicroSim (no p5.js)
// CANVAS_HEIGHT: 600
// Students construct a STAR-method interview answer with a live preview.

document.addEventListener('DOMContentLoaded', function () {
  const cards = [
    {
      id: 's', label: 'S — Situation', color: 'steelblue',
      prompt: 'Set the scene — where were you, when, and what was happening?',
      rec: '30–60 words', rows: 3
    },
    {
      id: 't', label: 'T — Task', color: 'darkorange',
      prompt: 'What was YOUR specific responsibility or challenge?',
      rec: '20–40 words', rows: 3
    },
    {
      id: 'a', label: 'A — Action', color: 'forestgreen',
      prompt: 'What exact steps did YOU take? Use "I" not "we".',
      rec: '40–80 words', rows: 3
    },
    {
      id: 'r', label: 'R — Result', color: 'mediumpurple',
      prompt: 'What happened? Include a number or measurable outcome if possible.',
      rec: '20–40 words', rows: 3
    }
  ];

  const main = document.querySelector('main');
  let practiceMode = false;

  main.innerHTML = `
    <div class="sim-wrapper">
      <div class="left-col">
        ${cards.map(c => `
          <div class="card">
            <div class="card-header" style="background:${c.color};">
              <span>${c.label}</span>
              <span style="font-weight:normal;font-size:11px;">Recommended: ${c.rec}</span>
            </div>
            <div class="card-body">
              <div class="card-prompt">${c.prompt}</div>
              <textarea id="ta-${c.id}" rows="${c.rows}" placeholder="Type your ${c.label.split(' — ')[0]} here…"></textarea>
              <div class="char-count" id="cc-${c.id}">0 characters</div>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="right-col">
        <div class="preview-card">
          <div class="preview-header">HOW IT SOUNDS</div>
          <div class="preview-body">
            <div class="preview-text" id="preview-text"></div>
            <div class="word-count" id="word-count">0 words in your answer</div>
            <button class="practice-btn" id="practice-btn">Practice Mode: Hide Preview</button>
          </div>
        </div>
      </div>
    </div>
  `;

  function val(id) { return (document.getElementById('ta-' + id).value || '').trim(); }

  function ph(text, placeholder) {
    return text ? text : `<em>[${placeholder}]</em>`;
  }

  function updatePreview() {
    const s = val('s'), t = val('t'), a = val('a'), r = val('r');
    const assembled = `${ph(s, 'your situation here')}, I was responsible for ${ph(t, 'your task here')}. I ${ph(a, 'your action here')}. As a result, ${ph(r, 'your result here')}.`;
    const words = [s, t, a, r].join(' ').trim().split(/\s+/).filter(w => w).length;

    document.getElementById('preview-text').innerHTML = practiceMode
      ? '<span style="color:#aaa;font-style:italic;">Preview hidden — recall your answer from memory.</span>'
      : assembled;
    document.getElementById('word-count').textContent = `${words} word${words !== 1 ? 's' : ''} in your answer`;
  }

  cards.forEach(c => {
    const ta = document.getElementById('ta-' + c.id);
    const cc = document.getElementById('cc-' + c.id);
    ta.addEventListener('input', function () {
      cc.textContent = `${this.value.length} characters`;
      updatePreview();
    });
  });

  document.getElementById('practice-btn').addEventListener('click', function () {
    practiceMode = !practiceMode;
    this.textContent = practiceMode ? 'Practice Mode: Show Preview' : 'Practice Mode: Hide Preview';
    updatePreview();
  });

  updatePreview();
});
