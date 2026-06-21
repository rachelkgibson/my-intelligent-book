// Presentation Planning and Timing Tool MicroSim
// CANVAS_HEIGHT: 522
// Six sliders allocate time to presentation sections; a stacked bar shows the plan.
// A dashed line marks the time limit. Feedback updates when totals change.

let canvasWidth = 800;
let drawHeight = 470;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

let leftW, rightX, rightW;

// Section definitions
const sections = [
  { name: 'Hook',              color: 'crimson',      def: 0.5, slider: null },
  { name: 'Problem Statement', color: 'darkorange',   def: 1.5, slider: null },
  { name: 'Design Process',    color: 'steelblue',    def: 2.0, slider: null },
  { name: 'Results',           color: 'forestgreen',  def: 2.0, slider: null },
  { name: 'Reflection',        color: 'mediumpurple', def: 1.5, slider: null },
  { name: 'Q&A',               color: 'teal',         def: 2.5, slider: null }
];

let limitSlider = null;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create 6 section sliders + 1 limit slider
  for (let s of sections) {
    s.slider = createSlider(0, 5, s.def, 0.5);
    s.slider.parent(document.querySelector('main'));
    s.slider.style('width', floor(leftW * 0.68) + 'px');
  }
  limitSlider = createSlider(5, 15, 10, 0.5);
  limitSlider.parent(document.querySelector('main'));
  limitSlider.style('width', floor(leftW * 0.68) + 'px');

  positionSliders();

  describe(
    'Presentation Planner: adjust time sliders for each presentation section. ' +
    'The stacked bar on the right shows your plan. ' +
    'The dashed line is the time limit. Feedback tells you if you are over.',
    LABEL
  );
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) canvasWidth = container.offsetWidth;
  leftW  = floor(canvasWidth * 0.42);
  rightX = leftW + 1;
  rightW = canvasWidth - rightX - 2;
}

function positionSliders() {
  const sliderW = floor(leftW * 0.68);
  const col2X   = floor(leftW * 0.32) + 4;  // slider starts after the label
  const rowH    = 30;
  const startY  = 70;

  for (let i = 0; i < sections.length; i++) {
    sections[i].slider.position(col2X, startY + i * rowH);
    sections[i].slider.style('width', sliderW + 'px');
  }
  // Time limit slider
  limitSlider.position(col2X, startY + sections.length * rowH + 20);
  limitSlider.style('width', sliderW + 'px');
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionSliders();
}

// ─── Main draw ────────────────────────────────────────────────────────────────
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

  drawLeftPanel();
  drawRightPanel();
  drawControlArea();
}

// ─── Left panel ───────────────────────────────────────────────────────────────
function drawLeftPanel() {
  // Header
  fill(50, 90, 160);
  noStroke();
  rect(0, 0, leftW, 28);
  fill('white');
  textSize(12);
  textAlign(CENTER, CENTER);
  noStroke();
  text('SECTION TIME ALLOCATION', leftW / 2, 14);

  // Column headers
  fill(80);
  textSize(10);
  textAlign(LEFT, TOP);
  noStroke();
  text('Section', 4, 34);
  text('min', leftW * 0.32 + 4, 34);
  text('val', leftW - 32, 34);

  const rowH = 30;
  const startY = 68;

  let total = 0;
  for (let i = 0; i < sections.length; i++) {
    let val = sections[i].slider ? sections[i].slider.value() : sections[i].def;
    total += val;

    let y = startY + i * rowH;

    // Color swatch
    fill(sections[i].color);
    noStroke();
    rect(4, y + 4, 10, 14, 2);

    // Section name
    fill(40);
    textSize(10);
    textAlign(LEFT, CENTER);
    noStroke();
    text(sections[i].name, 18, y + rowH / 2 - 2);

    // Value display
    fill(40);
    textSize(10);
    textAlign(RIGHT, CENTER);
    noStroke();
    text(nf(val, 1, 1) + ' min', leftW - 8, y + rowH / 2 - 2);
  }

  // Time limit
  let limit = limitSlider ? limitSlider.value() : 10;
  let limitY = startY + sections.length * rowH + 16;

  fill(120);
  stroke(silver);
  strokeWeight(0.5);
  line(4, limitY - 4, leftW - 8, limitY - 4);
  noStroke();
  textSize(10);
  textAlign(LEFT, CENTER);
  fill(80);
  text('Time Limit:', 4, limitY + 14);
  textAlign(RIGHT, CENTER);
  text(nf(limit, 1, 1) + ' min', leftW - 8, limitY + 14);

  // Total line
  let totalY = limitY + 40;
  let overLimit = total > limit;
  fill(overLimit ? color(190, 50, 50) : color(34, 139, 34));
  noStroke();
  textSize(13);
  textAlign(LEFT, TOP);
  text('Total: ' + nf(total, 1, 1) + ' min', 4, totalY);
  if (overLimit) {
    textSize(10);
    fill(190, 50, 50);
    text('Over by ' + nf(total - limit, 1, 1) + ' min', 4, totalY + 18);
  } else {
    textSize(10);
    fill(34, 100, 34);
    text('Within limit ✓', 4, totalY + 18);
  }
}

// ─── Right panel ──────────────────────────────────────────────────────────────
function drawRightPanel() {
  let limit = limitSlider ? limitSlider.value() : 10;
  let vals  = sections.map(s => s.slider ? s.slider.value() : s.def);
  let total = vals.reduce((a, b) => a + b, 0);

  // Header
  fill(80, 80, 80);
  noStroke();
  rect(rightX, 0, rightW, 28);
  fill('white');
  textSize(12);
  textAlign(CENTER, CENTER);
  noStroke();
  text('PRESENTATION TIMELINE', rightX + rightW / 2, 14);

  // Stacked bar
  const barY  = 50;
  const barH  = 40;
  const barX  = rightX + 10;
  const barW  = rightW - 20;

  // Axis scale: use max(total, limit) to ensure limit line is always visible
  let scale = max(total, limit);

  // Draw stacked bar segments
  let curX = barX;
  for (let i = 0; i < sections.length; i++) {
    let segW = (vals[i] / scale) * barW;
    if (segW < 1) continue;
    fill(sections[i].color);
    noStroke();
    rect(curX, barY, segW, barH);

    // Label inside segment if wide enough
    if (segW > 24) {
      fill('white');
      textSize(8);
      textAlign(CENTER, CENTER);
      noStroke();
      text(nf(vals[i], 1, 1), curX + segW / 2, barY + barH / 2);
    }
    curX += segW;
  }

  // Excess portion (if over limit)
  let limitX = barX + (limit / scale) * barW;

  // Border
  noFill();
  stroke(100);
  strokeWeight(1);
  rect(barX, barY, barW, barH);

  // Time limit dashed line
  stroke(200, 50, 50);
  strokeWeight(2);
  drawingContext.setLineDash([5, 3]);
  line(limitX, barY - 10, limitX, barY + barH + 10);
  drawingContext.setLineDash([]);
  fill(200, 50, 50);
  textSize(9);
  textAlign(CENTER, TOP);
  noStroke();
  text('Limit\n' + nf(limit, 1, 1) + ' min', limitX, barY + barH + 4);

  // X-axis minute marks
  fill(100);
  textSize(8);
  textAlign(CENTER, TOP);
  noStroke();
  for (let m = 0; m <= scale; m += 2) {
    let mx = barX + (m / scale) * barW;
    stroke(200);
    strokeWeight(0.5);
    line(mx, barY + barH, mx, barY + barH + 5);
    noStroke();
    text(m + 'm', mx, barY + barH + 18);
  }

  // Legend
  let legY = barY + barH + 42;
  let legX = rightX + 8;
  let legCols = 3;
  for (let i = 0; i < sections.length; i++) {
    let col = i % legCols;
    let row = floor(i / legCols);
    let lx = legX + col * floor(rightW / legCols);
    let ly = legY + row * 16;

    fill(sections[i].color);
    noStroke();
    rect(lx, ly + 2, 10, 10, 2);

    fill(50);
    textSize(9);
    textAlign(LEFT, TOP);
    noStroke();
    text(sections[i].name + ' (' + nf(vals[i], 1, 1) + 'm)', lx + 13, ly);
  }

  // Feedback
  let feedY = legY + floor(sections.length / legCols) * 16 + 20;
  drawFeedback(vals, total, limit, feedY);
}

function drawFeedback(vals, total, limit, feedY) {
  let overLimit = total > limit;
  let feedBg = overLimit ? color(255, 240, 240) : color(240, 255, 240);
  fill(feedBg);
  stroke(overLimit ? color(200, 100, 100) : color(100, 180, 100));
  strokeWeight(1);
  rect(rightX + 8, feedY, rightW - 16, drawHeight - feedY - 8, 6);

  let tx = rightX + 14;
  let ty = feedY + 8;

  if (overLimit) {
    fill(180, 40, 40);
    textSize(11);
    textAlign(LEFT, TOP);
    noStroke();
    text('⚠ Over limit by ' + nf(total - limit, 1, 1) + ' min — trim these sections:', tx, ty);
    ty += 16;
    // Find the two longest sections
    let sorted = sections.map((s, i) => ({ name: s.name, val: vals[i] }))
                         .sort((a, b) => b.val - a.val);
    for (let i = 0; i < min(3, sorted.length); i++) {
      fill(140, 30, 30);
      textSize(10);
      noStroke();
      text('• ' + sorted[i].name + ' (' + nf(sorted[i].val, 1, 1) + ' min)', tx + 4, ty);
      ty += 14;
    }
  } else {
    fill(30, 120, 30);
    textSize(11);
    textAlign(LEFT, TOP);
    noStroke();
    text('✓ Within time limit — good distribution', tx, ty);
    ty += 16;

    // Check if any single section dominates (> 40%)
    if (total > 0) {
      let dominant = sections.filter((s, i) => vals[i] / total > 0.40);
      if (dominant.length > 0) {
        fill(150, 100, 0);
        textSize(10);
        noStroke();
        for (let d of dominant) {
          text('Consider reducing "' + d.name + '" — it dominates your presentation', tx, ty);
          ty += 14;
        }
      } else {
        fill(80);
        textSize(10);
        noStroke();
        text('No single section dominates — well balanced!', tx, ty);
      }
    }
  }
}

// ─── Control area ─────────────────────────────────────────────────────────────
function drawControlArea() {
  fill(80);
  textSize(10);
  textAlign(CENTER, CENTER);
  noStroke();
  text(
    'Adjust section times with the sliders  ·  Red dashed line shows the time limit  ·  Stay within the limit to avoid being cut off',
    canvasWidth / 2, drawHeight + 25
  );
}
