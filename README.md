# I Am Alive — Animal Shelter Website

An individual HTML5 coursework project about the **I Am Alive / Я живой** animal shelter in Astana, Kazakhstan.

## Project purpose

The website presents publicly available information about the shelter, animals, responsible adoption, ways to help, contact information and a simple educational support form.

This is an academic project and is **not the official website of the shelter**.

## Technologies

- HTML5
- Bootstrap 5.3.8 via CDN
- Bootstrap responsive grid, utilities, buttons, cards and navbar
- Small custom CSS correction layer
- Semantic HTML, forms and tables
- Bootstrap JavaScript bundle only for Bootstrap components
- Vanilla JavaScript in `js/` (no jQuery or other JavaScript framework)
- No project-owned backend/database
- FormSubmit external service is used for support-request email delivery after its recipient address is configured

## Project structure

```text
I-Am-Alive/
├── index.html
├── animals.html
├── help.html
├── colophon.html
├── images/
│   ├── dog-volunteer.jpeg
│   ├── shelter-dog.jpeg
│   └── dog-walk.jpeg
├── README.md
├── TASK_A.md
├── TASK_B.md
├── TAG_CHECKLIST.md
├── BOOTSTRAP_CHANGES.md
├── screenshots/
└── AI_LOG.md
```

## Pages

### `index.html`
Home page with shelter introduction, semantic structure, photo gallery, real contact/visiting information, table, lists, definitions, quotation, HTML demonstrations, and links.

### `animals.html`
Information about animals, care, adoption preparation and a real published adoption story.

### `help.html`
Ways to help, useful supplies, volunteering information and the educational HTML form.

### `colophon.html`
Project authorship, sources, technologies, image-source information, semantic structure and project limitations.

## Real shelter information

The project uses publicly available information about I Am Alive / Я живой in Astana.

The current Yandex Maps listing identifies the shelter at **Akkorgan Street 5V, Koktal microdistrict, Astana**, with telephone **+7 (702) 481-01-58** and daily opening hours listed as **11:00–18:00**.

Source:
https://yandex.kz/maps/ru/org/ya_zhivoy/231771024536/

Additional shelter information:
https://sxodim.com/astana/article/4-priyuta-dlya-zhivotnyh-v-astane

The Jack adoption story:
https://sxodim.com/astana/article/davay-pomozhem-istoriya-dzheka

## Image sources

The three photographs used in the project were taken from a published EGI report about a visit to I Am Alive.

Source:
https://egi.edu.kz/ru_ru/2023/02/26/poseshhenie-priyuta-dlya-zhivotnyh/

The image files are stored locally in the `images` folder.

## External link

The website includes an external Yandex Maps link with:

```html
target="_blank"
rel="noopener noreferrer"
```

## Support request form

The support form is a front-end demonstration. The Assignment 4–5 JavaScript prevents normal form submission, validates the fields in the browser and displays a summary with a temporary demonstration reference. **No form data is sent to FormSubmit or another server; no real booking, payment or order is created.** The `action` attribute remains in the original HTML for minimal structural change, but JavaScript intercepts the submit event.

## Midterm user journeys

### Journey 1 — Learn about the shelter and its animals

1. Start on `index.html`.
2. Read the shelter introduction and contact information.
3. Use the main navigation to open `animals.html`.
4. Read the animal information and responsible-adoption guidance.
5. Use the contact section to find the shelter phone/email, or open `help.html` to explore ways to help.
6. End when the visitor has found animal/adoption information and a clear next step.

### Journey 2 — Prepare a support request demonstration

1. Start on `index.html`.
2. Open `help.html` from the main navigation.
3. Search/filter support options and choose one.
4. Complete the required name, email, support type and contact method fields; optionally add visit details and a message.
5. Correct any field-level errors, then submit.
6. Review the summary and temporary demonstration reference. No data is sent to a server and no real booking, payment or order is created.
7. End when the visitor has reviewed the prepared request summary.

### Journey 3 — Find shelter contact and location

1. Start on any page.
2. Use the shared main navigation to open `help.html` or `index.html`.
3. Find the address and telephone number.
4. Use the telephone link to call from a compatible device, the email link to compose a message, or the Yandex Maps link to view the location.
5. End when the visitor has a direct way to contact the shelter or find its location.

## Quality pass (to complete before submission)

See `QUALITY_PASS.md`. Record the date, page/device, issue found and fix. Do not mark a check complete until it has been tested in a browser or with the relevant validator. The screenshots already in `screenshots/` were captured before these Midterm changes; recapture current desktop and phone screenshots before submission.

## Validation

The HTML pages should be checked with the W3C HTML Checker before submission:

https://validator.w3.org/nu/

Validation checks the markup against HTML rules, but validation alone is not a complete quality or accessibility audit.

## Academic limitations

- Information about the shelter can change.
- Current animal availability should be confirmed with the shelter.
- The project does not represent the official shelter website.
- Assignment 3 keeps the existing HTML content and uses Bootstrap for layout, responsiveness, navigation, buttons and components. Custom CSS is only a small correction layer.


## Assignment 4–5 Functionality Plan

| Page | Visitor goal | Planned/implemented function | Expected result | Responsible student |
|---|---|---|---|---|
| All pages | Navigate long pages comfortably | `js/main.js`: creates an accessible Back to top button with DOM methods and click/scroll events | Button appears after scrolling and returns the visitor to the top | Bekkazy Bekarys |
| `index.html` | Find a practical way to help | `js/index.js`: six real-theme suggestions, one selected randomly, with a button to the support form and a button to choose another | Visitor sees a useful suggestion and can continue to the help form | Bekkazy Bekarys |
| `animals.html` | Find relevant animal-care information | `js/animals.js`: live search, topic filter, result count, empty state, reset control and contact action on existing cards | Visitor can narrow the existing information and find a next step | Bekkazy Bekarys |
| `help.html` | Explore and choose support | `js/help.js`: six support objects, reusable card rendering, search/category/sort controls, count, empty state, reset and selection into the form | Visitor can find and choose a relevant support type | Bekkazy Bekarys |
| `help.html` | Estimate planning effort and submit a valid demo request | `js/help.js`: live effort calculation and field-level validation for name, email, support selection, quantity/date rules and phone/contact-method consistency | Invalid input gets specific errors and focus; valid input produces a summary and random demo reference | Bekkazy Bekarys |

## Assignment 4–5 JavaScript Checklist

- [x] `js/main.js`: `'use strict'`, shared DOM behaviour, `const`, function with return-independent event flow, `Math.random()`, `addEventListener()` click and scroll.
- [x] `js/index.js`: six suggestion objects, array traversal, random featured suggestion, click event and meaningful navigation.
- [x] `js/animals.js`: search and topic filtering, loops, conditions, DOM-created controls, result count, empty state, reset, contact actions.
- [x] `js/help.js`: six support objects with six properties each, filtering/sorting, reusable DOM card rendering, `find`, arithmetic effort estimate, `Math.random()` demonstration reference, `submit`, `click`, `input` and `change` events.
- [x] Validation: trimmed name, email format, required support type, quantity range/integer, no past visit date, contact method selection, phone required when phone contact is chosen; specific errors, first invalid field focus, outdated error clearing and valid summary.
- [x] Dynamic content is created with DOM methods and visitor-entered text is output with `textContent`; user input is not inserted into `innerHTML`.
- [x] All four HTML files load `js/main.js` with `defer`; page-specific files are loaded only where needed, also with `defer`.
- [x] No project CSS rules were added and no page content blocks were added directly to HTML; only script links were added.
- [ ] Before submission, manually test all flows at 375 px, 768 px and desktop width, inspect the browser console, validate all HTML, update screenshots/evidence, and create the required Git tags/commits.


## Assignment 6 jQuery implementation

This is the continuation from `assignment6_jquery.docx` (its internal heading says Assignment 4). The existing four pages and all CSS files remain byte-for-byte unchanged. The older Assignment 4–5 sections above describe the historical vanilla implementation; the current files in `js/` use jQuery.

### Loading without HTML edits

The already-linked `js/main.js` creates a CDN script for the full jQuery **3.7.1** build with its integrity hash and cross-origin setting. `window.iamAliveReady` resolves only after the library loads. Every project script waits for that promise, then uses `$(function () { ... })` so both jQuery and the document are ready. The full build includes effects; the slim build would not suffice. CDN access requires an internet connection.

This programmatic connection respects the user's explicit ban on HTML changes. It provides the required library-before-feature execution order, although it does not add literal CDN script tags to HTML. Native DOM calls are confined to this dependency loader and its failure fallback; migrated interactive features use jQuery throughout. CDN failure shows an explanation and disables the demonstration submission.

### Files and behaviour

| File | Current role |
| --- | --- |
| `js/main.js` | CDN loading, shared Back to top, current technology/form notes on Colophon |
| `js/help.js` | Support array, generated cards, search/category/sort, delegated selection, effects, planning estimate, field validation and reset |
| `js/index.js` | Generated next-step suggestion and another-suggestion action |
| `js/animals.js` | Existing sample catalogue migrated to jQuery, search/species/age filters, empty state and reset |
| `old-js-version.js` | Verbatim archive of all four original scripts; not linked or executed |
| `AI_LOG.md` | Honest record of AI-generated implementation and the user's requests |

### Requirements map

| Requirement | Where to demonstrate it |
| --- | --- |
| Three vanilla rewrites and comparison comments | `main.js`: show/hide Back to top; `help.js`: `renderOptions` and validation |
| ID, class, element, attribute and filter selectors | `#support-request-form`, `.help-options`, `main`, `[data-choose]`, `:checked`, `:not(...)` |
| Traversal | `.find()` gets descendants; `.closest('.card')` gets the clicked card; `.parent()` places field errors; `.siblings('label')` finds the checkbox label; `.each()` checks fields |
| Two chains of at least three methods | Back-to-top construction; card construction; success confirmation chain (explained in a comment) |
| `.text()`, `.html()`, `.val()`, `.attr()`, `.prop()` | Safe messages, trusted existing label markup, form values, ARIA/data attributes and live checked/required properties |
| Existing classes only | `is-hidden`, `is-selected`, `has-error`, `is-success` and already-used Bootstrap utilities; no CSS rules added |
| Array-built list | Six support objects are rendered by `.appendTo()`; these cards are absent from source HTML |
| `.on()` events | `click`, `input`, `change`, `submit`, `reset`, `scroll`, image `error`; all interactive feature bindings use `.on()` |
| Delegation | `#support-option-list` listens for clicks on `[data-choose]`, including buttons recreated by filtering |
| Meaningful effects | `.slideToggle(200)` opens filters; `.fadeIn(180/220)` reveals selection/success; `.fadeOut(150)` removes an outdated success; `.animate()` scrolls to top |
| Completion callback | Filter opening focuses search; success fade-in focuses its confirmation |
| Complete form validation | Every user-editable input, select and textarea; hidden configuration/honeypot are intentionally excluded |
| Validation details | Trimmed text, name length, email/phone formats, contact radio group, support type, integer quantity 1–20, date not in past, native validity for time and other controls |
| Reset after success | Summary is captured, all form fields/errors/selection reset, then the success is displayed |

The acknowledgement checkbox is optional, as in the original form. Phone is required for phone contact; any nonempty phone is checked even when email contact is chosen. Fields keep `required`, `type`, `min` and `max`. `noValidate` allows the submit handler to display all adjacent errors instead of the browser stopping at its first popup; native `ValidityState` is still checked. Real server-side validation would remain necessary.

`.text()` outputs text literally, including angle brackets. `.html()` parses markup, so it is used only to copy the trusted existing checkbox label; user input never reaches it. `.attr('checked')` describes the markup attribute; `.prop('checked')` gives the current boolean after a click.

### Verification on 2026-11-05

- Syntax checks passed for all four current JavaScript files; `git diff --check` passed.
- All original HTML and CSS files were compared with base commit `a49f535b50e07847706b499f2bee247a579cf27a` and are unchanged.
- Browser checks: home suggestion changes; support filtering; delegated card choice after rendering; selected support effort; per-field name/email/phone/contact errors; immediate error clearing; checkbox acknowledgement; successful summary and form reset; support empty state; filter open/close; animal species/age filtering; Colophon loading.
- Browser inspection found and fixed an inverted visibility condition on the animal empty-state message.
- No site-origin console errors were observed in the inspected flows. The cloud browser emitted unrelated extension metadata errors; those are not site code.
- A full responsive, keyboard and offline/CDN-failure pass has not been completed. Recheck those in the student's own browser before submission.
- Existing sample animal records and remote stock-image URLs were retained from the previous script. They are not verified shelter adoption listings. Authentic-photo source cleanup remains a separate existing content issue.

### Как объяснить на защите

1. `main.js` загружает jQuery. Promise гарантирует порядок загрузки, а `$(function () {})` ждёт готовности DOM.
2. `renderOptions()` фильтрует массив, очищает контейнер через `.empty()` и создаёт карточки через `.appendTo()`.
3. Делегированный `.on('click', '[data-choose]', handler)` установлен на общий контейнер. Событие кнопки всплывает к нему, поэтому обработчик работает и после пересоздания карточек.
4. `$(this)` — нажатая кнопка. `.closest('.card')` находит её карточку; классы выделения меняются через `.addClass()` и `.removeClass()`.
5. Поиск слушает `input`, списки — `change`, форма — `submit`. `preventDefault()` останавливает исходный POST в FormSubmit.
6. `validate()` проверяет каждое поле, ставит `has-error`, `aria-invalid` и сообщение рядом. После исправления конкретная ошибка удаляется.
7. Валидная форма сначала создаёт безопасный текст подтверждения, затем сбрасывается. Это демонстрация: сообщение не означает, что приют получил заявку.
8. `.slideToggle()` раскрывает фильтры; `.fadeIn()` показывает выбор и успех; `.fadeOut()` убирает устаревшее подтверждение. Callback выполняется после эффекта.
9. `.html()` допустим для доверенной разметки, но ввод посетителя выводится через `.text()`. `.val()` читает значение поля, `.attr()` — атрибут, `.prop()` — текущее свойство, например `checked`.
10. Исходные решения сохранены в `old-js-version.js`, чтобы сравнить их с jQuery. Архив не подключён и не создаёт вторые обработчики.

### Submission and Git history

No commits or pushes were made by the assistant. Apply the supplied plain diff with `git apply`, review it, and create commits yourself using your own Git name and GitHub-linked email. This diff contains no author or co-author metadata and does not change Git identity settings.

The assignment requires **six commits across at least three different days for an individual project**. This delivery cannot establish that history; inspect existing history and complete genuine future commits as needed. Do not fabricate dates. Defense and personal review are still required.

Official API reference: https://api.jquery.com/
