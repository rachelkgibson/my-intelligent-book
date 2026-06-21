// Slide Quality Self-Check MicroSim
// CANVAS_HEIGHT: 522
// Students evaluate sample slides against 6 presentation quality criteria.
// Toggle Yes/Partial/No for each criterion and see a score with feedback.

let canvasWidth = 900;
let drawHeight = 470;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

let leftPanelW = 400;
let rightPanelX = 410;

let currentSlide = 0;
let scores = [0, 0, 0, 0, 0, 0]; // 0=unanswered, 1=No, 2=Partial, 3=Yes

let prevBtn, nextBtn, resetBtn;

const criteria = [
  { name: "One main idea", desc: "Communicates a single, clear point?" },
  { name: "Minimal text", desc: "6 or fewer bullets? Text concise?" },
  { name: "Readable font size", desc: "Body ≥24pt? Titles ≥32pt?" },
  { name: "Visual support", desc: "Chart, diagram, or image present?" },
  { name: "Clear title", desc: "Title tells audience what to conclude?" },
  { name: "No distracting elements", desc: "Decorations and clip art avoided?" }
];

const slideData = [
  { title: "Team Status Update - Week 7", color: color(30, 50, 130) },
  { title: "Results", color: color(0, 120, 130) },
  { title: "Our Project Schedule", color: color(34, 100, 34) }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  prevBtn = createButton('◀ Previous');
  prevBtn.parent(document.querySelector('main'));
  prevBtn.mousePressed(() => { currentSlide = (currentSlide + 2) % 3; scores = [0,0,0,0,0,0]; });

  nextBtn = createButton('Next ▶');
  nextBtn.parent(document.querySelector('main'));
  nextBtn.mousePressed(() => { currentSlide = (currentSlide + 1) % 3; scores = [0,0,0,0,0,0]; });

  resetBtn = createButton('Reset Scores');
  resetBtn.parent(document.querySelector('main'));
  resetBtn.mousePressed(() => { scores = [0,0,0,0,0,0]; });

  positionButtons();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) canvasWidth = container.offsetWidth;
  leftPanelW = min(400, floor(canvasWidth * 0.44));
  rightPanelX = leftPanelW + 10;
}

function positionButtons() {
  prevBtn.position(10, drawHeight - 44);
  nextBtn.position(leftPanelW - 90, drawHeight - 44);
  resetBtn.position(rightPanelX, drawHeight + 13);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionButtons();
}

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

  // Panel divider
  stroke('silver');
  line(leftPanelW, 0, leftPanelW, drawHeight);

  drawSlidePanel();
  drawCriteriaPanel();
  drawControlLabel();
}

function drawSlidePanel() {
  // Header
  fill(60, 60, 80);
  noStroke();
  rect(0, 0, leftPanelW, 28);
  fill('white');
  textSize(12);
  textAlign(CENTER, CENTER);
  noStroke();
  text('SAMPLE SLIDE ' + (currentSlide + 1) + ' of 3', leftPanelW / 2, 14);

  // Slide thumbnail area
  let sx = 12, sy = 34, sw = leftPanelW - 24, sh = 260;
  fill('white');
  stroke(100);
  strokeWeight(1.5);
  rect(sx, sy, sw, sh, 3);

  // Draw the slide contents
  if (currentSlide === 0) drawSlide1(sx, sy, sw, sh);
  else if (currentSlide === 1) drawSlide2(sx, sy, sw, sh);
  else drawSlide3(sx, sy, sw, sh);

  // Slide label below thumbnail
  noStroke();
  fill(80);
  textSize(10);
  textAlign(CENTER, TOP);
  text('"' + slideData[currentSlide].title + '"', leftPanelW / 2, sy + sh + 5);

  // Slide indicator dots
  for (let i = 0; i < 3; i++) {
    fill(i === currentSlide ? color(60, 60, 180) : color(190));
    noStroke();
    circle(leftPanelW / 2 - 18 + i * 18, sy + sh + 22, 8);
  }
}

function drawSlide1(sx, sy, sw, sh) {
  // Title bar: dark blue, too-long title
  fill(slideData[0].color);
  noStroke();
  rect(sx, sy, sw, 28);
  fill('white');
  textSize(9);
  textAlign(LEFT, CENTER);
  noStroke();
  text('Team Status Update — Week 7 | Q3 Progress', sx + 6, sy + 14);

  // 8 small bullet points
  fill(30);
  textSize(8);
  textAlign(LEFT, TOP);
  noStroke();
  const bullets = [
    '• Completed 3 of 5 planned tasks this week',
    '• Budget: $127 spent of $200 allocated',
    '• Team meeting held on Tuesday, 45 min',
    '• Encountered issue with sensor calibration',
    '• Rescheduled prototype demo to next Friday',
    '• Need to order 2 more parts from supplier',
    '• Documentation updated in shared drive folder',
    '• Attendance: 4/5 members present all week'
  ];
  for (let i = 0; i < bullets.length; i++) {
    text(bullets[i], sx + 8, sy + 34 + i * 26);
  }
}

function drawSlide2(sx, sy, sw, sh) {
  // Title bar: teal, short vague title
  fill(slideData[1].color);
  noStroke();
  rect(sx, sy, sw, 28);
  fill('white');
  textSize(11);
  textAlign(LEFT, CENTER);
  noStroke();
  text('Results', sx + 6, sy + 14);

  // Chart placeholder
  fill(220);
  stroke(160);
  strokeWeight(1);
  rect(sx + 10, sy + 34, sw - 20, 130, 2);
  fill(120);
  textSize(14);
  textAlign(CENTER, CENTER);
  noStroke();
  text('CHART', sx + sw / 2, sy + 34 + 65);

  // 2 bullets
  fill(30);
  textSize(9);
  textAlign(LEFT, TOP);
  noStroke();
  text('• Filtration efficiency improved by 12%', sx + 8, sy + 174);
  text('• Cost per unit reduced to $8.40', sx + 8, sy + 192);
}

function drawSlide3(sx, sy, sw, sh) {
  // Title bar: forest green
  fill(slideData[2].color);
  noStroke();
  rect(sx, sy, sw, 28);
  fill('white');
  textSize(10);
  textAlign(LEFT, CENTER);
  noStroke();
  text('Our Project Schedule', sx + 6, sy + 14);

  // Color-coded table rows
  const rowColors = [color(70, 130, 180), color(255, 165, 0), color(34, 139, 34), color(200, 80, 80), color(140, 90, 200)];
  const rowLabels = ['Research', 'Design', 'Build', 'Test', 'Present'];
  for (let i = 0; i < 5; i++) {
    fill(rowColors[i]);
    noStroke();
    rect(sx + 6, sy + 34 + i * 22, sw - 60, 18, 2);
    fill('white');
    textSize(8);
    textAlign(LEFT, CENTER);
    noStroke();
    text(rowLabels[i] + ' — Wks ' + (i * 2 + 1) + '–' + (i * 2 + 2), sx + 10, sy + 34 + i * 22 + 9);
  }

  // Decorative smiley clipart box (corner)
  fill(255, 240, 100);
  stroke(180);
  strokeWeight(1);
  rect(sx + sw - 52, sy + 34, 44, 40, 3);
  fill(50);
  textSize(20);
  textAlign(CENTER, CENTER);
  noStroke();
  text('☺', sx + sw - 52 + 22, sy + 54);
}

function drawCriteriaPanel() {
  let rx = rightPanelX;
  let rw = canvasWidth - rx;

  // Header
  fill(80, 50, 120);
  noStroke();
  rect(rx, 0, rw, 28);
  fill('white');
  textSize(12);
  textAlign(CENTER, CENTER);
  noStroke();
  text('QUALITY CRITERIA', rx + rw / 2, 14);

  // Score
  let total = calcScore();
  let scored = scores.filter(s => s > 0).length;
  let scoreColor = total >= 10 ? color(30, 130, 30) : total >= 6 ? color(180, 130, 0) : color(170, 40, 40);
  fill(scoreColor);
  textSize(16);
  textAlign(CENTER, TOP);
  noStroke();
  text('Score: ' + total + ' / 12', rx + rw / 2, 33);

  let feedback = '';
  if (scored < 6) feedback = 'Score all 6 criteria below';
  else if (total >= 10) feedback = 'Strong slide — clear and focused';
  else if (total >= 6) feedback = 'Good start — address red or yellow criteria';
  else feedback = 'Needs revision — too much content or missing visuals';

  fill(80);
  textSize(9);
  textAlign(CENTER, TOP);
  noStroke();
  text(feedback, rx + rw / 2, 54);

  // Criteria rows
  let rowH = 62;
  let startY = 68;
  for (let i = 0; i < criteria.length; i++) {
    let y = startY + i * rowH;

    // Row background
    fill(i % 2 === 0 ? color(245, 248, 255) : 'white');
    stroke('silver');
    strokeWeight(0.5);
    rect(rx + 2, y, rw - 4, rowH - 2, 3);

    // Criterion name
    fill(30);
    textSize(11);
    textAlign(LEFT, TOP);
    noStroke();
    text(criteria[i].name, rx + 6, y + 5);

    // Description
    fill(100);
    textSize(9);
    noStroke();
    text(criteria[i].desc, rx + 6, y + 20);

    // Toggle buttons: No / Partial / Yes
    let btnLabels = ['No', 'Partial', 'Yes'];
    let btnCols = [color(200, 60, 60), color(200, 160, 0), color(40, 150, 40)];
    let btnValues = [1, 2, 3];
    let btnW = floor((rw - 20) / 3);
    for (let b = 0; b < 3; b++) {
      let bx = rx + 6 + b * btnW;
      let by = y + 36;
      let bh = 20;
      let active = scores[i] === btnValues[b];
      fill(active ? btnCols[b] : lerpColor(btnCols[b], color(255), 0.65));
      stroke(active ? btnCols[b] : color(180));
      strokeWeight(1);
      rect(bx, by, btnW - 4, bh, 3);
      fill(active ? 'white' : 60);
      textSize(10);
      textAlign(CENTER, CENTER);
      noStroke();
      text(btnLabels[b], bx + (btnW - 4) / 2, by + bh / 2);
    }
  }
}

function drawControlLabel() {
  fill(80);
  textSize(10);
  textAlign(CENTER, CENTER);
  noStroke();
  text('◀ Previous / Next ▶ — cycle slides  ·  Toggle Yes / Partial / No for each criterion  ·  Watch total update', canvasWidth / 2 + 50, drawHeight + 25);
}

function calcScore() {
  let total = 0;
  for (let s of scores) {
    if (s === 3) total += 2;
    else if (s === 2) total += 1;
  }
  return total;
}

function mousePressed() {
  if (mouseY >= drawHeight) return;

  let rx = rightPanelX;
  let rw = canvasWidth - rx;
  let rowH = 62;
  let startY = 68;

  for (let i = 0; i < criteria.length; i++) {
    let y = startY + i * rowH;
    let btnW = floor((rw - 20) / 3);
    for (let b = 0; b < 3; b++) {
      let bx = rx + 6 + b * btnW;
      let by = y + 36;
      let bh = 20;
      if (mouseX >= bx && mouseX <= bx + btnW - 4 && mouseY >= by && mouseY <= by + bh) {
        let val = b + 1;
        scores[i] = scores[i] === val ? 0 : val;
      }
    }
  }
}
