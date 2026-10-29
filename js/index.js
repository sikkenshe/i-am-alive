'use strict';

document.addEventListener('DOMContentLoaded', function () {
  const section = document.querySelector('.help-options');
  if (!section) return;

  const helpSuggestions = [
    { title: 'Donate useful supplies', description: 'Food, blankets, towels and household supplies can support everyday care.', category: 'supplies' },
    { title: 'Help with dog walks', description: 'Ask the shelter whether volunteer walking opportunities are currently available.', category: 'volunteer' },
    { title: 'Learn about responsible adoption', description: 'Consider the long-term time, space and care an animal needs.', category: 'adoption' },
    { title: 'Prepare and organize supplies', description: 'Sorting useful items can make supplies easier to manage.', category: 'supplies' },
    { title: 'Share the shelter information', description: 'Help others find reliable information and encourage responsible care.', category: 'other' },
    { title: 'Ask before visiting', description: 'Contact the shelter to check current needs and visiting details.', category: 'other' }
  ];

  const panel = document.createElement('div');
  panel.className = 'border rounded-3 p-3 mt-3';
  const heading = document.createElement('h3');
  heading.className = 'h5 fw-bold';
  heading.textContent = 'A suggested next step';
  const description = document.createElement('p');
  description.className = 'mb-3';
  const next = document.createElement('a');
  next.className = 'btn btn-success';
  next.href = 'help.html#support-form';
  next.textContent = 'Prepare a support request';
  const another = document.createElement('button');
  another.type = 'button';
  another.className = 'btn btn-outline-secondary ms-2';
  another.textContent = 'Show another suggestion';
  panel.append(heading, description, next, another);
  section.appendChild(panel);

  let currentIndex = Math.floor(Math.random() * helpSuggestions.length);

  function renderSuggestion() {
    const suggestion = helpSuggestions[currentIndex];
    heading.textContent = suggestion.title;
    description.textContent = suggestion.description;
    next.href = 'help.html#support-form';
    next.setAttribute('aria-label', 'Prepare a support request about ' + suggestion.category);
  }

  another.addEventListener('click', function () {
    if (helpSuggestions.length === 1) return;
    let nextIndex = currentIndex;
    while (nextIndex === currentIndex) {
      nextIndex = Math.floor(Math.random() * helpSuggestions.length);
    }
    currentIndex = nextIndex;
    renderSuggestion();
  });
  renderSuggestion();
});
