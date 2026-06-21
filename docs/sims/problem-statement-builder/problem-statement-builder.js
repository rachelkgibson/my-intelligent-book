// Problem Statement Builder — HTML/JS MicroSim (no p5.js)
// CANVAS_HEIGHT: 580
// Students construct a four-part engineering problem statement with live preview.

document.addEventListener('DOMContentLoaded', function () {
  const fields = [
    {
      id: 'situation', label: 'The Situation', color: '#1a8a8a',
      prompt: 'Who is affected and what is currently happening? (1–2 sentences)',
      rec: '30–60 words', rows: 3,
      dotColor: '#1a8a8a'
    },
    {
      id: 'need', label: 'The Need', color: '#c86a00',
      prompt: 'What is missing, broken, or inadequate in the current situation?',
      rec: '20–40 words', rows: 3,
      dotColor: '#c86a00'
    },
    {
      id: 'goal', label: 'The Goal', color: '#2060a0',
      prompt: 'What should the finished solution accomplish? State it as a measurable outcome.',
      rec: '20–40 words', rows: 3,
      dotColor: '#2060a0'
    },
    {
      id: 'constraints', label: 'The Constraints', color: '#7030a0',
      prompt: 'What limits your solution? (budget, materials, time, space, safety requirements)',
      rec: '20–40 words', rows: 3,
      dotColor: '#7030a0'
    }
  ];

  const main = document.querySelector('main');

  main.innerHTML = `
    <div class="sim-wrapper">
      <div class="left-col">
        ${fields.map(f => `
          <div class="card">
            <div class="card-header" style="background:${f.color};">
              <span>${f.label}</span>
              <span style="font-weight:normal;font-size:11px;">Recommended: ${f.rec}</span>
            </div>
            <div class="card-body">
              <div class="card-prompt">${f.prompt}</div>
              <textarea id="ta-${f.id}" rows="${f.rows}" placeholder="${f.label}…"></textarea>
              <div class="char-count" id="cc-${f.id}">0 characters</div>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="right-col">
        <div class="preview-card">
          <div class="preview-header">YOUR PROBLEM STATEMENT</div>
          <div class="preview-body">
            <div class="preview-text" id="preview-text"></div>
            <div class="dots-row" id="dots-row">
              ${fields.map(f => `<span class="dot" id="dot-${f.id}" style="background:#ccc;" title="${f.label}"></span>`).join('')}
              <span class="complete-badge" id="complete-badge" style="display:none;">✓ Complete</span>
            </div>
            <button class="copy-btn" id="copy-btn">Copy to Clipboard</button>
          </div>
        </div>
      </div>
    </div>
  `;

  function val(id) { return (document.getElementById('ta-' + id).value || '').trim(); }

  function ph(text, placeholder) {
    return text ? text : `<em>[${placeholder}]</em>`;
  }

  function plainVal(id) { return val(id) || `[${fields.find(f => f.id === id).label.toLowerCase()}]`; }

  function updatePreview() {
    const s = val('situation'), n = val('need'), g = val('goal'), c = val('constraints');
    const assembled = `${ph(s, 'your situation here')} Currently, there is no adequate solution to ${ph(n, 'the need here')}. The goal of this project is to ${ph(g, 'the goal here')}, within the following constraints: ${ph(c, 'your constraints here')}.`;
    document.getElementById('preview-text').innerHTML = assembled;

    // Update dots
    fields.forEach(f => {
      const dot = document.getElementById('dot-' + f.id);
      const filled = val(f.id).length >= 10;
      dot.style.background = filled ? f.dotColor : '#ccc';
    });

    const allFilled = fields.every(f => val(f.id).length >= 10);
    document.getElementById('complete-badge').style.display = allFilled ? 'inline' : 'none';
  }

  fields.forEach(f => {
    const ta = document.getElementById('ta-' + f.id);
    const cc = document.getElementById('cc-' + f.id);
    ta.addEventListener('input', function () {
      cc.textContent = `${this.value.length} characters`;
      updatePreview();
    });
  });

  document.getElementById('copy-btn').addEventListener('click', function () {
    const s = plainVal('situation'), n = plainVal('need'), g = plainVal('goal'), c = plainVal('constraints');
    const text = `${s} Currently, there is no adequate solution to ${n}. The goal of this project is to ${g}, within the following constraints: ${c}.`;
    navigator.clipboard.writeText(text).then(() => {
      this.textContent = 'Copied!';
      setTimeout(() => { this.textContent = 'Copy to Clipboard'; }, 1500);
    });
  });

  updatePreview();
});
