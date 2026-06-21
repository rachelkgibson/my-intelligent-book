// Science vs. Engineering Venn Diagram MicroSim
// CANVAS_HEIGHT: 422
// Students click regions to explore what each discipline uniquely contributes.

let canvasWidth = 800;
let drawHeight = 370;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Geometry (recalculated on resize)
let leftCx, rightCx, cy, radius;
let panelX, panelW;

// Selected region: null, 'left', 'both', 'right'
let selected = null;

const regions = {
  left: {
    label: 'Scientific Method Only',
    color: [70, 130, 180],   // SteelBlue
    items: [
      'Formulate a testable hypothesis',
      'Seek to explain natural phenomena',
      'Conduct controlled experiments',
      'Replicate results across independent labs'
    ]
  },
  both: {
    label: 'Shared Practices',
    color: [110, 110, 130],
    items: [
      'Systematic observation and measurement',
      'Iterate and refine based on evidence',
      'Apply mathematical reasoning',
      'Document and communicate findings'
    ]
  },
  right: {
    label: 'Engineering Design Process Only',
    color: [184, 134, 11],   // DarkGoldenrod
    items: [
      'Identify a need or design problem',
      'Define criteria, constraints, and tradeoffs',
      'Build and test physical prototypes',
      'Deliver a working solution to a client'
    ]
  }
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  describe(
    'Venn diagram showing Scientific Method and Engineering Design Process. ' +
    'Click the left, overlap, or right regions to see unique or shared practices.',
    LABEL
  );
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) canvasWidth = container.offsetWidth;
  leftCx  = canvasWidth * 0.21;
  rightCx = canvasWidth * 0.41;
  cy      = 185;
  radius  = min(120, canvasWidth * 0.15);
  panelX  = canvasWidth * 0.53;
  panelW  = canvasWidth * 0.44;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

// ── Draw ────────────────────────────────────────────────────────────────────
function draw() {
  updateCanvasSize();

  // Draw area
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  drawVenn();
  drawInfoPanel();
  drawControlLabel();
}

function drawVenn() {
  let overLeft = isInLeft(mouseX, mouseY);
  let overBoth = isInBoth(mouseX, mouseY);
  let overRight = isInRight(mouseX, mouseY);

  // Left circle (SteelBlue)
  let leftSel = (selected === 'left');
  let leftHov = (!selected && overLeft);
  fill(70, 130, 180, leftSel || leftHov ? 90 : 55);
  stroke(leftSel ? color(30, 90, 140) : (leftHov ? color(70, 130, 180) : color(150, 190, 220)));
  strokeWeight(leftSel ? 3 : 1.5);
  ellipse(leftCx, cy, radius * 2, radius * 2);

  // Right circle (DarkGoldenrod)
  let rightSel = (selected === 'right');
  let rightHov = (!selected && overRight);
  fill(184, 134, 11, rightSel || rightHov ? 90 : 55);
  stroke(rightSel ? color(140, 100, 0) : (rightHov ? color(184, 134, 11) : color(210, 180, 80)));
  strokeWeight(rightSel ? 3 : 1.5);
  ellipse(rightCx, cy, radius * 2, radius * 2);

  // Circle labels
  noStroke();
  fill(40, 80, 130);
  textSize(12);
  textAlign(CENTER, CENTER);
  text('Scientific\nMethod', leftCx - radius * 0.55, cy - radius * 0.6);

  fill(130, 90, 0);
  text('Engineering\nDesign\nProcess', rightCx + radius * 0.55, cy - radius * 0.65);

  // Overlap label "Both"
  let bothSel = (selected === 'both');
  let bothHov = (!selected && overBoth);
  noStroke();
  fill(bothSel || bothHov ? color(60, 60, 80) : color(80, 80, 90));
  textSize(11);
  textAlign(CENTER, CENTER);
  text('Both', (leftCx + rightCx) / 2, cy + radius * 0.55);

  // Hover cursor hint
  if (!selected && (overLeft || overBoth || overRight)) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }

  // Draw a subtle hover highlight for the "both" lens shape (just an outline)
  if (bothHov) {
    noFill();
    stroke(80, 80, 100, 120);
    strokeWeight(2);
    // Approximate the lens by drawing both circles with a tiny radius clip
    // Simpler: just shift the label color, already done above
  }
}

function drawInfoPanel() {
  let px = panelX, pw = panelW;
  let py = 20, ph = drawHeight - 36;

  // Panel background
  fill(248, 250, 255);
  stroke('silver');
  strokeWeight(1);
  rect(px, py, pw, ph, 6);

  if (!selected) {
    fill(150);
    textSize(13);
    textAlign(CENTER, CENTER);
    noStroke();
    text('← Click a region\nto see what belongs there', px + pw / 2, py + ph / 2);
    return;
  }

  let r = regions[selected];
  let col = r.color;

  // Header bar
  fill(col[0], col[1], col[2]);
  noStroke();
  rect(px, py, pw, 32, 6, 6, 0, 0);
  fill('white');
  textSize(12);
  textAlign(CENTER, CENTER);
  noStroke();
  text(r.label, px + pw / 2, py + 16);

  // Bullet list
  fill(30);
  textSize(12);
  textAlign(LEFT, TOP);
  noStroke();
  let itemY = py + 42;
  for (let item of r.items) {
    fill(col[0], col[1], col[2]);
    noStroke();
    circle(px + 14, itemY + 7, 7);
    fill(30);
    noStroke();
    drawWrapped(item, px + 24, itemY, pw - 30, 12, 36);
    itemY += 44;
  }
}

function drawControlLabel() {
  fill(70);
  textSize(11);
  textAlign(CENTER, CENTER);
  noStroke();
  text(
    'Click any circle region to explore what each discipline uniquely contributes',
    canvasWidth / 2, drawHeight + 25
  );
}

// ── Interaction ─────────────────────────────────────────────────────────────
function mousePressed() {
  if (mouseY >= drawHeight) return;
  let hit = getRegionAt(mouseX, mouseY);
  selected = (selected === hit) ? null : hit;
}

function getRegionAt(x, y) {
  if (y >= drawHeight) return null;
  let inL = dist(x, y, leftCx, cy)  < radius;
  let inR = dist(x, y, rightCx, cy) < radius;
  if (inL && inR) return 'both';
  if (inL) return 'left';
  if (inR) return 'right';
  return null;
}

function isInLeft(x, y)  { return dist(x, y, leftCx, cy) < radius && dist(x, y, rightCx, cy) >= radius; }
function isInRight(x, y) { return dist(x, y, rightCx, cy) < radius && dist(x, y, leftCx, cy) >= radius; }
function isInBoth(x, y)  { return dist(x, y, leftCx, cy) < radius && dist(x, y, rightCx, cy) < radius; }

// ── Helper ───────────────────────────────────────────────────────────────────
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
