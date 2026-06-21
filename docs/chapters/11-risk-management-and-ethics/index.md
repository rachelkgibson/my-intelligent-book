---
title: Risk Management & Ethics Assignment
description: Students apply engineering ethics principles and intellectual property law to their project, then conduct a systematic risk analysis with mitigation strategies before finalizing their proposal.
generated_by: claude skill chapter-content-generator
date: 2026-06-19
version: 0.09
---

# Risk Management & Ethics Assignment

## Objectives

- Identify potential risks in your project and assess their likelihood and impact.
- Develop mitigation strategies for your highest-priority risks.
- Apply the engineering code of ethics to evaluate the ethical dimensions of your project.

## Introduction

Every engineering design carries some degree of risk. A bridge might fail under an unexpected load. A medical device might malfunction at a critical moment. A software system might leak private data. Engineers do not eliminate risk entirely — that is often impossible — but they are professionally and ethically obligated to identify risks, understand them, and reduce them to an acceptable level before any design is built or deployed.

Risk management is not a bureaucratic formality. It is one of the most direct expressions of the engineering code of ethics: placing the safety, health, and welfare of the public above all other considerations. This assignment gives you the tools to do that work systematically for your own practicum project — and to understand the ethical and legal responsibilities that come with engineering practice.

---

## Part 1: Engineering Ethics

### Engineering Ethics and the Code of Ethics

**Engineering ethics** is the branch of applied ethics that examines the moral principles and professional values that should guide engineers in their work. Because engineers design systems and structures that affect public safety, the environment, and the quality of daily life, the ethical stakes of engineering decisions are unusually high.

Most major engineering professional societies publish a formal **Code of Ethics** — a written set of principles that members are expected to uphold. While the specific language varies by organization (NSPE, ASCE, IEEE, ASME all publish their own), every engineering code of ethics shares a common core:

- Hold the **safety, health, and welfare of the public** as the paramount concern
- Be **honest and impartial** in professional reports, statements, and testimony
- Act with **competence** — only undertake work within your area of expertise
- Avoid **conflicts of interest** or disclose them fully when they cannot be avoided
- **Protect confidential information** entrusted by clients or employers

These codes are not merely aspirational. Licensed Professional Engineers who violate them can face suspension or revocation of their license by the state engineering board.

#### Diagram: Engineering Ethics Code Explorer


<iframe src="../../sims/ethics-code-explorer/main.html" width="100%" height="450px" scrolling="no"></iframe>
[Run Engineering Ethics Code Explorer Fullscreen](../../sims/ethics-code-explorer/main.html)

<details markdown="1">
<summary>Interactive Engineering Code of Ethics Comparison</summary>
Type: interactive infographic
**sim-id:** ethics-code-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Students will *compare* (Bloom L4 — Analyze) the core principles across three major engineering society codes of ethics by clicking on shared principles and seeing how each society phrases the same obligation.

**Canvas:** 800 × 480 px, responsive.

**Layout:** Three columns, one per society: NSPE, IEEE, ASCE. Each column lists 5 core principles as clickable cards. Shared principles are color-coded with the same hue across all three columns.

**Interaction:** Clicking any principle card highlights all cards across the three columns that correspond to the same underlying value, and opens an infobox showing the exact quoted language from each society's code for that principle.

**Implementation:** Embed as `docs/sims/ethics-code-explorer/index.html`. Iframe at 540 px height.
</details>

### Professional Responsibility and Public Safety

**Professional responsibility** refers to an engineer's obligation to perform their work competently, honestly, and with regard for the consequences of their designs on others. **Public safety in engineering** is the principle that no commercial, competitive, or personal interest justifies knowingly placing the public at risk.

Engineering history contains sobering examples of what happens when this principle is violated:

- The **Challenger Space Shuttle disaster (1986)** — engineers raised O-ring concerns before launch; organizational pressure contributed to the decision to proceed.
- The **Flint, Michigan water crisis (2014–2019)** — cost-cutting decisions led to lead contamination of the public water supply, affecting thousands of children.

These cases are studied because they reveal the conditions under which ethical failures occur — and the systematic approaches that can prevent them.

### Ethical Decision Making

**Ethical decision making** in engineering is the process of recognizing an ethical dimension in a situation, identifying the stakeholders and values involved, evaluating available options against ethical principles, and choosing a course of action that can be professionally defended.

A four-step framework:

1. **Recognize the ethical issue** — Is there a potential for harm? Whose interests are in conflict?
2. **Gather the facts** — What do you know? What do you need to find out?
3. **Evaluate the options** — Which option best upholds the core engineering values?
4. **Act and reflect** — Choose the most defensible option, document your reasoning, and reflect on the outcome.

### Personal vs. Professional Ethics and Conflict of Interest

**Personal ethics** refers to the values a person holds as an individual. **Professional ethics** refers to the standards of conduct defined by the profession itself, independent of any individual's personal beliefs. When they conflict, the professional code governs professional conduct.

A **conflict of interest** exists when an engineer's personal, financial, or other interests could compromise their professional judgment. The standard response is disclosure — informing all affected parties and, if the conflict cannot be adequately managed, recusing yourself from the decision.

---

## Part 2: Intellectual Property

### What Is Intellectual Property?

**Intellectual property (IP)** refers to creations of the mind — inventions, designs, artistic works, symbols, names, and trade information — that are protected by law. For engineers, IP shapes what you can design, what you can document publicly, and what protections you can seek for your own innovations.

The four main categories:

### Patents

A **patent** is a legal right granted by the USPTO that gives the inventor the exclusive right to make, use, and sell an invention for 20 years. For an invention to be patentable, it must be novel, non-obvious, and useful.

### Copyrights

A **copyright** automatically protects original creative works the moment they are created — technical reports, drawings, software source code, and photographs. Copyright protects the *expression* of an idea, not the idea itself.

### Trademarks

A **trademark** is a word, phrase, logo, or symbol that identifies the source of a product and distinguishes it from competitors. Trademark rights can last indefinitely as long as the mark remains in use and is actively enforced.

### Trade Secrets

A **trade secret** is confidential business information that provides a competitive advantage and is protected by keeping it secret — proprietary manufacturing processes, customer lists, software algorithms. Protection lasts as long as the information remains confidential.

#### Diagram: IP Type Selector


<iframe src="../../sims/ip-type-selector/main.html" width="100%" height="450px" scrolling="no"></iframe>
[Run IP Type Selector Fullscreen](../../sims/ip-type-selector/main.html)

<details markdown="1">
<summary>Interactive IP Protection Type Selector</summary>
Type: interactive infographic
**sim-id:** ip-type-selector<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Students will *classify* (Bloom L2 — Understand) a given engineering creation into the correct IP protection category by working through a branching decision flowchart.

**Canvas:** 820 × 560 px, responsive.

**Interaction model:** A branching flowchart of yes/no questions. Outcome nodes for Patent, Copyright, Trademark, and Trade Secret each display: name, duration of protection, what it protects vs. does NOT protect, and one engineering example.

**Implementation:** Embed as `docs/sims/ip-type-selector/index.html`. Iframe at 620 px height.
</details>

### IP Infringement

**IP infringement** occurs when someone makes, uses, sells, or distributes protected IP without permission. For student engineers, the most common risks are using patented components without a license, copying software without complying with the open-source license, and reproducing images or diagrams without attribution.

**Fair use** allows limited use of copyrighted material for education, commentary, or research — but it is a defense evaluated case-by-case, not a blanket exemption. When in doubt, cite the source or find an openly licensed alternative.

| IP Violation | Example | Potential Consequence |
|---|---|---|
| Patent infringement | Selling a device that uses a patented mechanism without a license | Civil lawsuit; injunction; damages |
| Copyright infringement | Reproducing a textbook diagram in a report without permission | DMCA takedown; civil lawsuit |
| Trade secret theft | Sharing an employer's proprietary process with a competitor | Criminal charges; civil lawsuit |

---

## Part 3: Risk Management

### Safety Standards

A **safety standard** is a documented set of requirements that defines acceptable performance for an engineering design in a given context. Before you can evaluate your design against a standard, you need to know which standards apply to your project:

| Domain | Example Standards Body | Example Standard |
|---|---|---|
| Electrical systems | UL, IEEE | UL 62368-1 (audio/video equipment) |
| Structural / civil | ASCE | ASCE 7 (minimum design loads) |
| Mechanical | ASME | ASME B31.3 (process piping) |
| Consumer products | CPSC | 16 CFR Part 1500 (hazardous substances) |

For high school practicum projects, your design will rarely need to comply with a formal regulatory standard — but understanding which standard would apply in a real deployment helps you think like a professional engineer.

### Design Safety Evaluation

**Design safety evaluation** is the process of systematically comparing a proposed design against relevant safety standards and criteria before resources are committed to building it. For each component or function of your design, ask:

- Does this component meet the applicable safety standard?
- What happens if this component fails? Does failure cascade to other parts?
- Are there guards, interlocks, or redundancies that prevent or contain failure?

#### Diagram: FMEA Process Walkthrough


<iframe src="../../sims/fmea-walkthrough/main.html" width="100%" height="450px" scrolling="no"></iframe>
[Run FMEA Process Walkthrough Fullscreen](../../sims/fmea-walkthrough/main.html)

<details markdown="1">
<summary>Interactive FMEA Step-by-Step Walkthrough</summary>
Type: interactive infographic
**sim-id:** fmea-walkthrough<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Students will *apply* (Bloom L3) the FMEA process by stepping through each stage of a simplified Failure Mode and Effects Analysis for a sample engineering component.

**Canvas:** 800 × 480 px, responsive.

**Stage 4 detail:** Two sliders — Severity (1–10) and Occurrence (1–10) — calculate a Risk Priority Number (RPN = Severity × Occurrence × Detectability). Color coding: RPN < 50 = green, 50–100 = yellow, > 100 = red.

**Implementation:** Embed as `docs/sims/fmea-walkthrough/index.html` using p5.js CDN. Iframe at 540 px height.
</details>

### Risk Identification

**Risk identification** is the process of systematically discovering, naming, and documenting every potential event or condition that could negatively affect your project's outcome, timeline, budget, or safety. Effective techniques include brainstorming, assumption analysis, checklist review, and expert interviews.

Four broad risk categories cover most threats in a practicum project:

| Risk Category | Examples |
|---|---|
| **Technical risks** | Design flaw discovered late, material behaves unexpectedly, software bug |
| **Schedule risks** | Supplier delay, school closure, unexpected complexity |
| **Resource risks** | Budget overrun, tool unavailable, needed expertise missing |
| **Safety risks** | Electrical hazard, sharp edge, chemical exposure, structural failure |

Every identified risk should be recorded in a **risk register** — a table that names the risk, describes its potential cause, and tracks its status throughout the project.

### Risk Analysis

**Risk analysis** evaluates each identified risk on two dimensions: **likelihood** (how probable is it that this risk will occur?) and **impact** (how severe would the consequences be?). Both are rated 1–5; the **risk score** is Likelihood × Impact.

| Rating | Likelihood | Impact |
|---|---|---|
| 1 | Rare | Negligible |
| 2 | Unlikely | Minor |
| 3 | Possible | Moderate |
| 4 | Likely | Significant |
| 5 | Almost certain | Catastrophic |

#### Diagram: Interactive Risk Matrix


<iframe src="../../sims/risk-matrix/main.html" width="100%" height="450px" scrolling="no"></iframe>
[Run Interactive Risk Matrix Fullscreen](../../sims/risk-matrix/main.html)

<details markdown="1">
<summary>Interactive Risk Matrix — Likelihood × Impact</summary>
Type: interactive infographic
**sim-id:** risk-matrix<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Students will *analyze* (Bloom L4) a set of project risks by placing them on a likelihood-impact grid and observing how risk scores determine priority.

**Canvas:** 700 × 600 px, responsive.

**Grid:** A 5 × 5 matrix color-coded by zone: Green (1–4): monitor only; Yellow (5–9): plan a response; Orange (10–15): active mitigation required; Red (16–25): immediate action, consider redesign.

**Implementation:** Embed as `docs/sims/risk-matrix/index.html` using p5.js CDN. Iframe at 660 px height.
</details>

### Risk Mitigation Strategies

**Risk mitigation strategies** are the specific actions taken to reduce the likelihood or impact of an identified risk. Four fundamental strategies:

- **Avoid** — Change the project plan to eliminate the risk entirely.
- **Reduce** — Take action to lower the likelihood or impact.
- **Transfer** — Shift the consequence to another party (insurance, vendor guarantees).
- **Accept** — Acknowledge the risk and proceed without additional action, for low-scoring risks only.

For every high-priority risk (orange or red on your matrix), document:

1. The risk name and description
2. Likelihood and impact ratings and score
3. The chosen mitigation strategy
4. Specific action steps
5. A contingency plan if the risk occurs despite mitigation

---

## Putting It Together: Your Assignment Deliverable

Your Risk Management & Ethics assignment has three parts:

**Part 1 — Ethics Reflection:** Identify one ethical consideration relevant to your specific project. This might be a safety concern, a conflict of interest, a question of who benefits and who might be harmed, or an IP consideration. Apply the four-step ethical decision-making framework to it and document your reasoning.

**Part 2 — IP Check:** Identify any patents, copyrighted materials, or open-source licenses that are relevant to your design. Document how you will comply with applicable IP law.

**Part 3 — Risk Register:** Identify at least ten candidate risks across all four categories. Rate each on likelihood and impact. For every risk scoring 8 or higher, document your mitigation strategy and contingency plan.

!!! example "Go to Your Google Doc"
    Complete all three parts in your Project Proposal document. The risk register should be a table with columns: Risk Description, Category, Likelihood (1–5), Impact (1–5), Score, Mitigation Strategy, and Contingency Plan. Submit through Canvas.

---

## Assignment Summary

- Engineering **codes of ethics** universally place **public safety and welfare** as the paramount obligation.
- **Ethical decision making** is a four-step process: recognize, gather facts, evaluate options, act and reflect.
- **Conflicts of interest** must be disclosed and managed to preserve professional integrity.
- The four IP types — **patent, copyright, trademark, trade secret** — each protect different kinds of creative and technical work.
- **Safety standards** define acceptable performance; evaluating your design against them is a professional obligation.
- **Risk analysis** scores risks on Likelihood × Impact; the matrix shows you where to focus.
- **Mitigation strategies** — avoid, reduce, transfer, accept — translate your analysis into specific action steps.

A well-prepared Risk Management & Ethics deliverable makes your proposal stronger: reviewers can see that you have thought critically about what could go wrong and have a credible plan to address it.
