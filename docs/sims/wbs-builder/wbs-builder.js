// Work Breakdown Structure Builder MicroSim
// CANVAS_HEIGHT: 560
// Students build a 3-level WBS by editing deliverables and tasks in a visual tree.
// No p5.js canvas — pure HTML/CSS injected into document.querySelector('main').

document.addEventListener('DOMContentLoaded', function () {

  // ─── Data model ─────────────────────────────────────────────────────────────
  let projectName = 'My Engineering Project';
  let deliverables = [
    {
      name: 'Research',
      tasks: ['Literature Review', 'Expert Interviews']
    }
  ];

  // ─── Inject container ───────────────────────────────────────────────────────
  const main = document.querySelector('main');
  main.style.cssText = 'width:100%;box-sizing:border-box;';

  const style = document.createElement('style');
  style.textContent = `
    #wbs-root { font-family: Arial, Helvetica, sans-serif; background: aliceblue;
      padding: 12px; box-sizing: border-box; min-height: 540px; }
    #wbs-toolbar { display:flex; gap:8px; margin-bottom: 12px; align-items:center; }
    #wbs-toolbar button { padding: 5px 12px; border-radius: 4px; border: 1px solid #999;
      cursor: pointer; font-size: 13px; background: #f0f0f0; }
    #wbs-toolbar button:hover { background: #dde; }
    #btn-add-del { background: steelblue; color: white; border-color: steelblue; }
    #btn-export  { background: #555; color: white; border-color: #555; }
    .wbs-project-node { background: teal; color: white; border-radius: 6px;
      padding: 8px 18px; display: inline-block; font-size: 14px; font-weight: bold;
      cursor: default; }
    .wbs-project-input { border: none; background: transparent; color: white;
      font-size: 14px; font-weight: bold; outline: none; width: 240px; text-align:center; }
    .level1-row { display:flex; justify-content:center; margin-bottom: 4px; }
    .connector-v { width: 2px; height: 20px; background: #aaa; margin: 0 auto; }
    .connector-h { height: 2px; background: #aaa; }
    .deliverables-track { display:flex; gap:0; justify-content:center;
      align-items:flex-start; }
    .del-col { display:flex; flex-direction:column; align-items:center; flex: 1; max-width: 220px; }
    .del-node { background: steelblue; color: white; border-radius: 5px;
      padding: 6px 8px; width: 100%; box-sizing: border-box; display:flex;
      gap:4px; align-items:center; margin-bottom: 4px; }
    .del-node input { border:none; background:transparent; color:white;
      font-size:12px; font-weight:bold; outline:none; flex:1; min-width:0; }
    .del-node button { background: rgba(255,255,255,0.25); color:white; border:none;
      border-radius:3px; cursor:pointer; font-size:10px; padding:2px 5px; }
    .task-list { display:flex; flex-direction:column; gap:4px; width:100%;
      padding: 0 4px; box-sizing:border-box; }
    .task-node { background:white; border:1.5px solid steelblue; border-radius:4px;
      padding:4px 6px; display:flex; gap:4px; align-items:center; }
    .task-node input { border:none; background:transparent; color:#333;
      font-size:11px; outline:none; flex:1; min-width:0; }
    .task-node button { background:#eef; color:#446; border:none; border-radius:3px;
      cursor:pointer; font-size:10px; padding:2px 4px; }
    .btn-add-task { margin-top:4px; padding:3px 8px; font-size:11px;
      background:#e8f0fe; border:1px solid steelblue; border-radius:3px;
      cursor:pointer; color:steelblue; }
    .btn-add-task:hover { background:#c8d8fe; }
    #export-box { margin-top: 10px; width:100%; height:80px; font-family:monospace;
      font-size:11px; padding:6px; box-sizing:border-box; border:1px solid #ccc;
      border-radius:4px; background:white; resize:vertical; }
  `;
  document.head.appendChild(style);

  const container = document.createElement('div');
  container.id = 'wbs-root';
  main.appendChild(container);

  // ─── Render ─────────────────────────────────────────────────────────────────
  function render() {
    container.innerHTML = '';

    // Toolbar
    const toolbar = document.createElement('div');
    toolbar.id = 'wbs-toolbar';
    const addDelBtn = document.createElement('button');
    addDelBtn.id = 'btn-add-del';
    addDelBtn.textContent = '+ Add Deliverable';
    addDelBtn.disabled = deliverables.length >= 4;
    addDelBtn.addEventListener('click', () => {
      if (deliverables.length < 4) {
        deliverables.push({ name: 'Deliverable ' + (deliverables.length + 1), tasks: ['Task 1'] });
        render();
      }
    });
    const exportBtn = document.createElement('button');
    exportBtn.id = 'btn-export';
    exportBtn.textContent = 'Export Text';
    exportBtn.addEventListener('click', exportWBS);
    toolbar.appendChild(addDelBtn);
    toolbar.appendChild(exportBtn);
    container.appendChild(toolbar);

    // Level 1 — Project root
    const l1Row = document.createElement('div');
    l1Row.className = 'level1-row';
    const projNode = document.createElement('div');
    projNode.className = 'wbs-project-node';
    const projInput = document.createElement('input');
    projInput.className = 'wbs-project-input';
    projInput.value = projectName;
    projInput.addEventListener('input', e => { projectName = e.target.value; });
    projNode.appendChild(projInput);
    l1Row.appendChild(projNode);
    container.appendChild(l1Row);

    // Connector from root down
    if (deliverables.length > 0) {
      const cv = document.createElement('div');
      cv.className = 'connector-v';
      container.appendChild(cv);
    }

    // Deliverables row
    const track = document.createElement('div');
    track.className = 'deliverables-track';

    deliverables.forEach((del, di) => {
      const col = document.createElement('div');
      col.className = 'del-col';

      // Connector-v above deliverable
      const cv2 = document.createElement('div');
      cv2.className = 'connector-v';
      col.appendChild(cv2);

      // Deliverable node
      const delNode = document.createElement('div');
      delNode.className = 'del-node';
      const delInput = document.createElement('input');
      delInput.value = del.name;
      delInput.addEventListener('input', e => { deliverables[di].name = e.target.value; });
      const delDelBtn = document.createElement('button');
      delDelBtn.textContent = '✕';
      delDelBtn.title = 'Remove deliverable';
      delDelBtn.addEventListener('click', () => {
        deliverables.splice(di, 1);
        render();
      });
      delNode.appendChild(delInput);
      delNode.appendChild(delDelBtn);
      col.appendChild(delNode);

      // Connector-v to tasks
      if (del.tasks.length > 0) {
        const cv3 = document.createElement('div');
        cv3.className = 'connector-v';
        col.appendChild(cv3);
      }

      // Task list
      const taskList = document.createElement('div');
      taskList.className = 'task-list';
      del.tasks.forEach((task, ti) => {
        const taskNode = document.createElement('div');
        taskNode.className = 'task-node';
        const taskInput = document.createElement('input');
        taskInput.value = task;
        taskInput.addEventListener('input', e => { deliverables[di].tasks[ti] = e.target.value; });
        const taskDelBtn = document.createElement('button');
        taskDelBtn.textContent = '✕';
        taskDelBtn.addEventListener('click', () => {
          deliverables[di].tasks.splice(ti, 1);
          render();
        });
        taskNode.appendChild(taskInput);
        taskNode.appendChild(taskDelBtn);
        taskList.appendChild(taskNode);
      });

      // Add task button (max 3 tasks)
      if (del.tasks.length < 3) {
        const addTaskBtn = document.createElement('button');
        addTaskBtn.className = 'btn-add-task';
        addTaskBtn.textContent = '+ Add Task';
        addTaskBtn.addEventListener('click', () => {
          deliverables[di].tasks.push('Task ' + (deliverables[di].tasks.length + 1));
          render();
        });
        taskList.appendChild(addTaskBtn);
      }
      col.appendChild(taskList);
      track.appendChild(col);
    });

    container.appendChild(track);
  }

  function exportWBS() {
    let out = projectName + '\n';
    deliverables.forEach((del, di) => {
      out += '  ' + (di + 1) + '. ' + del.name + '\n';
      del.tasks.forEach((t, ti) => {
        out += '    ' + (di + 1) + '.' + (ti + 1) + ' ' + t + '\n';
      });
    });
    // Show in a textarea below the tree
    let box = document.getElementById('export-box');
    if (!box) {
      box = document.createElement('textarea');
      box.id = 'export-box';
      box.readOnly = true;
      container.appendChild(box);
    }
    box.value = out;
    box.style.display = 'block';
  }

  render();
});
