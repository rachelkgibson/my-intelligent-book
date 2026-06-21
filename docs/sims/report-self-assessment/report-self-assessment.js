// Technical Report Self-Assessment Checklist MicroSim
// CANVAS_HEIGHT: 602
// Students toggle 20 checklist items across 5 sections through 3 states:
// Not Done → In Progress → Complete. Progress bar updates in real time.

let canvasWidth = 800;
let drawHeight = 550;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

let scrollY = 0;
let maxScrollY = 0;
const PROGRESS_BAR_H = 24;
const HEADER_H = 28;
const ITEM_H = 24;

const sections = [
  {
    title: 'STRUCTURE',
    color: 'steelblue',
    items: [
      'Executive summary is 150–250 words and stands alone',
      'Problem statement includes Situation, Need, Goal, and Constraints',
      'All 8+ proposal sections are present and in correct order',
      'Page numbers and headers are consistent throughout'
    ]
  },
  {
    title: 'WRITING QUALITY',
    color: 'darkorange',
    items: [
      'Every paragraph has a clear topic sentence',
      'Technical terms are defined on first use',
      'Sentences average 15–22 words (not too short or too long)',
      'No first-person plural ("we did") — use "the team" or passive voice'
    ]
  },
  {
    title: 'EVIDENCE',
    color: 'forestgreen',
    items: [
      'Every claim is supported by data, testing results, or a citation',
      'All figures and tables have numbered captions',
      'Testing results include specific measurements, not just "it worked"',
      'Comparisons use quantitative data where possible'
    ]
  },
  {
    title: 'FORMATTING',
    color: 'mediumpurple',
    items: [
      'Font is consistent (one typeface, 2 sizes max)',
      'All headings follow the same style',
      'Margins are 1 inch on all sides',
      'Images are clear, labeled, and not pixelated'
    ]
  },
  {
    title: 'CITATIONS',
    color: 'teal',
    items: [
      'All sources are cited in IEEE or APA format consistently',
      'Every citation in the text has a matching entry in References',
      'Web sources include the date accessed',
      'No Wikipedia used as a primary source'
    ]
  }
];

// Build flat item list with section references
const allItems = [];
for (let si = 0; si < sections.length; si++) {
  for (let ii = 0; ii < sections[si].items.length; ii++) {
    allItems.push({ sectionIdx: si, text: sections[si].items[ii], state: 0 });
    // state: 0=Not Done, 1=In Progress, 2=Complete
  }
}

// Build layout: interleave section headers and items
// Returns array of { type: 'header'|'item', h, sectionIdx?, itemIdx? }
function buildLayout() {
  const rows = [];
  let itemIdx = 0;
  for (let si = 0; si < sections.length; si++) {
    rows.push({ type: 'header', h: HEADER_H, sectionIdx: si });
    for (let ii = 0; ii < sections[si].items.length; ii++) {
      rows.push({ type: 'item', h: ITEM_H, itemIdx: itemIdx++ });
    }
  }
  return rows;
}

let layout = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  layout = buildLayout();
  // Calculate total scrollable height
  let total = 0;
  for (let r of layout) total += r.h;
  const visibleH = drawHeight - PROGRESS_BAR_H - 4;
  maxScrollY = max(0, total - visibleH);

  describe(
    'Technical Report Self-Assessment: 20 checklist items in 5 sections. ' +
    'Click any item to advance its state: Not Done → In Progress → Complete. ' +
    'Scroll to see all items. Progress bar updates at the top.',
    LABEL
  );
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) canvasWidth = container.offsetWidth;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

// ─── Main draw ───────────────────────────────────────────────────────────────
function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  drawProgressBar();
  drawChecklist();
  drawScrollHint();
  drawControlArea();
}

// ─── Progress bar ─────────────────────────────────────────────────────────────
function drawProgressBar() {
  let done = allItems.filter(i => i.state === 2).length;
  let inProg = allItems.filter(i => i.state === 1).length;
  let pct = round(done / allItems.length * 100);

  // Bar background
  fill(220);
  noStroke();
  rect(0, 0, canvasWidth, PROGRESS_BAR_H);

  // Done portion (green)
  if (done > 0) {
    fill(34, 139, 34);
    rect(0, 0, canvasWidth * done / allItems.length, PROGRESS_BAR_H);
  }
  // In-progress portion (gold)
  if (inProg > 0) {
    fill(220, 160, 0);
    let startX = canvasWidth * done / allItems.length;
    rect(startX, 0, canvasWidth * inProg / allItems.length, PROGRESS_BAR_H);
  }

  // Label
  let labelColor = pct === 100 ? color(255) : color(255);
  fill(255);
  textSize(11);
  textAlign(CENTER, CENTER);
  noStroke();
  text(done + ' of 20 complete (' + pct + '%)', canvasWidth / 2, PROGRESS_BAR_H / 2);

  // Progress bar border
  noFill();
  stroke(180);
  strokeWeight(1);
  rect(0, 0, canvasWidth, PROGRESS_BAR_H);
}

// ─── Checklist ────────────────────────────────────────────────────────────────
function drawChecklist() {
  const listStartY = PROGRESS_BAR_H + 4;
  const visibleH = drawHeight - listStartY;

  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(0, listStartY, canvasWidth, visibleH);
  drawingContext.clip();

  let y = listStartY - scrollY;

  for (let row of layout) {
    if (y + row.h < listStartY) { y += row.h; continue; }
    if (y > drawHeight) break;

    if (row.type === 'header') {
      let sec = sections[row.sectionIdx];
      fill(sec.color);
      noStroke();
      rect(0, y, canvasWidth, row.h);
      fill('white');
      textSize(11);
      textAlign(LEFT, CENTER);
      noStroke();
      text(sec.title, 10, y + row.h / 2);

      // Section completion count
      let sectionItems = allItems.filter(it => it.sectionIdx === row.sectionIdx);
      let secDone = sectionItems.filter(it => it.state === 2).length;
      textAlign(RIGHT, CENTER);
      text(secDone + '/' + sectionItems.length + ' complete', canvasWidth - 10, y + row.h / 2);
    } else {
      let item = allItems[row.itemIdx];
      // Row background
      let rowBg = item.state === 2 ? color(230, 250, 230) :
                  item.state === 1 ? color(255, 248, 220) :
                                     color(248, 248, 255);
      fill(rowBg);
      stroke(220);
      strokeWeight(0.5);
      rect(0, y, canvasWidth, row.h);

      // State circle
      let circCol = item.state === 2 ? color(34, 139, 34) :
                    item.state === 1 ? color(220, 160, 0) :
                                       color(180, 180, 180);
      fill(circCol);
      noStroke();
      circle(18, y + row.h / 2, 14);
      fill('white');
      textSize(9);
      textAlign(CENTER, CENTER);
      noStroke();
      text(item.state === 2 ? '✓' : item.state === 1 ? '…' : ' ', 18, y + row.h / 2);

      // Item text
      fill(40);
      textSize(11);
      textAlign(LEFT, CENTER);
      noStroke();
      text(item.text, 34, y + row.h / 2);

      // State label on right
      let stateLabel = item.state === 2 ? 'Complete' :
                       item.state === 1 ? 'In Progress' : 'Not Done';
      fill(item.state === 2 ? color(34, 100, 34) : item.state === 1 ? color(180, 120, 0) : color(140));
      textSize(9);
      textAlign(RIGHT, CENTER);
      noStroke();
      text(stateLabel, canvasWidth - 8, y + row.h / 2);
    }

    y += row.h;
  }

  drawingContext.restore();

  // Scrollbar
  let total = 0;
  for (let r of layout) total += r.h;
  if (total > visibleH) {
    let sbH = max(30, visibleH * visibleH / total);
    let sbY = listStartY + scrollY / total * visibleH;
    fill(180);
    noStroke();
    rect(canvasWidth - 6, sbY, 5, sbH, 3);
  }
}

function drawScrollHint() {
  if (maxScrollY > 0 && scrollY < maxScrollY) {
    fill(120);
    textSize(9);
    textAlign(CENTER, BOTTOM);
    noStroke();
    text('▼ scroll to see all 20 items', canvasWidth / 2, drawHeight - 2);
  }
}

// ─── Control area ─────────────────────────────────────────────────────────────
function drawControlArea() {
  fill(80);
  textSize(10);
  textAlign(CENTER, CENTER);
  noStroke();
  text(
    'Click any item to cycle: Not Done → In Progress → Complete   ·   Scroll to see all 20 items',
    canvasWidth / 2, drawHeight + 25
  );
}

// ─── Mouse interaction ─────────────────────────────────────────────────────────
function mousePressed() {
  if (mouseY <= PROGRESS_BAR_H || mouseY >= drawHeight) return;

  const listStartY = PROGRESS_BAR_H + 4;
  let y = listStartY - scrollY;

  for (let row of layout) {
    if (mouseY >= y && mouseY < y + row.h) {
      if (row.type === 'item') {
        allItems[row.itemIdx].state = (allItems[row.itemIdx].state + 1) % 3;
      }
      return;
    }
    y += row.h;
  }
}

function mouseWheel(event) {
  if (mouseY > 0 && mouseY < drawHeight) {
    scrollY = constrain(scrollY + event.delta * 0.5, 0, maxScrollY);
    return false;
  }
}
