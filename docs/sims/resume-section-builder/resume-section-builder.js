// Resume Section Builder MicroSim
// CANVAS_HEIGHT: 552
// Students identify strong vs. weak resume bullets and build an Experience section.
// Click a bullet in the left panel to select it, then click a slot to place it.
// Click a placed bullet to return it to the pool. Watch feedback update in real time.

let canvasWidth = 800;
let drawHeight = 500;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 10;

// Panel x-boundaries (recalculated on resize)
let leftW, centerX, centerW, rightX, rightW;

// 12 resume bullets in mixed order — students must evaluate each one
const bullets = [
  { text: "Designed solar-powered irrigation system that reduced water use by 35%",      id: 0 },
  { text: "Was involved in the robotics club",                                            id: 1 },
  { text: "Led 4-person team to build a bridge model supporting 47 lbs",                 id: 2 },
  { text: "Helped out at the school store sometimes",                                     id: 3 },
  { text: "Coded a grade tracker used daily by 30 classmates",                           id: 4 },
  { text: "Responsible for helping with a science fair project",                         id: 5 },
  { text: "Raised $1,200 through 3 school fundraising events",                           id: 6 },
  { text: "Worked on a team project",                                                    id: 7 },
  { text: "Served 200+ customers daily at school store for 2 years",                    id: 8 },
  { text: "Did some coding projects in class",                                            id: 9 },
  { text: "Won regional robotics competition in 2025",                                   id: 10 },
  { text: "Participated in fundraising activities",                                       id: 11 }
];

// Action verbs that make a strong resume bullet
const actionVerbs = [
  'designed','built','led','coded','developed','managed','organized','programmed',
  'created','implemented','analyzed','tested','launched','trained','achieved',
  'improved','increased','reduced','saved','earned','raised','won','completed',
  'served','directed','coordinated','taught','wrote','presented','researched',
  'established','founded','supervised','mentored','automated','calculated',
  'assembled','repaired','fabricated','operated','installed','maintained'
];

// State
let selectedIdx = -1;       // index into bullets[] of the currently selected bullet
let slots = [null, null, null]; // each slot holds a bullets[] index or null
let resetBtn;
let bulletRowH = 36;
let bulletStartY = 50;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  resetBtn = createButton('Reset');
  resetBtn.parent(document.querySelector('main'));
  resetBtn.position(10, drawHeight + 13);
  resetBtn.mousePressed(resetAll);

  describe(
    'Resume Section Builder: click a bullet from the bank on the left, ' +
    'then click one of the three experience slots in the center. ' +
    'The right panel shows whether each bullet starts with an action verb ' +
    'and includes a quantifiable result.',
    LABEL
  );
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) canvasWidth = container.offsetWidth;
  leftW    = floor(canvasWidth * 0.37);
  centerX  = leftW + 1;
  centerW  = floor(canvasWidth * 0.35);
  rightX   = centerX + centerW + 1;
  rightW   = canvasWidth - rightX;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  resetBtn.position(10, drawHeight + 13);
}

// ─── Main draw loop ────────────────────────────────────────────────────────────
function draw() {
  updateCanvasSize();

  // Drawing region (aliceblue)
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control region (white)
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Vertical dividers
  stroke('silver');
  strokeWeight(1);
  line(leftW, 0, leftW, drawHeight);
  line(rightX, 0, rightX, drawHeight);

  drawBulletBank();
  drawCenterPanel();
  drawFeedbackPanel();
  drawControls();
}

// ─── Left panel: bullet bank ───────────────────────────────────────────────────
function drawBulletBank() {
  // Header bar
  fill(50, 90, 160);
  noStroke();
  rect(0, 0, leftW, 30);
  fill('white');
  textSize(13);
  textAlign(CENTER, CENTER);
  noStroke();
  text('BULLET BANK', leftW / 2, 15);

  // Sub-label
  fill(60);
  textSize(10);
  textAlign(LEFT, TOP);
  noStroke();
  text('Click a bullet to select it, then place it in a slot →', 6, 33);

  // Draw each bullet row
  for (let i = 0; i < bullets.length; i++) {
    let y = bulletStartY + i * bulletRowH;
    let isSelected = (selectedIdx === i);
    let isPlaced   = slots.includes(i);

    // Row background
    if (isSelected) {
      fill(255, 220, 60);        // yellow = selected
    } else if (isPlaced) {
      fill(215, 215, 215);       // gray = already placed
    } else {
      fill(245, 248, 255);       // light blue = available
    }
    stroke(isSelected ? color(200, 160, 0) : 'silver');
    strokeWeight(1);
    rect(4, y, leftW - 8, bulletRowH - 3, 4);

    // Bullet text (wrapped to 2 lines)
    fill(isPlaced ? 140 : 25);
    textSize(11);
    textAlign(LEFT, TOP);
    noStroke();
    drawWrapped(bullets[i].text, 10, y + 5, leftW - 16, 11, bulletRowH - 6);
  }
}

// ─── Center panel: three experience slots ─────────────────────────────────────
function drawCenterPanel() {
  // Header
  fill(45, 120, 60);
  noStroke();
  rect(centerX, 0, centerW, 30);
  fill('white');
  textSize(12);
  textAlign(CENTER, CENTER);
  noStroke();
  text('YOUR RESUME', centerX + centerW / 2, 10);
  textSize(10);
  text('Experience Section', centerX + centerW / 2, 22);

  // Instruction line
  noStroke();
  if (selectedIdx >= 0) {
    fill(150, 80, 0);
    textSize(10);
    textAlign(CENTER, TOP);
    text('← bullet selected — click a slot below', centerX + centerW / 2, 33);
  } else {
    fill(90);
    textSize(10);
    textAlign(CENTER, TOP);
    text('Select a bullet from the left', centerX + centerW / 2, 33);
  }

  let slotH  = 80;
  let gapH   = 12;
  let startY = 48;
  let sx     = centerX + 6;
  let sw     = centerW - 12;

  for (let s = 0; s < 3; s++) {
    let y = startY + s * (slotH + gapH);

    // Slot number badge
    fill(180);
    noStroke();
    textSize(9);
    textAlign(LEFT, TOP);
    text((s + 1), sx + 2, y + 2);

    if (slots[s] !== null) {
      // Filled slot
      fill('white');
      stroke(80, 140, 80);
      strokeWeight(1.5);
      rect(sx, y, sw, slotH, 5);

      fill(20);
      textSize(11);
      textAlign(LEFT, TOP);
      noStroke();
      drawWrapped('• ' + bullets[slots[s]].text, sx + 8, y + 10, sw - 14, 11, slotH - 16);

      // "Click to remove" hint
      fill(120, 120, 200);
      textSize(9);
      textAlign(RIGHT, BOTTOM);
      noStroke();
      text('click to remove ✕', sx + sw - 4, y + slotH - 3);
    } else {
      // Empty slot — highlight if a bullet is ready to drop
      let mx = mouseX, my = mouseY;
      let hovered = selectedIdx >= 0 &&
                    mx >= sx && mx <= sx + sw &&
                    my >= y  && my <= y + slotH;
      fill(hovered ? color(235, 255, 235) : color(250, 250, 250));
      stroke(hovered ? color(80, 170, 80) : color(190));
      strokeWeight(hovered ? 2 : 1);
      rect(sx, y, sw, slotH, 5);

      fill(170);
      textSize(11);
      textAlign(CENTER, CENTER);
      noStroke();
      text('[ place bullet here ]', sx + sw / 2, y + slotH / 2);
    }
  }
}

// ─── Right panel: feedback ────────────────────────────────────────────────────
function drawFeedbackPanel() {
  // Header
  fill(120, 60, 140);
  noStroke();
  rect(rightX, 0, rightW, 30);
  fill('white');
  textSize(12);
  textAlign(CENTER, CENTER);
  noStroke();
  text('FEEDBACK', rightX + rightW / 2, 15);

  let slotH  = 80;
  let gapH   = 12;
  let startY = 48;
  let rx     = rightX + 4;
  let rw     = rightW - 8;

  let totalPassed = 0;
  let totalPossible = 0;

  for (let s = 0; s < 3; s++) {
    let y = startY + s * (slotH + gapH);

    if (slots[s] !== null) {
      let bt = bullets[slots[s]].text;
      let hasVerb   = checkVerb(bt);
      let hasNumber = checkNumber(bt);
      if (hasVerb)   totalPassed++;
      if (hasNumber) totalPassed++;
      totalPossible += 2;

      fill('white');
      stroke('silver');
      strokeWeight(1);
      rect(rx, y, rw, slotH, 5);

      drawCheck(rx + 4, y + 10, rw - 8, hasVerb,
        'Action verb',
        hasVerb ? 'Starts with a strong verb ✓' : 'Start with: Designed, Led, Built…');

      drawCheck(rx + 4, y + 46, rw - 8, hasNumber,
        'Quantified result',
        hasNumber ? 'Includes a number ✓' : 'Add a number (%, lbs, count, $…)');

    } else {
      fill(248);
      stroke('silver');
      strokeWeight(1);
      rect(rx, y, rw, slotH, 5);
      fill(175);
      textSize(10);
      textAlign(CENTER, CENTER);
      noStroke();
      text('place a bullet\nto see feedback', rx + rw / 2, y + slotH / 2);
    }
  }

  // Overall score when all slots are filled
  if (slots.every(s => s !== null) && totalPossible > 0) {
    let pct = round((totalPassed / totalPossible) * 100);
    let scoreY = startY + 3 * (slotH + gapH) + 6;
    let scoreColor = pct >= 80 ? color(30, 130, 30) : pct >= 50 ? color(180, 120, 0) : color(170, 40, 40);
    fill(scoreColor);
    noStroke();
    textSize(12);
    textAlign(CENTER, TOP);
    text('Resume strength: ' + pct + '%', rightX + rightW / 2, scoreY);
    fill(80);
    textSize(9);
    textAlign(CENTER, TOP);
    text('(' + totalPassed + ' of ' + totalPossible + ' criteria met)', rightX + rightW / 2, scoreY + 16);
  }
}

function drawCheck(x, y, w, passed, label, msg) {
  let col = passed ? color(40, 150, 40) : color(190, 50, 50);
  // Circle icon
  fill(col);
  noStroke();
  circle(x + 9, y + 8, 17);
  fill('white');
  textSize(11);
  textAlign(CENTER, CENTER);
  noStroke();
  text(passed ? '✓' : '✗', x + 9, y + 8);
  // Text
  fill(passed ? color(20, 100, 20) : color(130, 20, 20));
  textSize(10);
  textAlign(LEFT, TOP);
  noStroke();
  text(label, x + 22, y);
  fill(70);
  textSize(9);
  text(msg, x + 22, y + 13);
}

// ─── Control area ──────────────────────────────────────────────────────────────
function drawControls() {
  fill(80);
  textSize(11);
  textAlign(CENTER, CENTER);
  noStroke();
  text(
    'Click a bullet to select it · Click a slot to place it · Click a placed bullet to remove it',
    canvasWidth / 2 + 30, drawHeight + 25
  );
}

// ─── Mouse interaction ─────────────────────────────────────────────────────────
function mousePressed() {
  if (mouseY > drawHeight) return; // ignore clicks in control area

  // Left panel — select / deselect a bullet
  if (mouseX < leftW) {
    let i = floor((mouseY - bulletStartY) / bulletRowH);
    if (i >= 0 && i < bullets.length && !slots.includes(i)) {
      selectedIdx = (selectedIdx === i) ? -1 : i;
    }
    return;
  }

  // Center panel — place or remove
  if (mouseX >= centerX && mouseX < rightX) {
    let slotH  = 80;
    let gapH   = 12;
    let startY = 48;
    let sx     = centerX + 6;
    let sw     = centerW - 12;

    for (let s = 0; s < 3; s++) {
      let y = startY + s * (slotH + gapH);
      if (mouseX >= sx && mouseX <= sx + sw && mouseY >= y && mouseY <= y + slotH) {
        if (slots[s] === null && selectedIdx >= 0) {
          slots[s] = selectedIdx;
          selectedIdx = -1;
        } else if (slots[s] !== null) {
          // Return bullet to pool
          slots[s] = null;
        }
        return;
      }
    }
  }
}

// ─── Helpers ───────────────────────────────────────────────────────────────────
function resetAll() {
  selectedIdx = -1;
  slots = [null, null, null];
}

function checkVerb(txt) {
  if (!txt) return false;
  let first = txt.trim().split(' ')[0].toLowerCase().replace(/[^a-z]/g, '');
  return actionVerbs.includes(first);
}

function checkNumber(txt) {
  return txt ? /\d/.test(txt) : false;
}

// Wrap text to fit within maxW pixels, stopping at maxH pixels total height
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
