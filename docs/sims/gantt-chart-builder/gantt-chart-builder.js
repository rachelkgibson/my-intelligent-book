// Gantt Chart Builder MicroSim
// CANVAS_HEIGHT: 560
// Students build a Gantt chart by entering tasks with start week, duration, and milestone flag.
// Pure HTML/CSS/JS — no p5.js canvas used. Renders onto a <canvas> element for the Gantt view.

document.addEventListener('DOMContentLoaded', function () {

  const WEEKS = 16;
  const BAR_COLORS = ['steelblue','darkorange','forestgreen','mediumpurple','crimson','teal',
                       'saddlebrown','darkslategray'];

  let tasks = [
    { name: 'Define Requirements', start: 1, duration: 2, milestone: false },
    { name: 'Design Prototype',    start: 3, duration: 3, milestone: false },
    { name: 'Build Prototype',     start: 5, duration: 4, milestone: false },
    { name: 'Testing',             start: 8, duration: 2, milestone: false },
    { name: 'Final Presentation',  start: 14, duration: 1, milestone: true  },
  ];

  // ─── Styles ──────────────────────────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    #gantt-root { display:flex; gap:0; font-family:Arial,sans-serif; background:aliceblue;
      min-height:540px; box-sizing:border-box; }
    #gantt-left  { width:280px; min-width:240px; background:#f4f7ff; border-right:1px solid #ccc;
      display:flex; flex-direction:column; padding:8px; box-sizing:border-box; }
    #gantt-right { flex:1; overflow-x:auto; padding:8px; box-sizing:border-box; display:flex;
      flex-direction:column; }
    #gantt-left h3 { margin:0 0 6px; font-size:13px; color:#333; }
    table#task-table { border-collapse:collapse; font-size:11px; width:100%; }
    table#task-table th { background:#dde8f8; padding:3px 4px; text-align:left; font-size:10px;
      border:1px solid #bcd; }
    table#task-table td { padding:2px 3px; border:1px solid #d0d8e8; vertical-align:middle; }
    table#task-table input[type=text]   { width:88px; font-size:10px; border:1px solid #ccc;
      border-radius:2px; padding:1px 3px; }
    table#task-table input[type=number] { width:38px; font-size:10px; border:1px solid #ccc;
      border-radius:2px; padding:1px 3px; }
    table#task-table input[type=checkbox] { margin:0; }
    .del-row-btn { background:#fee; border:1px solid #f99; color:#c33; border-radius:3px;
      cursor:pointer; font-size:10px; padding:1px 4px; }
    #left-controls { display:flex; gap:6px; margin-top:8px; }
    #left-controls button { flex:1; padding:5px; font-size:11px; border-radius:4px;
      border:1px solid #999; cursor:pointer; }
    #btn-add-task { background:steelblue; color:white; border-color:steelblue; }
    #btn-clear    { background:#f0f0f0; }
    #gantt-right h3 { margin:0 0 4px; font-size:13px; color:#333; }
    #gantt-canvas { display:block; }
    #gantt-legend { display:flex; flex-wrap:wrap; gap:6px; margin-top:6px; font-size:10px; }
    .legend-item { display:flex; align-items:center; gap:4px; }
    .legend-swatch { width:14px; height:12px; border-radius:2px; }
  `;
  document.head.appendChild(style);

  const main = document.querySelector('main');
  main.style.cssText = 'width:100%;box-sizing:border-box;';

  const root = document.createElement('div');
  root.id = 'gantt-root';
  main.appendChild(root);

  // ─── Left panel ──────────────────────────────────────────────────────────────
  const leftPanel = document.createElement('div');
  leftPanel.id = 'gantt-left';

  const lh3 = document.createElement('h3');
  lh3.textContent = 'Task List';
  leftPanel.appendChild(lh3);

  const table = document.createElement('table');
  table.id = 'task-table';
  table.innerHTML = `<thead><tr>
    <th>Task Name</th><th>Start</th><th>Dur.</th><th>Mile?</th><th></th>
  </tr></thead><tbody id="task-tbody"></tbody>`;
  leftPanel.appendChild(table);

  const controls = document.createElement('div');
  controls.id = 'left-controls';
  const addBtn  = document.createElement('button');
  addBtn.id = 'btn-add-task'; addBtn.textContent = '+ Add Task';
  const clearBtn = document.createElement('button');
  clearBtn.id = 'btn-clear'; clearBtn.textContent = 'Clear All';
  controls.appendChild(addBtn);
  controls.appendChild(clearBtn);
  leftPanel.appendChild(controls);
  root.appendChild(leftPanel);

  // ─── Right panel ─────────────────────────────────────────────────────────────
  const rightPanel = document.createElement('div');
  rightPanel.id = 'gantt-right';
  const rh3 = document.createElement('h3');
  rh3.textContent = 'Gantt Chart (16-Week Schedule)';
  rightPanel.appendChild(rh3);

  const canvas = document.createElement('canvas');
  canvas.id = 'gantt-canvas';
  rightPanel.appendChild(canvas);

  const legend = document.createElement('div');
  legend.id = 'gantt-legend';
  rightPanel.appendChild(legend);

  root.appendChild(rightPanel);

  // ─── Render table ────────────────────────────────────────────────────────────
  function renderTable() {
    const tbody = document.getElementById('task-tbody');
    tbody.innerHTML = '';
    tasks.forEach((t, i) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><input type="text"   value="${esc(t.name)}"     data-i="${i}" data-f="name"     maxlength="30"/></td>
        <td><input type="number" value="${t.start}"          data-i="${i}" data-f="start"    min="1" max="16"/></td>
        <td><input type="number" value="${t.duration}"       data-i="${i}" data-f="duration" min="1" max="8"/></td>
        <td style="text-align:center"><input type="checkbox" ${t.milestone?'checked':''} data-i="${i}" data-f="milestone"/></td>
        <td><button class="del-row-btn" data-i="${i}">✕</button></td>
      `;
      tbody.appendChild(tr);
    });
  }

  function esc(s) { return s.replace(/"/g, '&quot;'); }

  // ─── Render Gantt canvas ─────────────────────────────────────────────────────
  function renderGantt() {
    const rightW = rightPanel.clientWidth - 20;
    const LABEL_W = 90;
    const chartW  = Math.max(300, rightW - LABEL_W - 8);
    const weekW   = chartW / WEEKS;
    const ROW_H   = 28;
    const HDR_H   = 30;
    const h = HDR_H + tasks.length * ROW_H + 10;

    canvas.width  = LABEL_W + chartW;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, h);

    // Background
    ctx.fillStyle = '#f8f9ff';
    ctx.fillRect(0, 0, canvas.width, h);

    // Header row
    ctx.fillStyle = '#dde8f8';
    ctx.fillRect(0, 0, canvas.width, HDR_H);
    ctx.fillStyle = '#555';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    for (let w = 1; w <= WEEKS; w++) {
      let x = LABEL_W + (w - 1) * weekW + weekW / 2;
      ctx.fillText('W' + w, x, 18);
    }

    // Grid lines
    ctx.strokeStyle = '#dde';
    ctx.lineWidth = 1;
    for (let w = 0; w <= WEEKS; w++) {
      let x = LABEL_W + w * weekW;
      ctx.beginPath(); ctx.moveTo(x, HDR_H); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let i = 0; i <= tasks.length; i++) {
      let y = HDR_H + i * ROW_H;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }

    // Tasks
    tasks.forEach((t, i) => {
      const y = HDR_H + i * ROW_H;
      const color = BAR_COLORS[i % BAR_COLORS.length];
      const s = Math.max(1, Math.min(WEEKS, t.start));
      const d = Math.max(1, Math.min(WEEKS - s + 1, t.duration));

      // Label
      ctx.fillStyle = '#333';
      ctx.font = '10px Arial';
      ctx.textAlign = 'left';
      let label = t.name.length > 12 ? t.name.slice(0, 11) + '…' : t.name;
      ctx.fillText(label, 4, y + ROW_H / 2 + 4);

      if (t.milestone) {
        // Diamond at start week
        let mx = LABEL_W + (s - 1) * weekW + weekW / 2;
        let my = y + ROW_H / 2;
        let r = 9;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(mx, my - r);
        ctx.lineTo(mx + r, my);
        ctx.lineTo(mx, my + r);
        ctx.lineTo(mx - r, my);
        ctx.closePath();
        ctx.fill();
      } else {
        let bx = LABEL_W + (s - 1) * weekW + 1;
        let bw = d * weekW - 2;
        let by = y + 4;
        let bh = ROW_H - 8;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.roundRect(bx, by, bw, bh, 3);
        ctx.fill();
        // Duration label
        ctx.fillStyle = 'white';
        ctx.font = 'bold 9px Arial';
        ctx.textAlign = 'center';
        if (bw > 20) ctx.fillText(d + 'w', bx + bw / 2, by + bh / 2 + 3);
      }
    });
  }

  // ─── Legend ──────────────────────────────────────────────────────────────────
  function renderLegend() {
    legend.innerHTML = '';
    tasks.forEach((t, i) => {
      const item = document.createElement('div');
      item.className = 'legend-item';
      const sw = document.createElement('div');
      sw.className = 'legend-swatch';
      sw.style.background = BAR_COLORS[i % BAR_COLORS.length];
      if (t.milestone) sw.style.transform = 'rotate(45deg)';
      const lbl = document.createElement('span');
      lbl.textContent = t.name;
      item.appendChild(sw); item.appendChild(lbl);
      legend.appendChild(item);
    });
  }

  function renderAll() {
    renderTable();
    renderGantt();
    renderLegend();
  }

  // ─── Event delegation ────────────────────────────────────────────────────────
  document.getElementById('task-tbody').addEventListener('input', e => {
    const el = e.target;
    const i  = parseInt(el.dataset.i);
    const f  = el.dataset.f;
    if (isNaN(i) || !f) return;
    if (f === 'name')     tasks[i].name     = el.value;
    if (f === 'start')    tasks[i].start    = parseInt(el.value) || 1;
    if (f === 'duration') tasks[i].duration = parseInt(el.value) || 1;
    if (f === 'milestone') tasks[i].milestone = el.checked;
    renderGantt(); renderLegend();
  });

  document.getElementById('task-tbody').addEventListener('change', e => {
    if (e.target.dataset.f === 'milestone') {
      tasks[parseInt(e.target.dataset.i)].milestone = e.target.checked;
      renderGantt(); renderLegend();
    }
  });

  document.getElementById('task-tbody').addEventListener('click', e => {
    if (e.target.classList.contains('del-row-btn')) {
      tasks.splice(parseInt(e.target.dataset.i), 1);
      renderAll();
    }
  });

  addBtn.addEventListener('click', () => {
    tasks.push({ name: 'Task ' + (tasks.length + 1), start: 1, duration: 2, milestone: false });
    renderAll();
  });

  clearBtn.addEventListener('click', () => {
    tasks = [
      { name: 'Define Requirements', start: 1, duration: 2, milestone: false },
      { name: 'Design Prototype',    start: 3, duration: 3, milestone: false },
      { name: 'Build Prototype',     start: 5, duration: 4, milestone: false },
      { name: 'Testing',             start: 8, duration: 2, milestone: false },
      { name: 'Final Presentation',  start: 14, duration: 1, milestone: true  },
    ];
    renderAll();
  });

  window.addEventListener('resize', () => { renderGantt(); });

  renderAll();
});
