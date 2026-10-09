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
- No custom JavaScript (Bootstrap bundle only)
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

The form on `help.html` uses FormSubmit to forward support requests to an email inbox without a project-owned backend or database.

**One-time setup required before testing:** replace `YOUR_EMAIL_HERE` in the form's `action` URL with the email address that should receive submissions. FormSubmit may send a verification email to that address; complete its verification step. Do not collect passwords or other sensitive information in this form. Submissions are handled by an external service and are not stored in this repository.

After submission, FormSubmit displays its confirmation page. The on-page `form-result` status area explains what will happen before the visitor submits the form.

## Midterm user journeys

### Journey 1 — Learn about the shelter and its animals

1. Start on `index.html`.
2. Read the shelter introduction and contact information.
3. Use the main navigation to open `animals.html`.
4. Read the animal information and responsible-adoption guidance.
5. Use the contact section to find the shelter phone/email, or open `help.html` to explore ways to help.
6. End when the visitor has found animal/adoption information and a clear next step.

### Journey 2 — Send a support request

1. Start on `index.html`.
2. Open `help.html` from the main navigation.
3. Read the volunteer, supplies and responsible-support sections.
4. Complete the required name, email, support type and preferred contact method fields; optionally add visit details and a message.
5. Submit the form.
6. FormSubmit processes the request and shows its confirmation page once the recipient has been configured and verified.
7. End when the visitor sees the service confirmation page.

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
