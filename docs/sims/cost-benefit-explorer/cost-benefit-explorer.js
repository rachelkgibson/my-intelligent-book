// Cost-Benefit Scenario Explorer MicroSim
// CANVAS_HEIGHT: 462
// Students adjust sliders to see how project cost and weekly benefit affect break-even timing.

document.addEventListener('DOMContentLoaded', function () {
  const main = document.querySelector('main');

  const style = document.createElement('style');
  style.textContent = `
    #cb-wrap {
      width: 100%;
      font-family: Arial, Helvetica, sans-serif;
      background: aliceblue;
      padding: 12px;
      box-sizing: border-box;
      min-height: 460px;
    }
    #cb-wrap h2 {
      margin: 0 0 8px 0;
      font-size: 15px;
      background: #1a5276;
      color: white;
      padding: 6px 10px;
      border-radius: 4px;
    }
    #cb-inner {
      display: flex;
      gap: 12px;
      align-items: flex-start;
    }
    #cb-controls {
      width: 230px;
      flex-shrink: 0;
      background: white;
      border: 1px solid #aac4dd;
      border-radius: 6px;
      padding: 12px;
    }
    .slider-group {
      margin-bottom: 16px;
    }
    .slider-label {
      font-size: 12px;
      color: #444;
      margin-bottom: 2px;
    }
    .slider-value {
      font-size: 15px;
      font-weight: bold;
      color: #1a5276;
    }
    .slider-group input[type="range"] {
      width: 100%;
      margin-top: 4px;
    }
    #cb-chart-area {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
    }
    #cb-canvas-wrap {
      position: relative;
      background: white;
      border: 1px solid #aac4dd;
      border-radius: 6px;
      padding: 8px;
    }
    #cb-canvas { width: 100%; display: block; }
    #cb-metric {
      margin-top: 8px;
      background: white;
      border: 1px solid #aac4dd;
      border-radius: 6px;
      padding: 8px 12px;
      font-size: 13px;
      text-align: center;
      font-weight: bold;
    }
    #cb-metric.good  { color: #1e8449; border-color: #1e8449; background: #eafaf1; }
    #cb-metric.bad   { color: #c0392b; border-color: #c0392b; background: #fdf2f2; }
  `;
  document.head.appendChild(style);

  // Build DOM
  const wrap = document.createElement('div');
  wrap.id = 'cb-wrap';
  wrap.innerHTML = `<h2>Cost-Benefit Scenario Explorer</h2>
  <div id="cb-inner">
    <div id="cb-controls">
      <div class="slider-group">
        <div class="slider-label">Project Cost</div>
        <div class="slider-value" id="val-cost">$80</div>
        <input type="range" id="sl-cost" min="10" max="500" step="5" value="80">
      </div>
      <div class="slider-group">
        <div class="slider-label">Weekly Benefit</div>
        <div class="slider-value" id="val-benefit">$5/wk</div>
        <input type="range" id="sl-benefit" min="1" max="50" step="1" value="5">
      </div>
      <div class="slider-group">
        <div class="slider-label">Project Lifespan</div>
        <div class="slider-value" id="val-life">20 weeks</div>
        <input type="range" id="sl-life" min="4" max="52" step="1" value="20">
      </div>
    </div>
    <div id="cb-chart-area">
      <div id="cb-canvas-wrap">
        <canvas id="cb-canvas"></canvas>
      </div>
      <div id="cb-metric">—</div>
    </div>
  </div>`;
  main.appendChild(wrap);

  const slCost    = document.getElementById('sl-cost');
  const slBenefit = document.getElementById('sl-benefit');
  const slLife    = document.getElementById('sl-life');
  const valCost    = document.getElementById('val-cost');
  const valBenefit = document.getElementById('val-benefit');
  const valLife    = document.getElementById('val-life');
  const metric     = document.getElementById('cb-metric');
  const canvas     = document.getElementById('cb-canvas');
  const ctx        = canvas.getContext('2d');

  let chart = null;

  function getValues() {
    return {
      cost:    parseInt(slCost.value),
      benefit: parseInt(slBenefit.value),
      life:    parseInt(slLife.value),
    };
  }

  function buildChartData(cost, benefit, life) {
    const labels = [];
    const costData = [];
    const benefitData = [];
    for (let w = 0; w <= life; w++) {
      labels.push(w);
      costData.push(cost);
      benefitData.push(w * benefit);
    }
    return { labels, costData, benefitData };
  }

  function findBreakEven(cost, benefit, life) {
    if (benefit <= 0) return null;
    const week = Math.ceil(cost / benefit);
    return week <= life ? week : null;
  }

  function breakEvenDataset(breakWeek, cost, benefit, life) {
    // Vertical dashed line at breakWeek as a scatter "line"
    const max = Math.max(cost, life * benefit) * 1.05;
    if (breakWeek === null) return null;
    return {
      label: 'Break-even',
      data: [{ x: breakWeek, y: 0 }, { x: breakWeek, y: max }],
      borderColor: '#7f8c8d',
      borderDash: [6, 4],
      borderWidth: 2,
      pointRadius: 0,
      showLine: true,
      type: 'line',
      order: 0,
      fill: false,
    };
  }

  function updateChart() {
    const { cost, benefit, life } = getValues();
    valCost.textContent    = '$' + cost;
    valBenefit.textContent = '$' + benefit + '/wk';
    valLife.textContent    = life + ' weeks';

    const { labels, costData, benefitData } = buildChartData(cost, benefit, life);
    const breakWeek = findBreakEven(cost, benefit, life);
    const yMax = Math.max(cost, life * benefit) * 1.1;

    const datasets = [
      {
        label: 'Cumulative Cost',
        data: labels.map(() => cost),
        borderColor: '#e74c3c',
        backgroundColor: 'rgba(231,76,60,0.08)',
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
        tension: 0,
        order: 2,
      },
      {
        label: 'Cumulative Benefit',
        data: benefitData,
        borderColor: '#27ae60',
        backgroundColor: 'rgba(39,174,96,0.08)',
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
        tension: 0,
        order: 2,
      },
    ];

    const beLine = breakEvenDataset(breakWeek, cost, benefit, life);
    if (beLine) datasets.push(beLine);

    if (chart) {
      chart.data.labels   = labels;
      chart.data.datasets = datasets;
      chart.options.scales.y.max = yMax;
      chart.update();
    } else {
      chart = new Chart(ctx, {
        type: 'line',
        data: { labels, datasets },
        options: {
          responsive: true,
          interaction: { mode: 'index', intersect: false },
          plugins: {
            legend: { position: 'top', labels: { font: { size: 12 } } },
            tooltip: {
              callbacks: {
                label: item => `${item.dataset.label}: $${item.parsed.y.toFixed(0)}`
              }
            }
          },
          scales: {
            x: { title: { display: true, text: 'Weeks' }, type: 'linear', min: 0, max: life },
            y: { title: { display: true, text: '$' }, min: 0, max: yMax,
                 ticks: { callback: v => '$' + v } }
          }
        }
      });
    }

    // Metric
    if (breakWeek !== null) {
      metric.textContent = `Break-even: Week ${breakWeek} — the project pays for itself after ${breakWeek} week${breakWeek===1?'':'s'}.`;
      metric.className = 'good';
    } else {
      metric.textContent = `Project never breaks even within ${life} weeks at $${benefit}/week.`;
      metric.className = 'bad';
    }
  }

  [slCost, slBenefit, slLife].forEach(s => s.addEventListener('input', updateChart));
  updateChart();
});
