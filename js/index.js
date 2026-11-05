'use strict';
window.iamAliveReady.then(function ($) {
  if (!$) return;
  $(function () {
    const $section = $('.help-options');
    if (!$section.length) return;
    const suggestions = [
      ['Donate useful supplies', 'Food, blankets and towels can support everyday care.'],
      ['Help with dog walks', 'Ask whether volunteer walking opportunities are currently available.'],
      ['Learn about responsible adoption', 'Consider the long-term time, space and care an animal needs.'],
      ['Prepare supplies', 'Sort and organize useful supplies before contacting the shelter.'],
      ['Share shelter information', 'Help others find reliable contact information.'],
      ['Ask before visiting', 'Check current needs and visiting details with the shelter.']
    ];
    const $panel = $('<div>').addClass('border rounded-3 p-3 mt-3').appendTo($section);
    const $title = $('<h3>').addClass('h5 fw-bold').appendTo($panel);
    const $description = $('<p>').addClass('mb-3').attr('aria-live', 'polite').appendTo($panel);
    $('<a>').addClass('btn btn-success').attr('href', 'help.html#support-form')
      .text('Prepare a support request').appendTo($panel);
    const $another = $('<button>').attr('type', 'button').addClass('btn btn-outline-secondary ms-2')
      .text('Show another suggestion').appendTo($panel);
    let current = Math.floor(Math.random() * suggestions.length);
    function render() { $title.text(suggestions[current][0]); $description.text(suggestions[current][1]); }
    $another.on('click', function () {
      // A nonzero offset always chooses a different suggestion without a retry loop.
      current = (current + 1 + Math.floor(Math.random() * (suggestions.length - 1))) % suggestions.length;
      render();
    });
    render();
  });
});
