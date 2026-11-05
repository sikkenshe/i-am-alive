'use strict';
window.iamAliveReady.then(function ($) {
  if (!$) return;
  $(function () {
    const $section = $('.animal-list');
    if (!$section.length) return;
    const $row = $section.find('.row').first();
    const $heading = $section.find('h2').first();
    // Existing coursework sample profiles, not verified adoption availability.
  const animals = [
    {
      id: 1,
      name: 'Buddy and Aktos',
      species: 'dog',
      age: 2,
      temperament: 'Friendly and active',
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
      imageAlt: 'Dog with a shelter volunteer; illustrative shelter photograph'
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
    function element(tag, classes, text) {
      return $('<' + tag + '>').addClass(classes || '').text(text || '');
    }
    $heading.text('Animals Looking for Homes');
    const $controls = element('div', 'row g-3 mb-3').insertAfter($heading);
    function control(id, label, choices) {
      const $wrapper = element('div', 'col-12 col-md-4').appendTo($controls);
      element('label', 'form-label', label).attr('for', id).appendTo($wrapper);
      const $field = element(choices ? 'select' : 'input', choices ? 'form-select' : 'form-control').attr('id', id).appendTo($wrapper);
      if (choices) choices.forEach(function (choice) { element('option', '', choice[1]).val(choice[0]).appendTo($field); });
      else $field.attr({ type: 'search', placeholder: 'Enter an animal name' });
      return $field;
    }
    const $search = control('animal-search', 'Search by name');
    const $species = control('animal-species', 'Animal type', [['all', 'All animals'], ['dog', 'Dogs'], ['cat', 'Cats'], ['rabbit', 'Rabbits']]);
    const $age = control('animal-age', 'Age', [['all', 'Any age'], ['young', 'Under 3 years'], ['adult', '3 years and older']]);
    const $status = element('p', 'small text-muted').attr('aria-live', 'polite').insertAfter($controls);
    const $reset = element('button', 'btn btn-outline-secondary mb-3', 'Reset filters').attr('type', 'button').insertAfter($status);
    const $empty = element('p', 'alert alert-info is-hidden', 'No animals match your search. Try changing the filters.').attr('role', 'status').insertAfter($reset);
    element('p', 'small text-muted', 'Coursework sample profiles and illustrative photos. Confirm all current animal details and availability with the shelter.').insertAfter($empty);
    function render() {
      const phrase = $search.val().trim().toLowerCase();
      const visible = animals.filter(function (animal) {
        return animal.name.toLowerCase().includes(phrase) && ($species.val() === 'all' || animal.species === $species.val()) &&
          ($age.val() === 'all' || ($age.val() === 'young' ? animal.age < 3 : animal.age >= 3));
      });
      $row.empty();
      visible.forEach(function (animal) {
        const $column = element('div', 'col-12 col-md-6 col-lg-4').appendTo($row);
        const $card = element('article', 'card h-100 shadow-sm').appendTo($column);
        element('img', 'card-img-top animal-image').on('error', function () {
          $(this).addClass('is-hidden');
        }).attr({ src: animal.image, alt: animal.imageAlt, loading: 'lazy', decoding: 'async' }).appendTo($card);
        const $body = element('div', 'card-body').appendTo($card);
        element('h3', 'card-title h5 fw-semibold', animal.name).appendTo($body);
        ['Type: ' + animal.species, 'Age: ' + animal.age + ' year(s)', 'Temperament: ' + animal.temperament, 'Needs: ' + animal.needs].forEach(function (text) {
          element('p', 'mb-2', text).appendTo($body);
        });
        element('a', 'btn btn-outline-success mt-2', 'Ask the shelter').attr({ href: '#contact', 'aria-label': 'Ask the shelter about ' + animal.name }).appendTo($body);
      });
      $status.text(visible.length + ' of ' + animals.length + ' animals shown.');
      $empty.toggleClass('is-hidden', visible.length !== 0);
    }
    $search.on('input', render);
    $species.add($age).on('change', render);
    $reset.on('click', function () {
      $search.val(''); $species.val('all'); $age.val('all'); render(); $search.trigger('focus');
    });
    render();
  });
});
