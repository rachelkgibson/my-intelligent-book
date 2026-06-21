// IP Protection Type Selector MicroSim
// CANVAS_HEIGHT: 562
// Students classify an engineering creation into Patent, Copyright, Trademark, or Trade Secret
// by clicking YES or NO through a branching decision tree.

let canvasWidth = 800;
let drawHeight  = 510;
let controlHeight = 50;
let canvasHeight  = drawHeight + controlHeight;

// Tree nodes  { id, label, yesId, noId, outcomeKey }
// outcomeKey only on leaf nodes
const NODES = {
  q1: { label: "Does it describe HOW something WORKS\nor is physically made?", yesId: 'q2', noId: 'q4' },
  q2: { label: "Is it a novel, non-obvious\ninvention or design?",              yesId: 'patent', noId: 'q3' },
  q3: { label: "Is it a formula, process, or method\nkept confidential?",      yesId: 'secret', noId: 'secret' },
  q4: { label: "Is it a creative work — writing,\nmusic, art, or software?",  yesId: 'copy',   noId: 'q5' },
  q5: { label: "Is it a name, logo, or symbol\nthat identifies a brand?",     yesId: 'mark',   noId: 'secret' },
  patent: { outcomeKey: 'patent' },
  copy:   { outcomeKey: 'copy' },
  mark:   { outcomeKey: 'mark' },
  secret: { outcomeKey: 'secret' },
};

// Positions (cx, cy) — set in updateLayout()
let nodePos = {};

// Outcome details
const OUTCOMES = {
  patent: {
    label: 'PATENT',
    color: [40, 160, 60],
    info: [
      "Duration: 20 years from filing date",
      "Protects: Novel inventions, processes, and designs",
      "Does NOT protect: Ideas alone or natural phenomena",
      "Engineering example: A new water purification device",
    ],
  },
  copy: {
    label: 'COPYRIGHT',
    color: [50, 110, 200],
    info: [
      "Duration: Life of author + 70 years",
      "Protects: Original creative works (code, reports, CAD drawings)",
      "Does NOT protect: Facts, ideas, or functional systems",
      "Engineering example: A technical report or software source code",
    ],
  },
  mark: {
    label: 'TRADEMARK',
    color: [180, 140, 0],
    info: [
      "Duration: Indefinite (renewed every 10 years)",
      "Protects: Names, logos, and symbols identifying a brand",
      "Does NOT protect: Functional product features",
      "Engineering example: A company name or product logo",
    ],
  },
  secret: {
    label: 'TRADE SECRET',
    color: [140, 60, 160],
    info: [
      "Duration: Indefinite (while kept secret)",
      "Protects: Confidential business information with economic value",
      "Does NOT protect: Information already publicly known",
      "Engineering example: A proprietary manufacturing formula or algorithm",
    ],
  },
};

// State
let path = [];          // list of node IDs traversed
let currentNode = 'q1';
let startBtn;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  startBtn = createButton('Start Over');
  startBtn.parent(document.querySelector('main'));
  startBtn.position(canvasWidth - 100, drawHeight + 13);
  startBtn.mousePressed(resetTree);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) canvasWidth = container.offsetWidth;
  buildLayout();
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  startBtn.position(canvasWidth - 100, drawHeight + 13);
}

function buildLayout() {
  let cw = canvasWidth;
  nodePos = {
    q1:     { cx: cw * 0.50, cy: 50  },
    q2:     { cx: cw * 0.27, cy: 140 },
    q4:     { cx: cw * 0.73, cy: 140 },
    q3:     { cx: cw * 0.27, cy: 240 },
    q5:     { cx: cw * 0.73, cy: 240 },
    patent: { cx: cw * 0.12, cy: 340 },
    secret: { cx: cw * 0.50, cy: 340 },
    copy:   { cx: cw * 0.62, cy: 340 },
    mark:   { cx: cw * 0.88, cy: 340 },
  };
}

// ── draw ─────────────────────────────────────────────────────────────────────
function draw() {
  updateCanvasSize();

  fill('aliceblue'); stroke('silver'); strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  fill('white'); stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  drawEdges();
  drawNodes();
  if (currentNode in OUTCOMES) drawOutcomePanel();
  drawControlArea();
}

function isVisited(id) { return path.includes(id) || id === currentNode; }
function isOutcome(id) { return id in OUTCOMES; }

function drawEdges() {
  const connections = [
    { from: 'q1', to: 'q2', label: 'YES' },
    { from: 'q1', to: 'q4', label: 'NO' },
    { from: 'q2', to: 'patent', label: 'YES' },
    { from: 'q2', to: 'q3', label: 'NO' },
    { from: 'q3', to: 'secret', label: 'YES/NO' },
    { from: 'q4', to: 'copy', label: 'YES' },
    { from: 'q4', to: 'q5', label: 'NO' },
    { from: 'q5', to: 'mark', label: 'YES' },
    { from: 'q5', to: 'secret', label: 'NO' },
  ];

  for (let c of connections) {
    let a = nodePos[c.from], b = nodePos[c.to];
    if (!a || !b) continue;
    let traversed = (path.includes(c.from) || c.from === currentNode) &&
                    isVisited(c.to);
    stroke(traversed ? 60 : 200); strokeWeight(traversed ? 2 : 1);
    line(a.cx, a.cy + 18, b.cx, b.cy - 18);

    // Label
    let mx = (a.cx + b.cx) / 2, my = (a.cy + b.cy) / 2;
    fill(traversed ? 30 : 150);
    textSize(10); textAlign(CENTER, CENTER); noStroke();
    text(c.label, mx, my);
  }
}

function drawNodes() {
  let NW = 160, NH = 36;
  for (let [id, pos] of Object.entries(nodePos)) {
    let node = NODES[id];
    let visited  = isVisited(id);
    let isCurrent = (id === currentNode);
    let outcome  = isOutcome(id);

    let nw = outcome ? 120 : NW;
    let nh = outcome ? 30  : NH;

    let [r, g, b] = outcome ? (OUTCOMES[id] ? OUTCOMES[id].color : [180,180,180]) : [100,120,180];
    let alpha = visited ? 255 : 80;

    if (isCurrent) {
      fill(r, g, b, 50); stroke(r, g, b); strokeWeight(2.5);
    } else if (visited) {
      fill(r, g, b, outcome ? 200 : 40); stroke(r, g, b, 200); strokeWeight(1.5);
    } else {
      fill(240); stroke(180); strokeWeight(1);
    }
    rect(pos.cx - nw/2, pos.cy - nh/2, nw, nh, 8);

    fill(visited ? (outcome ? 255 : 20) : 180);
    textSize(outcome ? 12 : 10); textAlign(CENTER, CENTER); noStroke();
    if (outcome) {
      text(OUTCOMES[id] ? OUTCOMES[id].label : id.toUpperCase(), pos.cx, pos.cy);
    } else {
      // Draw multi-line node label
      let lines = NODES[id].label.split('\n');
      let lh = 13;
      for (let i = 0; i < lines.length; i++) {
        text(lines[i], pos.cx, pos.cy - (lines.length - 1) * lh/2 + i * lh);
      }
    }

    // YES / NO buttons on current question node
    if (isCurrent && !outcome) {
      let node = NODES[id];
      let btnY = pos.cy + nh/2 + 6;
      // YES button (left)
      fill(40, 160, 60, 200); noStroke();
      rect(pos.cx - 54, btnY, 48, 20, 5);
      fill(255); textSize(11); textAlign(CENTER, CENTER); noStroke();
      text('YES', pos.cx - 30, btnY + 10);
      // NO button (right)
      fill(180, 60, 60, 200); noStroke();
      rect(pos.cx + 6, btnY, 48, 20, 5);
      fill(255); textSize(11); textAlign(CENTER, CENTER); noStroke();
      text('NO', pos.cx + 30, btnY + 10);
    }
  }
}

function drawOutcomePanel() {
  let ok = currentNode;
  if (!(ok in OUTCOMES)) return;
  let out = OUTCOMES[ok];
  let [r, g, b] = out.color;
  let panelY = 390;

  fill(r, g, b, 30); stroke(r, g, b); strokeWeight(1.5);
  rect(10, panelY, canvasWidth - 20, drawHeight - panelY - 8, 8);

  fill(r, g, b); textSize(15); textAlign(LEFT, TOP); noStroke();
  text(out.label, 22, panelY + 10);

  fill(30); textSize(11);
  for (let i = 0; i < out.info.length; i++) {
    noStroke();
    text('• ' + out.info[i], 22, panelY + 32 + i * 18);
  }
}

function drawControlArea() {
  fill(70); textSize(11); textAlign(LEFT, CENTER); noStroke();
  text('Click YES or NO on the current question to classify your engineering creation',
       12, drawHeight + 25);
}

// ── interaction ───────────────────────────────────────────────────────────────
function mousePressed() {
  if (mouseY >= drawHeight || isOutcome(currentNode)) return;

  let pos = nodePos[currentNode];
  let node = NODES[currentNode];
  let NH = 36;
  let btnY = pos.cy + NH/2 + 6;

  // YES button
  if (mouseX >= pos.cx - 54 && mouseX <= pos.cx - 6 &&
      mouseY >= btnY && mouseY <= btnY + 20) {
    path.push(currentNode);
    currentNode = node.yesId;
    return;
  }
  // NO button
  if (mouseX >= pos.cx + 6 && mouseX <= pos.cx + 54 &&
      mouseY >= btnY && mouseY <= btnY + 20) {
    path.push(currentNode);
    currentNode = node.noId;
  }
}

function resetTree() {
  path = [];
  currentNode = 'q1';
}
