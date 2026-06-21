// Engineering Code of Ethics Comparison MicroSim
// CANVAS_HEIGHT: 482
// Click any principle card to highlight the same obligation across NSPE, IEEE, and ASCE.

let canvasWidth = 800;
let drawHeight = 430;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Theme colors (5 themes shared across all three societies)
const THEME_COLORS = [
  [220, 80,  80],   // 0 PUBLIC SAFETY
  [50,  130, 200],  // 1 COMPETENCE
  [60,  160, 60],   // 2 HONESTY
  [160, 100, 0],    // 3 ENVIRONMENT/OBJECTIVITY
  [140, 60,  160],  // 4 FAIRNESS
];

const THEME_LABELS = [
  "Public Safety & Welfare",
  "Competence",
  "Honesty & Integrity",
  "Objectivity & Responsibility",
  "Fairness & Non-Discrimination",
];

const THEME_SUMMARY = [
  "All three societies place public safety above all other obligations — safety is non-negotiable.",
  "Engineers should only accept work they are genuinely qualified to perform.",
  "Honest, truthful communication is a core professional obligation across every society.",
  "Engineers must apply their knowledge responsibly and advance public understanding of technology.",
  "Professional treatment of all persons, free from discrimination, is required in every code.",
];

// Principle text [society][theme]
const PRINCIPLES = [
  [ // NSPE
    "Hold paramount the safety, health, and welfare of the public",
    "Perform services only in areas of their competence",
    "Act in such a manner as to uphold and enhance the honor, integrity, and dignity of the profession",
    "Issue public statements only in an objective and truthful manner",
    "Avoid deceptive acts and not engage in discrimination",
  ],
  [ // IEEE
    "Commit to protecting the public health, safety, and welfare",
    "Accept responsibility only if qualified by training or experience",
    "Be honest and realistic in stating claims or estimates",
    "Improve the understanding of technology and its appropriate application",
    "Treat fairly all persons regardless of their characteristics",
  ],
  [ // ASCE
    "Engineers shall hold paramount the safety, health and welfare of the public",
    "Engineers shall practice in only those areas of civil engineering in which they are proficient",
    "Engineers shall act in such a manner as to uphold and enhance the honor, integrity, and dignity of the engineering profession",
    "Engineers shall perform services only in areas of their competence and build their reputation on the merit of their services",
    "Engineers shall not engage in any form of discrimination based on characteristics unrelated to professional performance",
  ],
];

const SOCIETY_NAMES  = ["NSPE", "IEEE", "ASCE"];
const HEADER_COLORS  = [[0,0,128], [0,0,139], [0,128,128]];

const CARD_H      = 62;
const CARD_GAP    = 6;
const CARDS_START = 40;

let selectedTheme = -1;   // which theme row is selected (-1 = none)
let hoveredCard   = null; // {soc, theme}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) canvasWidth = container.offsetWidth;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

// ── helpers ──────────────────────────────────────────────────────────────────
function colW() { return floor(canvasWidth / 3); }
function cardX(soc) { return soc * colW() + 8; }
function cardY(theme) { return CARDS_START + theme * (CARD_H + CARD_GAP); }
function cardW() { return colW() - 16; }

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

// ── draw ─────────────────────────────────────────────────────────────────────
function draw() {
  updateCanvasSize();

  // Draw area
  fill('aliceblue');
  stroke('silver'); strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  drawHeaders();
  drawCards();
  drawComparisonPanel();
  drawControlArea();
}

function drawHeaders() {
  for (let s = 0; s < 3; s++) {
    let [r,g,b] = HEADER_COLORS[s];
    fill(r, g, b); noStroke();
    rect(s * colW(), 0, colW() - 1, 32);
    fill(255); textSize(14); textAlign(CENTER, CENTER);
    noStroke();
    text(SOCIETY_NAMES[s], s * colW() + colW() / 2, 16);
  }
}

function drawCards() {
  for (let s = 0; s < 3; s++) {
    for (let t = 0; t < 5; t++) {
      let cx = cardX(s), cy = cardY(t), cw = cardW();
      let [r, g, b] = THEME_COLORS[t];
      let isSelected = (selectedTheme === t);
      let isHovered  = (hoveredCard && hoveredCard.soc === s && hoveredCard.theme === t);

      // Card background
      if (isSelected) {
        fill(r, g, b, 60);
      } else if (isHovered) {
        fill(r, g, b, 30);
      } else {
        fill(248, 249, 255);
      }

      // Border
      if (isSelected) {
        stroke(r, g, b); strokeWeight(2.5);
      } else {
        stroke(r, g, b, 140); strokeWeight(1);
      }
      rect(cx, cy, cw, CARD_H, 5);

      // Theme dot
      fill(r, g, b); noStroke();
      circle(cx + 10, cy + 10, 12);

      // Principle text
      fill(30); textSize(10); textAlign(LEFT, TOP); noStroke();
      drawWrapped(PRINCIPLES[s][t], cx + 20, cy + 4, cw - 24, 10, CARD_H - 8);
    }
  }
}

function drawComparisonPanel() {
  if (selectedTheme < 0) {
    fill(120); textSize(11); textAlign(CENTER, CENTER); noStroke();
    text("Click any principle card to see how all three societies express the same obligation.",
         canvasWidth / 2, drawHeight - 20);
    return;
  }
  let t = selectedTheme;
  let [r, g, b] = THEME_COLORS[t];
  let panelY = CARDS_START + 5 * (CARD_H + CARD_GAP) + 4;

  fill(r, g, b, 30); stroke(r, g, b, 120); strokeWeight(1.5);
  rect(8, panelY, canvasWidth - 16, drawHeight - panelY - 8, 6);

  fill(r, g, b); textSize(12); textAlign(LEFT, TOP); noStroke();
  text("Shared obligation — " + THEME_LABELS[t] + ":", 16, panelY + 8);
  fill(40); textSize(11);
  drawWrapped(THEME_SUMMARY[t], 16, panelY + 26, canvasWidth - 32, 11, 40);
}

function drawControlArea() {
  fill(70); textSize(11); textAlign(CENTER, CENTER); noStroke();
  text("Click any principle to highlight the same obligation across all three societies",
       canvasWidth / 2, drawHeight + 25);
}

// ── interaction ───────────────────────────────────────────────────────────────
function mousePressed() {
  if (mouseY >= drawHeight) return;
  for (let s = 0; s < 3; s++) {
    for (let t = 0; t < 5; t++) {
      let cx = cardX(s), cy = cardY(t), cw = cardW();
      if (mouseX >= cx && mouseX <= cx + cw && mouseY >= cy && mouseY <= cy + CARD_H) {
        selectedTheme = (selectedTheme === t) ? -1 : t;
        return;
      }
    }
  }
}

function mouseMoved() {
  hoveredCard = null;
  if (mouseY >= drawHeight) return;
  for (let s = 0; s < 3; s++) {
    for (let t = 0; t < 5; t++) {
      let cx = cardX(s), cy = cardY(t), cw = cardW();
      if (mouseX >= cx && mouseX <= cx + cw && mouseY >= cy && mouseY <= cy + CARD_H) {
        hoveredCard = {soc: s, theme: t};
        return;
      }
    }
  }
}
