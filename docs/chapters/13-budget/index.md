---
title: Budget Assignment
description: Students research real costs, build a bill of materials for their prototype, develop a research-based project budget, and evaluate project feasibility using cost-benefit analysis.
generated_by: claude skill chapter-content-generator
date: 2026-06-19
version: 0.09
---

# Budget Assignment

## Objectives

- Research actual costs for all materials and components in your design.
- Build a bill of materials (BOM) for your prototype.
- Develop a complete project budget including contingency and a cost-benefit analysis.

## Introduction

Most engineering projects use two financial documents that work together: a **budget** and a **bill of materials (BOM)**. They serve different purposes and capture different levels of detail. Understanding both — and knowing how to build each one — is a core project management skill.

| | Budget | Bill of Materials (BOM) |
|---|---|---|
| **Purpose** | Tracks total project cost across all categories | Lists every part needed to build the prototype |
| **Scope** | Parts, labor, equipment, services | Materials only — no labor |
| **Detail level** | Category-level estimates with actuals added over time | Part-by-part specifics |
| **When used** | Start of project through completion | Current prototype design |

---

## The Budget

A **budget** is a breakdown of the total cost of a project, including both **parts (materials)** and **labor (time)**. At the start of a project, it contains categories with cost *estimates* for each. As the project progresses, you enter line items for money actually spent. At the end, you compare estimated cost to actual cost by category — this comparison is how engineers improve their estimating on future projects.

Budget categories for a practicum project typically include:

- **Structural materials** — wood, metal, plastic, fasteners, adhesives
- **Sensors and electronics** — microcontrollers, sensors, wiring, displays
- **Fabrication** — 3D printing filament, laser cutting, machining
- **Services** — outside vendors, printing, testing
- **Labor** — your time (professional budgets always include this even when it is unpaid in a school context)
- **Contingency** — 10–15% of the subtotal set aside for unexpected costs

Contingency is not a guess — it is a deliberate financial buffer that every professional engineering budget includes. Skipping it is one of the most common reasons student budgets fail in practice.

## Bill of Materials (BOM)

A **bill of materials (BOM)** is the "shopping list" of parts required to construct your prototype. It is a table listing each part with enough detail that someone else could order everything needed to replicate your build.

Your BOM should include:

| Column | Description |
|---|---|
| Description | Name of the part or material |
| Vendor | Supplier name (Amazon, Home Depot, Adafruit, etc.) |
| Link | URL to the exact product listing |
| Quantity | How many you need |
| Cost per item | Unit price |
| Shipping | Estimated shipping cost |
| Total | Quantity × cost per item + shipping |
| Justification | Why this part is needed for the design |

**Important BOM rules:**

- Include **only** materials required for your *current* prototype design — not items you bought and abandoned, or leftover materials from other projects
- **Donated items** that you actually used must be included (list them at $0.00 or at fair market value)
- **Custom parts** — anything you 3D-printed, machined, laser-cut, or fabricated — must be included with a description and material cost
- If you are still deciding between two parts, include only the one you are committing to

!!! example "Go to Your Google Doc / Spreadsheet"
    Use the [Budget & BOM template](https://docs.google.com/spreadsheets/d/1tPtOXHGQTn8K0emIqfz81YzQN83uLkkG7VgzDQrdLCs/edit?usp=sharing) to complete your BOM. Submit through Canvas.

## Budget Research Methods

A budget is only as good as the data behind it. **Budget research methods** are the strategies engineers use to gather accurate cost data before committing to numbers.

The most reliable research strategies for a practicum project are:

- **Supplier catalogs and online stores** — browse Adafruit, SparkFun, Home Depot, McMaster-Carr, Grainger, or Amazon to find real current prices
- **Requesting quotes** — for custom fabrication or specialized services, email suppliers and ask for a formal price quote
- **Benchmarking** — find similar existing products and use their retail price as a reference for component costs
- **Expert interviews** — ask engineers, fabricators, or your teacher whether your estimates seem realistic
- **Historical data** — if a similar project was done at your school previously, that budget is a useful starting point

The key principle: **real numbers from real sources**, never guesses. Document every cost with a URL or supplier name so reviewers can verify your budget is credible.

## Cost Estimation

**Cost estimation** is the process of translating your BOM and budget categories into line-item dollar amounts and totaling them. A well-structured estimate includes every category from your budget, adds contingency on top, and arrives at a defensible grand total.

#### Diagram: Budget Estimation Worksheet

<details markdown="1">
<summary>Interactive Budget Line-Item Calculator</summary>
Type: MicroSim
**sim-id:** budget-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Students will *apply* (Bloom L3) cost estimation by entering line items into a budget worksheet and observing how subtotals and contingency amounts update in real time.

**Canvas:** 860 × 520 px, responsive.

**Layout:** A spreadsheet-style table with the following columns: Category (dropdown: Materials / Equipment / Services / Labor / Other), Item Description (text input), Quantity (number), Unit Cost $ (number), Total (auto-calculated), Source/URL (text input).

**Controls:**
- "Add Row" button adds a new line item
- "Remove" button on each row removes it
- "Set Contingency %" slider (5%–25%, default 10%)

**Summary panel (right side, 200 px wide):**
- Materials subtotal
- Equipment subtotal
- Services subtotal
- Labor subtotal
- Other subtotal
- **Subtotal**
- Contingency amount (= subtotal × contingency %)
- **Grand Total** (bold, larger font)

All totals update instantly when any input changes.

**Hover on "Grand Total":** Tooltip reads "This is your total estimated project cost including contingency. Present this number in your proposal."

**Export:** "Copy as Markdown Table" button formats the full budget as a markdown table for pasting into the project proposal document.

**Implementation:** Standalone HTML at `docs/sims/budget-calculator/index.html`. Iframe at 580 px height.
</details>

## Cost-Benefit Analysis

Knowing what a project will cost is only half of the financial picture. The other half is understanding what the project is worth — what problems it solves, what value it creates, and whether that value justifies the cost. This evaluation is called a **cost-benefit analysis (CBA)**.

A **cost-benefit analysis** is a systematic comparison of the total expected costs of a project against the total expected benefits. In professional engineering, CBA is used to decide whether to fund a project, choose between competing solutions, or justify expenditure to stakeholders.

Benefits are not always expressed in dollars. For an engineering practicum project, benefits may include:

- **Quantitative benefits** — time saved per week, money saved per year, energy reduced per month (these can be converted to dollar equivalents)
- **Qualitative benefits** — improved safety, reduced user frustration, environmental impact, community value (these are described narratively)

A simple CBA format for your proposal:

| Item | Details | Value |
|---|---|---|
| Total Project Cost | From your budget estimate | $XXX |
| Benefit 1 (quantitative) | e.g., "Saves 30 min/day × 180 days" | $YYY equivalent |
| Benefit 2 (qualitative) | e.g., "Reduces risk of plant loss" | Narrative |
| Break-even point | When cumulative savings exceed project cost | X weeks/months |
| Net benefit over 1 year | Total benefits − Total cost | $ZZZ or N/A |

For school projects with budgets under $100, a dollar-for-dollar ROI may not be the main point. What matters is that you can articulate clearly what problem your solution solves and why the cost is justified.

#### Diagram: Cost-Benefit Decision Explorer

<details markdown="1">
<summary>Cost-Benefit Scenario Explorer</summary>
Type: interactive infographic
**sim-id:** cost-benefit-explorer<br/>
**Library:** Chart.js<br/>
**Status:** Specified

**Learning objective:** Students will *evaluate* (Bloom L5) how changing project costs or benefit assumptions shifts the break-even point, developing intuition for financial trade-offs in engineering decisions.

**Canvas:** 820 × 460 px, responsive.

**Controls (left, 260 px):**
- Project Cost slider: $10–$500 (default $80)
- Weekly benefit ($ equivalent) slider: $1–$50 (default $5)
- Project lifespan slider: 4–52 weeks (default 20)

**Visualization (right):** A line chart with two series:
- "Cumulative Cost" — a flat horizontal line at the project cost value
- "Cumulative Benefit" — a rising line starting at $0 and increasing by the weekly benefit amount each week

The intersection of the two lines is highlighted with a gold dot labeled "Break-even at Week N." Beyond the intersection, the benefit line is filled green to indicate positive return. Before the intersection, the gap between lines is filled red.

**Hover:** Hovering on any point of the benefit line shows a tooltip: "Week N: Total benefit = $X, Net = $Y."

**Implementation:** Standalone HTML at `docs/sims/cost-benefit-explorer/index.html`. Iframe at 520 px height.
</details>

## Budget Development

**Budget development** is the final step — assembling all of your research and estimates into a formal, presented budget document. A project budget is not a rough sketch; it is a professional document that communicates your financial planning to reviewers.

A complete project budget for your practicum includes four elements:

1. **Line-item cost table** — every material, tool, and service, with quantities, unit costs, sources, and totals
2. **Contingency line** — 10–15% of the subtotal, labeled clearly
3. **Grand total** — the amount you are requesting or committing to spend
4. **Cost-benefit summary** — a brief statement of what the project delivers in return for the cost

---

## Chapter Summary

A credible budget is evidence that you understand what your project really costs and that you have thought through whether it is worth doing. Here is what you should be able to explain after completing this chapter:

- A **budget** tracks total project cost by category — including labor — with estimates at the start and actuals filled in as you spend. Comparing the two at the end improves future estimates.
- A **bill of materials (BOM)** is the part-by-part shopping list for your current prototype. It includes donated items and custom-fabricated parts but excludes anything abandoned or unused.
- **Budget research methods** require real prices from real suppliers — document every source with a URL.
- **Cost estimation** adds contingency (10–15%) to every total to account for the unexpected.
- **Cost-benefit analysis** answers the question: "Is this project worth doing?"

Your Budget assignment will take each of these concepts into a real financial plan for your specific practicum project. Use the Budget & BOM spreadsheet template, fill in real prices from real suppliers, and include your contingency line — reviewers will look for it.
