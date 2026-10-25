# Built By Her Assessment 2.0

Self-contained, browser-local assessment aligned to the 12-module Built By Her course. No answer collection endpoint, external scripts, analytics or AI inference. It is a reflection and learning-routing tool, not a compliance check or validated business score.

## Content and links
- `data.js`: 78 stable question IDs, source-derived lesson titles/outcomes and verified destinations.
- 77 Circle lesson links from the live toolkit listing, checked 25 October 2026.
- M10L08 is built in GitHub but absent from Circle. Its published workbook is the explicit fallback.
- M08L03's Circle heading duplicates Lesson 2. Its attachment, summary and workbook are the correct discovery-call lesson, so the exact Circle URL is retained with the correct source title.
- Do not invent M03L07 or M08L07 links. They are not currently built/published.

## Ranking
`engine.js` includes only reported gaps (help, start, progress). Immediate-pressure matches precede protection/records for launch or trading, early foundations for idea/launch, chosen focus, then other gaps. Within a tier: help, start, progress, then module/lesson order. Useful preparation can move another reported gap before a recommendation, except ahead of immediate-pressure items. No done, deferred, unanswered or offer-inapplicable item is injected. No business-success inference, diagnostic profile or overall readiness score.

All gaps remain in the downloadable ordered plan; the first three are highlighted on screen. Suggested preparation is optional, not a claim that course lessons require prerequisites.

## Drafts and exports
New localStorage key `bbh-assessment-v2`. The old Netlify v1 draft is not touched or automatically reinterpreted. Different origins cannot share drafts. The new assessment must be completed afresh. Blocked storage allows in-session use and export. Reset requires confirmation and affects only v2.

Direct PDF download uses locally bundled jsPDF and embedded font subsets. Includes profile, partial-completion notice, counts, prioritisation explanation, action/review/support notes, all ranked recommendations with clickable destinations, and complete answer record. Browser print is a fallback. Export messages ask the learner to verify the file, never claim a save based on opening a dialog.

## Validation
Run `node assessment/test-engine.cjs` from the repository root. Covers 96 profile combinations plus specific empty, deferred, complete, urgent, partial and prerequisite cases. DOM tests also covered safe user text, blocked storage and all result states. Full 78-gap export checked for 80 link annotations, final recommendation, long notes and answer record. Representative PDF pages visually inspected. Desktop and 390-pixel iframe layouts checked with live browser navigation, draft reload and direct PDF download.

## Maintenance
Keep IDs stable when meanings do not change. Change schema/storage key if meanings change. Preserve previous drafts rather than migrating position-based answers. Review the live Circle destinations whenever lessons move. Course source PDFs and maintained lesson files govern titles/outcomes; assessment statements are deliberately adapted into self-reflection prompts.

The existing Netlify assessment is retained for old drafts and rollback. The active Circle embed should point to this GitHub Pages assessment. Public GitHub hosting matches the existing course hosting; Circle controls membership access to the linked lessons, not to the public assessment itself.
