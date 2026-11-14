# Optional Toolkit measurement

Added 14 November 2026 for the external GitHub Pages Toolkit. Property 564287604, tag G-21LSVC1NKJ. GitHub Pages build adds the shared script to 80 core lessons. Teaching source, draft storage keys, answers and export logic are unchanged. Assessment, introduction and Hour for Hour are excluded.

No Google script loads before opt-in. No thanks keeps every workbook tool available. Choice lasts 180 days and can be changed on any lesson. Withdrawal disables collection and removes this host's GA cookies. There is no replay of workbook actions made before consent. Answers, field labels, names, email addresses, query strings, fragments and referrers are not sent by this instrumentation. Advertising storage and personalisation are denied. Enhanced measurement must remain off for the stream. GA still processes standard technical data; this is optional analytics, not anonymous membership tracking.

| Event | Meaning |
| --- | --- |
| bbh_lesson_open | Lesson loaded with consent, including consent given during the visit |
| bbh_workbook_use | First trusted input into a workbook field per page load; no input value read |
| bbh_export_requested | Full workbook or notes export button clicked; does not prove a PDF was saved |
| bbh_useful_next_step | Optional self-report: found a relevant lesson and took a useful next step |

Report GA Total users for each event over the same dates and hostname woot-bbh.github.io. The usefulness KPI is consenting browsers reporting a useful next step, not verified unique members or objective business improvement. Show the response count and consent/response bias. Do not divide by Circle's 13 enrolments or infer non-use from its zero course completions. Do not impose sequential completion targets. Event counts can repeat after reload; use Total users for browser-level reach, with cross-device limitations.

Use GA Reports > Engagement > Events and filter to bbh_ events. Event parameters lesson_id, toolkit_surface and workbook_action can be registered as event-scoped custom dimensions when authorised GA access is restored. No custom dimensions or automatic dashboard refresh were configured by this change. Confirm event arrival in Realtime/DebugView before claiming end-to-end collection; Matt's GA session previously returned Incorrect permissions. Historical usage cannot be recovered. Exclude setup QA dates from outcome comparisons.

Validation: node scripts/test-measurement.cjs tests consent gating, withdrawal, event deduplication, absence of answer reads, trusted input, optional outcome and cross-tab consent. The Pages build validates all 80 script links. Measurement UI is outside main and hidden for print, so it is excluded from lesson print section cloning. Existing PDF/export implementation is unchanged; an end-to-end browser print check is still required.
