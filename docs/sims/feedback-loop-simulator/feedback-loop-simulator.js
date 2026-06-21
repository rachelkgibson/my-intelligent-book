// Feedback Loop Simulator MicroSim
// CANVAS_HEIGHT: 502
// Simulates a project budget system with balancing and reinforcing feedback loops.
// Adjust sliders to see how correction strength affects budget trajectory.

let canvasWidth = 800;
let drawHeight = 420;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;

const WEEKS = 20;
const INITIAL_BUDGET = 10000;
const WARN_THRESHOLD = 3000;
const MAX_BUDGET = 12000;

let sliderSpend, sliderCorrect;
let budgetHistory = [];   // array of WEEKS+1 values

// Panel layout
let leftW;   // width of left state panel
let chartX, chartW;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  sliderSpend = createSlider(100, 1000, 400, 50);
  sliderSpend.parent(document.querySelector('main'));

  sliderCorrect = createSlider(0, 100, 30, 5);  // stored as 0-100, used as 0.0-1.0
  sliderCorrect.parent(document.querySelector('main'));

  positionSliders();
  simulate();

  describe(
    'Budget feedback loop simulator. Two sliders control spending rate and ' +
    'correction strength. The right panel shows budget trajectory over 20 weeks. ' +
    'A dashed line marks the warning threshold at $3,000.',
    LABEL
  );
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) canvasWidth = container.offsetWidth;
  leftW  = floor(canvasWidth * 0.34);
  chartX = leftW + 10;
  chartW = canvasWidth - chartX - 10;
}

function positionSliders() {
  let spendY  = drawHeight + 12;
  let correctY = drawHeight + 46;
  sliderSpend.position(110, spendY);
  sliderSpend.style('width', '160px');
  sliderCorrect.position(110, correctY);
  sliderCorrect.style('width', '160px');
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionSliders();
}

function simulate() {
  let spendRate   = sliderSpend.value();
  let correction  = sliderCorrect.value() / 100.0;
  let budget = INITIAL_BUDGET;
  budgetHistory = [budget];
  for (let w = 0; w < WEEKS; w++) {
    let factor = max(0, (WARN_THRESHOLD - budget) / WARN_THRESHOLD);
    let actual = spendRate * (1 - correction * factor);
    budget = max(0, budget - actual);
    budgetHistory.push(budget);
  }
}

// ── Draw ─────────────────────────────────────────────────────────────────────
function draw() {
  updateCanvasSize();
  simulate();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  drawLeftPanel();
  drawChart();
  drawControlArea();
}

function drawLeftPanel() {
  let correction = sliderCorrect.value() / 100.0;
  let currentBudget = budgetHistory[budgetHistory.length - 1];
  let loopType = correction > 0.1 ? 'Balancing' : 'Reinforcing';
  let loopColor = correction > 0.1 ? color(40, 150, 60) : color(190, 60, 60);

  // Background
  fill(240, 245, 255);
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, leftW, drawHeight);

  // Header
  fill(50, 80, 140);
  noStroke();
  rect(0, 0, leftW, 26);
  fill('white');
  textSize(12);
  textAlign(CENTER, CENTER);
  noStroke();
  text('CURRENT STATE', leftW / 2, 13);

  // Final week budget (large display)
  let budgetColor = currentBudget > 5000 ? color(30, 140, 50) :
                    currentBudget > 1000 ? color(180, 130, 0) : color(180, 40, 40);
  fill(budgetColor);
  textSize(22);
  textAlign(CENTER, TOP);
  noStroke();
  text('$' + nfc(round(currentBudget), 0), leftW / 2, 36);

  fill(90);
  textSize(10);
  textAlign(CENTER, TOP);
  noStroke();
  text('remaining after 20 weeks', leftW / 2, 62);

  // Spending Rate value
  fill(50);
  textSize(11);
  textAlign(LEFT, TOP);
  noStroke();
  text('Spending Rate: $' + sliderSpend.value() + '/wk', 8, 88);
  text('Correction Strength: ' + (correction * 100).toFixed(0) + '%', 8, 140);

  // Loop type label
  fill(loopColor);
  textSize(12);
  textAlign(LEFT, TOP);
  noStroke();
  text('Loop type: ' + loopType, 8, 195);

  fill(80);
  textSize(9);
  noStroke();
  text(correction > 0.1
    ? 'Manager cuts spending when budget drops\nbelow warning threshold.'
    : 'Spending continues unchecked —\nno corrective action taken.',
    8, 212
  );

  // Divider
  stroke('silver');
  strokeWeight(1);
  line(leftW, 0, leftW, drawHeight);
}

function drawChart() {
  let padL = 50, padR = 14, padT = 28, padB = 30;
  let cX = chartX + padL;
  let cY = padT;
  let cW = chartW - padL - padR;
  let cH = drawHeight - padT - padB;

  // Chart background
  fill(255);
  stroke('silver');
  strokeWeight(1);
  rect(chartX + padL - 2, padT - 2, cW + 4, cH + 4);

  // Title
  fill(50);
  textSize(11);
  textAlign(CENTER, TOP);
  noStroke();
  text('Budget Remaining Over 20 Weeks', chartX + chartW / 2, 6);

  // Grid lines + Y axis labels
  let ySteps = [0, 3000, 6000, 9000, 12000];
  for (let val of ySteps) {
    let py = cY + cH - (val / MAX_BUDGET) * cH;
    stroke(220);
    strokeWeight(1);
    line(cX, py, cX + cW, py);
    fill(90);
    textSize(9);
    textAlign(RIGHT, CENTER);
    noStroke();
    text('$' + (val / 1000) + 'k', cX - 4, py);
  }

  // X axis labels
  for (let w = 0; w <= WEEKS; w += 4) {
    let px = cX + (w / WEEKS) * cW;
    fill(90);
    textSize(9);
    textAlign(CENTER, TOP);
    noStroke();
    text(w, px, cY + cH + 3);
    stroke(230);
    strokeWeight(1);
    line(px, cY, px, cY + cH);
  }

  // X axis label
  fill(80);
  textSize(10);
  textAlign(CENTER, TOP);
  noStroke();
  text('Weeks', cX + cW / 2, cY + cH + 16);

  // Warning threshold dashed line
  let warnY = cY + cH - (WARN_THRESHOLD / MAX_BUDGET) * cH;
  stroke(200, 60, 60);
  strokeWeight(1);
  drawingContext.setLineDash([5, 4]);
  line(cX, warnY, cX + cW, warnY);
  drawingContext.setLineDash([]);
  fill(200, 60, 60);
  textSize(9);
  textAlign(LEFT, BOTTOM);
  noStroke();
  text('Warning ($3k)', cX + 3, warnY - 2);

  // Budget line
  strokeWeight(2.5);
  for (let i = 0; i < budgetHistory.length - 1; i++) {
    let x1 = cX + (i / WEEKS) * cW;
    let y1 = cY + cH - (budgetHistory[i] / MAX_BUDGET) * cH;
    let x2 = cX + ((i + 1) / WEEKS) * cW;
    let y2 = cY + cH - (budgetHistory[i + 1] / MAX_BUDGET) * cH;
    let aboveWarn = budgetHistory[i] >= WARN_THRESHOLD;
    stroke(aboveWarn ? color(40, 160, 60) : color(200, 60, 60));
    noFill();
    line(x1, y1, x2, y2);
  }

  // Dot at end
  let lastX = cX + cW;
  let lastY = cY + cH - (budgetHistory[WEEKS] / MAX_BUDGET) * cH;
  let aboveLast = budgetHistory[WEEKS] >= WARN_THRESHOLD;
  fill(aboveLast ? color(40, 160, 60) : color(200, 60, 60));
  noStroke();
  circle(lastX, lastY, 8);
}

function drawControlArea() {
  // Slider labels
  fill(60);
  textSize(11);
  textAlign(RIGHT, CENTER);
  noStroke();
  text('Spending Rate', 108, drawHeight + 22);
  text('Correction', 108, drawHeight + 58);

  // Value readouts
  fill(50, 80, 140);
  textSize(11);
  textAlign(LEFT, CENTER);
  noStroke();
  text('$' + sliderSpend.value() + '/wk', 278, drawHeight + 22);
  text((sliderCorrect.value()) + '%', 278, drawHeight + 58);

  // Instruction hint
  fill(100);
  textSize(10);
  textAlign(RIGHT, CENTER);
  noStroke();
  text('Adjust sliders to see how feedback changes the budget trajectory',
    canvasWidth - 10, drawHeight + 40);
}
