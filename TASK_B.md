# Task B — How a Browser Processes HTML

When a browser opens an HTML page, it reads the document and interprets the HTML tags as a document structure. The browser creates a Document Object Model (DOM), which represents elements such as headings, paragraphs, links, images, tables and forms. The browser then uses this structure to display the page and make its interactive elements available to the user.

In my project, I used semantic elements such as `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>` and `<footer>`. These elements describe the purpose of different parts of the page instead of using generic containers for everything. This makes the structure easier to understand and supports accessibility.

The project also contains a table with a caption, header cells and `scope` attributes. Images use meaningful `alt` text and are placed inside `<figure>` elements with captions. The How to Help page contains a form with labels, fieldsets, a legend, radio buttons, a checkbox, a select menu, a textarea and different input types.

The form is only an HTML demonstration because the project has no server-side application to process submitted data.
