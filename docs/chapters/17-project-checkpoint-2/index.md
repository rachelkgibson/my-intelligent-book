---
title: Project Checkpoint #2 Assignment
description: Students present a project progress update at the midpoint of execution, demonstrating prototype development, testing results, and a credible path to the final presentation.
generated_by: claude skill chapter-content-generator
date: 2026-06-19
version: 0.09
---

# Project Checkpoint #2 Assignment

## Objectives

- Demonstrate your working prototype and share test results with stakeholders.
- Present design iterations made since Checkpoint 1.
- Update your project schedule with a clear path to the final presentation.

## Introduction

By Checkpoint 2, you have been building, testing, and iterating on your design for several weeks. This checkpoint asks you to step back, organize what you have learned, and present your current status clearly and honestly to an audience.

A strong Checkpoint 2 presentation does not pretend everything went according to plan — it shows that you encountered real problems and responded to them thoughtfully. That is exactly what professional engineering looks like.

---

## Prototype Development

A **prototype** is an early physical or digital model of a design built to test whether the proposed solution actually works. Prototypes are not finished products — they are learning tools whose purpose is to reveal problems early, when changes are still relatively cheap to make.

There are several levels of prototype fidelity:

- **Low-fidelity prototype** — A sketch, cardboard model, or wireframe that tests the basic concept. Fast and cheap; best for early-stage testing of shape and form.
- **Mid-fidelity prototype** — A partially functional model that tests one or two key mechanisms. Useful for testing specific engineering decisions.
- **High-fidelity prototype** — A fully functional model built from final (or near-final) materials. Used for final testing and stakeholder demonstration.

For your practicum, you may not reach a high-fidelity prototype depending on your project scope and timeline. What matters is that you can demonstrate your design decisions and describe what the final solution would look like and how it would perform.

---

## Testing and Iteration

**Testing** is the systematic process of evaluating how well a prototype meets the design criteria and constraints you defined in Assignment 7. Without testing, you cannot know whether your solution actually solves the problem.

A structured test plan includes:

1. **What you are testing** — one specific criterion or function at a time
2. **How you will test it** — the procedure, materials, and tools used
3. **What a passing result looks like** — the quantitative or qualitative threshold
4. **What you will record** — data format, units, and number of trials

After each test, you enter the **iteration** phase — making a targeted change to the design based on what the test revealed, then testing again. This is not failure; it is the engineering design process working exactly as it should.

#### Diagram: Prototype Iteration Cycle

<details markdown="1">
<summary>Interactive Prototype Iteration Cycle</summary>
Type: MicroSim
**sim-id:** prototype-iteration-cycle<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Students will *apply* (Bloom L3) the build-test-iterate cycle by stepping through a simulated engineering scenario and observing how each iteration improves design performance toward the acceptance threshold.

**Canvas:** 800 × 500 px, responsive.

**Layout:** Left panel shows the current iteration state and design change description. Right panel shows a line chart of test performance across iterations, with a dashed red line at the acceptance threshold. When the line crosses the threshold, a "Design Accepted" banner appears.

**Implementation:** Embed as `docs/sims/prototype-iteration-cycle/index.html` using p5.js CDN. Iframe at 560 px height.
</details>

---

## Design Optimization

Once your prototype passes basic testing — meaning it meets the minimum criteria — you enter **design optimization**: improving the design beyond the minimum threshold on the dimensions that matter most to your stakeholders.

Two frameworks that help guide optimization decisions:

- **Design matrix (Pugh matrix)** — A table that scores each design alternative against criteria using +/–/S (better/worse/same as a reference design).
- **Constraint vs. objective distinction** — A constraint is a pass/fail requirement; an objective is something to maximize or minimize. Once constraints are satisfied, optimization focuses on the objectives.

Document every optimization decision in your work log. Note what you changed, why you changed it, what the trade-off was, and how the test results changed.

---

## Stakeholder Identification and Communication

**Stakeholders** are all individuals, groups, or organizations that have an interest in the outcome of your project. **Stakeholder identification** is the process of systematically naming who those people are so you can tailor your design and communication appropriately.

For your Checkpoint 2 presentation:

- **Primary users** — The people who will directly use or interact with the solution
- **Decision makers** — The people who approve or fund the project (teachers, administrators, family members, community contacts)
- **Technical reviewers** — People with expertise who can evaluate whether the solution is sound

**Stakeholder communication** is the ongoing process of keeping the right people informed at the right times. Checkpoint 2 is a formal version of a progress update — the same kind of communication you would give a client or supervisor on a real engineering project. Frame your update in terms your audience can evaluate: what was the goal, what have you built, what did you learn from testing, and what is the plan to finish.

---

## What to Present at Checkpoint 2

Your Checkpoint 2 presentation (5–8 minutes + Q&A) should cover:

1. **Reminder of the problem** — One or two slides restating the problem and your solution concept (assume the audience needs a brief reminder)
2. **What you built** — Show your prototype or current build state; describe the fidelity level and what still needs to be done
3. **Testing results** — Present at least one test with data; show what you measured and whether it met the criterion
4. **What you changed** — One or two key iterations made since Checkpoint 1 and why
5. **Plan to finish** — Updated schedule showing what remains and when it will be done

!!! example "Submit Through Canvas"
    Upload your Checkpoint 2 slide deck and updated work log to Canvas. Your teacher will provide written feedback.

---

## Assignment Summary

A strong Checkpoint 2 shows:

- A **prototype** at an appropriate fidelity level for this point in the semester
- **Test results** with actual data, not just descriptions
- **Iteration evidence** — at least one design change made in response to a test result or piece of feedback
- An **updated project schedule** with a realistic path to the final presentation
- A **clear, organized 5–8 minute presentation** that a non-expert stakeholder could follow

Use the feedback from Checkpoint 2 as your final course correction before the Final Project Report and Final Project Presentation.
