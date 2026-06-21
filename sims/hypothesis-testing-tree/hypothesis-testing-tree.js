// Hypothesis Testing Decision Tree MicroSim
// CANVAS_HEIGHT: 482
// Students follow the flowchart from observation to accept/reject outcome.
// Hover over any node to see its description.

let canvasWidth = 800;
let drawHeight = 430;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Node definitions — positions calculated in updateLayout()
const nodes = [
  { id: 0, label: 'Observation',            color: [60, 100, 180],  tip: 'Notice something in the natural world that raises a question' },
  { id: 1, label: 'Form Hypothesis',        color: [60, 100, 180],  tip: 'Propose a testable, falsifiable explanation' },
  { id: 2, label: 'Design Experiment',      color: [60, 100, 180],  tip: 'Create a controlled test with one independent variable' },
  { id: 3, label: 'Collect Data',           color: [60, 100, 180],  tip: 'Record measurements carefully and systematically' },
  { id: 4, label: 'Analyze Results',        color: [60, 100, 180],  tip: 'Use statistics to determine if results are significant' },
  { id: 5, label: 'Reject Null Hypothesis', color: [40, 150, 60],   tip: 'Evidence is strong enough to support your hypothesis' },
  { id: 6, label: 'Fail to Reject Null\nHypothesis', color: [200, 120, 30], tip: 'Evidence is insufficient — the null hypothesis stands' }
];

const nodeW = 200;
const nodeH = 36;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  describe(
    'A vertical flowchart of the hypothesis-testing process. ' +
    'Hover over any step to read a description. ' +
    'The path branches at Analyze Results into reject or fail-to-reject.',
    LABEL
  );
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) canvasWidth = container.offsetWidth;
  updateLayout();
}

function updateLayout() {
  let cx = canvasWidth / 2;
  let startY = 28;
  let spacing = 58;
  // Nodes 0-4: centered column
  for (let i = 0; i < 5; i++) {
    nodes[i].x = cx - nodeW / 2;
    nodes[i].y = startY + i * spacing;
  }
  // Node 5 (Reject): left branch
  nodes[5].x = cx - nodeW - 20;
  nodes[5].y = startY + 5 * spacing;
  // Node 6 (Fail to Reject): right branch — wider label, adjust width later
  nodes[6].x = cx + 20;
  nodes[6].y = startY + 5 * spacing;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

// ── Draw ─────────────────────────────────────────────────────────────────────
function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  drawArrows();
  drawNodes();
  drawTooltip();
  drawControl();
}

function drawArrows() {
  stroke(120);
  strokeWeight(1.5);
  fill(120);

  // Arrows 0→1→2→3→4
  for (let i = 0; i < 4; i++) {
    let n = nodes[i], m = nodes[i + 1];
    let x1 = n.x + nodeW / 2, y1 = n.y + nodeH;
    let x2 = m.x + nodeW / 2, y2 = m.y;
    drawArrow(x1, y1, x2, y2);
  }

  // Arrow 4→5 (left-down)
  let n4 = nodes[4];
  let n5 = nodes[5];
  let n6 = nodes[6];
  let cx = n4.x + nodeW / 2;
  let y4b = n4.y + nodeH;
  let midY = (y4b + n5.y) / 2;

  // Left branch
  let x5c = n5.x + nodeW / 2;
  stroke(40, 140, 50); fill(40, 140, 50);
  line(cx, y4b, cx, midY);
  line(cx, midY, x5c, midY);
  drawArrow(x5c, midY, x5c, n5.y);

  // Right branch — node 6 has wider box
  let w6 = nodeW + 20;
  let x6c = n6.x + w6 / 2;
  stroke(190, 110, 20); fill(190, 110, 20);
  line(cx, midY, x6c, midY);
  drawArrow(x6c, midY, x6c, n6.y);

  // Branch labels
  noStroke();
  fill(40, 140, 50);
  textSize(10);
  textAlign(RIGHT, BOTTOM);
  text('p < 0.05', x5c - 4, midY - 2);

  fill(190, 110, 20);
  textAlign(LEFT, BOTTOM);
  text('p ≥ 0.05', x6c + 4, midY - 2);
}

function drawArrow(x1, y1, x2, y2) {
  line(x1, y1, x2, y2);
  // Arrowhead
  let angle = atan2(y2 - y1, x2 - x1);
  let aSize = 7;
  push();
  translate(x2, y2);
  rotate(angle);
  noStroke();
  triangle(0, 0, -aSize, -aSize * 0.4, -aSize, aSize * 0.4);
  pop();
}

function drawNodes() {
  for (let i = 0; i < nodes.length; i++) {
    let n = nodes[i];
    let w = (i === 6) ? nodeW + 20 : nodeW;
    let hovered = isOverNode(i, mouseX, mouseY);

    let c = n.color;
    fill(c[0], c[1], c[2], hovered ? 220 : 180);
    stroke(hovered ? color(c[0] - 20, c[1] - 20, c[2] - 20) : color(c[0], c[1], c[2]));
    strokeWeight(hovered ? 2.5 : 1.5);
    rect(n.x, n.y, w, nodeH, 6);

    fill('white');
    textSize(12);
    textAlign(CENTER, CENTER);
    noStroke();
    text(n.label, n.x + w / 2, n.y + nodeH / 2);

    if (hovered) cursor(HAND);
  }
}

function drawTooltip() {
  let hovered = -1;
  for (let i = 0; i < nodes.length; i++) {
    if (isOverNode(i, mouseX, mouseY)) { hovered = i; break; }
  }
  if (hovered < 0) return;

  let n = nodes[hovered];
  let w = (hovered === 6) ? nodeW + 20 : nodeW;
  let tip = nodes[hovered].tip;
  let tipW = min(280, canvasWidth * 0.35);
  let tipH = 40;
  let tx = n.x + w / 2 - tipW / 2;
  let ty = n.y - tipH - 6;
  // Clamp to canvas
  tx = constrain(tx, 4, canvasWidth - tipW - 4);
  ty = (ty < 4) ? n.y + nodeH + 4 : ty;

  fill(40, 40, 40, 220);
  stroke('none');
  noStroke();
  rect(tx, ty, tipW, tipH, 4);
  fill('white');
  textSize(11);
  textAlign(CENTER, CENTER);
  noStroke();
  drawWrapped(tip, tx + 8, ty + 6, tipW - 16, 11, tipH - 4);
}

function drawControl() {
  fill(70);
  textSize(11);
  textAlign(CENTER, CENTER);
  noStroke();
  text('Hover over any step to learn more · Follow the arrows from top to bottom',
    canvasWidth / 2, drawHeight + 25);
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function isOverNode(i, mx, my) {
  let n = nodes[i];
  let w = (i === 6) ? nodeW + 20 : nodeW;
  return mx >= n.x && mx <= n.x + w && my >= n.y && my <= n.y + nodeH;
}

function drawWrapped(str, x, y, maxW, sz, maxH) {
  textSize(sz);
  let lh = sz + 3;
  let words = str.split(' ');
  let line = '';
  let curY = y;
  for (let w of words) {
    let test = line ? line + ' ' + w : w;
    if (textWidth(test) > maxW && line !== '') {
      if (curY + lh > y + maxH) { text(line + '…', x, curY); return; }
      text(line, x, curY);
      line = w;
      curY += lh;
    } else {
      line = test;
    }
  }
  if (line && curY <= y + maxH) text(line, x, curY);
}
