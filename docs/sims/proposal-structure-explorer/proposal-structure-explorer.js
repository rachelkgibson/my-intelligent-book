// Proposal Structure Explorer MicroSim
// CANVAS_HEIGHT: 522
// Students click section tiles to reveal what belongs in each proposal section.

let canvasWidth = 800;
let drawHeight = 470;
let controlHeight = 52;
let canvasHeight = drawHeight + controlHeight;

const SECTIONS = [
  {
    num: 1, name: 'Title Page', cat: 'Administrative', color: '#4A6FA5',
    desc: 'Lists project title, your name, course name, instructor, and submission date. Should look professional — use your school\'s format if one exists.',
    mistake: 'Forgetting to update the date when submitting a revised version.'
  },
  {
    num: 2, name: 'Executive Summary', cat: 'Administrative', color: '#4A6FA5',
    desc: 'Written last, placed first. Summarizes the problem, solution, and key outcomes in 150–200 words. Stands alone — a reader should understand the whole proposal from this alone.',
    mistake: 'Making it too long or restating the entire proposal instead of summarizing it.'
  },
  {
    num: 3, name: 'Problem Statement', cat: 'Problem/Solution', color: '#C0622A',
    desc: 'Based directly on your Assignment 7 work. Includes your Situation, Need, Goal, and Constraints with evidence that the problem is real and significant.',
    mistake: 'Defining the problem as "we need to build X" instead of "there is a gap in Y."'
  },
  {
    num: 4, name: 'Proposed Solution', cat: 'Problem/Solution', color: '#C0622A',
    desc: 'Describes your specific approach and why it addresses the root cause. Includes a brief comparison to alternatives you considered and rejected.',
    mistake: 'Describing a solution without connecting it back to the stated problem.'
  },
  {
    num: 5, name: 'Methodology', cat: 'Planning', color: '#207070',
    desc: 'A numbered sequence of phases and tasks. Each phase has a clear deliverable. Shows reviewers that you have thought through how the work will actually get done.',
    mistake: 'Writing at such a high level that it could describe any project.'
  },
  {
    num: 6, name: 'Risk Management', cat: 'Planning', color: '#207070',
    desc: 'Identifies the 3–5 highest-priority risks from your FMEA (Assignment 11). Each risk includes likelihood, impact, and a concrete mitigation plan.',
    mistake: 'Only listing low-probability risks to make the project appear safer than it is.'
  },
  {
    num: 7, name: 'Schedule', cat: 'Planning', color: '#207070',
    desc: 'Usually presented as a Gantt chart. Milestones appear on the timeline. Time is allocated for testing, iteration, and buffer — not just primary tasks.',
    mistake: 'Not building in time for testing and revision before the final deadline.'
  },
  {
    num: 8, name: 'Budget', cat: 'Planning', color: '#207070',
    desc: 'From Assignment 13. Every line item lists category, description, quantity, unit cost, and a source URL or vendor quote. Includes contingency.',
    mistake: 'Estimating all costs as round numbers without researching actual prices.'
  },
  {
    num: 9, name: 'Conclusion', cat: 'Closure', color: '#3D6B3D',
    desc: 'Restates why this project matters and your team\'s readiness to execute it. Reinforces the significance and feasibility without introducing new content.',
    mistake: 'Introducing new ideas or evidence not covered in the proposal body.'
  },
  {
    num: 10, name: 'References', cat: 'Closure', color: '#3D6B3D',
    desc: 'All sources cited in the proposal body, listed in IEEE or APA format, in order of appearance. Every in-text citation must have a matching reference entry.',
    mistake: 'Listing sources you consulted but did not actually cite in the text.'
  },
];

let selectedIdx = -1;
let tileRects = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textFont('Arial');
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) canvasWidth = container.offsetWidth;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function draw() {
  updateCanvasSize();

  // Draw region
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control region
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  drawHeader();
  drawTiles();
  if (selectedIdx >= 0) drawInfoPanel();
  else drawInfoPrompt();
  drawControlHint();
}

function drawHeader() {
  fill('#1a3a6b');
  noStroke();
  rect(0, 0, canvasWidth, 28);
  fill('white');
  textSize(13);
  textAlign(CENTER, CENTER);
  noStroke();
  text('Interactive Proposal Structure Guide — Click Any Section', canvasWidth / 2, 14);
}

function drawTiles() {
  const tileAreaW = canvasWidth * 0.56;
  const tileH = (drawHeight - 38) / SECTIONS.length;
  tileRects = [];

  for (let i = 0; i < SECTIONS.length; i++) {
    const s = SECTIONS[i];
    const x = 4;
    const y = 32 + i * tileH;
    const w = tileAreaW - 8;
    const h = tileH - 2;
    tileRects.push({ x, y, w, h });

    const isSelected = selectedIdx === i;
    const isHovered  = mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h && mouseY < drawHeight;

    // Tile background
    let baseCol = color(s.color);
    if (isSelected) {
      fill(lerpColor(baseCol, color(255), 0.3));
    } else if (isHovered) {
      fill(lerpColor(baseCol, color(255), 0.55));
    } else {
      fill(lerpColor(baseCol, color(255), 0.72));
    }
    stroke(isSelected ? s.color : 'silver');
    strokeWeight(isSelected ? 2 : 1);
    rect(x, y, w, h, 4);

    // Category dot
    fill(s.color);
    noStroke();
    circle(x + 12, y + h / 2, 10);

    // Number
    fill(isSelected ? '#111' : '#333');
    textSize(11);
    textAlign(LEFT, CENTER);
    noStroke();
    text(s.num + '. ' + s.name, x + 22, y + h / 2);
  }

  // Category legend
  const cats = ['Administrative', 'Problem/Solution', 'Planning', 'Closure'];
  const catColors = ['#4A6FA5', '#C0622A', '#207070', '#3D6B3D'];
  let lx = 4;
  let ly = drawHeight - 14;
  textSize(9);
  for (let i = 0; i < cats.length; i++) {
    fill(catColors[i]);
    noStroke();
    rect(lx, ly - 7, 8, 8, 2);
    fill(60);
    textAlign(LEFT, CENTER);
    noStroke();
    text(cats[i], lx + 11, ly - 3);
    lx += textWidth(cats[i]) + 22;
  }
}

function drawInfoPanel() {
  const s = SECTIONS[selectedIdx];
  const px = canvasWidth * 0.58;
  const pw = canvasWidth - px - 4;
  const py = 32;
  const ph = drawHeight - 38;

  // Panel background
  fill(255);
  stroke(s.color);
  strokeWeight(2);
  rect(px, py, pw, ph, 6);

  // Category badge
  fill(s.color);
  noStroke();
  rect(px + 8, py + 8, pw - 16, 22, 4);
  fill(255);
  textSize(10);
  textAlign(CENTER, CENTER);
  noStroke();
  text(s.cat, px + pw / 2, py + 19);

  // Section name
  fill('#1a2a4a');
  textSize(14);
  textAlign(LEFT, TOP);
  noStroke();
  text(s.num + '. ' + s.name, px + 10, py + 38);

  // Divider
  stroke(s.color);
  strokeWeight(1);
  line(px + 8, py + 56, px + pw - 8, py + 56);
  noStroke();

  // Description
  fill('#222');
  textSize(11);
  drawWrapped(s.desc, px + 10, py + 62, pw - 18, 14);

  // Mistake header
  fill('#b03020');
  textSize(10);
  textAlign(LEFT, TOP);
  noStroke();
  text('Common mistake:', px + 10, py + ph - 66);

  // Mistake text
  fill('#c0392b');
  textSize(10);
  drawWrapped(s.mistake, px + 10, py + ph - 54, pw - 18, 12);
}

function drawInfoPrompt() {
  const px = canvasWidth * 0.58;
  const pw = canvasWidth - px - 4;
  const py = 32;
  const ph = drawHeight - 38;

  fill(248);
  stroke('silver');
  strokeWeight(1);
  rect(px, py, pw, ph, 6);

  fill(160);
  textSize(12);
  textAlign(CENTER, CENTER);
  noStroke();
  text('← Click a section\nto see what\nbelongs there', px + pw / 2, py + ph / 2);
}

function drawControlHint() {
  fill(80);
  textSize(11);
  textAlign(CENTER, CENTER);
  noStroke();
  text('Click any section tile to see its purpose, required content, and common mistakes to avoid',
    canvasWidth / 2, drawHeight + controlHeight / 2);
}

function mousePressed() {
  if (mouseY > drawHeight || mouseY < 0) return;
  for (let i = 0; i < tileRects.length; i++) {
    const r = tileRects[i];
    if (mouseX >= r.x && mouseX <= r.x + r.w && mouseY >= r.y && mouseY <= r.y + r.h) {
      selectedIdx = (selectedIdx === i) ? -1 : i;
      return;
    }
  }
  // Click outside tiles but inside draw area deselects
  if (mouseX > canvasWidth * 0.57) selectedIdx = -1;
}

function drawWrapped(str, x, y, maxW, lineH) {
  textSize(lineH - 2);
  const words = str.split(' ');
  let line = '';
  let cy = y;
  for (const w of words) {
    const test = line ? line + ' ' + w : w;
    if (textWidth(test) > maxW && line !== '') {
      text(line, x, cy);
      line = w;
      cy += lineH;
    } else {
      line = test;
    }
  }
  if (line) text(line, x, cy);
}
