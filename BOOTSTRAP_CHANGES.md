# Assignment 3 — Bootstrap cleanup

I kept the existing pages and content, then replaced the old hand-written layout rules with Bootstrap classes.

- Old navigation Flexbox -> `navbar`, `navbar-expand-md`, `collapse`, `navbar-toggler`, `container-fluid`.
- Old service-card Flexbox -> `row`, `g-4`, `col-12`, `col-md-6`, `col-lg-4`, Bootstrap `card`.
- Old photo-gallery CSS Grid -> `row`, `g-4`, responsive Bootstrap columns.
- Old support-list Flexbox -> Bootstrap responsive grid columns.
- Old technology/source layouts -> Bootstrap rows, columns and cards.
- Old manual section spacing -> `p-4`, `mb-4`, `py-4`, `g-*` utilities.
- Old manual button styling -> Bootstrap `btn` variants and size utilities.
- Old manual form sizing/spacing -> `form-control`, `form-select`, `form-range`, border and spacing utilities.
- Old float/clear layout -> Bootstrap responsive sizing/alignment.
- Old responsive media query -> Bootstrap breakpoint classes.
- Old inline style and `!important` priority demo -> removed from HTML/CSS.

The remaining CSS only keeps the project colours, fonts and small brand corrections that Bootstrap does not need to own.
