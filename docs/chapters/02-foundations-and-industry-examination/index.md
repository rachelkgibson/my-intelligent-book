---
title: Industry Examination Lab
description: Contrasts the scientific method with the engineering design process and introduces systems thinking as a framework for understanding how engineering organizations operate.
generated_by: claude skill chapter-content-generator
date: 2026-06-19
version: 0.09
---

# Industry Examination Lab

## Objectives

- Research job postings for engineering roles in a field that interests you.
- Identify the technical skills, certifications, and education employers require.
- Compare career pathways across two or more engineering specializations.

## Assignments

- **Engineering Industry Scavenger Hunt** — CTE-23, CTE-24, CTE-25, CTE-26, CTE-27, CTE-28, CTE-29, CTE-30
- **Engineering Design Process vs Scientific Method Comparison** — CTE-45

## Introduction

Two of the most important thinking frameworks in the modern world are the **scientific method** and the **engineering design process**. At first glance, they seem similar — both are systematic, both involve testing ideas, and both drive innovation. Yet they answer fundamentally different questions. Science asks *why* something happens. Engineering asks *how* we can make something happen, or how we can make something work better.

This chapter unpacks both frameworks, compares them side by side, and then introduces a third lens — **systems thinking** — that engineers use to understand the organizations and industries they work within. All three frameworks will appear throughout your practicum project, from the moment you identify a problem to the day you present your final solution.

## The Scientific Method

The **scientific method** is a structured process for generating reliable knowledge about the natural world through observation, experimentation, and evidence-based reasoning. It has been refined over centuries and forms the backbone of all natural and social sciences.

The classical steps of the scientific method are:

1. **Observation** — Notice a phenomenon or ask a question about the natural world.
2. **Background Research** — Gather existing knowledge related to the question.
3. **Hypothesis** — Propose a testable, falsifiable explanation for the observed phenomenon.
4. **Experiment Design** — Plan a controlled experiment to test the hypothesis.
5. **Data Collection** — Conduct the experiment and record measurements systematically.
6. **Analysis** — Examine the data to identify patterns and draw conclusions.
7. **Communication** — Share findings with the scientific community for peer review and replication.

The method is inherently circular: conclusions from one experiment often generate new questions, launching the cycle again. This iterative nature is what allows science to self-correct over time.

## Hypothesis Testing

Before we move to engineering, it is worth pausing on one of the most important steps in the scientific method: **hypothesis testing**. A **hypothesis** is a specific, testable prediction about a relationship between variables. The key word is *testable* — a hypothesis must be capable of being proven wrong by evidence, a property philosophers of science call **falsifiability**.

A well-formed hypothesis follows the "If … then … because …" structure:

- **If** the independent variable is changed in a specific way,
- **then** the dependent variable will respond in a predictable way,
- **because** a known mechanism or principle explains the connection.

*Example:* "If we double the insulation thickness on a pipe, then heat loss will decrease by at least 40%, because heat conduction is inversely proportional to material thickness."

Scientists compare results against a **null hypothesis** — the assumption that no relationship exists — and use statistical tests to determine whether the evidence is strong enough to reject it. Engineers sometimes borrow hypothesis-testing language when running controlled experiments during prototyping, but their goal is usually practical performance rather than knowledge generation.

#### Diagram: Hypothesis Testing Decision Tree

<details markdown="1">
<summary>Interactive Hypothesis Testing Decision Tree</summary>
Type: interactive infographic
**sim-id:** hypothesis-testing-tree<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Students will *explain* (Bloom L2) the logical structure of hypothesis testing by navigating an interactive decision tree that traces a hypothesis from formation through accept/reject outcome.

**Canvas:** 800 × 480 px, responsive to window resize.

**Layout:** A vertical flowchart with six node levels. Each node is a rounded rectangle with a label and a brief description (visible on hover). Directional arrows connect nodes. Two branch paths diverge at the "Analyze Results" node — one leading to "Reject Null Hypothesis" (green) and one to "Fail to Reject Null Hypothesis" (amber).

**Nodes (top to bottom):**
1. Observe a Phenomenon
2. Form a Hypothesis (If/Then/Because)
3. Design a Controlled Experiment
4. Collect Data
5. Analyze Results → branch point
   - Left branch: Evidence is statistically significant → Reject Null Hypothesis → New Knowledge Generated
   - Right branch: Evidence is not significant → Fail to Reject Null Hypothesis → Revise Hypothesis

**Interaction:** Clicking any node opens a side panel (200 px wide, right side) showing: (a) the step name, (b) a 2-sentence explanation at Senior High reading level, and (c) a real-world engineering example of that step.

**Color scheme:** Nodes are SteelBlue; the two outcome nodes use DarkGreen (reject) and DarkGoldenrod (fail to reject). Arrows are dark gray.

**Implementation:** Embed as `docs/sims/hypothesis-testing-tree/index.html` using p5.js CDN. Iframe at 520 px height.
</details>

## The Engineering Design Process

The **engineering design process** is a systematic, iterative approach for solving problems and creating artifacts — products, structures, systems, or processes — that meet a defined set of criteria and constraints. Unlike the scientific method, which seeks to understand how the world *is*, the engineering design process seeks to change how the world *works*.

The most widely adopted version of the process includes these steps:

1. **Define the Problem** — Identify the need or opportunity. Articulate criteria (what the solution must do) and constraints (limits on time, budget, materials, or safety).
2. **Research** — Gather background information, study existing solutions, and identify relevant standards.
3. **Brainstorm Solutions** — Generate a wide range of possible approaches without judgment.
4. **Select a Solution** — Evaluate options against criteria and constraints; choose the most promising approach.
5. **Prototype** — Build a working model or representation of the chosen solution.
6. **Test and Evaluate** — Test the prototype against the criteria and constraints; measure performance.
7. **Iterate** — Use test results to improve the design; repeat until the solution meets requirements.
8. **Communicate** — Document the solution and present it to stakeholders.

The most critical word in that list is *iterate*. Real engineering design rarely moves in a straight line from problem to solution. Engineers cycle back — sometimes many times — as testing reveals weaknesses or new constraints emerge.

## Engineering vs. Science: A Direct Comparison

Understanding how these two frameworks differ is essential for recognizing which one to apply — and when. In practice, engineers use elements of both, but with different primary goals.

| Dimension | Scientific Method | Engineering Design Process |
|---|---|---|
| **Primary question** | Why does this happen? | How can we make this work? |
| **Goal** | Generate verified knowledge | Create a solution that meets criteria |
| **Starting point** | Observation of a natural phenomenon | Identified need or problem |
| **Key output** | Knowledge (publications, theories) | Artifact (product, system, process) |
| **Test criteria** | Statistical significance | Performance against criteria/constraints |
| **"Success" means** | Hypothesis supported or falsified | Solution meets requirements |
| **Iteration purpose** | Refine understanding | Improve design performance |
| **Community check** | Peer review and replication | Engineering review and standards compliance |

One important nuance: engineering often *depends* on science. When a civil engineer designs a bridge, they rely on scientific knowledge about material properties, fluid dynamics, and soil mechanics. But the design decisions — how long, how wide, what materials, what cost — are engineering judgments, not scientific conclusions.

#### Diagram: Venn Diagram — Scientific Method vs. Engineering Design Process

<details markdown="1">
<summary>Interactive Venn Diagram: Scientific Method vs. Engineering Design Process</summary>
Type: interactive infographic
**sim-id:** science-vs-engineering-venn<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Students will *differentiate* (Bloom L4) the unique and shared features of the scientific method and engineering design process by clicking on regions of a Venn diagram to reveal categorized content.

**Canvas:** 800 × 420 px, responsive.

**Layout:** Two large overlapping circles. Left circle labeled "Scientific Method" (SteelBlue). Right circle labeled "Engineering Design Process" (DarkGoldenrod). Overlapping region is a medium gray labeled "Both".

**Clickable regions (three):**
- Left-only region: Opens a panel listing 4 unique features of the scientific method (e.g., "Falsifiable hypothesis required," "Statistical analysis of data," "Peer-reviewed publication," "Seeks universal laws").
- Overlap region: Opens a panel listing 4 shared features (e.g., "Systematic process," "Iterative in practice," "Requires background research," "Builds on prior work").
- Right-only region: Opens a panel listing 4 unique features of the engineering design process (e.g., "Defined by criteria and constraints," "Produces a physical or digital artifact," "Optimized for performance," "Judged by standards compliance").

**Panel:** Appears to the right of the Venn diagram (200 px wide). Each list item is a short bullet. Clicking a different region replaces the panel content with a smooth fade.

**Implementation:** Embed as `docs/sims/science-vs-engineering-venn/index.html` using p5.js CDN. Iframe at 460 px height.
</details>

## Systems Thinking

Once you understand how engineers design solutions, the next question is: how do those solutions fit into larger organizations and industries? The answer requires **systems thinking** — a way of looking at problems by examining the whole system and the relationships between its parts, rather than focusing on individual components in isolation.

A **system** is a set of interacting or interdependent components that form a unified whole and produce behaviors that none of the components could produce alone. Systems thinking shifts the engineer's attention from "what is this part?" to "how do the parts interact, and what emerges from those interactions?"

Systems thinking is particularly powerful when:

- A problem has multiple causes that reinforce each other
- A solution in one area creates unexpected problems somewhere else
- The behavior of a system changes over time in non-obvious ways
- Stakeholders disagree about the root cause of a problem

Engineers who think in systems are better at designing solutions that do not create new problems downstream — a skill that becomes especially important when you are designing for public health, safety, or the environment.

## System Inputs and Outputs

Every system, no matter how complex, can be described in terms of what goes in, what happens inside, and what comes out. **System inputs** are the resources, information, or energy that enter the system. **System outputs** are the products, services, information, or waste that the system produces.

Consider a water treatment plant as a system:

| Component | Examples |
|---|---|
| **Inputs** | Raw water, chemicals (chlorine, alum), electricity, labor |
| **Processes** | Filtration, sedimentation, disinfection, pH adjustment |
| **Outputs** | Clean drinking water (desired), sludge (waste), treated wastewater |
| **Environment** | Regulatory standards, local geography, seasonal variation |

Every engineering system also has a **boundary** — the line that separates what is inside the system from what is outside. Choosing the right boundary is a design decision: a boundary that is too narrow ignores important interactions; one that is too wide makes the analysis unmanageable.

## Feedback Loops

One of the most important concepts in systems thinking is the **feedback loop** — a mechanism in which outputs of a system circle back to influence its own inputs or internal processes. Feedback loops explain why systems often behave in surprising, non-linear ways.

There are two fundamental types of feedback loops:

**Balancing (negative) feedback loops** resist change and push the system back toward a target or equilibrium. They are stabilizing. A thermostat is the classic example: when room temperature rises above the set point, the system turns off the heater, which causes the temperature to fall back toward the target.

**Reinforcing (positive) feedback loops** amplify change and drive the system further from its starting point. They can be either virtuous (compounding growth) or vicious (accelerating collapse). Corrosion on a metal bridge is an example: exposure to moisture causes initial rusting, which makes the surface rougher and more porous, which accelerates further corrosion.

Identifying feedback loops in your practicum project's environment — financial, social, technical — will help you anticipate how your solution will behave after implementation.

#### Diagram: Feedback Loop Simulator

<details markdown="1">
<summary>Interactive Feedback Loop Simulator</summary>
Type: MicroSim
**sim-id:** feedback-loop-simulator<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Students will *apply* (Bloom L3) feedback loop concepts by adjusting parameters in a simulated system and observing how balancing and reinforcing loops produce different patterns of change over time.

**Canvas:** 800 × 500 px, responsive.

**System simulated:** A simplified project budget system. The state variable is "Budget Remaining" (starts at $10,000). Two sliders control the system:
- **Spending Rate** (slider: $100–$1,000 per week) — a drain on budget
- **Correction Strength** (slider: 0–1.0) — how aggressively a manager reduces spending when budget falls below a warning threshold ($3,000)

**Left panel (controls, 250 px):**
- Spending Rate slider with label and current value
- Correction Strength slider with label and current value
- Loop Type radio buttons: "Balancing Only," "Reinforcing Only," "Both"
- Reset button

**Right panel (visualization, 550 px):**
A line chart (Chart.js embedded in p5 canvas or separate div) showing Budget Remaining over 52 weeks. The x-axis is Week (0–52); the y-axis is Budget ($0–$12,000). A horizontal dashed red line marks the Warning Threshold at $3,000.

When "Balancing Only" is selected: the line stabilizes around the threshold as the correction kicks in (S-curve behavior).
When "Reinforcing Only" is selected: spending accelerates as budget falls (the project manager panics and spends more trying to fix problems), producing a rapid drop to zero.
When "Both" is selected: the system oscillates.

**Interaction:** Sliders update the simulation in real time. Hovering over any point on the line reveals a tooltip with the exact week and budget value. Clicking on the chart pauses the animation; clicking again resumes.

**Implementation:** Embed as `docs/sims/feedback-loop-simulator/index.html` using p5.js CDN. Iframe at 560 px height.
</details>

## Subsystem Interactions

Large engineering systems are rarely designed as single monolithic units. Instead, they are broken into **subsystems** — smaller, semi-independent components that each perform a specific function and interact with each other through defined interfaces.

**Subsystem interactions** are the connections, data flows, energy transfers, and material flows that pass between subsystems. Understanding how subsystems interact is essential because:

- A change in one subsystem can propagate through interfaces and affect others unexpectedly
- The performance of the overall system depends on how well subsystems communicate and cooperate
- Failures at the interface between subsystems are among the most common causes of engineering disasters

Consider an electric vehicle (EV) as a system of interacting subsystems:

| Subsystem | Function | Key Interfaces |
|---|---|---|
| Battery Pack | Store electrical energy | Electrical connection to motor controller |
| Motor Controller | Regulate power delivery | Electrical (battery), mechanical (motor), data (sensors) |
| Drive Motor | Convert electrical energy to motion | Mechanical connection to drivetrain |
| Thermal Management | Maintain battery temperature | Heat exchanger, coolant loop, sensors |
| Regenerative Braking | Recover kinetic energy as electricity | Mechanical (brakes), electrical (battery charging circuit) |
| Driver Interface | Communicate state to driver | Data bus, display, controls |

Notice that the thermal management subsystem interacts with the battery pack, the motor, and the environment — a change in ambient temperature affects multiple subsystems simultaneously. This web of interactions is exactly what systems thinking is designed to help you navigate.

## Applying These Frameworks to the Scavenger Hunt

Your **Engineering Industry Scavenger Hunt** asks you to investigate a real engineering industry or organization and find evidence of the frameworks introduced in this chapter. As you research your assigned industry, use these questions as a guide:

- Where does this industry use the scientific method? (R&D labs, testing, regulatory submissions)
- Where does it use the engineering design process? (Product development, construction, system upgrades)
- What are the major inputs and outputs of this industry as a system?
- What feedback loops can you identify? (Quality control, market signals, regulatory responses)
- What are the major subsystems and how do they interact?

Documenting your answers — with real examples from your chosen industry — will prepare you to write a sharp Engineering Design Process vs. Scientific Method Comparison and to present your findings to the class.

## Chapter Summary

The two foundational frameworks introduced in this chapter will appear in every engineering course you take from here forward:

- The **scientific method** is a process for generating knowledge about the natural world through observation, hypothesis testing, and evidence-based reasoning.
- A **hypothesis** must be falsifiable and is tested against a null hypothesis using controlled experiments and statistical analysis.
- The **engineering design process** is a systematic, iterative approach to creating solutions that meet defined criteria and constraints — it produces artifacts, not knowledge.
- **Engineering and science** are complementary: engineering relies on scientific knowledge, but its goal is problem-solving rather than knowledge generation.
- **Systems thinking** views problems through the lens of interacting components, boundaries, inputs, outputs, and emergent behavior.
- **System inputs and outputs** define what enters and leaves a system; identifying them is the first step in analyzing any engineering organization.
- **Feedback loops** — balancing (stabilizing) and reinforcing (amplifying) — explain how systems respond to change over time.
- **Subsystem interactions** are the interfaces between semi-independent components; failures at those interfaces are a major source of engineering problems.

Carry these frameworks into every chapter ahead. When you encounter a new engineering challenge, your first instinct should be to ask: Am I doing science or engineering? And what system am I working within?
