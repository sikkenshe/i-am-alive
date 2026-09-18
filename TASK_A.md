# Task A — Analysis of a Similar Website

## Website analyzed

**ASPCA — Adopt a Pet**  
https://www.aspca.org/adopt-pet

The ASPCA website is a real animal-welfare website that provides adoption information, local shelter resources, volunteer/foster information, and links to animals available for adoption. The page uses navigation, headings, links, images, forms, and repeated content blocks.

## HTML structure observed

The page contains a large navigation area, a main adoption section, local adoption resources, help/volunteer content, a newsletter/contact area, and a footer. The rendered structure shows headings such as “Adopt a Pet from the ASPCA” and “Adopt a Pet Locally”. The page also contains forms and images with alternative text.

## Three structural/accessibility weaknesses

These observations are structural or accessibility weaknesses rather than automatic HTML syntax errors.

### 1. Repeated generic “Read more” links

Many different content blocks use the same visible link text, “Read more”. Although each link can lead to a different destination, identical link text gives little information when links are viewed out of context.

**Lesson for my project:** use descriptive link text such as “View the shelter location” or “Read Jack's adoption story”.

### 2. Repeated navigation/content links

The page repeats some destinations and labels in different parts of the page, including “Adoption Tips” and several adoption-resource links. Repetition is not automatically invalid, but it can make the information structure harder to scan.

**Lesson for my project:** keep navigation simple and use clear section headings so that each group of links has an obvious purpose.

### 3. Search and subscription controls need clear semantic labeling

The rendered page contains search and subscription controls. When controls are presented without an immediately clear visible label or grouping, users can have difficulty understanding their purpose, especially with assistive technology.

**Lesson for my project:** every form control in my website is paired with a `<label>`, and related controls are grouped with `<fieldset>` and `<legend>`.

## Conclusion

The ASPCA website demonstrates how a real animal-welfare website organizes adoption and support information. These observations influenced the structure of my I Am Alive project.

## Source

ASPCA, “Adopt a Pet”:  
https://www.aspca.org/adopt-pet
