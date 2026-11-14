# Womeniverse December Reset

Standalone app based on December-Reset-Journal-Workbook (1).pdf, December 2026. This is a Womeniverse journal, not a Toolkit lesson. Open index.html through an HTTPS static host. No build, dependencies, analytics, AI calls or backend.

## Features
31 original daily prompts and optional next steps; five New Year's Eve prompts; open day picker; browser-local autosave; reflection review; JSON backup/restore; print/save-as-PDF; responsive layout; labelled inputs and keyboard focus.

## Saving and privacy
Answers use localStorage key womeniverse-december-reset-2026-v1. They remain on the same origin, browser profile and device. They are not encrypted or access-controlled; shared-browser users can read them. Clearing site data or private browsing can lose entries. Download and restore backups to transfer between devices or origins. No member answers belong in this repository. Storage errors and invalid saved data pause or warn about saving. Changes from another tab pause writes to avoid overwriting that tab.

## Launch
This branch is a reviewable first version, not a member launch. The private preview is owner-only. A Circle button should open the final journal URL in a new tab, rather than an iframe, for a consistent saving origin. A public static host does not enforce Circle membership. Members-only access or automatic cross-device saving needs a separate authenticated hosting/data design. Do not imply the private preview link is usable by all members.

## Verification
Browser checks: daily navigation, input persistence after reload, reflections review, backup download, five year-end fields and disabled last-page navigation. Original 31 daily prompts extracted from supplied PDF. Mobile CSS, restore validation and print styles implemented; real-device testing, restore round trip and final PDF layout remain launch checks.
