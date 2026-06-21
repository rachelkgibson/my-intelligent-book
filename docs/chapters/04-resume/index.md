---
title: Resume Lab
description: Students brainstorm their experience and skills using a structured worksheet, then write a professional one-page resume using action verbs, quantifiable results, and the standard section structure used in engineering job applications.
generated_by: claude skill chapter-content-generator
date: 2026-06-19
version: 0.09
---

# Resume Lab

## Objectives

- Complete a brainstorming worksheet to inventory your education, experience, skills, and activities.
- Write a one-page professional resume tailored to an engineering internship or job.
- Apply resume best practices: action verbs, quantified achievements, and clean formatting.

## Introduction

Your portfolio shows what you can build. Your resume tells the story of who you are as an engineering candidate in a format employers and college admissions offices can scan in seconds.

A resume feels intimidating until you realize it is just an organized version of things you already know about yourself. That is why this assignment starts with brainstorming — before you write a single bullet point, you will inventory everything that belongs on your resume. Once that raw material exists, building the document is straightforward.

---

## Step 1: Complete the Brainstorming Worksheet

Before you open a resume template, fill out the Resume Brainstorming Worksheet. This is where you collect the raw material for every section of your resume.

!!! example "Go to the Brainstorming Worksheet"
    Open the [Resume Brainstorming Worksheet](https://docs.google.com/document/d/1cZ-lBuNJbYQTHdzgbYCnjQj8vh27n1EJj_zUPOTG4SU/edit?usp=sharing) and complete every section before moving on. The more specific your answers, the stronger your resume will be.

The worksheet has seven sections. Here is what each one is asking for and why it matters:

### Education

Write down your expected graduation year, your GPA if you know it, and the classes you have taken that are most relevant to engineering or the job you want. Relevant coursework is especially important if you do not have much work experience yet — it shows employers that you have technical training even before your first internship.

### Work Experience

List any jobs you have held, including part-time or summer work. Even jobs unrelated to engineering can show responsibility, time management, and customer service — all valuable qualities. You will turn each job into 2–3 bullet points on your resume.

### Volunteer Experience

Volunteering counts as experience. If you have helped at a community event, tutored classmates, or worked with a nonprofit, write it down. Volunteer work often demonstrates initiative and character in ways that paid work does not.

### Academic Honors

List any awards, recognitions, scholarships, or academic achievements. Also include any certifications or special training — first aid, a software certification, a summer STEM program. These belong in an Awards and Certifications section on your resume.

### Extracurricular Activities

List clubs, sports, school competitions, and special events you have participated in. Leadership roles within clubs (officer, captain, committee chair) are especially worth noting. Engineering-related activities like robotics, Science Olympiad, or a school makerspace are high-value entries.

### Hard Skills

**Hard skills** are technical, teachable abilities — things you either know how to do or you do not. Review the list on the worksheet and check everything that applies to you honestly:

- Typing, email, Google Docs, Google Spreadsheets
- Presentations, writing, graphic design, website design
- Coding, photography, reading music or playing an instrument
- Speaking a foreign language

On your resume, these go in a Skills section. List only what you can actually do — interviewers sometimes ask you to demonstrate claimed skills.

### Soft Skills

**Soft skills** are personal qualities that describe *how* you work and how you interact with others. The worksheet lists examples:

- Communication, good listener, teamwork, helpful
- Dependable, responsible, hard working, organized
- Fast worker, learns quickly, positive attitude, friendly, cheerful

Soft skills do not appear on your resume as a list — instead, you *demonstrate* them through the bullet points in your experience and activities sections. For example, instead of writing "teamwork" as a skill, you write "collaborated with a four-person team to design and test a water filtration prototype."

---

## Step 2: Build Your Resume

With your brainstorming complete, you have everything you need. Now you organize it into a one-page document.

### Resume Structure

The standard engineering resume follows this section order:

| Section | What Goes Here | From Your Worksheet |
|---|---|---|
| **Header** | Name, phone, email, portfolio or LinkedIn URL | — |
| **Education** | School, graduation year, GPA (if 3.5+), relevant coursework | Education |
| **Skills** | Technical tools, software, languages | Hard Skills |
| **Experience** | Jobs and volunteer roles with action-verb bullet points | Work Experience, Volunteer Experience |
| **Projects** | Class or personal engineering projects | Portfolio, class projects |
| **Awards & Activities** | Competitions, clubs, sports, certifications | Academic Honors, Extracurriculars |

### The One-Page Rule

Students and early-career engineers always use a one-page resume. Hiring managers spend an average of 6–7 seconds scanning before deciding whether to read closely. If your resume runs long, cut descriptions — do not shrink the font below 11 pt or reduce margins below 0.5 in.

### Action Verbs and Quantifiable Results

Every bullet point in your Experience and Projects sections must begin with a strong **action verb** — a specific, past-tense verb that shows what you *did*:

> *Designed, built, tested, analyzed, presented, led, organized, improved, calculated, programmed, researched, trained, managed*

Avoid "responsible for" or "helped with." These are passive and vague.

Pair each action verb with a **quantifiable result** whenever possible — a number that makes the achievement concrete:

| Weak | Strong |
|---|---|
| Helped with the school store | Managed inventory for a school store serving 200+ students daily |
| Did coding projects | Built three Python programs including a grade calculator used by 30 classmates |
| Volunteered at food bank | Sorted and distributed 400 lbs of food per shift at a local food bank |

---

## Common Resume Mistakes

| Mistake | Why It Hurts |
|---|---|
| Using "responsible for" instead of action verbs | Sounds passive; doesn't show what you actually did |
| No quantifiable results | Claims aren't credible without numbers |
| Inconsistent formatting (mixed fonts, sizes) | Signals lack of attention to detail |
| Including a photo or personal info (age, gender) | Unprofessional in the U.S.; creates legal risk for employers |
| Generic objective statement | Wastes prime space; every applicant says the same thing |
| More than one page | Suggests poor judgment about what matters |

---

#### Diagram: Resume Section Builder


<iframe src="../../sims/resume-section-builder/main.html" width="100%" height="554px" scrolling="no"></iframe>
[Run Resume Section Builder Fullscreen](../../sims/resume-section-builder/main.html)

<details markdown="1">
<summary>Interactive Resume Section Builder</summary>
Type: interactive infographic
**sim-id:** resume-section-builder<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Students will *apply* (Bloom L3) resume writing conventions by assembling a sample resume section using a drag-and-drop interface and receiving feedback on action verb strength and quantification.

**Canvas:** 900 × 560 px, responsive.

**Left panel — Element bank (280 px):** A scrollable list of 12 sample bullet points, some written with strong action verbs and quantifiable results, some written weakly (passive voice, vague language). Each is draggable.

**Center panel — Resume preview (400 px):** A simplified resume template showing an Experience section with three empty bullet-point slots. Students drag bullet points from the element bank into the slots.

**Right panel — Feedback (220 px):** As bullets are dropped in, each is evaluated on two criteria: (1) does it begin with an action verb? (2) does it contain a number or measurable result? A green checkmark or red X appears for each criterion, with a one-line suggestion for improvement on red items.

**"Improve It" mode:** Clicking a bullet in the resume preview opens an editable text field so students can rewrite the bullet and re-check it.

**Implementation:** Embed as `docs/sims/resume-section-builder/index.html` using p5.js CDN. Iframe at 620 px height.
</details>

---

!!! example "Go to Your Resume Google Doc"
    Once your brainstorming worksheet is complete, open your Resume Google Doc and build your one-page resume using the structure above. Every bullet point in Experience and Projects must start with an action verb. Submit both the worksheet and the resume through Canvas.

---

## Assignment Summary

A complete Resume Lab submission includes:

1. **Brainstorming Worksheet** — every section filled out with honest, specific details
2. **One-page resume** with all of the following:
    - Header with name, email, phone, and portfolio or LinkedIn link
    - Education section with school, graduation year, GPA (if 3.5+), and 3–5 relevant courses
    - Skills section listing specific hard skills you can actually demonstrate
    - Experience and/or Projects section with 2–4 bullets per entry, each starting with an action verb and including at least one number
    - Awards and Activities section drawn from your academic honors and extracurriculars
    - Consistent formatting — one font, clean margins, fits on one page

Your resume and cover letter (Assignment 5) are submitted as a package. The experience and skills you document here feed directly into how you frame yourself in your cover letter and final portfolio.
