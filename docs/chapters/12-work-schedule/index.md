---
title: Project Work Schedule Assignment
description: Students plan project execution by building a work breakdown structure, identifying milestones, and creating a Gantt chart schedule using industry-standard project management tools.
generated_by: claude skill chapter-content-generator
date: 2026-06-19
version: 0.09
---

# Project Work Schedule Assignment

## Objectives

- Build a work breakdown structure that decomposes your project into manageable tasks.
- Identify task dependencies and critical-path milestones.
- Create a Gantt chart schedule for the execution phase of your capstone project.

## Introduction

A well-designed solution that cannot be built on time is not a viable engineering solution. Professional engineers do not simply start building after a problem is defined — they invest significant effort in planning the work before the work begins. That planning produces a foundational document: a **project schedule**.

In this chapter you will learn how working engineers break large projects into trackable pieces, sequence those pieces logically, assign time estimates, and translate the resulting plan into a visual schedule. Your completed work schedule will become a key section of your project proposal in Chapter 9.

---

## The Work Breakdown Structure

Before you can schedule anything, you need to know exactly what needs to be done. A **Work Breakdown Structure (WBS)** is a hierarchical decomposition of all the work required to complete a project. It breaks the project down from a single goal at the top into progressively smaller deliverables and tasks at lower levels.

The WBS uses a tree structure with three typical levels:

- **Level 1 — Project** (the overall goal, e.g., "Automated Plant Watering System")
- **Level 2 — Major Deliverables** (e.g., "Hardware Assembly," "Software Development," "Testing and Documentation")
- **Level 3 — Work Packages** (specific, assignable tasks, e.g., "Wire moisture sensor to microcontroller," "Write data-logging function," "Conduct three-day field test")

A work package is the fundamental unit of the WBS. It should be small enough to estimate accurately (typically 4–20 hours of effort) and produce a concrete, verifiable output.

#### Diagram: WBS Builder

<details markdown="1">
<summary>Interactive Work Breakdown Structure Builder</summary>
Type: interactive infographic
**sim-id:** wbs-builder<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Students will *construct* (Bloom L6 — Create) a three-level WBS for their practicum project by typing deliverables and tasks into an editable tree structure.

**Canvas:** 900 × 540 px, responsive to window resize.

**Layout:** Tree drawn top-down. The root node (Level 1) is centered at the top. Level 2 nodes branch below it. Level 3 nodes branch below each Level 2 node. Nodes are rounded rectangles; lines connect parent to children.

**Controls:**
- "Add Deliverable" button — appends a new Level 2 node to the tree (labeled "Deliverable N")
- "Add Task" button — appends a Level 3 node under the currently selected Level 2 node
- Double-click any node to enter edit mode (inline text field); press Enter or click away to confirm
- Click a node to select it (highlighted with a gold border)
- Right-click a node → context menu with "Delete" option

**Hover behavior:** Hovering over any node shows a tooltip: "Level 2 = Major Deliverable (a grouping of related tasks). Level 3 = Work Package (one specific, measurable task)."

**Export:** A "Copy as Text" button formats the tree as an indented outline and copies it to the clipboard, which students can paste into their planning document.

**Implementation:** Standalone HTML at `docs/sims/wbs-builder/index.html`. Iframe in chapter at 580 px height.
</details>

### Milestone Planning

Once the WBS is built, the next step is to identify **milestones**. A **milestone** is a significant event or checkpoint in a project that marks the completion of a major phase or deliverable. Milestones do not represent work — they represent achievement. Saying "Hardware assembled and verified" is a milestone; "Solder components to circuit board" is a task.

Milestones serve several purposes in project planning:

- They give the team short-term targets that are easier to stay motivated around than a distant final deadline
- They give stakeholders (your teacher, your review panel) visible checkpoints to assess progress
- They serve as decision gates — if a milestone is missed or delivered with problems, the team evaluates whether to continue, revise the plan, or change direction

For a practicum project lasting one semester, you should identify approximately four to eight milestones, spaced roughly three to four weeks apart.

### Schedule Development

**Schedule development** is the process of assigning start dates, end dates, and durations to each task in the WBS — then sequencing those tasks logically based on dependencies. A **task dependency** is a relationship between two tasks that constrains when one can start relative to when another finishes.

There are four standard dependency types:

| Dependency Type | Meaning | Example |
|---|---|---|
| Finish-to-Start (FS) | B cannot start until A finishes | Write code → Test code |
| Start-to-Start (SS) | B cannot start until A starts | Research A and Research B can run in parallel |
| Finish-to-Finish (FF) | B cannot finish until A finishes | Report editing finishes when data collection finishes |
| Start-to-Finish (SF) | B cannot finish until A starts | Rare; mostly used in shift-handoff planning |

Finish-to-Start is by far the most common dependency type you will use. Identifying your FS dependencies first will reveal the **critical path** — the longest chain of dependent tasks from start to finish. Any delay on the critical path delays the entire project.

### The Gantt Chart

A **Gantt chart** is a horizontal bar chart that displays the schedule for a project, with tasks listed on the vertical axis, time on the horizontal axis, and bars that show the duration and timing of each task. Named after mechanical engineer Henry Gantt (1861–1919), who popularized them in early 20th-century manufacturing, Gantt charts remain the most widely used schedule visualization in engineering and project management today.

Key elements of a Gantt chart include:

- **Task bars** — horizontal bars whose length represents task duration
- **Milestone diamonds** — diamond shapes marking key completion points
- **Dependency arrows** — lines connecting tasks that have finish-to-start relationships
- **Today line** — a vertical line showing the current date, used during execution to compare planned vs. actual progress

#### Diagram: Interactive Gantt Chart Builder

<details markdown="1">
<summary>Interactive Gantt Chart Builder MicroSim</summary>
Type: MicroSim
**sim-id:** gantt-chart-builder<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Students will *apply* (Bloom L3) schedule development skills by building a Gantt chart from a task list with durations and dependencies, and observing how changing one task's duration shifts the critical path.

**Canvas:** Full-width × 560 px, responsive.

**Left panel (280 px) — Task Input Table:**
A table with four columns: Task Name (text input), Start Week (number 1–16), Duration (weeks, number 1–8), and Is Milestone? (checkbox). An "Add Task" button adds a new row. A "Clear All" button resets to a starter set of 5 sample tasks.

**Right panel — Gantt View:**
Horizontal axis: weeks 1–16 (representing a 16-week semester). Vertical axis: task rows matching left-panel order. Each task is drawn as a blue bar; milestone tasks are rendered as gold diamonds at their start week. A red vertical line marks "Week 6" (the current week by default — adjustable via a slider labeled "Today").

**Critical Path Highlighting:** A "Show Critical Path" toggle highlights in red all task bars that form the longest dependent chain. Dependency connections are specified by the student entering a comma-separated list of prerequisite task numbers in an optional "Depends On" column.

**Hover behavior:** Hovering over any bar shows a tooltip: task name, start date, end date, and whether it is on the critical path.

**Export:** A "Print View" button opens a print-optimized version of the Gantt chart in a new tab.

**Implementation:** Standalone HTML at `docs/sims/gantt-chart-builder/index.html`. Iframe at 620 px height.
</details>

### Scheduling Tools and Project Management Software

Professional engineers rarely build Gantt charts by hand. They use **scheduling tools** — software applications designed to create, maintain, and share project schedules. Understanding the tools available helps you choose the right one for your project's complexity and your team's resources.

| Tool | Type | Cost | Best For |
|---|---|---|---|
| Microsoft Project | Desktop + cloud | Paid (often school-licensed) | Complex, multi-resource projects |
| Smartsheet | Cloud | Freemium | Team collaboration and real-time updates |
| Asana | Cloud | Free tier available | Task tracking with Gantt add-on |
| Trello | Cloud | Free tier available | Kanban-style task boards |
| Google Sheets | Cloud | Free | Simple Gantt charts built manually |
| ProjectLibre | Desktop | Free, open-source | MS Project alternative |

**Project management software** is the broader category that includes scheduling tools but also covers task assignment, file sharing, budget tracking, and communication. For your practicum project, any tool that lets you display tasks, durations, and dates in a Gantt-style view is sufficient.

### Work Schedule Creation and Resource Allocation

A **work schedule** is the final, committed version of your project plan — the document you will actually use to guide your work and measure your progress against. It combines your WBS, your Gantt chart, and your resource assignments into one living document.

**Resource allocation** is the process of assigning the people, materials, equipment, and time needed to complete each task. For a solo practicum project, the primary resource is your own time. Allocating it realistically means estimating not just how long each task takes, but when during the week you have time to work on it.

To build a realistic work schedule:

1. List all tasks from your WBS with durations
2. Assign each task to a week range in the semester
3. Check that no week exceeds your available work hours (typically 3–5 hours per week for this course)
4. Identify your milestones and mark their target dates
5. Build in at least one buffer week before major deadlines — unexpected delays are common

---

## Chapter Summary

Planning is not overhead — it is engineering. The schedule you produce in this chapter is not a bureaucratic requirement; it is evidence that your project is feasible and that you have thought carefully about how to execute it.

Here is what you should be able to explain after completing this chapter:

- A **Work Breakdown Structure** decomposes the entire project into trackable work packages before any scheduling begins.
- **Milestone planning** creates meaningful checkpoints that give you and your stakeholders short-term targets to track.
- **Schedule development** sequences tasks using dependency relationships, identifies the critical path, and assigns realistic durations.
- A **Gantt chart** visualizes the full schedule on a time axis with task bars, milestone markers, and dependency lines.
- **Project management software** (MS Project, Smartsheet, Google Sheets, etc.) is the standard professional tool for building and maintaining schedules.
- **Resource allocation** matches your available time and materials to the tasks in your plan, preventing over-commitment.

Your Project Work Schedule assignment will take each of these concepts into a real plan for your specific practicum project. Start with the WBS and work outward — everything else flows from knowing exactly what needs to be done.
