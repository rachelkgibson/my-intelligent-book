// Prototype Iteration Cycle MicroSim
// CANVAS_HEIGHT: 502
// Students step through a build-test-iterate cycle for a water purification filter.
// Click Next/Previous to advance through 5 iterations and watch performance improve.

let canvasWidth = 800;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

let leftW, rightX, rightW;
let currentIteration = 0;
let btnPrev, btnNext;

const THRESHOLD = 80;

const iterations = [
  {
    label: "Starting Point",
    phase: "DEFINE",
    change: "No design yet — baseline performance measured.",
    performance: 0,
    accepted: false
  },
  {
    label: "Iteration 1",
    phase: "BUILD → TEST",
    change: "Added activated carbon layer to filter housing.",
    performance: 42,
    accepted: false
  },
  {
    label: "Iteration 2",
    phase: "REDESIGN → TEST",
    change: "Added ceramic membrane filter (carbon layer insufficient).",
    performance: 67,
    accepted: false
  },
  {
    label: "Iteration 3",
    phase: "REFINE → TEST",
    change: "Reduced membrane pore size from 50μm to 10μm.",
    performance: 78,
    accepted: false
  },
  {
    label: "Iteration 4",
    phase: "OPTIMIZE → TEST",
    change: "Optimized flow rate from 2 L/min to 0.8 L/min; added pre-filter.",
    performance: 85,
    accepted: true
  },
  {
    label: "Iteration 5",
    phase: "FINALIZE → TEST",
    change: "Added UV sterilization stage for biological contaminants.",
    performance: 93,
    accepted: true
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  btnPrev = createButton('← Previous');
  btnPrev.parent(document.querySelector('main'));
  btnPrev.mousePressed(() => { if (currentIteration > 0) currentIteration--; });

  btnNext = createButton('Next →');
  btnNext.parent(document.querySelector('main'));
  btnNext.mousePressed(() => { if (currentIteration < iterations.length - 1) currentIteration++; });

  positionButtons();

  describe(
    'Prototype Iteration Cycle: step through 5 design iterations for a water filter. ' +
    'The right panel shows a line chart of contaminant removal performance. ' +
    'A dashed red line marks the 80% acceptance threshold.',
    LABEL
  );
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) canvasWidth = container.offsetWidth;
  leftW  = floor(canvasWidth * 0.40);
  rightX = leftW + 1;
  rightW = canvasWidth - rightX;
}

function positionButtons() {
  const bw = 110;
  const totalBW = bw * 2 + 12;
  const startX = floor(canvasWidth / 2) - floor(totalBW / 2);
  btnPrev.position(startX, drawHeight + 12);
  btnNext.position(startX + bw + 12, drawHeight + 12);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionButtons();
}

// ─── Main draw ───────────────────────────────────────────────────────────────
function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  stroke('silver');
  strokeWeight(1);
  line(leftW, 0, leftW, drawHeight);

  // Accepted banner
  const it = iterations[currentIteration];
  if (it.accepted) {
    fill(34, 139, 34);
    noStroke();
    rect(0, 0, canvasWidth, 28);
    fill('white');
    textSize(14);
    textAlign(CENTER, CENTER);
    noStroke();
    text('✓ Design Accepted! — Performance exceeds 80% threshold', canvasWidth / 2, 14);
  }

  drawLeftPanel();
  drawRightPanel();
  drawControlArea();
}

// ─── Left panel ───────────────────────────────────────────────────────────────
function drawLeftPanel() {
  const it = iterations[currentIteration];
  const topY = it.accepted ? 34 : 8;

  // Iteration label
  fill(50, 90, 160);
  noStroke();
  rect(4, topY, leftW - 8, 28, 4);
  fill('white');
  textSize(13);
  textAlign(CENTER, CENTER);
  noStroke();
  text(it.label + ' of ' + (iterations.length - 1), leftW / 2, topY + 14);

  // Phase badge
  let phaseCol = color(70, 130, 180);
  if (it.phase.includes('REDESIGN')) phaseCol = color(200, 100, 0);
  if (it.phase.includes('FINALIZE')) phaseCol = color(34, 139, 34);
  fill(phaseCol);
  noStroke();
  rect(4, topY + 34, leftW - 8, 22, 4);
  fill('white');
  textSize(11);
  textAlign(CENTER, CENTER);
  noStroke();
  text(it.phase, leftW / 2, topY + 45);

  // Design change
  fill(40);
  textSize(12);
  textAlign(LEFT, TOP);
  noStroke();
  text('Design change:', 8, topY + 66);
  fill(20);
  textSize(11);
  drawWrapped(it.change, 8, topY + 82, leftW - 16, 11, 80);

  // Performance reading
  let perfY = topY + 175;
  fill(80);
  textSize(11);
  textAlign(LEFT, TOP);
  noStroke();
  text('Contaminant removal:', 8, perfY);

  let perfColor = it.performance >= THRESHOLD ? color(34, 139, 34) :
                  it.performance >= 60        ? color(200, 130, 0) :
                                                color(180, 50, 50);
  fill(perfColor);
  textSize(36);
  textAlign(CENTER, TOP);
  noStroke();
  text(it.performance + '%', leftW / 2, perfY + 16);

  // Threshold comparison
  fill(100);
  textSize(10);
  textAlign(CENTER, TOP);
  noStroke();
  text('Threshold: ' + THRESHOLD + '%', leftW / 2, perfY + 58);

  if (it.performance >= THRESHOLD) {
    fill(34, 139, 34);
    textSize(13);
    textAlign(CENTER, TOP);
    noStroke();
    text('✓ Meets acceptance criteria!', leftW / 2, perfY + 74);
  } else {
    fill(160, 60, 60);
    textSize(11);
    textAlign(CENTER, TOP);
    noStroke();
    let gap = THRESHOLD - it.performance;
    text('Need ' + gap + '% more to pass', leftW / 2, perfY + 74);
  }

  // Cycle diagram (BUILD → TEST → ITERATE)
  let cycleY = drawHeight - 90;
  fill(200);
  noStroke();
  rect(8, cycleY, leftW - 16, 80, 6);
  fill(60);
  textSize(10);
  textAlign(CENTER, TOP);
  noStroke();
  text('Engineering Cycle', leftW / 2, cycleY + 6);

  const stages = ['BUILD', 'TEST', 'ITERATE'];
  const stageColors = [color(70,130,180), color(200,130,0), color(34,139,34)];
  let sw = (leftW - 28) / 3;
  for (let i = 0; i < 3; i++) {
    fill(stageColors[i]);
    noStroke();
    rect(10 + i * (sw + 2), cycleY + 24, sw, 22, 3);
    fill('white');
    textSize(9);
    textAlign(CENTER, CENTER);
    noStroke();
    text(stages[i], 10 + i * (sw + 2) + sw / 2, cycleY + 35);
  }
  // Arrows
  fill(80);
  textSize(10);
  noStroke();
  text('→', 10 + sw, cycleY + 35);
  text('→', 10 + sw * 2 + 2, cycleY + 35);
  text('↺ Repeat', leftW / 2, cycleY + 58);
}

// ─── Right panel: line chart ───────────────────────────────────────────────────
function drawRightPanel() {
  const pad = { top: 40, right: 20, bottom: 50, left: 52 };
  const chartX = rightX + pad.left;
  const chartY = pad.top;
  const chartW = rightW - pad.left - pad.right;
  const chartH = drawHeight - pad.top - pad.bottom;

  // Title
  fill(50);
  textSize(12);
  textAlign(CENTER, TOP);
  noStroke();
  text('Contaminant Removal Performance Over Iterations', rightX + rightW / 2, 8);

  // Chart background
  fill(250);
  stroke(220);
  strokeWeight(1);
  rect(chartX, chartY, chartW, chartH);

  // Grid lines (Y: 0, 20, 40, 60, 80, 100)
  for (let pct = 0; pct <= 100; pct += 20) {
    let y = map(pct, 0, 100, chartY + chartH, chartY);
    stroke(220);
    strokeWeight(0.5);
    line(chartX, y, chartX + chartW, y);
    fill(100);
    textSize(9);
    textAlign(RIGHT, CENTER);
    noStroke();
    text(pct + '%', chartX - 4, y);
  }

  // X-axis labels
  for (let i = 0; i <= 5; i++) {
    let x = map(i, 0, 5, chartX, chartX + chartW);
    fill(100);
    textSize(9);
    textAlign(CENTER, TOP);
    noStroke();
    text(i === 0 ? 'Start' : '' + i, x, chartY + chartH + 5);
  }

  // Axis labels
  fill(80);
  textSize(10);
  textAlign(CENTER, BOTTOM);
  noStroke();
  text('Iteration', chartX + chartW / 2, chartY + chartH + 36);

  push();
  translate(chartX - 40, chartY + chartH / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, CENTER);
  text('Removal (%)', 0, 0);
  pop();

  // Threshold line (dashed red)
  let threshY = map(THRESHOLD, 0, 100, chartY + chartH, chartY);
  stroke(200, 50, 50);
  strokeWeight(1.5);
  drawingContext.setLineDash([6, 4]);
  line(chartX, threshY, chartX + chartW, threshY);
  drawingContext.setLineDash([]);
  fill(200, 50, 50);
  textSize(9);
  textAlign(LEFT, BOTTOM);
  noStroke();
  text('Acceptance (' + THRESHOLD + '%)', chartX + 2, threshY - 2);

  // Green fill above threshold
  fill(34, 139, 34, 25);
  noStroke();
  rect(chartX, chartY, chartW, threshY - chartY);

  // Data line (only up to currentIteration)
  const pts = iterations.slice(0, currentIteration + 1).map((it, i) => ({
    x: map(i, 0, 5, chartX, chartX + chartW),
    y: map(it.performance, 0, 100, chartY + chartH, chartY)
  }));

  if (pts.length > 1) {
    stroke(50, 100, 200);
    strokeWeight(2.5);
    for (let i = 1; i < pts.length; i++) {
      line(pts[i - 1].x, pts[i - 1].y, pts[i].x, pts[i].y);
    }
  }

  // Points
  for (let i = 0; i < pts.length; i++) {
    let perf = iterations[i].performance;
    let col = perf >= THRESHOLD ? color(34, 139, 34) : color(50, 100, 200);
    fill(col);
    stroke('white');
    strokeWeight(1.5);
    circle(pts[i].x, pts[i].y, 10);

    // Value label
    fill(perf >= THRESHOLD ? color(34, 100, 34) : color(30, 60, 150));
    textSize(9);
    textAlign(CENTER, BOTTOM);
    noStroke();
    text(perf + '%', pts[i].x, pts[i].y - 7);
  }

  // "Future" greyed-out dots
  for (let i = currentIteration + 1; i < iterations.length; i++) {
    let x = map(i, 0, 5, chartX, chartX + chartW);
    fill(220);
    stroke(200);
    strokeWeight(1);
    circle(x, chartY + chartH, 8);
  }
}

// ─── Control area ─────────────────────────────────────────────────────────────
function drawControlArea() {
  fill(80);
  textSize(10);
  textAlign(CENTER, CENTER);
  noStroke();
  text(
    'Step ' + currentIteration + ' of ' + (iterations.length - 1) +
    '   ·   Watch performance improve toward the 80% acceptance threshold',
    canvasWidth / 2, drawHeight + 25
  );
}

// ─── Helper ───────────────────────────────────────────────────────────────────
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
