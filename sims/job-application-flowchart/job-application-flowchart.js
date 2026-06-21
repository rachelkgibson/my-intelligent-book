// Job Application Process Flowchart
// CANVAS_HEIGHT: 522
// 8-step vertical flowchart; click a node to see details in the right panel.

let canvasWidth = 800;
let drawHeight = 470;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

let selectedStep = -1;

const steps = [
  {
    label: '1. Search',
    phase: 'blue',
    short: 'Find job postings on company sites, LinkedIn, Indeed, and school job boards',
    desc: 'Job boards and company career pages are the best starting points. Set up alerts for your target role. Don\'t forget your school\'s career center — employers recruit there specifically.',
    mistake: 'Applying to dozens of jobs without researching any of them.'
  },
  {
    label: '2. Research Company',
    phase: 'blue',
    short: 'Read the company website, recent news, and Glassdoor reviews before applying',
    desc: 'Understanding the company before applying lets you tailor your letter and speak confidently in interviews. Check their mission, recent projects, and team culture.',
    mistake: 'Applying without reading the job description carefully.'
  },
  {
    label: '3. Tailor Resume & Cover Letter',
    phase: 'blue',
    short: 'Customize your application materials for each specific position',
    desc: 'A generic resume rarely gets past applicant tracking systems. Change your objective, reorder bullets, and add keywords from the posting.',
    mistake: 'Sending the same resume to every job.'
  },
  {
    label: '4. Submit Application',
    phase: 'gold',
    short: 'Apply through the company portal or email, following instructions exactly',
    desc: 'Follow every instruction exactly — wrong file format or missing attachments signal carelessness. Use PDF unless told otherwise.',
    mistake: 'Applying after the deadline or with the wrong file format.'
  },
  {
    label: '5. Follow Up',
    phase: 'gold',
    short: 'Send a brief email 5–7 days after applying if you haven\'t heard back',
    desc: 'A short, professional email keeps your name visible. Keep it to two sentences max.',
    mistake: 'Calling the HR office directly.'
  },
  {
    label: '6. Phone / Video Screen',
    phase: 'green',
    short: 'A 20–30 minute call with HR to confirm fit before a full interview',
    desc: 'Treat this as seriously as a full interview — it filters out most applicants. Prepare your 60-second intro.',
    mistake: 'Taking the call while driving or in a noisy location.'
  },
  {
    label: '7. Interview(s)',
    phase: 'green',
    short: 'One or more in-depth interviews — prepare STAR stories and questions',
    desc: 'Practice your STAR stories out loud, not just in your head. Bring questions to ask them.',
    mistake: 'Not researching your interviewer on LinkedIn beforehand.'
  },
  {
    label: '8. Offer & Negotiate',
    phase: 'teal',
    short: 'Evaluate the offer, ask about compensation, and respond within 48–72 hours',
    desc: 'Never accept or decline on the spot — it\'s normal to ask for 24-48 hours. Review salary, benefits, and start date.',
    mistake: 'Negotiating aggressively on your first offer as a student.'
  }
];

const phaseColors = {
  blue:  [55, 100, 180],
  gold:  [185, 140, 30],
  green: [40, 135, 65],
  teal:  [25, 140, 140]
};

// Node geometry
const nodeW = 260;
const nodeH = 44;
const nodeSpacing = 52;
const nodesStartY = 14;
let nodeX; // centered on left 55% of canvas

// Panel geometry
let panelX, panelW;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textFont('Arial');
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) canvasWidth = container.offsetWidth;
  nodeX = floor(canvasWidth * 0.03);
  panelX = floor(canvasWidth * 0.38) + 10;
  panelW = canvasWidth - panelX - 8;
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

  drawFlowchart();
  drawPanel();
  drawControlBar();
}

function drawFlowchart() {
  for (let i = 0; i < steps.length; i++) {
    let y = nodesStartY + i * nodeSpacing;
    let col = phaseColors[steps[i].phase];
    let isSelected = (selectedStep === i);

    // Arrow to next node
    if (i < steps.length - 1) {
      let arrowY1 = y + nodeH;
      let arrowY2 = y + nodeSpacing;
      let cx = nodeX + nodeW / 2;
      stroke(150);
      strokeWeight(1.5);
      line(cx, arrowY1, cx, arrowY2 - 7);
      // Arrowhead
      fill(150);
      noStroke();
      triangle(cx - 5, arrowY2 - 8, cx + 5, arrowY2 - 8, cx, arrowY2);
    }

    // Node box
    if (isSelected) {
      fill(col[0], col[1], col[2]);
      stroke(col[0] * 0.6, col[1] * 0.6, col[2] * 0.6);
      strokeWeight(2);
    } else {
      fill(col[0], col[1], col[2], 200);
      stroke(col[0] * 0.7, col[1] * 0.7, col[2] * 0.7);
      strokeWeight(1);
    }
    rect(nodeX, y, nodeW, nodeH, 6);

    // Step label
    fill(isSelected ? 255 : 230);
    textSize(12);
    textAlign(LEFT, CENTER);
    noStroke();
    text(steps[i].label, nodeX + 10, y + nodeH / 2 - 5);

    // Short description (smaller, lighter)
    fill(isSelected ? 220 : 200);
    textSize(9);
    let shortClip = steps[i].short.length > 46 ? steps[i].short.slice(0, 45) + '…' : steps[i].short;
    text(shortClip, nodeX + 10, y + nodeH / 2 + 9);
  }
}

function drawPanel() {
  // Panel background
  fill(250, 252, 255);
  stroke('silver');
  strokeWeight(1);
  rect(panelX, 4, panelW, drawHeight - 8, 6);

  if (selectedStep < 0) {
    fill(160);
    textSize(11);
    textAlign(CENTER, CENTER);
    noStroke();
    text('← Click any step\nto see details', panelX + panelW / 2, drawHeight / 2);
    return;
  }

  let s = steps[selectedStep];
  let col = phaseColors[s.phase];
  let px = panelX + 10;
  let pw = panelW - 20;
  let y = 14;

  // Header bar
  fill(col[0], col[1], col[2]);
  noStroke();
  rect(panelX + 4, y, panelW - 8, 26, 4);
  fill(255);
  textSize(12);
  textAlign(CENTER, CENTER);
  noStroke();
  text(s.label, panelX + panelW / 2, y + 13);

  y += 34;
  fill(40);
  textSize(11);
  textAlign(LEFT, TOP);
  noStroke();
  y = drawWrapped(s.desc, px, y, pw, 11, 160) + 8;

  // Mistake block
  fill(200, 240, 200);
  stroke('lightgreen');
  strokeWeight(1);
  // just draw text
  fill(150, 30, 30);
  textSize(10);
  textAlign(LEFT, TOP);
  noStroke();
  text('Common mistake:', px, y);
  y += 14;
  fill(80, 20, 20);
  textSize(10);
  drawWrapped(s.mistake, px, y, pw, 10, 100);
}

function drawControlBar() {
  fill(80);
  textSize(11);
  textAlign(CENTER, CENTER);
  noStroke();
  text('Click any step to see details and common mistakes', canvasWidth / 2, drawHeight + 25);
}

function mousePressed() {
  if (mouseY > drawHeight) return;
  if (mouseX > panelX) return; // clicks in panel don't trigger

  for (let i = 0; i < steps.length; i++) {
    let y = nodesStartY + i * nodeSpacing;
    if (mouseX >= nodeX && mouseX <= nodeX + nodeW &&
        mouseY >= y && mouseY <= y + nodeH) {
      selectedStep = (selectedStep === i) ? -1 : i;
      return;
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
      if (curY + lh > y + maxH) { text(line + '…', x, curY); return curY; }
      text(line, x, curY);
      line = w;
      curY += lh;
    } else {
      line = test;
    }
  }
  if (line && curY <= y + maxH) text(line, x, curY);
  return curY + lh;
}
