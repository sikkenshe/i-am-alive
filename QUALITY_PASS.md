# Endterm quality pass

## Automated checks on 13 November 2026

- [x] Four active JavaScript files pass syntax checks.
- [x] `git diff --check` passes.
- [x] HTML/CSS bytes match the fetched baseline `15965ba`.
- [x] 76 jsdom DOM/event assertions pass, including successful plan contents and the CDN-failure path.
- [x] No DOM execution errors observed in those checks.

These checks do not prove rendered layout, live network/CDN availability, W3C validity or actual browser download behaviour.

## Student browser review

- [ ] Open all four pages at desktop, tablet and 375 px phone widths; verify no horizontal page overflow.
- [ ] Open every page from every navigation menu; test the phone menu open/close.
- [ ] Check the Console on every page and verify all images/CDN resources load.
- [ ] Search care topics, combine filters, show no results and reset. Add/remove/clear questions, including after a filter rerenders cards.
- [ ] Search/sort/filter support choices, choose a card and inspect the selected state and form category.
- [ ] Open/close filters quickly several times and check state/label consistency.
- [ ] Submit an empty form. Test spaces-only name, bad email, bad phone, phone contact without phone, omitted supply quantity, 0, 21, 1.5 and a past date.
- [ ] Correct each error; verify it clears immediately and the first invalid field receives focus on submit.
- [ ] Make a valid plan, including date/time/message and a supply count. Compare the displayed plan with the downloaded text file.
- [ ] Enter text containing angle brackets in the message and verify it remains text.
- [ ] Start a new plan and verify the old result/download disappears; test manual reset and non-supply plans.
- [ ] Test keyboard-only interaction and reduced-motion preference.
- [ ] Test jQuery blocked in DevTools: local submission stays disabled, the page explains the failure, and navigation still works.
- [ ] Test all internal links and external sources/maps; confirm `tel:` and `mailto:` hand off correctly on a capable device.
- [ ] Validate all four frozen HTML pages with W3C Nu; fix any permitted runtime issues in JavaScript and discuss any frozen-markup errors rather than silently editing HTML.
- [ ] At least two days before the deadline, repeat the review on another physical device and record genuine problems and fixes below.
- [ ] Replace historical screenshots only after actually taking current screenshots, if screenshots are requested or useful as evidence.

## Requirements requiring student action

- [ ] Confirm acceptance of the current photo sources or provide your own shelter photographs as required by the brief.
- [ ] Resolve the course AI policy honestly; the retained AI log discloses implementation assistance.
- [ ] Check individual commit/day requirements; do not invent dates or claim unavailable evidence.
- [ ] Review differences against the real Midterm reference with the instructor if necessary; no `midterm` tag exists in the fetched repository.
- [ ] Complete a live-defense rehearsal without AI, using only permitted documentation.
- [ ] Only after finishing, create and push the `endterm` tag yourself.

## Review record

| Date | Environment | Finding | Action | Result |
| --- | --- | --- | --- | --- |
| 2026-11-13 | Automated DOM checks | 76 flow assertions, syntax and frozen-file comparisons | Passed | Does not replace physical-device or rendered-browser checks |
| To be completed by student | Another physical device | Record actual issue | Record actual fix | Record actual retest |
