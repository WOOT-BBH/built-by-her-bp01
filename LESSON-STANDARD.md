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

## BP-04 implementation
Module 1 Lesson 4 is published at `bp04/` with isolated `bbh-bp04-v1-strands` storage. See its SOURCE-AUDIT.md. Preserve the four-candidate maximum, all priority questions including review decision and first action, full source AI prompts, and full/concise PDF exports. Source instructions govern row limits even where printed tables contain extra blank rows.

## BP-05 implementation
Module 1 Lesson 5 is published at `bp05/`; see its nine-page SOURCE-AUDIT.md. Isolated storage is `bbh-bp05-v1-strands`. Both possible-action and scheduled-action groups begin with one row and allow up to three, following the source's explicit limit. Each planned action retains its own first step, first date and protected time. Preserve priority, day-90 result, evidence, midpoint/end reviews, version/page-review dates and first scheduled action. Full workbook and concise 90-Day Action Page exports include dynamically added actions. Activity 3 deliberately uses the source's 30-day first-action wording inside the 90-day plan. Do not invent an unpublished Module 2 URL.

## Module 2 continuity
Module 2 is Business Idea and Offer, six lessons. Its first lesson is `m02-l01/`, following `BBH_M02_L01_Idea-Test.pdf` and source numbering M02-L01. Earlier PDFs referenced IA-01; use each newly supplied PDF's current title and numbering. M02-L01 uses isolated `bbh-m02l01-v1-strands` storage. Preserve the eight Idea Test Page questions, initial and final notes, evidence/assumption observations with optional added rows, who/what informs the first test, exact AI prompt bodies, and full/concise exports. See its SOURCE-AUDIT.md for the ten-page mapping. Use the same shared design and controls across modules. The user's writing preference is no em dashes: use full stops, commas or middle-dot title separators as appropriate. Do not link unpublished lessons to invented URLs.

## M02-L02 and lesson delivery summaries
M02-L02 is published at `m02-l02/` with isolated `bbh-m02l02-v1-strands` storage. Preserve all eight Ideal Customer Page questions, optional customer/enquiry rows, notes and the 30-day customer-question plan. See its SOURCE-AUDIT.md. Every completed lesson must be delivered with a short WOOT-style introduction, three learning bullets, “You’ll leave with”, the verified live workbook link and the PDF export reminder. Use warm, practical, evidence-led wording without em dashes. Save the copy as LESSON-SUMMARY.md alongside the lesson for reuse in Circle.

## M02-L03
Published at `m02-l03/`, isolated `bbh-m02l03-v1-strands` storage. Preserve the five-alternative limit, all eight Competitor Snapshot questions, full AI prompts, notes, research plan and both exports. See SOURCE-AUDIT.md and LESSON-SUMMARY.md for source mapping and Circle copy.

## M02-L04
Published at `m02-l04/`, isolated `bbh-m02l04-v1-strands` storage. Preserve eight Offer Design questions, optional observations, included/excluded boundaries, willingness-to-pay evidence, exact AI prompts, full/concise exports and the 30-day test. See SOURCE-AUDIT.md and LESSON-SUMMARY.md.

## M02-L05
Published at `m02-l05/`, isolated `bbh-m02l05-v1-strands` storage. Preserve all eight model/route questions, payment timing, delivery requirements, optional observations, exact AI prompts, both exports and the 30-day test. See SOURCE-AUDIT.md and LESSON-SUMMARY.md. Source guidance date: 6 October 2026.


## Module 2 Lesson 6 continuity
M02-L06 is in `m02-l06/`, sourced from `BBH_M02_L06_Clear-Message.pdf` (10 pages). See its SOURCE-AUDIT.md and LESSON-SUMMARY.md. Retain all eight Clear Offer Message fields, both complete AI prompts, evidence and unsupported-claim guidance, conditional test summary and isolated `bbh-m02l06-v1-strands` storage. This completes Module 2. Future lessons must retain the shared layout, optional rows, accessible help and full/concise PDF exports, checked against every source page.


## Module 3 / SP-01: source-specific flow
Module 3 is Business Setup and Protection, seven lessons. M03-L01 / SP-01 lives in `m03-l01/` with isolated `bbh-m03l01-v1-strands` storage. Its seven-page PDF deliberately changes the flow: nine sections, 30 minutes (10 reading, 15 notes, 5 review), five short workbook prompts, one separate optional AI prompt, and later optional guidance/actions. Follow the new PDF structure rather than imposing three activities, a 30-day test, can/cannot diagram or final structure choice. Retain the same branding, accessible help, draft warnings and full/concise exports. No repeatable-row button for distinct required questions; optional separate workbooks remain available. A source blank comparison space and next-question note are optional. Preserve general-information/advice boundaries, all three examples and four official deep links. Unpublished SP-02 and MN-05 references remain text. See SOURCE-AUDIT.md and LESSON-SUMMARY.md. Future PDFs may change flow again: inventory each source before adapting the shell.


## SP-02 / Module 3 Lesson 2
Published at `m03-l02/`, source BBH_M03_L02_SP-02_Business-Money-and-Records.pdf (eight pages). Nine sections, five full-width source questions and one optional next-question field; one optional AI prompt. Preserve all transaction/evidence distinctions, three examples, official links and later-task boundaries. Isolated storage: bbh-m03l02-v1-strands. Full and concise notes exports; see SOURCE-AUDIT.md and LESSON-SUMMARY.md. SP-02 is now published; MN-05 remains a text reference.


## SP-03 / Module 3 Lesson 3
Published at `m03-l03/`, source BBH_M03_L03_SP-03_Insurance-Requirements.pdf (eight pages). Nine sections, five distinct full-width questions, optional next question and one exact optional AI prompt. Retain all cover distinctions, claims timing, legal/contractual/own-risk distinctions, three complete examples and official resources. This prepares discussion, not policy selection or confirmation of cover. Isolated storage: bbh-m03l03-v1-strands. Full and concise notes exports. SP-07 remains text until published. See SOURCE-AUDIT.md and LESSON-SUMMARY.md.


## SP-04 / Module 3 Lesson 4
Published at `m03-l04/`, source BBH_M03_L04_SP-04_Contracts-Terms-and-Agreements.pdf (eight pages). Nine sections, five distinct full-width questions, optional priority question and one exact optional AI prompt. Preserve contract formation/timing, consumer/business and jurisdiction distinctions, document purposes, privacy/IP boundaries, all examples and resources. Preparation for solicitor advice, not clause drafting or enforceability assessment. Isolated storage: bbh-m03l04-v1-strands. Full and concise notes PDF exports. SP-05 remains text until published. See SOURCE-AUDIT.md and LESSON-SUMMARY.md.


## SP-05 / Module 3 Lesson 5
Published at `m03-l05/`, source BBH_M03_L05_SP-05_Professional-Drafting-or-Review-Brief.pdf (nine pages). Five source questions for purpose/context/process/preferences/advice, optional priority question and exact optional AI prompt. Preserve facts/plans/preferences distinctions, privacy sequence and unknown retention, scope/exclusions, all three examples (source pages 4–5), advice boundaries and no prerequisite. Shared full/concise brief exports and isolated bbh-m03l05-v1-strands storage. Optional separate workbooks can hold separate document briefs. SP-04 and SP-05 now link both ways. See SOURCE-AUDIT.md and LESSON-SUMMARY.md.


## SP-06 / Module 3 Lesson 6
Published at `m03-l06/`, source BBH_M03_L06_SP-06_Privacy-Data-and-Online-Trading.pdf (nine pages). Nine sections, six distinct questions mapping one interaction, including its first unresolved question; do not duplicate that question in section 9. Preserve purpose/marketing distinctions, provider unknowns, health-data safeguards, tracking exceptions, consumer/digital-sale distinctions, three complete examples and exact optional AI prompt. 30 minutes: 13 reading, 12 notes, 5 review. Isolated bbh-m03l06-v1-strands storage; optional separate interactions and full/concise notes exports. All five official resources and published SP-05 link retained. See SOURCE-AUDIT.md and LESSON-SUMMARY.md.


## Module 4 / BM-01
Module 4 is Brand and Messaging, six lessons. BM-01 lives at m04-l01/, source BBH_M04_L01_BM-01_Brand-Identity.pdf (six pages). Preserve nine sections, six main questions and four optional reflection fields representing blank source writing boxes. Three complete examples, exact optional AI prompt, two FAQs, further reading and unpublished BM-02 title. No logo or design output required. Isolated bbh-m04l01-v1-strands storage; shared full/concise exports, contextual guidance and export reminders. Source and print review plus ten-field behavioural tests passed. See SOURCE-AUDIT.md and LESSON-SUMMARY.md.


## BM-02 / Module 4 Lesson 2
Published at m04-l02/, source BBH_M04_L02_BM-02_Brand-Values.pdf (six pages). Five main prompts for decision, one/two values, observable actions, two plausible responses, provisional choice and limit. Five optional reflections preserve source writing boxes. Retain all three examples, complete editor example across pages 3–4, exact optional AI prompt and two FAQs. Full/concise exports, isolated bbh-m04l02-v1-strands storage and shared guidance/export reminders. Ten fields tested including blocked storage, separate workbooks, safe multiline and long-answer print output. Both exports visually reviewed. BM-01 and BM-02 link both ways. See source audit and Circle summary alongside the lesson.


## BM-03 / Module 4 Lesson 3
Published at m04-l03/, source BBH_M04_L03_BM-03_Tone-of-Voice.pdf (six pages). Preserve nine sections, five main questions for reader/purpose, two qualities, practical rules, short draft and accuracy check. Three optional notes fields preserve source writing spaces; combine the rules space across pages 2–3 after the complete teaching. Retain all three complete examples, the exact optional AI prompt, two FAQs and both reading links. BM-06 remains text until published. Eight fields use isolated bbh-m04l03-v1-strands storage, shared separate workbooks, guidance and full/concise exports. Source coverage, blocked storage, safe multiline/long-answer output and rendered PDFs checked. Keep short AI and next-step sections together in print. See SOURCE-AUDIT.md and LESSON-SUMMARY.md.


## BM-04 / Module 4 Lesson 4
Published at m04-l04/, source BBH_M04_L04_BM-04_Customer-Facing-Message.pdf (seven pages). Six main questions cover reader/situation, offer, practical help, accurate detail, suitable next step and short draft. Six optional fields preserve source writing spaces, including claims to check before publication. Preserve planned/trading distinctions, no inferred demand, feature/usefulness links, all six steps of the home organising example, both contrasts, exact optional AI prompt, two FAQs and two GOV.UK resources. BM-05 remains text until published. Isolated bbh-m04l04-v1-strands storage; shared separate workbooks, accessible help and full/concise exports. Twelve fields and empty/multiline/long-answer PDFs checked. For print, classify lengthy answers as long-answer to allow page flow; keep short statement rows with their labels. See SOURCE-AUDIT.md and LESSON-SUMMARY.md.


## BM-05 / Module 4 Lesson 5
Published at m04-l05/, source BBH_M04_L05_BM-05_Spoken-Introduction.pdf (six pages). Five main questions cover listener, work/audience, useful detail, short introduction, and a single read with a detail reserved for a question. Four optional reflections preserve source writing spaces. Preserve the complete five-step sewing example and conclusion, maker/consultancy contrasts, accurate business stage and I/we, exact optional AI prompt, two FAQs and OpenLearn resource. No recording, repeated rehearsal or real conversation required. Nine fields use isolated bbh-m04l05-v1-strands storage, accessible help, separate workbooks and shared full/concise exports. Empty, multiline and long-answer PDFs and blocked-storage behaviour checked. BM-04 and BM-05 link both ways. See SOURCE-AUDIT.md and LESSON-SUMMARY.md.


## BM-06 / Module 4 Lesson 6
Published at m04-l06/, source BBH_M04_L06_BM-06_Brand-Consistency.pdf (seven pages). This completes Module 4. Six main prompts create a small reference with up to four choices, sample sentence and storage location. Seven optional reflections preserve source writing spaces; thirteen fields use isolated bbh-m04l06-v1-strands storage. Preserve provisional choices, accuracy over repetition, adaptable detail, no required audit/redesign/earlier lessons, full six-step garden example, two contrasts, exact optional AI prompt, FAQs and Business.gov.uk reference. Shared guidance, optional separate workbooks, full/reference PDF exports and export warnings retained. Source coverage, blocked storage, isolation/reset and empty/multiline/long-answer PDFs checked. BM-03 and BM-06 link both ways; no Module 5 link invented. See SOURCE-AUDIT.md and LESSON-SUMMARY.md.


## Module 6 / MV-01
Module 5 is deferred at the user's request. Module 6 is Marketing and Visibility, eight lessons. MV-01 lives at m06-l01/, source BBH_M06_L01_MV-01_Marketing-Channel-Choice_Master-Formatted_2026-10-12.pdf (seven pages). Preserve nine sections, five exact full-width questions, two-route comparison, provisional choice and time/cash boundary, useful signs, all three examples, exact optional AI prompt, both FAQs and resources. Source has no additional writing boxes. Mark the priority uncertainty in question 4 rather than adding a duplicate field. No required account creation, publishing, booking or investigation during the 30-minute session. Fictional £35/four-hour example limits must not imply typical prices. Isolated bbh-m06l01-v1-strands storage, optional separate workbooks, accessible help and full/concise exports. Source coverage, blocked storage, isolation/reset and empty/multiline/long-answer PDFs checked. MV-02 and WO-04 remain text references. See SOURCE-AUDIT.md and LESSON-SUMMARY.md.


## MV-02 / Module 6 Lesson 2
Published at m06-l02/, source BBH_M06_L02_MV-02_Marketing-Plan-and-Budget_Master-Formatted_2026-10-12.pdf (seven pages). Preserve nine sections and five distinct full-width questions: offer/customer, wanted response, one or two actions, time/cash limits, informative response and reconsideration. No mandatory dates, calendar, spending or publishing. Include all three examples, total preparation/reply time, unknown versus zero costs, one-off/recurring charges, exact optional AI prompt and both FAQs/resources. Five fields use isolated bbh-m06l02-v1-strands storage, shared separate workbooks, accessible help and full/concise exports. Source coverage and empty/multiline/long-answer PDFs checked. MV-01 and MV-02 link both ways; MV-03 remains text. See SOURCE-AUDIT.md and LESSON-SUMMARY.md.


## MV-03 / Module 6 Lesson 3
Published at m06-l03/, source BBH_M06_L03_MV-03_Content_Master-Formatted_2026-10-12.pdf (seven pages). Nine sections and five full-width questions: reader/question, direct answer and limits, three-to-five-sentence draft with one next step, format/preparation limit, possible reuse. Preserve all three complete examples including the actual pouch draft and fictional dimensions qualification, assumption/evidence distinction, image rights/privacy, accurate claims, contextual reuse, exact optional AI prompt and two FAQs/resources. No requirement to film, design, publish, polish or create a series. Five fields use isolated bbh-m06l03-v1-strands storage, optional separate workbooks, guidance and full/concise exports. Source coverage, blocked storage, reset/isolation and empty/multiline/long-answer PDFs checked. MV-02 and MV-03 link both ways; related BM-04 links to its published page. See SOURCE-AUDIT.md and LESSON-SUMMARY.md.



## MV-04 / Module 6 Lesson 4
Published at m06-l04/, source BBH_M06_L04_MV-04_Email-List_Master-Formatted_2026-10-12.pdf (seven pages). Preserve nine sections and five full-width questions: readers/content, sender/content/frequency invitation, public joining place and permission/setup question, short first email with subject/useful point/next step, repeatable promise. Retain the complete sewing tutor note and email across pages 3–4, both contrasts, consent and all products-and-services soft opt-in conditions, corporate/individual distinctions, old-list uncertainty, both FAQs, exact optional AI prompt and two ICO resources. No collecting, importing or emailing addresses during the session; no compliance approval. Isolated bbh-m06l04-v1-strands storage, optional separate workbooks, shared help and full/concise exports. Question 3 holds the unresolved setup question without a duplicate field. See SOURCE-AUDIT.md and LESSON-SUMMARY.md. Related SP-06 and MV-03 links are published.


## MV-05 / Module 6 Lesson 5
Published at m06-l05/, source BBH_M06_L05_MV-05_Ongoing-Visibility_Master-Formatted_2026-10-12.pdf (seven pages). Nine sections, five full-width questions: relationship/known need, useful reason, route/permission, short message, timing/contact limit. Preserve provisional relationships, no invented needs, administrative/requested/marketing distinctions, private-message scope, public-route reach trade-off, space not to respond, full gardener note/message and both contrasts, exact optional AI prompt, FAQs and two ICO resources. No record search, list building, dates or sending required. Isolated bbh-m06l05-v1-strands storage, optional separate workbooks, guidance and full/concise exports. Uncertainty stays in existing answers rather than a duplicate field. MV-04 links to its published page; SA-06 remains text. See SOURCE-AUDIT.md and LESSON-SUMMARY.md.


## MV-06 / Module 6 Lesson 6
Published at m06-l06/, source BBH_M06_L06_MV-06_Referrals_Master-Formatted_2026-10-12.pdf (seven pages). Nine sections, five full-width questions: experience/moment, person/situation/boundary, direct enquiry route, optional spoken request, reasons to hold back and freedom not to act. Preserve referral/review/testimonial distinctions, capacity and honest experience, separate choices, electronic-referral and private-data boundaries, all three complete examples, exact optional AI prompt, FAQs and both resources. Join the paragraph across pages 2–3 and alterations example across pages 3–4. No contact list, campaign, incentive or request required today. Isolated bbh-m06l06-v1-strands storage, optional separate workbooks, shared help and full/notes PDF exports. All source blocks, draft behaviour and empty/multiline/long-answer PDFs checked. MV-05 links to its published page; CX-05 remains text. See SOURCE-AUDIT.md and LESSON-SUMMARY.md.


## MV-07 / Module 6 Lesson 7
Published at m06-l07/, source BBH_M06_L07_MV-07_Point-of-View-and-Reputation_Master-Formatted_2026-10-12.pdf (seven pages). Nine sections, five full-width questions: recurring decision/experience, view/basis, consequence/limit, four-to-six-sentence paragraph, possible demonstration. Preserve observations versus interpretations/recommendations, accurate claims and expertise limits, behaviour-based reputation, privacy, changing views with evidence, all three examples and the complete consultant note across pages 3–4. Exact optional AI prompt, both FAQs and both resources retained. No research, publishing, feedback or uniqueness proof required during the session. Isolated bbh-m06l07-v1-strands storage; optional separate workbooks, accessible help and full/notes exports. Source coverage, draft behaviour and empty/multiline/long-answer PDFs checked. MV-03 links to published lesson; MV-08 remains text. See SOURCE-AUDIT.md and LESSON-SUMMARY.md.


## MV-08 / Module 6 Lesson 8
Published at m06-l08/, source BBH_M06_L08_MV-08_Speaking-Podcasts-and-Press_Revised_2026-10-12.pdf (five pages). Preserve revised title, nine sections and five distinct questions: audience/contribution, two routes, choice/limit/unknown, proposal or reason for waiting, single commitment question. Choosing not now is a complete outcome. No real invitation, contact research, outreach or presentation required. Join the podcast paragraph across pages 1–2, proposal guidance across pages 2–3 and press example across pages 3–4. Preserve full restorer note/proposal, both contrasts, honest credentials, total costs and recording/editorial/competence boundaries, exact optional AI prompt, FAQs and resources. Isolated bbh-m06l08-v1-strands storage, optional separate workbooks, accessible help and full/notes exports. Source comparison, functional tests and empty/multiline/long-answer PDF checks passed. MV-07 and MV-08 link both ways; MV-01 linked. Completes Module 6 (8 lessons). See SOURCE-AUDIT.md and LESSON-SUMMARY.md.


## Module 5 / WO-01
Module 5 resumed after Module 6. Website and Online Presence has six lessons. WO-01 published at m05-l01/, source BBH_M05_L01_WO-01_Online-Presence-Decision_Design-A_Formatted_2026-10-15.pdf (seven pages). Preserve nine sections, six distinct questions for visitor/route, information, enquiry/booking/purchase, one or two presence types, upkeep/what can wait, and provisional choice/uncertainty. Merge repeated section 5 introductions across pages 4–5 without duplicating questions. Retain full six-part garden example and conclusion, maker/consultant contrasts, all four online option distinctions, exact optional AI prompt, FAQs and original resource. No provider recommendation, account creation or website build required. WO-04 remains a text reference until published. Isolated bbh-m05l01-v1-strands storage; shared accessible help, optional separate workbooks and full/notes exports. Source coverage, behaviour and empty/completed/long-answer PDF layouts checked. See SOURCE-AUDIT.md and LESSON-SUMMARY.md.


## WO-02 / Module 5 Lesson 2
Published at m05-l02/, source BBH_M05_L02_WO-02_Website-Clarity_Design-A_Formatted_2026-10-15.pdf (seven pages). Nine sections, six exact full-width questions for opening, next-step link, practical details, truthful support, contact information and order/checks. Preserve all teaching, full alterations example, maker and pre-launch consultancy contrasts, exact optional AI prompt, FAQs and both resources. Merge repeated workbook introduction; repair source soft-hyphen. No website, design, live form or publication required. WO-06 remains text until published. Isolated bbh-m05l02-v1-strands storage, optional separate workbooks, accessible guidance, full/outline PDF exports and clear export warnings. Source comparison, functional behaviour and empty/completed/long-answer PDF checks passed. See SOURCE-AUDIT.md and LESSON-SUMMARY.md.


## WO-03 / Module 5 Lesson 3
Published at m05-l03/, source BBH_M05_L03_WO-03_Domain-Email-and-Account-Ownership_Design-A_Formatted_2026-10-15.pdf (six pages). Nine sections, five exact questions: arrangement/respondent, services known, administration/help, renewal/recovery and first question. Keep all secrets outside the workbook. Preserve service/forwarding distinctions, setup/change boundaries, helper permissions, passkey/password/2SV guidance, full consultancy example, both contrasts, exact optional AI prompt, FAQs and resources. Repeated workbook introduction merged; line-break hyphens repaired. No purchases, transfers, tests or settings changes required. Isolated bbh-m05l03-v1-strands storage, optional separate workbooks, shared accessible guidance and full/notes exports. Source, behaviour and empty/completed/long-answer PDF checks passed. RB-07 remains text. See SOURCE-AUDIT.md and LESSON-SUMMARY.md.


## WO-04 / Module 5 Lesson 4
Published at m05-l04/, source BBH_M05_L04_WO-04_Profile-Choice_Design-A_Formatted_2026-10-15.pdf (six pages). Nine sections, five distinct questions for person/purpose, up to two profile types, facts/assumptions, maintenance capacity and provisional priority/check. Preserve no-new-profiles outcome, all teaching and three complete examples, Google eligibility distinction, exact optional AI prompt, FAQs and resources. Repeated workbook introduction merged. No account creation, payment or publication required. Isolated bbh-m05l04-v1-strands storage, shared accessible help, optional separate workbooks, full/notes exports and export warnings. Source coverage, functional behaviour and empty/completed/long-answer PDFs checked. WO-05 remains text. See SOURCE-AUDIT.md and LESSON-SUMMARY.md.
