# CSS Checklist

> Historical note: this checklist documents the Assignment 2 version of the project. Assignment 3 keeps it as prior coursework evidence; current Bootstrap changes are listed in `BOOTSTRAP_CHANGES.md`.


**Project:** I Am Alive Animal Shelter  
**Student:** Bekkazy Bekarys  
**Course:** Introduction to Web Technologies

## 1. Stylesheets

- `css/base.css` — shared site styles.
- `css/bekarys.css` — personal layout and CSS demonstrations.

All pages load `base.css` first and `bekarys.css` second.

## 2. Required Selectors

### Universal selector
File: `css/base.css`  
Line: 15

`*`

### Type selector
File: `css/base.css`  
Line: 20

`body`

### Class selector
File: `css/base.css`  
Line: 108

`.info-card`

Additional personal classes begin in `css/bekarys.css` line 16.

### ID selector
File: `css/base.css`  
Line: 48

`#top`

Another ID selector:

File: `css/bekarys.css`  
Line: 208

`#animals`

Classes are used for reusable styles that can be applied to multiple elements.

IDs are used for unique sections within an individual HTML document and can also serve as page anchors.

At least eight reusable classes are used more than once across the project.

Examples include `.hero-section`, `.highlight-text`, `.service-card`,
`.gallery-item`, `.info-grid`, `.form-fieldset`, `.source-card`
and `.contact-box`.

The IDs `#top` and `#contact` are used on separate pages while remaining
unique within each individual HTML document.

### Descendant selector
File: `css/base.css`  
Line: 64

`nav a`

### Child selector
File: `css/base.css`  
Line: 135

`header > p`

Another child selector:

File: `css/bekarys.css`  
Line: 61

`.service-grid > h2`

### Adjacent sibling selector
File: `css/base.css`  
Line: 140

`h2 + p`

### Grouping selector
File: `css/base.css`  
Lines: 121–123

`h1, h2, h3`

### Attribute selector
File: `css/base.css`  
Line: 145

`a[target="_blank"]`

### :hover pseudo-class
File: `css/base.css`  
Line: 72

`nav a:hover`

### :focus pseudo-class
File: `css/base.css`  
Line: 77

`nav a:focus`

### :first-child pseudo-class
File: `css/base.css`  
Line: 150

`section:first-child`

### Pseudo-element
File: `css/base.css`  
Line: 155

`section h2::before`

Another pseudo-element is used in:

File: `css/bekarys.css`  
Line: 214

`#animals::after`

## 3. Colours

The five-colour palette is documented in:

File: `css/base.css`  
Lines: 6–11

Colours:

- `#102A43`
- `#243B53`
- `#F0F4F8`
- `rgb(46, 125, 50)`
- `white`

The project demonstrates hexadecimal, RGB and named colours.

## 4. Typography

Main body font:

File: `css/base.css`  
Lines: 25–29

`Arial, Helvetica, sans-serif`

Heading font:

File: `css/base.css`  
Lines: 33–36

`Georgia, "Times New Roman", Times, serif`

Typography properties demonstrated include:

- `font-size`
- `font-weight`
- `line-height`
- `letter-spacing`

## 5. Box Model

Universal `box-sizing`:

File: `css/base.css`  
Lines: 15–16

Section margin, padding and border:

File: `css/base.css`  
Lines: 93–97

Margin-collapse explanation:

File: `css/base.css`  
Lines: 100–105

Text alignment:

File: `css/base.css`  
Line: 44

## 6. Flexbox

Navigation Flexbox:

File: `css/base.css`  
Lines: 53–60

It demonstrates:

- `display: flex`
- `justify-content`
- `align-items`
- `gap`
- `flex-wrap`

Personal Flexbox container:

File: `css/bekarys.css`  
Lines: 52–58

`.service-grid`

Grow and shrink:

File: `css/bekarys.css`  
Lines: 65–66

`.service-card`

Another Flexbox example:

File: `css/bekarys.css`  
Lines: 74–87

`.animal-list`

This demonstrates `flex-direction`, `flex-wrap`, `gap`, grow and shrink. :contentReference[oaicite:4]{index=4}

## 7. CSS Grid

Photo gallery Grid:

File: `css/bekarys.css`  
Lines: 129–145

The comment explains why Grid is more suitable than Flexbox.

Grid declaration:

File: `css/bekarys.css`  
Lines: 132–135

It demonstrates:

- `display: grid`
- `repeat()`
- `minmax()`
- `fr`
- `gap`

Grid item spanning columns:

File: `css/bekarys.css`  
Lines: 138–139

`grid-column: 1 / -1`

Information Grid:

File: `css/bekarys.css`  
Lines: 150–172

Help page Grid:

File: `css/bekarys.css`  
Lines: 177–184

Colophon Grid:

File: `css/bekarys.css`  
Lines: 189–196

## 8. Positioning

### Relative

File: `css/bekarys.css`  
Lines: 208–209

`#animals`

### Absolute

File: `css/bekarys.css`  
Lines: 214–219

`#animals::after`

### Static

File: `css/bekarys.css`  
Lines: 226–227

`.info-grid`

Static positioning is also explicitly demonstrated in:

File: `css/base.css`  
Lines: 243–249

### Fixed

File: `css/bekarys.css`  
Lines: 232–245

`.fixed-note`

The comment explains that the adoption reminder remains visible while scrolling. :contentReference[oaicite:5]{index=5}

## 9. Float and Clear

Float explanation:

File: `css/bekarys.css`  
Lines: 267–269

Float rule:

File: `css/bekarys.css`  
Lines: 271–274

`.float-figure`

Clear explanation:

File: `css/bekarys.css`  
Lines: 278–280

Clear rule:

File: `css/bekarys.css`  
Lines: 282–283

`.clear-float`

The comment explains what could happen without `clear`. :contentReference[oaicite:6]{index=6}

## 10. Three Centering Techniques

### Auto margins

File: `css/bekarys.css`  
Lines: 292–298

`.center-margin`

### Flexbox centering

File: `css/bekarys.css`  
Lines: 303–311

`.center-flex`

### Grid centering

File: `css/bekarys.css`  
Lines: 316–321

`.center-grid`

Each technique includes an explanatory comment. :contentReference[oaicite:7]{index=7}

## 11. Specificity Experiment

Explanation and specificity calculation:

File: `css/bekarys.css`  
Lines: 474–485

Rule A:

File: `css/bekarys.css`  
Lines: 488–490

`.animal-list li`

Specificity: `0,1,1`

Rule B:

File: `css/bekarys.css`  
Lines: 492–495

`.animal-list li.highlight-text`

Specificity: `0,2,1`

Rule B wins because it has higher specificity. The conflict is solved without `!important`. :contentReference[oaicite:8]{index=8}

## 12. !important

The project contains one intentional `!important` declaration.

File: `css/bekarys.css`  
Lines: 503–508

It is used to preserve a visible keyboard focus indicator. :contentReference[oaicite:9]{index=9}

## 13. Responsive CSS

Media query:

File: `css/bekarys.css`  
Line: 516

The responsive rules continue to the end of the stylesheet.

They adapt Grid layouts, the fixed note and floated content for narrower screens. :contentReference[oaicite:10]{index=10}

## 14. Cascade and Priority

### Internal style

File: `help.html`  
Line: 20

Exactly one internal `<style>` block is used to demonstrate the cascade.

### Inline style

File: `index.html`  
Line: 53

Exactly one inline style is used to demonstrate inline priority in the cascade.

## 15. Author

CSS author: **Bekkazy Bekarys**