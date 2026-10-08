# Built By Her interactive lesson standard

This repository is the reference for future lessons. Keep course work in GitHub; do not introduce CodePen. User-approved requirements, 17 September 2026: each lesson must teach the source content, act as a workbook, offer contextual (?) guidance, and clearly require PDF export to keep a copy. Preserve continuity across modules.

## Source and content
BP-01 release 2.5 follows `BBH_M01_L01_Business-Definition.pdf`, ten pages, supplied 8 October 2026 (SHA-256: `865c1f58412c14dec8bfd04aa77ad5d399c19cbc8362f190738e98b14fa7892d`). Its guidance-check date is 11 September 2026, not a new independent verification. The PDF is authoritative. Preserve learning boundaries, examples, disclaimers, activities, AI prompts and onward references. Do not invent URLs for lessons that have not been published.

## Shared structure
Use the existing stylesheet and component patterns. Order: 01 Your identified gap; 02 What this lesson helps you do; 03 The 60-second answer; 04 Work it through (teaching, diagrams, examples); 05 Build your answer (activities, reflection, AI guidance); 06 The one thing to remember; 07 Common questions; 08 Where to go next. Export follows section 08. Adapt activity fields to the source, not the other way around. Use semantic headings, labelled inputs, examples, diagrams, native disclosure panels and consistent activity cards. Do not force different lesson outputs into a business-definition sentence.

## Visual system
Navy #173f59, teal #238e8c, orange #c64413, purple #8e3e96; white panels and pale background. Georgia headings, system sans body. Reuse spacing, border radii, field styling, help buttons, print styles and responsive breakpoints from styles.css. Lesson code, module, title, duration and source version must be visible. Keep core teaching visible; optional guidance can expand. At narrow widths stack columns; do not shrink workbook text to fit.

## Workbook behaviour
All fields require stable unique IDs, visible labels and data-save keys. (?) guidance must work on hover, keyboard and tap, and dismiss with Escape. Use concrete help, not invented business claims. Temporary localStorage is convenience only: handle blocked storage without losing the live form. Never imply account, cross-device or GitHub saving. Keep the export warning at the start and finish. Each lesson/version has its own storage key derived from body data-lesson and data-version. Preserve old drafts separately when meanings change; never silently put old answers into new questions.

## PDF export
Use the shared beforeprint/export handler to build a text-based printable workbook from current form values. Each activity and all its fields must be represented; include lesson/version/date and synthesized outputs. Use textContent for user answers, preserve line breaks, and allow long answers across pages. Export opens the browser print dialog: instruct learners to select Save as PDF and verify their downloaded file. Never mark an export successful merely because the dialog opened or closed. The PDF is a permanent readable copy, not an importable backup or fillable form. BP-01 exports the full lesson and the selected strand’s completed workbook: teaching, examples, diagrams, reflection, AI guidance and expanded prompts, expanded FAQs, and resources. Transform live fields into wrapping text, include contextual help and expand disclosures. Preserve the source diagrams as responsive HTML/CSS, including their arrows, side-by-side check and final output box. Omit an empty generated plan; label a partially completed one “Your plan so far”.

## Repeating the workflow
1. Read and visually inspect each new source PDF; compare its complete section and activity inventory.
2. Reuse this shell, CSS and interaction patterns. Create a separate lesson URL and unique storage key; do not overwrite BP-01 with a different lesson.
3. Record the exact source filename, version/date and any deliberate adaptations in GitHub.
4. Check every source heading, example, AI prompt, workbook field, reference and expected output against the page.
5. Test keyboard/tap guidance, autosave and blocked storage, all outputs, reset confirmation and preservation of older drafts.
6. Check desktop/mobile rendering and export with empty, multiline, long and punctuation-rich answers. Inspect a generated PDF for clipping and missing answers.
7. Publish requested changes to GitHub, verify file contents and live page, and report any deployment uncertainty.

## BP-01 mapping
Page 1: sections 01–03. Page 2: teaching steps 1–2 and definition diagram. Page 3: steps 3–4 and all three examples, including the revised mobile dog groomer. Page 4: section 05, activity flow and Notes before you begin. Page 5: Activity 1, one idea initially and optional more. Page 6: Activity 2, all definition fields and dates. Page 7: Activity 3 and reflection. Page 8: complete AI guidance and both exact prompts. Page 9: takeaway and four FAQs. Page 10: next step, related lessons, official guidance, and My next action and review date. Activity 3's separate fields generate the source's combined test statement. The final action and date writing space is adapted into a textarea and date picker. The original GOV.UK article deep link is retained for usefulness. Printed continuation headings and ruled blank lines become responsive content and expanding fields.

## Optional repeatable entries and alignment
Show one initial entry for repeatable exercises; use an “Add another …” button to append entries only when requested. Do not hide required distinct questions. Restore all previously answered rows, preserve stable IDs and include dynamically added entries in PDF export and reset. Use shared grid label tracks (subgrid) so wrapped labels do not push textareas out of alignment. Stack fields on mobile. Maintain consistent input heights within each row.

## Generated plan summaries
Keep the example sentence in the instructions. Hide the generated plan card until at least one relevant answer has non-whitespace content; reveal it when typing or restoring a draft, and hide it again if all those answers are cleared. Label the card “Your completed plan”. Keep the synthesized plan in the PDF export.

## Separate business strands and releases
Offer one workbook initially with an optional Add a business strand control. Keep each strand’s answers and 30-day plan separate and let learners rename/switch them. Export the selected strand with the complete lesson; explicitly tell learners to export each strand. Migrate the existing v2 browser draft into the first strand without deleting it. Blocked storage must still allow in-session switching. Reset clears only the selected strand. Use data-release for the on-screen and PDF release number; data-version remains the answer-schema version so presentation updates do not lose drafts. Release 2.4 incorporates the 18 September source audit and the reattached FINAL(1).pdf.

## Source audit gate
For every PDF revision, record the source filename, page count, checksum and date, then create a page-to-screen/export mapping before publication. Check writing spaces and diagram captions as well as paragraphs: blank ruled areas may be workbook requirements. Record deliberate adaptations, never silently omit them. Keep stable field IDs/storage schema when question meanings do not change. New fields must participate in saving, reset, strand switching and export. Label AI prompts visibly with their source numbers. Do not force browser exports to match source page counts: preserve readable pagination for variable answer lengths. Release 2.5 adds begin-notes, final-action and final-review without changing the v2 storage schema.

## BP-02 implementation
Module 1 Lesson 2 is published at `bp02/` in this repository. Its independent schema is `bbh-bp02-v1-strands`; do not reuse BP-01 identifiers or generated outputs across lessons. See `bp02/SOURCE-AUDIT.md` for the ten-page source mapping. BP-02 adds optional repeatable needs, two initial decision rules and an optional third, full workbook PDF and concise requirements statement PDF. Keep all source-specific prompts, teaching and export fields when adapting the common visual components.

## BP-03 implementation
Module 1 Lesson 3 is published at `bp03/`; see its SOURCE-AUDIT.md for all ten source pages and adaptations. It uses isolated `bbh-bp03-v1-strands` storage. Preserve the initial notes, eight direction questions, dates, 30-day action/change/evidence/deadline, source AI prompts and final action. Both full workbook and concise direction-page exports are supported; never replace source-specific fields with another lesson's outputs.
