'use strict';

document.addEventListener('DOMContentLoaded', function () {
  const helpPage = document.querySelector('#support-form');
  if (helpPage === null) {
    return;
  }

  // Realistic support choices; effort is a planning score, not a price.
  const helpOptions = [
    { id: 1, title: 'Volunteer', category: 'volunteer', description: 'Give your time to help animals and support everyday shelter needs.', effort: 2, unit: 'visit' },
    { id: 2, title: 'Donate Supplies', category: 'supplies', description: 'Provide food, blankets, towels, medical or household supplies.', effort: 1, unit: 'package' },
    { id: 3, title: 'Support Adoption', category: 'adoption', description: 'Learn about responsible adoption and the long-term care animals need.', effort: 3, unit: 'step' },
    { id: 4, title: 'Share Our Mission', category: 'other', description: 'Tell others about the shelter and encourage responsible animal care.', effort: 1, unit: 'share' },
    { id: 5, title: 'Help with Transport', category: 'volunteer', description: 'Ask the shelter whether transport help is currently needed.', effort: 2, unit: 'trip' },
    { id: 6, title: 'Prepare Supplies', category: 'supplies', description: 'Sort and organize useful supplies for animals at the shelter.', effort: 2, unit: 'package' }
  ];

  const form = document.querySelector('#support-request-form');
  const formIntro = helpPage.querySelector('p');
  if (formIntro) {
    formIntro.textContent = 'Use this demonstration form to describe how you would like to help. The form validates your choices locally and displays a summary; it does not send data to a server or create a real booking, payment or order.';
  }
  const result = document.querySelector('#form-result');
  const supportType = document.querySelector('#help-type');
  const quantity = document.querySelector('#quantity');
  const visitDate = document.querySelector('#visit-date');
  const phone = document.querySelector('#phone');
  const contactPhone = document.querySelector('#contact-phone');
  const contactEmail = document.querySelector('#contact-email');
  if (!form || !result || !supportType || !quantity || !visitDate || !phone) {
    return;
  }
  // Use our field-level messages instead of the browser's generic validation bubble.
  form.noValidate = true;

  // The original page sections stay in place. Controls and cards are created by JavaScript.
  const chooser = document.createElement('section');
  chooser.className = 'border rounded-3 p-3 mb-4';
  chooser.setAttribute('aria-labelledby', 'support-choices-title');
  const title = document.createElement('h3');
  title.id = 'support-choices-title';
  title.className = 'h5 fw-bold';
  title.textContent = 'Explore ways to help';
  chooser.appendChild(title);

  const controls = document.createElement('div');
  controls.className = 'row g-3 mb-3';
  const searchWrap = document.createElement('div');
  searchWrap.className = 'col-12 col-md-5';
  const searchLabel = document.createElement('label');
  searchLabel.className = 'form-label';
  searchLabel.htmlFor = 'support-search';
  searchLabel.textContent = 'Search support options';
  const search = document.createElement('input');
  search.type = 'search';
  search.id = 'support-search';
  search.className = 'form-control';
  search.placeholder = 'e.g. supplies or walking';
  searchWrap.append(searchLabel, search);

  const categoryWrap = document.createElement('div');
  categoryWrap.className = 'col-12 col-md-4';
  const categoryLabel = document.createElement('label');
  categoryLabel.className = 'form-label';
  categoryLabel.htmlFor = 'support-category';
  categoryLabel.textContent = 'Category';
  const category = document.createElement('select');
  category.id = 'support-category';
  category.className = 'form-select';
  [
    ['all', 'All categories'], ['volunteer', 'Volunteer'], ['supplies', 'Supplies'],
    ['adoption', 'Adoption'], ['other', 'Other support']
  ].forEach(function (item) {
    const option = document.createElement('option');
    option.value = item[0];
    option.textContent = item[1];
    category.appendChild(option);
  });
  categoryWrap.append(categoryLabel, category);

  const sortWrap = document.createElement('div');
  sortWrap.className = 'col-12 col-md-3';
  const sortLabel = document.createElement('label');
  sortLabel.className = 'form-label';
  sortLabel.htmlFor = 'support-sort';
  sortLabel.textContent = 'Sort by';
  const sort = document.createElement('select');
  sort.id = 'support-sort';
  sort.className = 'form-select';
  [['default', 'Recommended'], ['effort', 'Planning effort'], ['title', 'Name A–Z']].forEach(function (item) {
    const option = document.createElement('option');
    option.value = item[0];
    option.textContent = item[1];
    sort.appendChild(option);
  });
  sortWrap.append(sortLabel, sort);
  controls.append(searchWrap, categoryWrap, sortWrap);
  chooser.appendChild(controls);

  const resultCount = document.createElement('p');
  resultCount.className = 'small text-muted mb-2';
  resultCount.setAttribute('aria-live', 'polite');
  resultCount.id = 'support-result-count';
  chooser.appendChild(resultCount);

  const cards = document.createElement('div');
  cards.className = 'row g-3';
  cards.id = 'support-option-list';
  chooser.appendChild(cards);

  const empty = document.createElement('p');
  empty.className = 'alert alert-info mt-3 mb-0 is-hidden';
  empty.textContent = 'No support options match your search. Try another word or reset the filters.';
  empty.setAttribute('role', 'status');
  chooser.appendChild(empty);

  const reset = document.createElement('button');
  reset.type = 'button';
  reset.className = 'btn btn-outline-secondary mt-3';
  reset.textContent = 'Reset filters';
  chooser.appendChild(reset);

  helpPage.insertBefore(chooser, form);

  function createOptionCard(option) {
    const column = document.createElement('div');
    column.className = 'col-12 col-md-6 col-lg-4';
    const card = document.createElement('article');
    card.className = 'card h-100';
    const body = document.createElement('div');
    body.className = 'card-body d-flex flex-column';
    const heading = document.createElement('h4');
    heading.className = 'h5 card-title';
    heading.textContent = option.title;
    const description = document.createElement('p');
    description.className = 'card-text';
    description.textContent = option.description;
    const effortText = document.createElement('p');
    effortText.className = 'small text-muted mt-auto';
    effortText.textContent = 'Planning effort: ' + option.effort + ' point(s) per ' + option.unit + '.';
    const choose = document.createElement('button');
    choose.type = 'button';
    choose.className = 'btn btn-success';
    choose.textContent = 'Choose this option';
    choose.addEventListener('click', function () {
      supportType.value = option.category;
      supportType.dispatchEvent(new Event('change', { bubbles: true }));
      cards.querySelectorAll('.card').forEach(function (otherCard) {
        otherCard.classList.remove('is-selected');
      });
      card.classList.add('is-selected');
      const message = document.createElement('p');
      message.className = 'small text-success mt-2 mb-0';
      message.setAttribute('role', 'status');
      message.textContent = option.title + ' selected. Complete the form below to prepare a demonstration request.';
      const oldMessage = chooser.querySelector('.selection-feedback');
      if (oldMessage) oldMessage.remove();
      message.classList.add('selection-feedback');
      choose.insertAdjacentElement('afterend', message);
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    body.append(heading, description, effortText, choose);
    card.appendChild(body);
    column.appendChild(card);
    return column;
  }

  function getVisibleOptions() {
    const phrase = search.value.trim().toLowerCase();
    let visible = helpOptions.filter(function (option) {
      const searchable = (option.title + ' ' + option.category + ' ' + option.description).toLowerCase();
      return (phrase === '' || searchable.includes(phrase)) &&
        (category.value === 'all' || option.category === category.value);
    });
    if (sort.value === 'effort') {
      visible = visible.slice().sort(function (a, b) { return a.effort - b.effort; });
    } else if (sort.value === 'title') {
      visible = visible.slice().sort(function (a, b) { return a.title.localeCompare(b.title); });
    }
    return visible;
  }

  function renderOptions() {
    cards.replaceChildren();
    const visible = getVisibleOptions();
    visible.forEach(function (option) {
      cards.appendChild(createOptionCard(option));
    });
    resultCount.textContent = visible.length + ' of ' + helpOptions.length + ' support options shown.';
    empty.classList.toggle('is-hidden', visible.length !== 0);
  }

  search.addEventListener('input', renderOptions);
  category.addEventListener('change', renderOptions);
  sort.addEventListener('change', renderOptions);
  reset.addEventListener('click', function () {
    search.value = '';
    category.value = 'all';
    sort.value = 'default';
    renderOptions();
    search.focus();
  });
  renderOptions();

  // Estimate planning effort only; this is not a monetary price or a real commitment.
  const calculation = document.createElement('p');
  calculation.className = 'alert alert-secondary mt-2';
  calculation.id = 'planning-estimate';
  calculation.setAttribute('aria-live', 'polite');
  quantity.insertAdjacentElement('afterend', calculation);

  function calculateEffort(option, count) {
    const units = option.category === 'supplies' ? count : 1;
    return option.effort * units;
  }

  function updateEstimate() {
    const chosen = helpOptions.find(function (option) { return option.category === supportType.value; });
    const count = quantity.value === '' ? 1 : Number(quantity.value);
    if (chosen === undefined) {
      calculation.textContent = 'Choose a support type to see a planning estimate.';
      return;
    }
    if (!Number.isInteger(count) || count < 1 || count > 20) {
      calculation.textContent = 'Enter a whole number from 1 to 20 for supply packages.';
      return;
    }
    calculation.textContent = 'Planning estimate: ' + calculateEffort(chosen, count) +
      ' effort point(s). This is a planning aid, not a price or a confirmed arrangement.';
  }
  supportType.addEventListener('change', updateEstimate);
  quantity.addEventListener('input', updateEstimate);
  updateEstimate();

  function clearFieldError(field) {
    field.classList.remove('has-error');
    field.classList.remove('is-success');
    const wrapper = field.closest('.mb-3, .mb-0');
    if (wrapper) {
      const oldError = wrapper.querySelector('.field-error');
      if (oldError) oldError.remove();
    }
    field.removeAttribute('aria-invalid');
  }

  function showFieldError(field, message) {
    clearFieldError(field);
    field.classList.add('has-error');
    field.setAttribute('aria-invalid', 'true');
    const error = document.createElement('p');
    error.className = 'small text-danger mt-1 mb-0 field-error';
    error.textContent = message;
    const wrapper = field.closest('.mb-3, .mb-0') || field.parentElement;
    wrapper.appendChild(error);
  }

  function validateField(field) {
    clearFieldError(field);
    const value = field.value.trim();
    if (field.id === 'full-name' && value.length < 2) {
      showFieldError(field, 'Enter your name (at least 2 characters).');
      return false;
    }
    if (field.id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      showFieldError(field, 'Enter a valid email address, for example name@example.com.');
      return false;
    }
    if (field.id === 'help-type' && value === '') {
      showFieldError(field, 'Choose the main type of support.');
      return false;
    }
    if (field.id === 'quantity' && value !== '' &&
        (!Number.isInteger(Number(value)) || Number(value) < 1 || Number(value) > 20)) {
      showFieldError(field, 'Use a whole number from 1 to 20.');
      return false;
    }
    if (field.id === 'visit-date' && value !== '') {
      const today = new Date();
      const localToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const chosenDate = new Date(value + 'T00:00:00');
      if (Number.isNaN(chosenDate.getTime()) || chosenDate < localToday) {
        showFieldError(field, 'Choose today or a future date.');
        return false;
      }
    }
    if (field.id === 'phone' && contactPhone.checked && value.replace(/\D/g, '').length < 7) {
      showFieldError(field, 'A phone contact method requires a valid phone number.');
      return false;
    }
    field.classList.add('is-success');
    return true;
  }

  const fieldsToValidate = [
    document.querySelector('#full-name'), document.querySelector('#email'),
    supportType, quantity, visitDate, phone
  ].filter(Boolean);

  fieldsToValidate.forEach(function (field) {
    field.addEventListener('input', function () { validateField(field); });
    field.addEventListener('change', function () { validateField(field); });
  });
  [contactPhone, contactEmail].filter(Boolean).forEach(function (radio) {
    radio.addEventListener('change', function () {
      validateField(phone);
      const oldContactError = form.querySelector('.contact-method-error');
      if (oldContactError) oldContactError.remove();
    });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    fieldsToValidate.forEach(clearFieldError);
    let firstInvalid = null;
    let valid = true;
    fieldsToValidate.forEach(function (field) {
      if (!validateField(field)) {
        valid = false;
        if (firstInvalid === null) firstInvalid = field;
      }
    });

    const chosenContact = form.querySelector('input[name="contact-method"]:checked');
    const contactFieldset = contactPhone ? contactPhone.closest('fieldset') : null;
    const oldContactError = form.querySelector('.contact-method-error');
    if (oldContactError) oldContactError.remove();
    if (!chosenContact) {
      valid = false;
      const error = document.createElement('p');
      error.className = 'small text-danger contact-method-error';
      error.textContent = 'Choose email or phone as your preferred contact method.';
      if (contactFieldset) contactFieldset.appendChild(error);
      if (firstInvalid === null) firstInvalid = contactPhone;
    }

    if (contactPhone.checked && phone.value.trim() === '') {
      valid = false;
      showFieldError(phone, 'Enter a phone number or choose email contact.');
      if (firstInvalid === null) firstInvalid = phone;
    }

    if (!valid) {
      result.className = 'form-result alert alert-danger';
      result.textContent = 'Please correct the highlighted fields. No request was sent.';
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const chosen = helpOptions.find(function (option) { return option.category === supportType.value; });
    const reference = 'DEMO-' + Math.floor(100000 + Math.random() * 900000);
    const summary = [
      'Demonstration request prepared — reference ' + reference + '.',
      'Name: ' + document.querySelector('#full-name').value.trim(),
      'Email: ' + document.querySelector('#email').value.trim(),
      'Support: ' + (chosen ? chosen.title : supportType.value),
      'Preferred contact: ' + chosenContact.value,
      'Supply packages: ' + (quantity.value === '' ? 'not specified' : quantity.value),
      'Preferred visit date: ' + (visitDate.value || 'not specified'),
      'Planning effort: ' + (chosen ? calculateEffort(chosen, quantity.value === '' ? 1 : Number(quantity.value)) : 0) + ' point(s).',
      'This is only a front-end demonstration. No data was sent to a server and no real booking, payment or order was created.'
    ];
    result.className = 'form-result alert alert-success';
    result.replaceChildren();
    summary.forEach(function (line) {
      const paragraph = document.createElement('p');
      paragraph.className = 'mb-1';
      paragraph.textContent = line;
      result.appendChild(paragraph);
    });
    result.focus();
  });

  form.addEventListener('reset', function () {
    window.setTimeout(function () {
      fieldsToValidate.forEach(clearFieldError);
      const oldContactError = form.querySelector('.contact-method-error');
      if (oldContactError) oldContactError.remove();
      result.className = 'form-result alert alert-info';
      result.textContent = 'Form cleared. Complete the fields to prepare a demonstration request. No data is sent to a server.';
      const feedback = chooser.querySelector('.selection-feedback');
      if (feedback) feedback.remove();
      cards.querySelectorAll('.card').forEach(function (card) { card.classList.remove('is-selected'); });
      updateEstimate();
    }, 0);
  });
});
