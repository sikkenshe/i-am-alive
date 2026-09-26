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
- No custom JavaScript
- No backend/database

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

## Form limitation

The form on `help.html` is for demonstrating HTML form elements. It does not actually send or store submissions because this project has no server-side application or database.

## Validation

The HTML pages should be checked with the W3C HTML Checker before submission:

https://validator.w3.org/nu/

Validation checks the markup against HTML rules, but validation alone is not a complete quality or accessibility audit.

## Academic limitations

- Information about the shelter can change.
- Current animal availability should be confirmed with the shelter.
- The project does not represent the official shelter website.
- Assignment 3 keeps the existing HTML content and uses Bootstrap for layout, responsiveness, navigation, buttons and components. Custom CSS is only a small correction layer.
