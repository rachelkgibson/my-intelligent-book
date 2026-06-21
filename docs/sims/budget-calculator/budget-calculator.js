// Budget Line-Item Calculator MicroSim
// CANVAS_HEIGHT: 540
// Students build a project budget with line items, contingency, and a running total.

document.addEventListener('DOMContentLoaded', function () {
  const main = document.querySelector('main');

  const style = document.createElement('style');
  style.textContent = `
    #budget-wrap {
      width: 100%;
      font-family: Arial, Helvetica, sans-serif;
      background: aliceblue;
      padding: 12px;
      box-sizing: border-box;
    }
    #budget-wrap h2 {
      margin: 0 0 8px 0;
      font-size: 16px;
      color: #1a3a6b;
      background: #1a3a6b;
      color: white;
      padding: 6px 10px;
      border-radius: 4px;
    }
    #budget-controls {
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    #add-row-btn {
      background: #2a6496;
      color: white;
      border: none;
      padding: 6px 14px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 13px;
    }
    #add-row-btn:hover { background: #1a4a76; }
    #clear-btn {
      background: #c0392b;
      color: white;
      border: none;
      padding: 6px 12px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 13px;
    }
    #clear-btn:hover { background: #922b21; }
    #budget-table-wrap {
      overflow-x: auto;
      background: white;
      border: 1px solid #c8d8e8;
      border-radius: 4px;
    }
    #budget-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
    }
    #budget-table thead th {
      background: #2a6496;
      color: white;
      padding: 6px 8px;
      text-align: left;
      white-space: nowrap;
    }
    #budget-table tbody tr:nth-child(even) { background: #f0f6fc; }
    #budget-table tbody tr:nth-child(odd)  { background: #ffffff; }
    #budget-table td { padding: 4px 6px; vertical-align: middle; }
    #budget-table td.row-num { color: #888; font-size: 11px; text-align: center; width: 24px; }
    #budget-table td.total-cell { font-weight: bold; color: #1a3a6b; text-align: right; white-space: nowrap; }
    #budget-table select, #budget-table input[type="text"], #budget-table input[type="number"] {
      border: 1px solid #c0c0c0;
      border-radius: 3px;
      padding: 3px 5px;
      font-size: 12px;
      width: 100%;
      box-sizing: border-box;
      background: white;
    }
    #budget-table input[type="number"] { text-align: right; }
    #budget-table .del-btn {
      background: #e74c3c;
      color: white;
      border: none;
      border-radius: 3px;
      padding: 3px 8px;
      cursor: pointer;
      font-size: 11px;
    }
    #budget-table .del-btn:hover { background: #c0392b; }
    #contingency-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 10px 0 4px 0;
      background: white;
      border: 1px solid #c8d8e8;
      border-radius: 4px;
      padding: 8px 12px;
    }
    #contingency-row label { font-size: 13px; color: #333; white-space: nowrap; }
    #contingency-slider { width: 200px; }
    #contingency-value { font-weight: bold; color: #2a6496; font-size: 14px; min-width: 40px; }
    #summary-panel {
      background: white;
      border: 2px solid #2a6496;
      border-radius: 6px;
      padding: 10px 16px;
      margin-top: 8px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .summary-line { display: flex; justify-content: space-between; font-size: 13px; color: #444; }
    .summary-line.total { font-size: 16px; font-weight: bold; color: #1a3a6b; border-top: 2px solid #2a6496; margin-top: 4px; padding-top: 6px; }
    .summary-label { }
    .summary-amount { text-align: right; }
    #hint-text { font-size: 11px; color: #666; margin-top: 6px; font-style: italic; }
  `;
  document.head.appendChild(style);

  let rows = [
    { cat: 'Materials',  desc: 'Lumber and hardware',       qty: 1, cost: 45.00, src: '' },
    { cat: 'Equipment',  desc: 'Safety goggles (4 pairs)',  qty: 4, cost: 8.50,  src: '' },
    { cat: 'Services',   desc: '3D printing service',       qty: 1, cost: 22.00, src: '' },
  ];
  let contingencyPct = 10;

  const CATS = ['Materials', 'Equipment', 'Services', 'Labor', 'Other'];

  function fmt(n) {
    return '$' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function rebuildTable() {
    tbody.innerHTML = '';
    rows.forEach((r, i) => {
      const lineTotal = r.qty * r.cost;
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="row-num">${i + 1}</td>
        <td><select data-i="${i}" data-f="cat">
          ${CATS.map(c => `<option${c === r.cat ? ' selected' : ''}>${c}</option>`).join('')}
        </select></td>
        <td><input type="text" data-i="${i}" data-f="desc" value="${r.desc}" style="min-width:140px"></td>
        <td><input type="number" data-i="${i}" data-f="qty" value="${r.qty}" min="0" step="1" style="width:60px"></td>
        <td><input type="number" data-i="${i}" data-f="cost" value="${r.cost.toFixed(2)}" min="0" step="0.01" style="width:80px"></td>
        <td class="total-cell">${fmt(lineTotal)}</td>
        <td><input type="text" data-i="${i}" data-f="src" value="${r.src}" style="min-width:120px"></td>
        <td><button class="del-btn" data-i="${i}">✕</button></td>
      `;
      tbody.appendChild(tr);
    });
    updateSummary();
  }

  function updateSummary() {
    const subtotal = rows.reduce((s, r) => s + r.qty * r.cost, 0);
    const contingencyAmt = subtotal * contingencyPct / 100;
    const grand = subtotal + contingencyAmt;
    summarySubtotal.textContent  = fmt(subtotal);
    summaryContingency.textContent = fmt(contingencyAmt);
    summaryTotal.textContent     = fmt(grand);
    contingencyLabel.textContent = contingencyPct + '%';
    contingencySummaryLabel.textContent = `Contingency (${contingencyPct}%):`;
  }

  // Build DOM
  const wrap = document.createElement('div');
  wrap.id = 'budget-wrap';

  const h2 = document.createElement('h2');
  h2.textContent = 'Project Budget Calculator';
  wrap.appendChild(h2);

  const controls = document.createElement('div');
  controls.id = 'budget-controls';
  const addBtn = document.createElement('button');
  addBtn.id = 'add-row-btn';
  addBtn.textContent = '+ Add Row';
  const clearBtn = document.createElement('button');
  clearBtn.id = 'clear-btn';
  clearBtn.textContent = 'Clear All';
  controls.appendChild(addBtn);
  controls.appendChild(clearBtn);
  wrap.appendChild(controls);

  const tableWrap = document.createElement('div');
  tableWrap.id = 'budget-table-wrap';
  const table = document.createElement('table');
  table.id = 'budget-table';
  const thead = document.createElement('thead');
  thead.innerHTML = `<tr>
    <th>#</th>
    <th>Category</th>
    <th>Item Description</th>
    <th>Qty</th>
    <th>Unit Cost $</th>
    <th>Total $</th>
    <th>Source / Notes</th>
    <th></th>
  </tr>`;
  table.appendChild(thead);
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  tableWrap.appendChild(table);
  wrap.appendChild(tableWrap);

  // Contingency slider
  const contRow = document.createElement('div');
  contRow.id = 'contingency-row';
  contRow.innerHTML = `<label>Contingency:</label>
    <input type="range" id="contingency-slider" min="5" max="25" step="1" value="10">
    <span id="contingency-value">10%</span>`;
  wrap.appendChild(contRow);
  const contingencyLabel = wrap.querySelector('#contingency-value');
  const contingencySlider = wrap.querySelector('#contingency-slider');

  // Summary
  const summary = document.createElement('div');
  summary.id = 'summary-panel';
  summary.innerHTML = `
    <div class="summary-line"><span class="summary-label">Subtotal:</span><span class="summary-amount" id="sum-subtotal">$0.00</span></div>
    <div class="summary-line"><span class="summary-label" id="sum-cont-label">Contingency (10%):</span><span class="summary-amount" id="sum-contingency">$0.00</span></div>
    <div class="summary-line total"><span class="summary-label">TOTAL BUDGET:</span><span class="summary-amount" id="sum-total">$0.00</span></div>
  `;
  wrap.appendChild(summary);

  const hint = document.createElement('p');
  hint.id = 'hint-text';
  hint.textContent = 'Add all items your project requires. Include a source URL for each cost estimate. The contingency covers unexpected expenses.';
  wrap.appendChild(hint);

  main.appendChild(wrap);

  const summarySubtotal   = document.getElementById('sum-subtotal');
  const summaryContingency = document.getElementById('sum-contingency');
  const summaryTotal       = document.getElementById('sum-total');
  const contingencySummaryLabel = document.getElementById('sum-cont-label');

  // Events
  addBtn.addEventListener('click', () => {
    rows.push({ cat: 'Materials', desc: '', qty: 1, cost: 0, src: '' });
    rebuildTable();
  });

  clearBtn.addEventListener('click', () => {
    if (confirm('Clear all rows?')) { rows = []; rebuildTable(); }
  });

  contingencySlider.addEventListener('input', function () {
    contingencyPct = parseInt(this.value);
    updateSummary();
  });

  tbody.addEventListener('change', function (e) {
    const i = e.target.dataset.i;
    const f = e.target.dataset.f;
    if (i === undefined || !f) return;
    const idx = parseInt(i);
    if (f === 'qty')  rows[idx].qty  = parseFloat(e.target.value) || 0;
    if (f === 'cost') rows[idx].cost = parseFloat(e.target.value) || 0;
    if (f === 'cat')  rows[idx].cat  = e.target.value;
    if (f === 'desc') rows[idx].desc = e.target.value;
    if (f === 'src')  rows[idx].src  = e.target.value;
    rebuildTable();
  });

  tbody.addEventListener('input', function (e) {
    const f = e.target.dataset.f;
    if (f === 'qty' || f === 'cost') {
      const i = parseInt(e.target.dataset.i);
      if (f === 'qty')  rows[i].qty  = parseFloat(e.target.value) || 0;
      if (f === 'cost') rows[i].cost = parseFloat(e.target.value) || 0;
      // Update the total cell live without rebuilding
      const tds = tbody.rows[i].cells;
      tds[5].textContent = fmt(rows[i].qty * rows[i].cost);
      updateSummary();
    }
  });

  tbody.addEventListener('click', function (e) {
    if (e.target.classList.contains('del-btn')) {
      const i = parseInt(e.target.dataset.i);
      rows.splice(i, 1);
      rebuildTable();
    }
  });

  rebuildTable();
});
