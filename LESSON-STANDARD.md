# Built By Her interactive lesson standard

This repository is the reference for future lessons. Keep course work in GitHub; do not introduce CodePen. User-approved requirements, 17 September 2026: each lesson must teach the source content, act as a workbook, offer contextual (?) guidance, and clearly require PDF export to keep a copy. Preserve continuity across modules.

## Source and content
BP-01 version 2 follows `BP-01_What_is_my_business_who_is_it_for_and_what_problem_does_it_solve_FINAL.pdf`, eight pages, supplied 17 September 2026. Its guidance-check date is 11 September 2026, not a new independent verification. The PDF is authoritative. Preserve learning boundaries, examples, disclaimers, activities, AI prompts and onward references. Do not invent URLs for lessons that have not been published.

## Shared structure
Use the existing stylesheet and component patterns. Order: 01 Your identified gap; 02 What this lesson helps you do; 03 The 60-second answer; 04 Work it through (teaching, diagrams, examples); 05 Build your answer (activities, reflection, AI guidance); 06 The one thing to remember; 07 Common questions; 08 Where to go next. Export follows section 08. Adapt activity fields to the source, not the other way around. Use semantic headings, labelled inputs, examples, diagrams, native disclosure panels and consistent activity cards. Do not force different lesson outputs into a business-definition sentence.

## Visual system
Navy #173f59, teal #238e8c, orange #c64413, purple #8e3e96; white panels and pale background. Georgia headings, system sans body. Reuse spacing, border radii, field styling, help buttons, print styles and responsive breakpoints from styles.css. Lesson code, module, title, duration and source version must be visible. Keep core teaching visible; optional guidance can expand. At narrow widths stack columns; do not shrink workbook text to fit.

## Workbook behaviour
All fields require stable unique IDs, visible labels and data-save keys. (?) guidance must work on hover, keyboard and tap, and dismiss with Escape. Use concrete help, not invented business claims. Temporary localStorage is convenience only: handle blocked storage without losing the live form. Never imply account, cross-device or GitHub saving. Keep the export warning at the start and finish. Each lesson/version has its own storage key derived from body data-lesson and data-version. Preserve old drafts separately when meanings change; never silently put old answers into new questions.

## PDF export
Use the shared beforeprint/export handler to build a text-based printable workbook from current form values. Each activity and all its fields must be represented; include lesson/version/date and synthesized outputs. Use textContent for user answers, preserve line breaks, and allow long answers across pages. Export opens the browser print dialog: instruct learners to select Save as PDF and verify their downloaded file. Never mark an export successful merely because the dialog opened or closed. The PDF is a permanent readable copy, not an importable backup or fillable form. BP-01 exports workbook answers; teaching remains available on the lesson page.

## Repeating the workflow
1. Read and visually inspect each new source PDF; compare its complete section and activity inventory.
2. Reuse this shell, CSS and interaction patterns. Create a separate lesson URL and unique storage key; do not overwrite BP-01 with a different lesson.
3. Record the exact source filename, version/date and any deliberate adaptations in GitHub.
4. Check every source heading, example, AI prompt, workbook field, reference and expected output against the page.
5. Test keyboard/tap guidance, autosave and blocked storage, all outputs, reset confirmation and preservation of older drafts.
6. Check desktop/mobile rendering and export with empty, multiline, long and punctuation-rich answers. Inspect a generated PDF for clipping and missing answers.
7. Publish requested changes to GitHub, verify file contents and live page, and report any deployment uncertainty.

## BP-01 mapping
Pages 1–3: sections 01–04 and activity journey. Pages 4–5: one initial idea row with optional additional rows, nine definition fields including review date plus version date, and a structured 30-day test. Page 6: reflection, AI can/cannot and exact prompts. Pages 7–8: takeaway, FAQs, next step, related lessons and GOV.UK reference. Activity 3's separate action/assumption/evidence/date fields produce the source's combined test statement. Extra guidance is editorial support; it must not change the lesson's scope.

## Optional repeatable entries and alignment
Show one initial entry for repeatable exercises; use an “Add another …” button to append entries only when requested. Do not hide required distinct questions. Restore all previously answered rows, preserve stable IDs and include dynamically added entries in PDF export and reset. Use shared grid label tracks (subgrid) so wrapped labels do not push textareas out of alignment. Stack fields on mobile. Maintain consistent input heights within each row.
