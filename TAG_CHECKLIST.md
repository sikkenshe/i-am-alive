# HTML Tag Checklist

**Project:** I Am Alive Animal Shelter  
**Student:** Bekkazy Bekarys  
**Course:** Introduction to Web Technologies

## 1. Document Structure

- `<!DOCTYPE html>` — used in all four pages:
  - index.html
  - animals.html
  - help.html
  - colophon.html

- `<html lang="en">` — used in all four pages.

- `<head>` — used in all four pages.

- `<meta charset="UTF-8">` — used in all four pages.

- `<meta name="viewport">` — used in all four pages.

- `<meta name="description">` — used in all four pages.

- `<meta name="author">` — used in all four pages.

- `<title>` — used in all four pages. Each page has a unique title.

## 2. Semantic HTML

- `<header>` — all four pages.
- `<nav>` — all four pages.
- `<main>` — all four pages.
- `<section>` — all four pages.
- `<article>` — all four pages.
- `<aside>` — all four pages.
- `<footer>` — all four pages.

## 3. Headings

- `<h1>` — all four pages.
- `<h2>` — all four pages.
- `<h3>` — all four pages.

Each page contains exactly one `<h1>`.

## 4. Images

- `<figure>` — index.html, animals.html.
- `<img>` — index.html, animals.html.
- `<figcaption>` — index.html, animals.html.

All images have meaningful `alt` descriptions.

## 5. Table

- `<table>` — index.html.
- `<caption>` — index.html.
- `<thead>` — index.html.
- `<tbody>` — index.html.
- `<tr>` — index.html.
- `<th>` — index.html.
- `<td>` — index.html.

The table uses `scope="col"` and `scope="row"`.

## 6. Lists

- `<ul>` — index.html, animals.html, help.html, colophon.html.
- `<ol>` — index.html, animals.html, help.html, colophon.html.
- `<dl>` — index.html, animals.html, colophon.html.
- `<dt>` — index.html, animals.html, colophon.html.
- `<dd>` — index.html, animals.html, colophon.html.

A nested list is used in the project.

## 7. Links

- Internal links — all four HTML pages.
- External links — index.html, help.html, colophon.html.
- `target="_blank"` — external links.
- `rel="noopener noreferrer"` — external links.
- `mailto:` — all four HTML pages.
- `tel:` — all four HTML pages.
- Same-page links using `#id` — all four HTML pages.

## 8. Text Formatting

- `<strong>` — index.html, animals.html, colophon.html.
- `<em>` — index.html, animals.html, colophon.html.
- `<b>` — index.html.
- `<i>` — index.html.
- `<mark>` — index.html, animals.html.
- `<small>` — index.html, animals.html, help.html.
- `<sub>` — index.html.
- `<sup>` — index.html.

## 9. Abbreviations

- `<abbr>` — index.html, animals.html, colophon.html.

Each abbreviation has a `title` attribute.

## 10. Quotes

- `<blockquote>` — index.html, animals.html.
- `<q>` — index.html.
- `<cite>` — index.html, animals.html.

A real quotation from a published story about Jack is included.

## 11. Other HTML Elements

- `<code>` — index.html, colophon.html.
- `<pre>` — index.html, colophon.html.
- `<kbd>` — index.html, colophon.html.
- `<samp>` — index.html, colophon.html.
- `<hr>` — index.html, colophon.html.
- `<br>` — index.html, help.html, colophon.html.

HTML entities used include:

`&copy;`  
`&amp;`  
`&lt;`  
`&gt;`

## 12. Generic Elements

- `<div>` — index.html.
- `<span>` — index.html.

A comment in the HTML explains why these generic elements are used.

## 13. Form

The main form is located in `help.html`.

The form contains:

- `<form>`
- `<fieldset>`
- `<legend>`
- `<label>`
- Text input
- Email input
- Telephone input
- Password input
- URL input
- Search input
- Radio buttons
- Checkbox
- `<select>`
- `<textarea>`
- Date input
- Time input
- Number input
- Range input
- Month input
- Week input
- Color input
- Hidden input
- Submit button
- Reset button

The form also uses `required` and `placeholder` attributes.

A comment explains that the form does not send real data because the project has no server or database.

## 14. Validation

All four HTML pages were checked using the W3C HTML Validator.

The project uses basic HTML without CSS, JavaScript or frameworks.