---
title: Project Checkpoint #1 Assignment
description: Students present a design model of their engineering solution at the Design Model Review, demonstrating that they have made a committed design decision and can represent it in a formal model.
generated_by: claude skill chapter-content-generator
date: 2026-06-19
version: 0.09
---

# Project Checkpoint #1 Assignment

## Objectives

- Build a design model or early prototype and demonstrate it to your teacher and peers.
- Present your progress against the project schedule.
- Receive and incorporate feedback to guide the next phase of your project.

## Introduction

By Checkpoint 1, you have defined your problem, documented your requirements, chosen a solution direction, and begun work. Now it is time to demonstrate that you can represent your design in a formal model — not just describe it in words, but show it in a format that communicates geometry, relationships, and function to someone unfamiliar with your project.

A model at this stage does not need to be final or perfect. It needs to be specific enough to evaluate and build from.

---

## Modeling Techniques

Before, during, or sometimes instead of physical prototyping, engineers use **modeling** to represent, analyze, and communicate a design. A **model** is a simplified representation of a system that captures the aspects most relevant to the question being asked. All models leave some things out — a good model leaves out the right things.

The most common modeling techniques used in high school engineering:

- **Sketches and technical drawings** — 2D or 3D hand-drawn or CAD representations that communicate geometry, dimensions, and component relationships
- **Scale models** — Physical models built to a fixed ratio of the full-size design; useful for spatial understanding and stakeholder communication
- **Mathematical models** — Equations and calculations that describe how the system behaves (structural load calculations, heat transfer equations)
- **Flowcharts and system diagrams** — Visual maps of how a process or system works; especially useful for software, processes, and feedback systems
- **CAD models** — 3D digital models created in software like Fusion 360, SolidWorks, or Tinkercad that can be viewed from any angle and used to generate manufacturing drawings

For Checkpoint 1, you are expected to include at least one formal model of your current design. The model should represent your design well enough that a person unfamiliar with your project could understand what you are building and how the key components relate to each other.

---

## Simulation Software

**Simulation software** takes a model further by using computation to predict how a system will behave under different conditions — without having to build or test a physical version. Simulations save time, allow engineers to test conditions that would be dangerous in the lab, and help identify failure modes before they happen.

Several simulation tools are accessible at the high school level:

| Tool | Type | Common Uses |
|---|---|---|
| MATLAB/Simulink | Mathematical / dynamic systems | Control systems, signal processing |
| Fusion 360 (FEA) | CAD + Finite Element Analysis | Structural stress, heat distribution |
| Tinkercad Circuits | Electronics simulation | Circuit behavior, Arduino code testing |
| GeoGebra | Mathematical visualization | Geometry, graphing, parametric models |
| Excel/Google Sheets | Spreadsheet modeling | Budget models, data analysis, sensitivity analysis |
| PhET Simulations | Physics phenomena | Forces, energy, waves (free, browser-based) |

You do not need professional-grade simulation software to satisfy Checkpoint 1. A well-structured spreadsheet model or a circuit simulation in Tinkercad may be entirely appropriate for your project. What matters is that your model is accurate, clearly documented, and supports a specific design decision.

#### Diagram: Modeling and Simulation Tool Selector


<iframe src="../../sims/modeling-tool-selector/main.html" width="100%" height="450px" scrolling="no"></iframe>
[Run Modeling and Simulation Tool Selector Fullscreen](../../sims/modeling-tool-selector/main.html)

<details markdown="1">
<summary>Interactive Modeling Tool Selector</summary>
Type: interactive infographic
**sim-id:** modeling-tool-selector<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Students will *evaluate* (Bloom L5) which modeling or simulation tool is most appropriate for their specific project type by working through a guided selection decision tree.

**Canvas:** 800 × 480 px, responsive.

**Interaction model:** A branching decision tree with clickable Yes/No nodes:
- "Does your project involve physical structure or mechanical forces?" → FEA / CAD path
- "Does your project involve electronic circuits?" → Tinkercad Circuits path
- "Does your project primarily involve data, cost, or schedule analysis?" → Spreadsheet path
- "Does your project involve a process or system with multiple steps?" → Flowchart / system diagram path
- "Does your project involve mathematical relationships between variables?" → GeoGebra or MATLAB path

**Implementation:** Embed as `docs/sims/modeling-tool-selector/index.html` using p5.js CDN. Iframe at 540 px height.
</details>

---

## What to Submit at Checkpoint 1

Your Checkpoint 1 submission includes:

1. **Your design model** — at least one formal model (CAD drawing, schematic, simulation output, scale model photos, or mathematical model) with clear labels and annotations
2. **A brief model description** — what the model shows, what tool you used, and what design decision it supports
3. **Updated work log** — current through the checkpoint date
4. **Updated schedule** — your original schedule with actual progress noted and any revisions explained

!!! example "Submit Through Canvas"
    Upload your design model and supporting documentation to the Checkpoint 1 assignment in Canvas by the due date. Your teacher will provide written feedback within one week.

---

## Assignment Summary

Checkpoint 1 is a progress check, not a final evaluation. A strong Checkpoint 1 submission shows:

- A **formal design model** that clearly represents your current design direction
- Evidence that you understand your design well enough to **explain it to someone unfamiliar with your project**
- An **updated schedule** that honestly reflects where you are vs. where you planned to be
- A **work log** that documents the work leading up to this point

Use the feedback you receive at Checkpoint 1 to refine your design and adjust your plan before Checkpoint 2.
