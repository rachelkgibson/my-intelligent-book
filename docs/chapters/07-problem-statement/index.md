---
title: Problem Statement Assignment
description: Students define their engineering challenge by identifying the problem, assessing needs, recognizing the opportunity, and writing a specific, measurable engineering challenge definition.
generated_by: claude skill chapter-content-generator
date: 2026-06-19
version: 0.09
---

# Problem Statement Assignment

## Objectives

- Define an engineering problem clearly, specifically, and measurably.
- Identify the constraints and criteria that any viable solution must satisfy.
- Write a formal problem statement that will anchor your project proposal.

## Introduction

Every engineering project begins not with a solution, but with a problem. Before you can design anything, you need to clearly understand what challenge you are trying to address, who is affected by it, and what limitations your solution must work within.

Your project topic from Assignment 6 identified the general area you want to work in. This assignment takes that idea and sharpens it into a focused, professional engineering challenge definition — precise enough that someone who has never heard of your project could read it and understand exactly what problem you are solving and what a successful solution would look like.

---

## Problem Identification

**Problem identification** is the process of recognizing that a gap exists between how things currently work and how they could or should work. In engineering, a problem is not simply an annoyance — it is an observable condition that causes harm, inefficiency, or unmet need for a specific group of people or a system.

Engineers find problems by observing the world carefully, listening to the people who experience a gap, and asking questions like:

- Who is affected, and how often?
- What is the cost — in time, money, safety, or quality of life — of leaving this problem unsolved?
- Has someone already tried to solve it? Why did that approach fall short?

Not every frustration is a viable engineering problem. A problem worth engineering has a measurable impact, a definable scope, and at least the possibility of a designed solution.

---

## Needs Assessment

Once you have identified a candidate problem, the next step is a **needs assessment** — a structured investigation that confirms the problem is real, helps you understand it fully, and determines whether it is worth solving. A needs assessment for a practicum project typically involves:

1. **Stakeholder interviews** — talking directly to people who experience the problem
2. **Data collection** — gathering numbers that quantify the impact (how many people, how often, what cost)
3. **Root cause analysis** — asking "why does this problem exist?" repeatedly until you reach the underlying cause rather than a surface symptom
4. **Literature review** — researching whether existing solutions exist and why they may be insufficient

The output of a needs assessment is a clear statement of the gap: what is happening now, what should be happening, and what is preventing the improvement.

---

## Opportunity Recognition

Problems and opportunities are two sides of the same coin. **Opportunity recognition** is the skill of reframing a problem as a specific, actionable opportunity for a designed solution. This shift in framing matters because it moves your thinking from what is wrong to what could be built.

| Problem Frame | Opportunity Frame |
|---|---|
| "Students at our school waste time looking for open parking spaces." | "An opportunity exists to design a low-cost sensor system that displays real-time parking availability on a map." |
| "Elderly residents in this neighborhood can't read food labels easily." | "An opportunity exists to develop a smartphone app that reads and enlarges nutrition information using the phone's camera." |
| "The school's garden irrigation wastes water during rainy weeks." | "An opportunity exists to build an automated irrigation controller that checks a weather API before opening the valves." |

Notice that the opportunity frame names a specific intervention and a specific beneficiary. This specificity is what makes the opportunity actionable.

---

## Engineering Challenge Definition

An **engineering challenge definition** (also called a problem statement) is a concise, written statement that captures the problem, the stakeholders affected, the measurable impact, and the goals for a potential solution. It is the anchor document for your entire project — every design decision you make later should trace back to it.

A well-written engineering challenge definition has four components:

1. **The situation** — a one-sentence description of the current state and who is affected
2. **The need** — a clear statement of what is missing or insufficient
3. **The impact** — a quantified description of the cost of the problem
4. **The goal** — what a successful solution would accomplish, expressed in measurable terms

**Example:**

> *Students at [School Name] spend an average of 8 minutes per day searching for open parking spots during peak arrival hours, resulting in tardiness for approximately 30 students per week. A successful solution would reduce average search time to under 2 minutes without requiring students to download an app or access the school's Wi-Fi network.*

This statement is specific, measurable, and does not prescribe a particular solution — it leaves the design space open.

#### Diagram: Problem Statement Builder

<details markdown="1">
<summary>Interactive Problem Statement Builder</summary>
Type: MicroSim
**sim-id:** problem-statement-builder<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Students will *construct* (Bloom L6 — Create) a valid engineering challenge definition by filling in guided text fields and receiving real-time feedback on completeness and specificity.

**Canvas:** 820 × 560 px, responsive to window resize.

**Layout:** Four labeled input panels stacked vertically, each with a text area and a character count. A live preview panel on the right assembles the four inputs into a formatted problem statement as the student types.

**Input panels:**
1. **The Situation** (who is affected and what is currently happening — 1–2 sentences)
2. **The Need** (what is missing or insufficient — 1 sentence)
3. **The Impact** (quantify the cost in time, money, safety, or quality — include a number)
4. **The Goal** (what a successful solution accomplishes, in measurable terms)

**Feedback system:** After the student stops typing for 1.5 seconds, each panel shows a colored indicator:
- Green checkmark: panel contains a number or measurement
- Yellow warning: panel is filled but contains no quantitative language
- Red outline: panel is empty

**Export button:** Generates a formatted text block the student can copy into their assignment document.

**Implementation:** Embed as `docs/sims/problem-statement-builder/index.html`. Iframe at 600 px height.
</details>

---

## Constraints and Criteria

Once you have written your challenge definition, you are ready to define the boundaries within which your solution must operate. **Constraints** and **criteria** together define your design space.

A **constraint** is a non-negotiable limit — a condition that any valid solution must satisfy. Constraints come from physics, safety regulations, available materials, time, budget, or the needs of stakeholders. If a solution violates a constraint, it is not viable regardless of its other merits.

A **criterion** (plural: criteria) is a desired quality — a goal the solution should achieve as much as possible. Unlike constraints, criteria can be partially satisfied and are used to compare solutions.

| Type | Definition | Example |
|---|---|---|
| Constraint | Must be satisfied (binary) | Solution must cost less than $200 to build |
| Constraint | Must be satisfied | Solution must not require a WiFi connection |
| Criterion | Should be maximized | Solution should be as lightweight as possible |
| Criterion | Should be maximized | Solution should be usable by people of all ages |

Listing your constraints and criteria before you brainstorm solutions keeps your design process honest — it prevents you from falling in love with an idea that cannot actually work.

!!! info "What Comes Next"
    Your constraints and criteria from this assignment feed directly into **Assignment 8 (Design Requirements)**, where you will formalize these into a complete requirements document. In **Assignment 9 (Project Brainstorming)**, you will use your requirements to evaluate and narrow down potential solutions.

---

!!! example "Go to Your Google Doc"
    Open your Project Proposal document. Complete the Problem Statement section: write your four-component engineering challenge definition and list at least three constraints and three criteria for your solution. Copy this section into your Project Proposal document. Submit through Canvas.

---

## Assignment Summary

By the end of this assignment you should have:

- A **problem identification** narrative describing the observable gap and who is affected
- A **needs assessment** with at least one piece of data quantifying the problem's impact
- An **opportunity statement** that reframes the problem as a specific, actionable design opportunity
- A **four-component engineering challenge definition** that is specific, measurable, and solution-neutral
- An initial list of **constraints** (must-have) and **criteria** (should-have) for your solution

This is the most important document in your project proposal. Take the time to make it precise — vague problem statements lead to poorly scoped projects and weak proposals.
