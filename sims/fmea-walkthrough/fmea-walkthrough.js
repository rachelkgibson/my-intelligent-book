// FMEA Step-by-Step Walkthrough MicroSim
// CANVAS_HEIGHT: 542
// Students step through a 5-stage FMEA process for a solar-powered water pump.

let canvasWidth = 800;
let drawHeight  = 490;
let controlHeight = 50;
let canvasHeight  = drawHeight + controlHeight;

let currentStage = 0;
const NUM_STAGES = 5;

const STAGE_TITLES = [
  "What is FMEA?",
  "Step 1: List Components",
  "Step 2: Identify Failure Modes",
  "Step 3: Assess Effects",
  "Step 4: Calculate RPN",
];

// Stage 4 RPN sliders
let severitySlider, occurrenceSlider;
const DETECTABILITY = 3; // fixed

let prevBtn, nextBtn;

// Table data
const COMPONENTS  = ["Solar Panel", "Water Pump", "Control Circuit", "Storage Tank"];
const FAIL_MODES  = ["Cracked glass", "Impeller worn", "Short circuit", "Leak at seal"];
const EFFECTS     = ["Reduced power output", "No water flow", "System shutdown", "Water loss"];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  prevBtn = createButton('← Previous');
  prevBtn.parent(document.querySelector('main'));
  prevBtn.position(8, drawHeight + 13);
  prevBtn.mousePressed(() => { if (currentStage > 0) { currentStage--; syncSliders(); } });

  nextBtn = createButton('Next →');
  nextBtn.parent(document.querySelector('main'));
  nextBtn.position(110, drawHeight + 13);
  nextBtn.mousePressed(() => { if (currentStage < NUM_STAGES - 1) { currentStage++; syncSliders(); } });

  severitySlider   = createSlider(1, 10, 7);
  occurrenceSlider = createSlider(1, 10, 5);

  for (let sl of [severitySlider, occurrenceSlider]) {
    sl.parent(document.querySelector('main'));
    sl.style('width', '200px');
  }
  positionSliders();
  syncSliders();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) canvasWidth = container.offsetWidth;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionSliders();
  nextBtn.position(110, drawHeight + 13);
  prevBtn.position(8,   drawHeight + 13);
}

function positionSliders() {
  let sliderX = floor(canvasWidth * 0.30) + 120;
  severitySlider.position(sliderX,       250);
  occurrenceSlider.position(sliderX,     310);
}

function syncSliders() {
  let show = (currentStage === 4);
  severitySlider.style('display',   show ? 'inline-block' : 'none');
  occurrenceSlider.style('display', show ? 'inline-block' : 'none');
}

// ── helpers ───────────────────────────────────────────────────────────────────
function drawWrapped(str, x, y, maxW, sz, maxH) {
  textSize(sz);
  let lh = sz + 3, words = str.split(' '), line = '', curY = y;
  for (let w of words) {
    let test = line ? line + ' ' + w : w;
    if (textWidth(test) > maxW && line) {
      if (curY + lh > y + maxH) { text(line + '…', x, curY); return; }
      text(line, x, curY);
      line = w; curY += lh;
    } else line = test;
  }
  if (line && curY <= y + maxH) text(line, x, curY);
}

function drawCell(x, y, w, h, txt, bg, fg) {
  fill(bg); stroke(180); strokeWeight(1);
  rect(x, y, w, h);
  fill(fg); textSize(11); textAlign(CENTER, CENTER); noStroke();
  text(txt, x + w/2, y + h/2);
}

// ── draw ─────────────────────────────────────────────────────────────────────
function draw() {
  updateCanvasSize();

  fill('aliceblue'); stroke('silver'); strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  fill('white'); stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  drawStageHeader();
  drawStageContent();
  drawNavBar();
}

function drawStageHeader() {
  fill(30, 80, 160); noStroke();
  rect(0, 0, canvasWidth, 38);
  fill(255); textSize(15); textAlign(LEFT, CENTER); noStroke();
  text('Stage ' + (currentStage + 1) + ' of ' + NUM_STAGES + ' — ' + STAGE_TITLES[currentStage],
       14, 19);
  // Progress dots
  for (let i = 0; i < NUM_STAGES; i++) {
    fill(i <= currentStage ? color(255, 200, 50) : color(255,255,255,80));
    noStroke(); circle(canvasWidth - 20 - (NUM_STAGES - 1 - i) * 18, 19, 10);
  }
}

function drawStageContent() {
  let cw = canvasWidth;
  switch (currentStage) {
    case 0: drawStage0(cw); break;
    case 1: drawStage1(cw); break;
    case 2: drawStage2(cw); break;
    case 3: drawStage3(cw); break;
    case 4: drawStage4(cw); break;
  }
}

function drawStage0(cw) {
  fill(30); textSize(13); textAlign(LEFT, TOP); noStroke();
  drawWrapped(
    "Failure Mode and Effects Analysis (FMEA) is a systematic method for identifying " +
    "ways a system, process, or product might fail — and prioritizing those risks before " +
    "they cause harm.",
    14, 52, cw - 28, 13, 60
  );
  fill(30); textSize(12); noStroke();
  text("The process follows four steps:", 14, 120);

  let steps = [
    "1. List every component of your design",
    "2. For each component, identify failure modes (what could go wrong?)",
    "3. Assess the effects of each failure on the overall system",
    "4. Calculate a Risk Priority Number (RPN) to rank which failures matter most",
  ];
  for (let i = 0; i < steps.length; i++) {
    fill(i === 0 ? color(30,80,160) :
         i === 1 ? color(180,100,0) :
         i === 2 ? color(60,140,60) :
                   color(150,40,40));
    noStroke(); textSize(12); textAlign(LEFT, TOP);
    text(steps[i], 22, 148 + i * 26);
  }

  // Mini table preview
  let ty = 260, tw = cw - 80, tx = 40;
  let cols = ['Component', 'Failure Mode', 'Effect', 'RPN'];
  let cws  = [tw*0.28, tw*0.28, tw*0.28, tw*0.16];
  let cx = tx;
  for (let i = 0; i < cols.length; i++) {
    drawCell(cx, ty, cws[i], 30, cols[i], color(30, 80, 160), 255);
    cx += cws[i];
  }
  // Sample row
  let sr = ['Solar Panel', 'Cracked glass', 'Reduced power', '105'];
  cx = tx;
  for (let i = 0; i < sr.length; i++) {
    drawCell(cx, ty + 30, cws[i], 28, sr[i], 245, 30);
    cx += cws[i];
  }
  fill(120); textSize(10); textAlign(LEFT, TOP); noStroke();
  text('← example FMEA table (you will fill this in across all steps)', tx, ty + 64);
}

function drawStage1(cw) {
  fill(30); textSize(13); textAlign(LEFT, TOP); noStroke();
  text("Identify every major component in your design.", 14, 52);
  fill(80); textSize(11);
  text("Example system: a solar-powered water pump for an agricultural irrigation project.", 14, 74);

  let bx = 60, by = 105, bw = cw - 120, bh = 50, gap = 14;
  let colors = [color(30,80,160), color(60,140,60), color(180,80,0), color(140,60,160)];
  for (let i = 0; i < COMPONENTS.length; i++) {
    fill(colors[i]); noStroke();
    rect(bx, by + i * (bh + gap), bw, bh, 8);
    fill(255); textSize(14); textAlign(CENTER, CENTER); noStroke();
    text(COMPONENTS[i], bx + bw/2, by + i * (bh + gap) + bh/2);
  }
}

function drawStage2(cw) {
  fill(30); textSize(13); textAlign(LEFT, TOP); noStroke();
  text("For each component, ask: 'How could this fail?'", 14, 52);

  let ty = 90, tw = cw - 60, tx = 30;
  let h1w = tw * 0.45, h2w = tw * 0.45, arW = tw * 0.10;

  drawCell(tx,       ty, h1w, 28, 'Component',   color(30,80,160), 255);
  drawCell(tx+h1w+arW, ty, h2w, 28, 'Failure Mode', color(180,80,0),  255);

  let colors = [color(30,80,160), color(60,140,60), color(180,80,0), color(140,60,160)];
  for (let i = 0; i < COMPONENTS.length; i++) {
    let ry = ty + 28 + i * 52;
    drawCell(tx,         ry, h1w, 46, COMPONENTS[i], colors[i], 255);
    drawCell(tx+h1w+arW, ry, h2w, 46, FAIL_MODES[i], 245,       30);
    // Arrow
    fill(150); noStroke();
    let ax = tx + h1w + 4, ay = ry + 23;
    triangle(ax, ay-6, ax, ay+6, ax+arW-4, ay);
  }
}

function drawStage3(cw) {
  fill(30); textSize(13); textAlign(LEFT, TOP); noStroke();
  text("For each failure mode, what is the impact on the system?", 14, 52);

  let ty = 90, tw = cw - 40, tx = 20;
  let c1 = tw * 0.32, c2 = tw * 0.32, c3 = tw * 0.36;

  drawCell(tx,    ty, c1, 28, 'Component',    color(30,80,160),  255);
  drawCell(tx+c1, ty, c2, 28, 'Failure Mode', color(180,80,0),   255);
  drawCell(tx+c1+c2, ty, c3, 28, 'System Effect', color(60,140,60), 255);

  let bc = [color(30,80,160), color(60,140,60), color(180,80,0), color(140,60,160)];
  for (let i = 0; i < COMPONENTS.length; i++) {
    let ry = ty + 28 + i * 52;
    drawCell(tx,         ry, c1, 46, COMPONENTS[i], bc[i], 255);
    drawCell(tx+c1,      ry, c2, 46, FAIL_MODES[i], 245, 30);
    let sev = i === 1 ? color(200,60,60,40) : i === 2 ? color(200,60,60,40) : color(245);
    drawCell(tx+c1+c2,   ry, c3, 46, EFFECTS[i],    sev,  30);
  }
  fill(80); textSize(11); textAlign(LEFT, TOP); noStroke();
  text("Red-tinted effects indicate high severity — failure stops the system entirely.", 20, ty + 240);
}

function drawStage4(cw) {
  fill(30); textSize(13); textAlign(LEFT, TOP); noStroke();
  text("Risk Priority Number (RPN) = Severity × Occurrence × Detectability", 14, 52);

  let sv = severitySlider.value();
  let oc = occurrenceSlider.value();
  let rpn = sv * oc * DETECTABILITY;

  // Labels next to sliders
  fill(50); textSize(12); textAlign(LEFT, CENTER); noStroke();
  let sliderX = floor(cw * 0.30) + 120;
  text('Severity:   ' + sv,    14, 260);
  text('Occurrence: ' + oc,   14, 320);
  text('Detectability: ' + DETECTABILITY + ' (fixed)', 14, 380);

  // RPN box
  let rpnColor = rpn < 50  ? color(40, 160, 40) :
                 rpn <= 100 ? color(200, 150, 0) :
                              color(200, 50,  50);
  fill(rpnColor); noStroke();
  rect(14, 415, cw - 28, 60, 8);
  fill(255); textSize(28); textAlign(CENTER, CENTER); noStroke();
  text('RPN = ' + sv + ' × ' + oc + ' × ' + DETECTABILITY + ' = ' + rpn,
       cw/2, 445);

  // Risk level label
  let riskLabel = rpn < 50  ? 'LOW RISK — Monitor only' :
                  rpn <= 100 ? 'MODERATE — Plan a response' :
                               'HIGH RISK — Active mitigation required';
  fill(255); textSize(13); textAlign(CENTER, CENTER); noStroke();
  text(riskLabel, cw/2, 468);

  // Key
  fill(40); textSize(11); textAlign(LEFT, TOP); noStroke();
  text('RPN < 50: low (green)   50–100: moderate (yellow)   > 100: high (red)', 14, 82);
}

function drawNavBar() {
  fill(70); textSize(11); textAlign(CENTER, CENTER); noStroke();
  text('Stage ' + (currentStage + 1) + ' of ' + NUM_STAGES + '  |  Use ← Previous and Next → to step through the process',
       canvasWidth/2 + 80, drawHeight + 25);
}
