// Risk Matrix MicroSim
// CANVAS_HEIGHT: 602
// Students drag project risks onto a 5x5 Likelihood × Impact grid to analyze priority.
// Click a risk to see details; drag it to reassign its position.

let canvasWidth = 800;
let drawHeight = 550;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Grid layout (recalculated on resize)
let gridX = 110, gridY = 45, cellW, cellH;
const COLS = 5, ROWS = 5;

const impactLabels     = ['Negligible','Minor','Moderate','Major','Catastrophic'];
const likelihoodLabels = ['Almost Certain','Likely','Possible','Unlikely','Rare'];

// Zone colours by score
function zoneColor(score) {
  if (score >= 16) return color(210, 50, 50);   // Red
  if (score >= 10) return color(230, 140, 30);   // Orange
  if (score >= 5)  return color(220, 200, 40);   // Yellow
  return color(70, 170, 70);                      // Green
}
function zoneName(score) {
  if (score >= 16) return 'Immediate Action / Redesign';
  if (score >= 10) return 'Active Mitigation Required';
  if (score >= 5)  return 'Plan a Response';
  return 'Monitor Only';
}
function zoneResponse(score) {
  if (score >= 16) return 'Stop or fundamentally redesign. Escalate immediately.';
  if (score >= 10) return 'Create a formal mitigation plan with owner & deadline.';
  if (score >= 5)  return 'Document a contingency; review at weekly check-ins.';
  return 'Log it; revisit only if conditions change.';
}

// Risks: {name, abbrev, likelihood (1-5), impact (1-5), dragX, dragY}
let risks = [
  { name: 'Budget Overrun',          abbrev: 'Budget',   likelihood: 3, impact: 3 },
  { name: 'Key Team Member Quits',   abbrev: 'Team',     likelihood: 2, impact: 4 },
  { name: 'Supplier Delay',          abbrev: 'Supplier', likelihood: 4, impact: 2 },
  { name: 'Design Flaw Found Late',  abbrev: 'Design',   likelihood: 2, impact: 5 },
  { name: 'Equipment Failure',       abbrev: 'Equip.',   likelihood: 3, impact: 4 },
  { name: 'Safety Incident',         abbrev: 'Safety',   likelihood: 1, impact: 5 },
];

let selectedRisk = -1;
let draggingRisk = -1;
let dragOffX = 0, dragOffY = 0;

// Risk circle radius
const R = 16;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  initRiskPositions();
  describe('Risk Matrix: drag risks onto the grid to assess likelihood vs. impact. Click a risk to see details.', LABEL);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) canvasWidth = max(600, container.offsetWidth);
  cellW = floor((canvasWidth * 0.72 - gridX) / COLS);
  cellH = floor((drawHeight - gridY - 20) / ROWS);
  gridX = floor(canvasWidth * 0.14);
}

function initRiskPositions() {
  for (let r of risks) {
    r.dragX = cellCenterX(r.impact);
    r.dragY = cellCenterY(r.likelihood);
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  initRiskPositions();
}

// Convert grid cell (1-based impact col, 1-based likelihood row) to pixel center
function cellCenterX(impact) {
  return gridX + (impact - 1) * cellW + cellW / 2;
}
function cellCenterY(likelihood) {
  // likelihood 5 = top row, 1 = bottom row
  let row = ROWS - likelihood;  // 0-based row index from top
  return gridY + row * cellH + cellH / 2;
}

// Pixel to grid coordinates (returns {col 1-5, row 1-5} or null if outside)
function pixelToCell(px, py) {
  let col = floor((px - gridX) / cellW) + 1;
  let rowIdx = floor((py - gridY) / cellH);
  let row = ROWS - rowIdx;  // convert to likelihood (5=top)
  if (col < 1 || col > COLS || row < 1 || row > ROWS) return null;
  return { impact: col, likelihood: row };
}

// ─── Draw ─────────────────────────────────────────────────────────────────────
function draw() {
  updateCanvasSize();

  // Drawing area
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  drawGrid();
  drawLabels();
  drawRisks();
  drawInfoPanel();
  drawControlBar();
}

function drawGrid() {
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      let L = ROWS - r;          // likelihood (5 at top)
      let I = c + 1;             // impact (1 at left)
      let score = L * I;
      let x = gridX + c * cellW;
      let y = gridY + r * cellH;

      fill(zoneColor(score));
      stroke(255, 255, 255, 120);
      strokeWeight(1);
      rect(x, y, cellW, cellH);

      // Score label
      fill(0, 0, 0, 60);
      textSize(18);
      textAlign(CENTER, CENTER);
      noStroke();
      text(score, x + cellW / 2, y + cellH / 2);
    }
  }
}

function drawLabels() {
  // Y-axis title
  push();
  translate(14, gridY + (ROWS * cellH) / 2);
  rotate(-HALF_PI);
  fill(40);
  textSize(11);
  textAlign(CENTER, CENTER);
  noStroke();
  text('LIKELIHOOD →', 0, 0);
  pop();

  // X-axis title
  fill(40);
  textSize(11);
  textAlign(CENTER, TOP);
  noStroke();
  text('IMPACT →', gridX + (COLS * cellW) / 2, gridY + ROWS * cellH + 6);

  // Likelihood row labels (left side)
  for (let r = 0; r < ROWS; r++) {
    let L = ROWS - r;
    let y = gridY + r * cellH + cellH / 2;
    fill(50);
    textSize(9);
    textAlign(RIGHT, CENTER);
    noStroke();
    text(likelihoodLabels[ROWS - L], gridX - 4, y);
  }

  // Impact column labels (top)
  for (let c = 0; c < COLS; c++) {
    let x = gridX + c * cellW + cellW / 2;
    fill(50);
    textSize(9);
    textAlign(CENTER, BOTTOM);
    noStroke();
    text(impactLabels[c], x, gridY - 4);
  }

  // Legend
  let lx = gridX + COLS * cellW + 12;
  let ly = gridY + 4;
  let zones = [
    { label: 'Monitor Only',              col: color(70,170,70) },
    { label: 'Plan a Response',           col: color(220,200,40) },
    { label: 'Active Mitigation',         col: color(230,140,30) },
    { label: 'Immediate Action',          col: color(210,50,50) },
  ];
  textSize(9);
  for (let i = 0; i < zones.length; i++) {
    fill(zones[i].col);
    noStroke();
    rect(lx, ly + i * 18, 12, 12, 2);
    fill(40);
    textAlign(LEFT, CENTER);
    noStroke();
    text(zones[i].label, lx + 16, ly + i * 18 + 6);
  }
}

function drawRisks() {
  for (let i = 0; i < risks.length; i++) {
    let r = risks[i];
    let px = (draggingRisk === i) ? r.dragX : cellCenterX(r.impact);
    let py = (draggingRisk === i) ? r.dragY : cellCenterY(r.likelihood);
    if (draggingRisk === i) { px = r.dragX; py = r.dragY; }

    let score = r.likelihood * r.impact;
    let base  = zoneColor(score);

    // Drop shadow
    fill(0, 0, 0, 30);
    noStroke();
    circle(px + 2, py + 2, R * 2);

    // Circle
    fill(base);
    stroke(selectedRisk === i ? color(0) : color(80));
    strokeWeight(selectedRisk === i ? 2.5 : 1);
    circle(px, py, R * 2);

    // Label
    fill(0, 0, 0, 180);
    textSize(8);
    textAlign(CENTER, CENTER);
    noStroke();
    text(r.abbrev, px, py);
  }
}

function drawInfoPanel() {
  let panelX = floor(canvasWidth * 0.78);
  let panelW = canvasWidth - panelX - 4;

  fill(245);
  stroke('silver');
  strokeWeight(1);
  rect(panelX, gridY - 6, panelW, drawHeight - gridY);

  if (selectedRisk < 0) {
    fill(130);
    textSize(10);
    textAlign(CENTER, TOP);
    noStroke();
    text('Click a risk\nto see details', panelX + panelW / 2, gridY + 10);
    return;
  }

  let r = risks[selectedRisk];
  let score = r.likelihood * r.impact;

  // Panel header
  fill(zoneColor(score));
  noStroke();
  rect(panelX, gridY - 6, panelW, 22, 3, 3, 0, 0);
  fill(255);
  textSize(10);
  textAlign(CENTER, CENTER);
  noStroke();
  text('RISK DETAIL', panelX + panelW / 2, gridY + 5);

  let ty = gridY + 28;
  let lh = 16;
  let mx = panelX + 4;
  let mw = panelW - 8;

  let lines = [
    ['Risk:', r.name],
    ['Likelihood:', likelihoodLabels[ROWS - r.likelihood] + ' (' + r.likelihood + ')'],
    ['Impact:', impactLabels[r.impact - 1] + ' (' + r.impact + ')'],
    ['Score:', r.likelihood + ' × ' + r.impact + ' = ' + score],
    ['Zone:', zoneName(score)],
    ['',''],
    ['Response:',''],
  ];

  for (let ln of lines) {
    fill(60);
    textSize(9);
    textAlign(LEFT, TOP);
    noStroke();
    text(ln[0], mx, ty);
    fill(20);
    textSize(9);
    textAlign(LEFT, TOP);
    noStroke();
    drawWrapped(ln[1], mx, ty + 10, mw, 9, 30);
    ty += lh + (ln[1].length > 20 ? 10 : 0);
  }

  // Response text
  drawWrapped(zoneResponse(score), mx, ty, mw, 9, 80);
}

function drawControlBar() {
  fill(60);
  textSize(10);
  textAlign(CENTER, CENTER);
  noStroke();
  text('Click a risk to see details  ·  Drag to reassign its likelihood and impact',
       canvasWidth / 2, drawHeight + controlHeight / 2);
}

// ─── Interaction ──────────────────────────────────────────────────────────────
function mousePressed() {
  if (mouseY > drawHeight) return;
  for (let i = 0; i < risks.length; i++) {
    let r = risks[i];
    let px = cellCenterX(r.impact);
    let py = cellCenterY(r.likelihood);
    if (dist(mouseX, mouseY, px, py) < R + 4) {
      draggingRisk = i;
      selectedRisk = i;
      r.dragX = px;
      r.dragY = py;
      dragOffX = mouseX - px;
      dragOffY = mouseY - py;
      return;
    }
  }
  selectedRisk = -1;
}

function mouseDragged() {
  if (draggingRisk < 0) return;
  let r = risks[draggingRisk];
  r.dragX = mouseX - dragOffX;
  r.dragY = mouseY - dragOffY;
}

function mouseReleased() {
  if (draggingRisk < 0) return;
  let r = risks[draggingRisk];
  let cell = pixelToCell(r.dragX, r.dragY);
  if (cell) {
    r.impact      = cell.impact;
    r.likelihood  = cell.likelihood;
  }
  draggingRisk = -1;
}

// ─── Helper ───────────────────────────────────────────────────────────────────
function drawWrapped(str, x, y, maxW, sz, maxH) {
  if (!str) return;
  textSize(sz);
  let lh = sz + 3, words = str.split(' '), line = '', curY = y;
  for (let w of words) {
    let test = line ? line + ' ' + w : w;
    if (textWidth(test) > maxW && line) {
      if (curY + lh > y + maxH) { text(line + '…', x, curY); return; }
      text(line, x, curY);
      line = w; curY += lh;
    } else { line = test; }
  }
  if (line && curY <= y + maxH) text(line, x, curY);
}
