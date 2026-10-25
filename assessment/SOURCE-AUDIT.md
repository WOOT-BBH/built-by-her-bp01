# Assessment review and rebuild · 25 October 2026

## Sources reviewed
- Existing https://woot-bbh-assessment.netlify.app/ HTML, question bank, profile logic, duplicate result renderers and PDF export.
- Shared course-build conversation supplied by the owner, including its latest module inventory and continuity instructions.
- Current GitHub lesson sources, `AGENTS.md`, `LESSON-STANDARD.md` and source-specific identified-gap/output sections.
- Live Circle toolkit listing: 12 sections, 77 lessons. Exact lesson URLs were captured from the page.
- Circle M08L03 content opened to resolve duplicated heading: correct PDF, discovery-call summary and m08-l03 workbook.

## Findings and changes
1. Old profiles refer to Modules 13–19 and the structure selector points to Module 4 for legal setup. Current structure is 12 modules; setup is Module 3. Replaced broad range-based profiles with direct module/lesson mapping.
2. Old calculations convert unanswered items to not-started. New partial plans preserve unknowns and flag incompleteness.
3. Old priorities omit in-progress gaps and contain no lesson-level recommendation links. New priorities retain them and link every recommendation.
4. Old questions assume websites, social channels, AI use, funding and growth. New questions allow not-relevant-now and recognise considered decisions to stay small or not adopt an activity.
5. Structure choices are not a proxy for stage. New stage and offer-type choices are separate; legal learning is framed as questions to check, not certification.
6. Old wellbeing/confidence items cannot all be claimed as directly taught course outcomes. Capacity, working needs, boundaries and support are routed to the relevant practical lessons. No mental-health diagnosis or confidence score is inferred.
7. New question coverage is 78 items corresponding to 78 built lesson sources. Circle currently has 77 entries; M10L08 uses its verified direct workbook. Unbuilt lessons are excluded.
8. All user-entered text is escaped on screen. Progress storage is isolated under a new schema; old Netlify answers are neither deleted nor silently remapped.
9. Current course branding retained: supplied logo, navy/teal/orange/purple, Georgia headings, system body and responsive panels.

## Scope limits
The course itself has not been rewritten. M08L03's duplicate Circle heading and M10L08's missing Circle entry are reported separately. Mapping to those lessons is usable through a verified Circle lesson or direct workbook. No claim that every Circle lesson's entire content was re-audited against a source PDF during this assessment rebuild.
