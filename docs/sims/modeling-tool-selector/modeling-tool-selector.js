// Interactive Modeling Tool Selector
// CANVAS_HEIGHT: 482
// Decision tree that guides students to the right modeling tool for their project.
// Click YES or NO at each question node to navigate the tree.

let canvasWidth = 800;
let drawHeight = 430;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// path: array of 'yes'/'no' decisions from root
let path = [];

let restartBtn;

// Tree nodes: id, question text, yes→childId, no→childId, or outcome details
const nodes = {
  q1: {
    q: 'Does your project involve physical structure or mechanical forces?',
    yes: 'A', no: 'q2'
  },
  q2: {
    q: 'Does your project involve electronic circuits or wiring?',
    yes: 'B', no: 'q3'
  },
  q3: {
    q: 'Does your project primarily involve data, cost, or schedule analysis?',
    yes: 'C', no: 'q4'
  },
  q4: {
    q: 'Does your project involve fluid flow, heat transfer, or energy systems?',
    yes: 'D', no: 'E'
  }
};

const outcomes = {
  A: {
    label: 'CAD / FEA Tools',
    tools: 'Fusion 360, SolidWorks, OnShape',
    best: 'Structural designs, mechanical parts, 3D printing',
    example: 'Design a bridge bracket and run a stress test',
    free: 'Fusion 360 for Students (Autodesk Education)',
    col: [30, 100, 180]
  },
  B: {
    label: 'Circuit Simulation',
    tools: 'Tinkercad Circuits, LTspice',
    best: 'Electronics projects, Arduino circuits, sensor wiring',
    example: 'Simulate an LED circuit before soldering',
    free: 'Tinkercad Circuits (Autodesk — browser-based)',
    col: [180, 80, 30]
  },
  C: {
    label: 'Spreadsheets / Data Tools',
    tools: 'Excel, Google Sheets, Tableau',
    best: 'Budget analysis, data comparison, schedule optimization',
    example: 'Model cost vs. lifespan tradeoffs for 3 design options',
    free: 'Google Sheets (Google Workspace)',
    col: [30, 140, 80]
  },
  D: {
    label: 'Systems / Flow Simulation',
    tools: 'EES, SimScale, Python',
    best: 'Energy systems, fluid dynamics, thermal analysis',
    example: 'Model heat loss in a building insulation project',
    free: 'SimScale Community Plan (browser-based CFD/FEA)',
    col: [120, 50, 160]
  },
  E: {
    label: 'Visual Prototypes / Process Models',
    tools: 'Figma, flowcharts, storyboards',
    best: 'UI/UX projects, service designs, app prototypes',
    example: 'Wireframe an accessibility app before coding',
    free: 'Figma (free for students)',
    col: [160, 100, 0]
  }
};

// Question order for rendering
const questionOrder = ['q1', 'q2', 'q3', 'q4'];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  restartBtn = createButton('Start Over');
  restartBtn.parent(document.querySelector('main'));
  restartBtn.mousePressed(() => { path = []; });
  positionButtons();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) canvasWidth = min(container.offsetWidth, 900);
}

function positionButtons() {
  restartBtn.position(10, drawHeight + 13);
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

  drawTree();
  drawOutcome();
  drawControlLabel();
}

function drawTree() {
  let nodeW = 220, nodeH = 44;
  let xCenter = canvasWidth / 2;
  let startY = 20;
  let stepY = 78;

  let currentNodeId = 'q1';

  for (let step = 0; step <= path.length; step++) {
    let qId = questionOrder[step < 4 ? step : 3];
    if (!nodes[qId]) break;

    let nodeData = nodes[qId];
    let nx = xCenter - nodeW / 2;
    let ny = startY + step * stepY;

    // Draw connector from previous node
    if (step > 0) {
      let prevY = startY + (step - 1) * stepY + nodeH;
      stroke(130);
      strokeWeight(1.5);
      line(xCenter, prevY, xCenter, ny);
      // Label the connector
      let label = path[step - 1] === 'yes' ? 'NO' : '';
      // Actually we always go down the "no" path in this linear rendering
    }

    // Is this the active node?
    let isActive = step === path.length;
    let isAnswered = step < path.length;

    if (isAnswered) {
      fill(200, 215, 235);
      stroke(100, 130, 180);
    } else if (isActive) {
      fill(255, 248, 200);
      stroke(180, 140, 0);
    } else {
      fill(230);
      stroke(170);
    }
    strokeWeight(isActive ? 2 : 1);
    rect(nx, ny, nodeW, nodeH, 6);

    fill(isActive ? 30 : 80);
    textSize(10);
    textAlign(CENTER, CENTER);
    noStroke();
    drawWrapped(nodeData.q, nx + 6, ny + 4, nodeW - 12, 10, nodeH - 4);

    if (isAnswered) {
      let ans = path[step];
      // Show answered label
      fill(50, 100, 180);
      textSize(9);
      textAlign(RIGHT, BOTTOM);
      noStroke();
      text('→ ' + ans.toUpperCase(), nx + nodeW - 4, ny + nodeH - 2);
    }

    if (isActive) {
      // YES button (left branch)
      drawYesNoBtn(nx - 64, ny + 10, 56, 24, 'YES', color(40, 150, 40));
      // NO button (right branch)
      drawYesNoBtn(nx + nodeW + 8, ny + 10, 56, 24, 'NO', color(160, 50, 50));
    }

    // Determine next node in "no" chain
    let nextId = nodeData.no;
    if (isAnswered && path[step] === 'yes') {
      // If yes was chosen at this step, outcome is determined — stop drawing questions
      break;
    }
    if (!nodes[nextId]) break;
    currentNodeId = nextId;
  }
}

function drawYesNoBtn(x, y, w, h, label, col) {
  fill(col);
  stroke(lerpColor(col, color(0), 0.3));
  strokeWeight(1);
  rect(x, y, w, h, 4);
  fill('white');
  textSize(12);
  textAlign(CENTER, CENTER);
  noStroke();
  text(label, x + w / 2, y + h / 2);
}

function drawOutcome() {
  let outcome = resolveOutcome();
  if (!outcome) return;

  let data = outcomes[outcome];
  let oy = 20 + path.length * 78 + 44 + 10;
  let oh = drawHeight - oy - 8;
  if (oh < 60) return;

  // Connector to outcome
  let xCenter = canvasWidth / 2;
  stroke(130);
  strokeWeight(1.5);
  line(xCenter, oy - 10, xCenter, oy);

  fill(color(...data.col));
  noStroke();
  circle(xCenter, oy - 2, 12);

  let panelW = min(canvasWidth - 24, 480);
  let panelX = xCenter - panelW / 2;

  fill(lerpColor(color(...data.col), color(255), 0.85));
  stroke(color(...data.col));
  strokeWeight(2);
  rect(panelX, oy, panelW, oh, 8);

  fill(color(...data.col));
  textSize(14);
  textAlign(CENTER, TOP);
  noStroke();
  text('→ ' + data.label, xCenter, oy + 8);

  fill(30);
  textSize(10);
  textAlign(LEFT, TOP);
  noStroke();
  text('Tools: ' + data.tools, panelX + 10, oy + 30);
  text('Best for: ' + data.best, panelX + 10, oy + 46);
  drawWrapped('Example: ' + data.example, panelX + 10, oy + 62, panelW - 20, 10, 30);
  fill(color(...data.col));
  textSize(9);
  drawWrapped('Free: ' + data.free, panelX + 10, oy + 96, panelW - 20, 9, 20);
}

function resolveOutcome() {
  let node = 'q1';
  for (let i = 0; i < path.length; i++) {
    let choice = path[i];
    let next = nodes[node][choice];
    if (outcomes[next]) return next;
    if (!nodes[next]) return null;
    node = next;
  }
  return null;
}

function drawControlLabel() {
  fill(80);
  textSize(10);
  textAlign(CENTER, CENTER);
  noStroke();
  text('Click YES or NO to find the right modeling tool for your project  ·  Start Over to reset', canvasWidth / 2 + 40, drawHeight + 25);
}

function mousePressed() {
  if (mouseY >= drawHeight) return;
  if (resolveOutcome()) return; // already done

  let step = path.length;
  if (step >= 4) return;
  let qId = questionOrder[step];
  if (!nodes[qId]) return;

  let nodeW = 220, nodeH = 44;
  let xCenter = canvasWidth / 2;
  let ny = 20 + step * 78;
  let nx = xCenter - nodeW / 2;

  // YES button zone
  if (mouseX >= nx - 64 && mouseX <= nx - 64 + 56 && mouseY >= ny + 10 && mouseY <= ny + 34) {
    path.push('yes');
  }
  // NO button zone
  if (mouseX >= nx + nodeW + 8 && mouseX <= nx + nodeW + 64 && mouseY >= ny + 10 && mouseY <= ny + 34) {
    path.push('no');
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
