'use strict';

document.addEventListener('DOMContentLoaded', function () {
  const section = document.querySelector('.animal-list');
  if (!section) return;

  const row = section.querySelector('.row');
  const heading = section.querySelector('h2');
  if (!row || !heading) return;

  // Example profiles for the catalogue. Replace these details with verified shelter data.
  const animals = [
    {
      id: 1,
      name: 'Buddy and Aktos',
      species: 'dog',
      age: 2,
      temperament: 'THey are Friendly and active',
      needs: 'Daily walks and human attention',
      image: 'images/dog-walk.jpeg',
      imageAlt: 'Dogs outside during a walk'
    },
    {
      id: 2,
      name: 'Max',
      species: 'dog',
      age: 3,
      temperament: 'Calm and gentle',
      needs: 'A safe home and regular care',
      image: 'images/shelter-dog.jpeg',
      imageAlt: 'Dog at an animal shelter'
    },
    {
      id: 3,
      name: 'Charlie',
      species: 'cat',
      age: 1,
      temperament: 'Playful and curious',
      needs: 'Exercise and patient training',
      image: 'images/dog-volunteer.jpeg',
      imageAlt: 'cat with a shelter volunteer'
    },
    {
      id: 4,
      name: 'Milo',
      species: 'cat',
      age: 2,
      temperament: 'Curious and affectionate',
      needs: 'A quiet space and daily care',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Cat looking toward the camera'
    },
    {
      id: 5,
      name: 'Luna',
      species: 'cat',
      age: 4,
      temperament: 'Calm and independent',
      needs: 'A safe place and gentle attention',
      image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Cat sitting and looking at the camera'
    },
    {
      id: 6,
      name: 'Coco',
      species: 'rabbit',
      age: 1,
      temperament: 'Gentle and quiet',
      needs: 'Suitable housing, hay and fresh water',
      image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Rabbit sitting and looking toward the camera'
    }
  ];

  // Create elements safely using DOM methods and textContent.
  function createElement(tag, className, text) {
    const element = document.createElement(tag);
    element.className = className;
    element.textContent = text;
    return element;
  }

  function createSelect(id, labelText, options) {
    const wrapper = createElement('div', 'col-12 col-md-4', '');
    const label = createElement('label', 'form-label', labelText);
    const select = document.createElement('select');

    select.id = id;
    select.className = 'form-select';
    label.htmlFor = id;

    options.forEach(function (item) {
      const option = document.createElement('option');
      option.value = item.value;
      option.textContent = item.text;
      select.appendChild(option);
    });

    wrapper.append(label, select);
    return { wrapper: wrapper, select: select };
  }

  // Build the search field and the two filters.
  heading.textContent = 'Animals Looking for Homes';

  const controls = createElement('div', 'row g-3 mb-3', '');
  const searchWrapper = createElement('div', 'col-12 col-md-4', '');
  const searchLabel = createElement('label', 'form-label', 'Search by name');
  const search = document.createElement('input');
  search.id = 'animal-search';
  search.type = 'search';
  search.className = 'form-control';
  search.placeholder = 'Enter an animal name';
  searchLabel.htmlFor = search.id;
  searchWrapper.append(searchLabel, search);

  const speciesFilter = createSelect('animal-species', 'Animal type', [
    { value: 'all', text: 'All animals' },
    { value: 'dog', text: 'Dogs' },
    { value: 'cat', text: 'Cats' },
    { value: 'rabbit', text: 'Rabbits' }
  ]);

  const ageFilter = createSelect('animal-age', 'Age', [
    { value: 'all', text: 'Any age' },
    { value: 'young', text: 'Under 3 years' },
    { value: 'adult', text: '3 years and older' }
  ]);

  controls.append(searchWrapper, speciesFilter.wrapper, ageFilter.wrapper);
  heading.insertAdjacentElement('afterend', controls);

  const status = createElement('p', 'small text-muted', '');
  status.setAttribute('aria-live', 'polite');
  controls.insertAdjacentElement('afterend', status);

  const resetButton = createElement('button', 'btn btn-outline-secondary mb-3', 'Reset filters');
  resetButton.type = 'button';
  status.insertAdjacentElement('afterend', resetButton);

  const emptyMessage = createElement(
    'p',
    'alert alert-info is-hidden',
    'No animals match your search. Try changing the filters.'
  );
  emptyMessage.setAttribute('role', 'status');
  resetButton.insertAdjacentElement('afterend', emptyMessage);

  function filterAnimals() {
    const phrase = search.value.trim().toLowerCase();
    const species = speciesFilter.select.value;
    const age = ageFilter.select.value;

    return animals.filter(function (animal) {
      const matchesName = animal.name.toLowerCase().includes(phrase);
      const matchesSpecies = species === 'all' || animal.species === species;
      let matchesAge = true;

      if (age === 'young') {
        matchesAge = animal.age < 3;
      } else if (age === 'adult') {
        matchesAge = animal.age >= 3;
      }

      return matchesName && matchesSpecies && matchesAge;
    });
  }

  function createAnimalCard(animal) {
    const column = createElement('div', 'col-12 col-md-6 col-lg-4', '');
    const card = createElement('article', 'card h-100 shadow-sm', '');
    const image = document.createElement('img');

    image.src = animal.image;
    image.alt = animal.imageAlt;
    image.className = 'card-img-top animal-image';
    image.loading = 'lazy';
    image.decoding = 'async';
    image.addEventListener('error', function () {
      image.alt = 'Photo could not be loaded for ' + animal.name;
      image.classList.add('is-hidden');
    });

    const body = createElement('div', 'card-body', '');
    const title = createElement('h3', 'card-title h5 fw-semibold', animal.name);
    const details = createElement('div', 'card-text', '');
    details.append(
      createElement('p', 'mb-2', 'Type: ' + animal.species),
      createElement('p', 'mb-2', 'Age: ' + animal.age + ' year(s)'),
      createElement('p', 'mb-2', 'Temperament: ' + animal.temperament),
      createElement('p', 'mb-3', 'Needs: ' + animal.needs)
    );

    const link = createElement('a', 'btn btn-outline-success mt-2', 'Ask the shelter');
    link.href = '#contact';
    link.setAttribute('aria-label', 'Ask the shelter about ' + animal.name);

    body.append(title, details, link);
    card.append(image, body);
    column.appendChild(card);
    return column;
  }

  function renderAnimals() {
    const results = filterAnimals();
    row.replaceChildren();

    results.forEach(function (animal) {
      row.appendChild(createAnimalCard(animal));
    });

    status.textContent = results.length + ' of ' + animals.length + ' animals shown.';
    emptyMessage.classList.toggle('is-hidden', results.length !== 0);
  }

  search.addEventListener('input', renderAnimals);
  speciesFilter.select.addEventListener('change', renderAnimals);
  ageFilter.select.addEventListener('change', renderAnimals);

  resetButton.addEventListener('click', function () {
    search.value = '';
    speciesFilter.select.value = 'all';
    ageFilter.select.value = 'all';
    renderAnimals();
    search.focus();
  });

  renderAnimals();
});
