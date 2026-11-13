# I Am Alive — Endterm continuation

An individual Introduction to Web Technologies project about I Am Alive / Я живой in Astana. Visitors can read published shelter information, prepare questions, choose a way to help and download a personal support plan. The planner does not send messages, book visits or manage adoption applications.

Project owner and student: Bekkazy Bekarys. Implementation assistance for the changes below was provided by AI; see the full, retained history in `AI_LOG.md`. The student must review, test and explain the submitted code. This README does not claim that AI-written code complies with the course AI policy.

## Run the project

Open `index.html` in a current browser, or open the folder in VS Code and use Live Server. An internet connection is needed for the existing Bootstrap CDN assets and for jQuery on `help.html`. There is no build step, server or database to install. No npm dependencies are added to this repository.

## Frozen files

All four HTML files and both project CSS files are byte-for-byte unchanged from repository HEAD `15965badc8d46acf6b071b9446944637bf089188` during this continuation. New content is created by scripts. Visual states use existing project classes and Bootstrap classes; jQuery effects manage their own temporary inline presentation.

There is no `midterm` tag in the fetched repository. The commit titled “Prepare project for Midterm” is `83c24ba`. This continuation does not silently create a retrospective tag or rewrite history. Older commits already changed HTML after that commit, including removal of the Colophon navigation item and addition of script links. The current `main.js` restores the missing navigation entry at runtime. The previous HTML changes remain visible in Git history; this continuation does not claim to erase them.

## Current files and ownership of features

| File | Implementation | Responsibility |
| --- | --- | --- |
| `js/main.js` | Plain JavaScript | Back to top, active navigation, restored Colophon link, source/technology notes, Bootstrap-menu fallback; jQuery dependency loading and a submission guard during loading |
| `js/index.js` | Plain JavaScript | Rotating support suggestions with preparation steps |
| `js/animals.js` | Plain JavaScript | Source-backed care/support topics, live search/category filter, result count, empty state and removable question shortlist |
| `js/help.js` | jQuery | Support search/category/sort, delegated selection, filter effects, conditional quantity field, full validation, final plan and downloadable text |
| `css/base.css`, `css/bekarys.css` | Existing CSS | Frozen appearance and state classes |
| `old-js-version.js`, `js_for_iamalive/help.js` | Historical, disconnected | Older coursework implementations; not loaded by any HTML page |

No catalogue or suggestion handler waits for jQuery. `main.js` loads the full jQuery 3.7.1 build only when the support form exists. `iamAliveReady` resolves after dependency loading; `help.js` then uses `$(function () { ... })` for DOM readiness. Native loader code only protects the external legacy form action during startup/failure; it does not implement the planner's business rules. Blob/URL are browser file APIs used by the jQuery planner to offer a download.

## What changed since the previous defended version

Baseline: the jQuery migration in `15965ba`, 5 November 2026. Previous filters and validation alone are not being presented as new endterm functionality.

| Feature before this continuation | New or corrected behaviour |
| --- | --- |
| All interactions migrated to jQuery | Native shared, home and catalogue features now run independently; jQuery owns the planner in a separate file |
| Random one-line help suggestion | Each home suggestion now gives three preparation steps and a complete next action |
| Sample animal names, ages and remote stock pictures | Replaced with six published help/adoption topics; no invented animal identity, availability or stock-image requests |
| Filtering with no preparation output | Visitors can add questions, combine them across filters, remove individual questions, clear the list and continue to shelter contacts |
| Arbitrary “effort points” | Removed; the only supply quantity is the visitor's actual package count, required only for supply plans |
| Brief local success message | A full personal plan includes all submitted fields, an explicit local-only result and an optional text-file download |
| Generic phone label | Phone becomes visibly required when phone contact is chosen; optional otherwise, but any supplied number is checked |
| jQuery failure could leave stale form wording | Startup neutralises the legacy external action immediately; failure keeps submission disabled and explains the alternative |
| Missing Colophon links on three pages | Existing page restored to navigation through JavaScript |
| Source placeholders and old technology text | Runtime Colophon content lists actual photo provenance and the current JS/jQuery split |

## Endterm requirements map

| Requirement | Concrete implementation |
| --- | --- |
| Arrays and objects near the top of a native JS file | `topics` in `animals.js`, `suggestions` in `index.js` |
| Dynamic content built with loops | `renderTopics()` builds cards with `forEach`; `renderQuestions()` builds the selected question list |
| Functions with parameters and return values, reused | `element(tag, classes, text)`, `normalize(value)`, `findTopic(id)` |
| Conditions and calculated number | Filter predicates, selected states, `visible.length`, `shortlist.size` |
| Three or more event types | Native `click`, `input`, `change`, `scroll`; jQuery also uses `submit` and `reset` |
| Delegation | Native parent `row` handles `button[data-add]`; `questions` handles `button[data-remove]`; jQuery `$list.on('click', '[data-choose]', ...)` |
| Event object | `event.target.closest(...)` identifies dynamic buttons; submission uses `event.preventDefault()` |
| Field validation | `validationMessage()`, `validate()`, `showError()`, `clearError()` in `help.js` |
| Different jQuery selectors/traversal | ID, class, attribute, element, `:checked`, `:not`; `.closest()`, `.find()`, `.siblings()`, `$(this)` |
| Chain of three or more methods | Feedback `.stop().addClass().removeAttr().text()...`; download `.attr().appendTo()` and helper methods; result severity/text/reveal chain |
| Two meaningful effects | `.slideToggle()` for the filter panel; `.fadeIn()` for selection/success; `.fadeOut()` invalidates an old result |
| State classes | `.is-hidden`, `.is-selected`, `.is-active`, `.has-error`, `.is-success` |
| Empty case | Both filters show a message; an empty question shortlist says how to begin |
| Single visitor completes the task | Prepared questions and a downloadable personal plan; no admin, staff approval, backend or fake booking |

The native helper `normalize(value)` is called for the search input and topic text. `findTopic(id)` is called when preparing questions and validating delegated actions. Creating a new element from an array means the corresponding new topic cards do not exist as handwritten HTML. The existing frozen `.row` is only the mounting point.

## Validation and final result

- Text is trimmed; name requires at least two characters.
- Email must match the format check and native `ValidityState`.
- Contact method must be selected. Phone is required for phone contact. Any entered phone must contain 7–15 digits with only permitted formatting characters.
- Support category must be one of the actual options.
- Supply plans require an integer package count from 1 to 20; other categories disable that field and exclude its value from the plan.
- Optional visit date cannot be in the past. Optional time uses native validity. Message is optional and trimmed. The acknowledgement checkbox is explicitly optional.
- All editable fields are checked, with errors adjacent to their controls. Errors clear on correction; focus moves to the first invalid field.
- The form uses `noValidate` to let the code display all errors; this does not remove `required`, `type`, `min` or `max` constraints.
- On success, the summary is captured before reset, fields and selection are cleared and the full result appears.
- The download contains the submitted plan, not empty reset values. A later edit invalidates the old download and revokes its object URL.
- All visitor values are rendered with `.text()`. `.html()` is used only to copy an existing trusted checkbox label.
- No fetch, XHR, localStorage or database stores personal details. A downloaded plan is saved only by the visitor's download action. Server-side checks would be necessary if real submission were added.

## Sources and honest limitations

Published forms of help: [Sxodim shelter guide](https://sxodim.com/astana/article/4-priyuta-dlya-zhivotnyh-v-astane). The current topics refer to that published list, not a live inventory. Questions and preparation steps are visitor guidance, not claims that a service is available now.

Address and displayed telephone: [Yandex Maps](https://yandex.kz/maps/ru/org/ya_zhivoy/231771024536/). The email and telephone also appear in the [Tanba public register](https://tanba.kezekte.kz/ru/reestr-tanba-public/place?p=70), organization “Частный фонд Я Живой”. Pagination can change; search the register by organization name. Published hours should be confirmed before visiting. The older Sxodim article gives another telephone, so the existing Yandex/Tanba telephone has been retained.

The three local photographs come from [EGI's report about a shelter visit on 26 February 2023](https://egi.edu.kz/ru_ru/2023/02/26/poseshhenie-priyuta-dlya-zhivotnyh/). They are authentic published images, not photographs taken by the student. The current scripts do not load stock or AI-generated animal images. The course's “your own photographs” rule still requires the student's own photos or explicit instructor acceptance of attributed published photos. This JS-only change cannot establish personal photo authorship.

## Verification performed on 13 November 2026

- Syntax checks passed for all four active JavaScript files.
- `git diff --check` passed.
- All HTML/CSS bytes compared equal to `15965ba` during this continuation.
- 76 DOM/event assertions passed in jsdom with jQuery 3.7.1: navigation, native features without jQuery, source attribution, searches, filters, counts, empty states, delegated actions after rerender, shortlist removal/reset, field errors and correction, contact-dependent phone, package validation, past/future date, successful reset, safe text output, download contents and stale-download invalidation, jQuery failure, menu fallback.
- These are DOM/event checks, not a rendered-browser or network test. Browser launch was blocked by the execution environment. Browser layout at 375/768/1366 px, real CDN/SRI behaviour, the actual file-download click, W3C validation and testing on another physical device remain manual checks. Historical screenshots are not new endterm evidence.

See `QUALITY_PASS.md` for the remaining quality gate. Do not mark unchecked items as tested.

## Git and submission

The fetched repository contains 11 existing commits over several dates. After the identified Midterm preparation commit there are 3 commits across 29 October and 5 November. No tags were returned by `git tag --list`. Whether earlier coursework commits count towards the individual endterm requirement must be interpreted with the instructor; do not fabricate dates or split changes into artificial commits to imply work over three days.

The assistant has not committed, pushed, tagged or changed Git identity. Apply the authorless patch, review and test it, then make your own commit. Use the same repository.

PowerShell, if the patch is saved in Downloads and you want a fresh local copy:

```powershell
cd "$env:USERPROFILE\Downloads"
git clone https://github.com/sikkenshe/i-am-alive.git i-am-alive-endterm
cd i-am-alive-endterm
git apply --check ..\i-am-alive-endterm.patch
git apply ..\i-am-alive-endterm.patch
git diff --stat
git diff -- '*.html' '*.css'
Start-Process .\index.html
```

The HTML/CSS diff must be empty. If `git apply --check` fails, stop and inspect the difference instead of forcing the patch; its exact base is `15965ba`.

After reviewing the files and completing your available checks:

```powershell
git add js/main.js js/index.js js/animals.js js/help.js README.md AI_LOG.md QUALITY_PASS.md
git diff --cached --stat
git commit -m "Complete endterm visitor planning flows"
git push origin main
```

Only after final testing and checking the course requirements:

```powershell
git tag endterm
git push origin endterm
```

Do not recreate an existing `endterm` tag or overwrite history. No extra written report or recording is required by the supplied Endterm brief; the live defense is required.

## Defense walkthrough

1. Home: explain the organization, rotate a suggestion and show its preparation steps.
2. Animals: explain that topics are published information, not invented animal profiles. Search “food”, filter supplies, show an empty search, reset it, add two questions after rerender, remove one and open contacts.
3. Help: filter and sort the support choices, choose a newly rendered card and show the form category changing. Collapse and reopen the filter panel.
4. Submit empty fields. Correct name/email. Choose phone contact without a number. Show invalid quantity and a past date. Fix each error and explain why it disappears.
5. Complete a supply plan. Show the real package count, full result and downloaded text. Explain the reset and that nothing was sent to the shelter.
6. Start another plan and show that the previous result becomes invalid. Test Clear Form.
7. Show phone layout and the responsive menu. Open all four pages and check each browser console.

Be ready to explain:

- `filter` selects records; `forEach` builds their elements; `find` selects one object. jQuery `.find()` selects DOM descendants and is different from array `find()`.
- A delegated parent survives when its children are rebuilt. Clicks bubble to that parent; `event.target.closest()` or the jQuery selector identifies the button.
- `preventDefault()` keeps the form on the page. The startup guard also removes the legacy external action before jQuery loads.
- `iamAliveReady` waits for the library; `$(function () {})` waits for DOM readiness. They solve different timing problems.
- `.prop('checked')` is the current boolean state, not the initial markup attribute.
- `touched` tracks fields that need immediate revalidation after a failed submit.
- `Set` prevents duplicate prepared questions; its size is the calculated selected count.
- `.text()` prevents typed markup from becoming elements. `.html()` is unsuitable for arbitrary visitor text.
- The plan is captured before reset so its details are not lost. Blob/URL expose a local downloadable file; revocation releases the obsolete download.
- A new optional field must be included in validation and in `details` if it should appear in the plan. A new topic belongs in the data array, not handwritten HTML.
- The frozen markup still exists in View Source; the Elements panel includes the runtime content built by scripts.

Practice changing a topic object, adding a validation rule, altering the count message and rewriting a short jQuery handler using native DOM APIs. During the actual defense follow the brief's rule: documentation is allowed, live help from people or AI is not.
