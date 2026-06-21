// Interactive Peer Review Rubric Simulator
// CANVAS_HEIGHT: 602
// Students rate sample proposals on 5 criteria and generate written feedback.

let canvasWidth = 900;
let drawHeight = 550;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

let currentSample = 0;
let ratings = [0, 0, 0, 0, 0]; // 0=unrated, 1-4 scale

let prevBtn, nextBtn, resetBtn;

const samples = [
  {
    label: 'Sample A',
    text: 'Our team plans to build a solar-powered phone charger for outdoor use. We identified that hikers lack power on long trips. Our solution uses 2W solar panels with a USB output. Budget is $45 and timeline is 6 weeks.'
  },
  {
    label: 'Sample B',
    text: 'We want to help elderly residents in assisted living by designing a fall-detection wristband that sends alerts to nursing staff. We researched 3 existing solutions and identified a gap in cost-effectiveness. Our approach uses an accelerometer and Bluetooth. We have a 10-week timeline with weekly milestones.'
  },
  {
    label: 'Sample C',
    text: 'We are going to make a water purifier. It uses filters. It will clean the water. Budget TBD. We will figure out the schedule later.'
  }
];

const criteria = [
  {
    name: '1. Problem Clarity',
    desc: 'Clearly defines a specific, real problem and who is affected?',
    lowFeedback: 'Add specifics: who is affected, where, and what evidence supports the problem\'s importance.'
  },
  {
    name: '2. Solution Feasibility',
    desc: 'Practical within stated constraints (time, cost, materials)?',
    lowFeedback: 'Address constraints explicitly: what will it cost, how long will it take, and what could go wrong?'
  },
  {
    name: '3. Evidence of Research',
    desc: 'Shows research into existing solutions and identifies a gap?',
    lowFeedback: 'Show your research: cite at least one existing solution and explain why yours is different or better.'
  },
  {
    name: '4. Planning Quality',
    desc: 'Realistic timeline, milestones, and budget with estimated costs?',
    lowFeedback: 'Add a week-by-week timeline and a line-item budget with estimated costs.'
  },
  {
    name: '5. Professional Presentation',
    desc: 'Clearly written, well-organized, and free of vague language?',
    lowFeedback: 'Revise for clarity: replace vague phrases like "we will figure it out" with specific commitments.'
  }
];

const ratingLabels = ['Does Not Meet', 'Approaches', 'Meets', 'Exceeds'];
const ratingColors = [
  [200, 60, 60],
  [210, 130, 0],
  [30, 100, 180],
  [34, 120, 34]
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  prevBtn = createButton('◀ Prev Sample');
  prevBtn.parent(document.querySelector('main'));
  prevBtn.mousePressed(() => { currentSample = (currentSample + 2) % 3; ratings = [0,0,0,0,0]; });

  nextBtn = createButton('Next Sample ▶');
  nextBtn.parent(document.querySelector('main'));
  nextBtn.mousePressed(() => { currentSample = (currentSample + 1) % 3; ratings = [0,0,0,0,0]; });

  resetBtn = createButton('Reset Ratings');
  resetBtn.parent(document.querySelector('main'));
  resetBtn.mousePressed(() => { ratings = [0,0,0,0,0]; });

  positionButtons();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) canvasWidth = container.offsetWidth;
}

function positionButtons() {
  prevBtn.position(8, drawHeight + 12);
  nextBtn.position(120, drawHeight + 12);
  resetBtn.position(240, drawHeight + 12);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionButtons();
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  drawSampleHeader();
  drawCriteriaSection();
  drawFeedbackSection();
  drawControlLabel();
}

function drawSampleHeader() {
  // Header bar
  fill(50, 80, 150);
  noStroke();
  rect(0, 0, canvasWidth, 28);
  fill('white');
  textSize(12);
  textAlign(LEFT, CENTER);
  noStroke();
  text('SAMPLE PROPOSAL — ' + samples[currentSample].label, 10, 14);

  // Dot indicators
  for (let i = 0; i < 3; i++) {
    fill(i === currentSample ? color(255, 200, 0) : color(120, 140, 200));
    noStroke();
    circle(canvasWidth - 50 + i * 16, 14, 10);
  }

  // Proposal text block
  fill(248, 248, 255);
  stroke('silver');
  strokeWeight(0.5);
  rect(6, 32, canvasWidth - 12, 86, 3);

  fill(30);
  textSize(11);
  textAlign(LEFT, TOP);
  noStroke();
  drawWrapped(samples[currentSample].text, 12, 38, canvasWidth - 24, 11, 76);
}

function drawCriteriaSection() {
  let rowH = 58;
  let startY = 126;

  for (let i = 0; i < criteria.length; i++) {
    let y = startY + i * rowH;

    // Row background
    fill(i % 2 === 0 ? color(240, 245, 255) : 'white');
    stroke('silver');
    strokeWeight(0.5);
    rect(4, y, canvasWidth - 8, rowH - 2, 2);

    // Criterion name and description
    fill(20);
    textSize(11);
    textAlign(LEFT, TOP);
    noStroke();
    text(criteria[i].name, 10, y + 5);
    fill(90);
    textSize(9);
    noStroke();
    text(criteria[i].desc, 10, y + 20);

    // Rating buttons (1–4)
    let btnW = 80;
    let btnH = 22;
    let totalBtnsW = 4 * btnW + 3 * 4;
    let startX = canvasWidth - totalBtnsW - 12;

    for (let b = 0; b < 4; b++) {
      let bx = startX + b * (btnW + 4);
      let by = y + 16;
      let active = ratings[i] === b + 1;
      let col = color(...ratingColors[b]);
      fill(active ? col : lerpColor(col, color(255), 0.7));
      stroke(active ? col : color(170));
      strokeWeight(1);
      rect(bx, by, btnW, btnH, 3);

      fill(active ? 'white' : 50);
      textSize(9);
      textAlign(CENTER, CENTER);
      noStroke();
      text((b + 1) + ' – ' + ratingLabels[b], bx + btnW / 2, by + btnH / 2);
    }
  }
}

function drawFeedbackSection() {
  let topY = 126 + 5 * 58 + 4;
  let panelH = drawHeight - topY - 4;

  fill(245, 245, 255);
  stroke('silver');
  strokeWeight(1);
  rect(4, topY, canvasWidth - 8, panelH, 3);

  let ratedCount = ratings.filter(r => r > 0).length;

  if (ratedCount < 5) {
    fill(140);
    textSize(11);
    textAlign(CENTER, CENTER);
    noStroke();
    text('Rate all 5 criteria to generate feedback (' + ratedCount + '/5 rated)', canvasWidth / 2, topY + panelH / 2);
    return;
  }

  let avg = ratings.reduce((a, b) => a + b, 0) / 5;
  let summaryColor = avg >= 3.5 ? color(30, 120, 30) : avg >= 2.5 ? color(140, 100, 0) : color(160, 40, 40);
  let summary = avg >= 3.5
    ? 'Strong proposal — clear problem, feasible solution, and solid planning.'
    : avg >= 2.5
    ? 'Good foundation. Strengthen the weaker criteria before submitting.'
    : 'Significant revision needed. Focus on defining the problem and adding specific details.';

  fill(summaryColor);
  textSize(12);
  textAlign(LEFT, TOP);
  noStroke();
  text('Average: ' + avg.toFixed(1) + '/4   —   ' + summary, 10, topY + 6);

  // Per-criterion feedback for low scores
  let cy = topY + 26;
  for (let i = 0; i < 5; i++) {
    if (ratings[i] <= 2 && ratings[i] > 0) {
      fill(160, 40, 40);
      textSize(9);
      textAlign(LEFT, TOP);
      noStroke();
      text('▸ ' + criteria[i].name.split('.')[1].trim() + ': ' + criteria[i].lowFeedback, 10, cy, canvasWidth - 20, 30);
      cy += 22;
    }
  }
}

function drawControlLabel() {
  fill(80);
  textSize(10);
  textAlign(RIGHT, CENTER);
  noStroke();
  text('Rate each criterion 1–4  ·  Switch proposals to practice calibrating your feedback', canvasWidth - 10, drawHeight + 25);
}

function mousePressed() {
  if (mouseY >= drawHeight) return;

  let rowH = 58;
  let startY = 126;
  let btnW = 80;
  let btnH = 22;
  let totalBtnsW = 4 * btnW + 3 * 4;
  let startX = canvasWidth - totalBtnsW - 12;

  for (let i = 0; i < 5; i++) {
    let y = startY + i * rowH;
    for (let b = 0; b < 4; b++) {
      let bx = startX + b * (btnW + 4);
      let by = y + 16;
      if (mouseX >= bx && mouseX <= bx + btnW && mouseY >= by && mouseY <= by + btnH) {
        ratings[i] = ratings[i] === b + 1 ? 0 : b + 1;
      }
    }
  }
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
