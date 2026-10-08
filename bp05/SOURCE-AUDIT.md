# BP-05 source audit — release 1.0

Source: `BBH_M01_L05_Ninety-Day-Plan.pdf`, nine pages, supplied 8 October 2026. Module 1, Lesson 5: How do I turn that priority into a realistic 90-day plan?

Source SHA-256: `47ec2cb4b0b8867415717b03811a53d297b9ba8be4c7c6f451e0b0929851ee9a`.

## Page-to-screen and export mapping

| Source page | Lesson/workbook implementation |
| --- | --- |
| 1 | Title, lesson duration, identified gap, all four objectives, scope boundary and complete 60-second answer. |
| 2 | All four teaching steps, priority/day-90/actions/review diagram with arrows and caption, illustrative-example introduction. |
| 3 | All three complete examples (bookkeeping, children’s activity, jewellery), output and three-activity flow with final output box. |
| 4 | Activity 1 instructions and assumption marking; priority and day-90 result writing fields implement the introductory instruction. Three-column possible-action fields retain the source table prompts. Start with one and add up to three. |
| 5 | Activity 2 priority, day-90 progress, up to three ordered actions with first date and time set aside, reduced/paused work, evidence, midpoint and end reviews, version date and page review date. |
| 6 | Activity 3 instructions, exact example sentence, separate action/priority/evidence/deadline fields and generated first-action sentence; all three reflection questions. |
| 7 | Complete AI introduction, four capabilities and four limitations, both exact numbered prompts with copy buttons, full closing limitation. |
| 8 | Complete takeaway and all four questions/answers in expandable disclosures. |
| 9 | Next step, both related lesson references, paid book and free official guidance with source-check date, final action and review-date writing fields. |

## Deliberate interactive adaptations

- Reuse the BP-01–04 visual system, labelled fields, contextual hover/tap/keyboard guidance, responsive column stacking, separate business strands and PDF warnings.
- The printed Activity 1 table has more blank rows than its instructions permit. Follow the explicit maximum of three actions, rather than the number of blank rows.
- Activity 2 starts with one action and allows two optional additions. Split each source action/date/time cell into three clearly labelled fields. Hidden unused action slots do not appear in the exports; added rows and answers survive reload and strand switching.
- Activity 1 explicitly asks learners to write the priority and day-90 result; provide these fields even though the printed table has only action/support/evidence columns.
- Activity 3 retains the source’s 30-day first-action wording within the overall 90-day plan. The generated sentence is hidden while empty and labelled as partial when incomplete. Calendar entry remains the learner’s own action; no calendar transmission occurs.
- No extra “Notes before you begin” field: this source has no such writing space. The final source writing space is retained.
- Full export contains all lesson content and the selected strand’s answers. Concise Action Page export contains Activity 2 and the first scheduled action. Long answers can extend beyond one page.
- Local browser drafts use isolated `bbh-bp05-v1-strands`; no changes to earlier lessons’ storage. Clearly explain that PDF export is required to retain a permanent copy.
- Link published BP-04; retain the unpublished IA-01 reference as text. Use the official guidance article’s existing deep link. Attribute the guidance-check date to the PDF; no claim of a new independent review.

## Validation

- Read extracted text and visually inspected all nine source pages.
- Checked both AI prompt bodies against source text with exact whitespace-normalised equality.
- Tested both three-row limits, stable/unique IDs, restoring optional rows, strand switching/reload, prior-lesson storage isolation, unavailable localStorage, reset confirmation and preservation of other strands, help click/Escape, empty/partial/complete plan behaviour, and full/concise export DOM.
- Export checks included blank, completed and 70-line punctuation-rich answers with literal HTML safely preserved as text; every long-answer line survived PDF extraction.
- Rendered validation PDFs using the same generated print content and stylesheet: empty full workbook 10 pages; filled full workbook 11; concise action page 1; long-answer full 13; long concise 3. Browser print pagination can vary.
- Visually checked all pages of the filled workbook and concise action page for clipping and readable layout. Responsive styling is inherited from the established lessons; live browser verification follows deployment.
