'use strict';
window.iamAliveReady.then(function ($) {
  if (!$) return;
  $(function () {
    const $form = $('#support-request-form'); // id selector
    if (!$form.length) return;
    const $section = $('#support-form');
    const $result = $('#form-result');
    const options = [
      { id: 1, title: 'Volunteer', category: 'volunteer', description: 'Give time to everyday shelter needs.', effort: 2, unit: 'visit' },
      { id: 2, title: 'Donate Supplies', category: 'supplies', description: 'Provide food, blankets and household supplies.', effort: 1, unit: 'package' },
      { id: 3, title: 'Support Adoption', category: 'adoption', description: 'Learn about responsible lifelong animal care.', effort: 3, unit: 'step' },
      { id: 4, title: 'Share Our Mission', category: 'other', description: 'Share reliable shelter information.', effort: 1, unit: 'share' },
      { id: 5, title: 'Help with Transport', category: 'volunteer', description: 'Ask whether transport help is currently needed.', effort: 2, unit: 'trip' },
      { id: 6, title: 'Prepare Supplies', category: 'supplies', description: 'Sort useful supplies before a visit.', effort: 2, unit: 'package' }
    ];
    function element(tag, classes, text) {
      return $('<' + tag + '>').addClass(classes || '').text(text || '');
    }
    function button(text, classes) { return element('button', classes, text).attr('type', 'button'); }
    function select(id, title, choices, $parent) {
      const $wrap = element('div', 'col-12 col-md-4').appendTo($parent);
      element('label', 'form-label', title).attr('for', id).appendTo($wrap);
      const $select = element('select', 'form-select').attr('id', id).appendTo($wrap);
      choices.forEach(function (choice) { element('option', '', choice[1]).val(choice[0]).appendTo($select); });
      return $select;
    }

    $section.children('p').first().text('Prepare a local demonstration request. Nothing is sent to the shelter; contact them directly for real arrangements.');
    $('#submit-support-request').text('Prepare demo request');
    $result.empty().addClass('is-hidden').attr({ tabindex: '-1', 'aria-live': 'polite' });
    // Preserve required/type/min/max. novalidate lets submit run all field checks,
    // using native ValidityState as well as jQuery rules, instead of one browser bubble.
    $form.prop('noValidate', true);
    const $chooser = element('section', 'border rounded-3 p-3 mb-4').attr('aria-labelledby', 'support-choices-title').insertBefore($form);
    element('h3', 'h5 fw-bold', 'Explore ways to help').attr('id', 'support-choices-title').appendTo($chooser);
    const $toggle = button('Hide filters', 'btn btn-outline-secondary mb-3')
      .attr({ 'aria-controls': 'support-filters', 'aria-expanded': 'true' }).appendTo($chooser);
    const $controls = element('div', 'row g-3 mb-3').attr('id', 'support-filters').appendTo($chooser);
    const $searchWrap = element('div', 'col-12 col-md-4').appendTo($controls);
    element('label', 'form-label', 'Search support options').attr('for', 'support-search').appendTo($searchWrap);
    const $search = element('input', 'form-control').attr({ id: 'support-search', type: 'search', placeholder: 'Search options' }).appendTo($searchWrap);
    const $category = select('support-category', 'Category', [['all', 'All categories'], ['volunteer', 'Volunteer'], ['supplies', 'Supplies'], ['adoption', 'Adoption'], ['other', 'Other support']], $controls);
    const $sort = select('support-sort', 'Sort by', [['default', 'Recommended'], ['effort', 'Planning effort'], ['title', 'Name A–Z']], $controls);
    const $count = element('p', 'small text-muted mb-2').attr({ id: 'support-result-count', 'aria-live': 'polite' }).appendTo($chooser);
    const $list = element('div', 'row g-3').attr('id', 'support-option-list').appendTo($chooser);
    const $empty = element('p', 'alert alert-info is-hidden', 'No support options match your filters.').attr('role', 'status').appendTo($chooser);
    const $reset = button('Reset filters', 'btn btn-outline-secondary mt-3').appendTo($chooser);
    const $feedback = element('p', 'small text-success mt-2 mb-0 is-hidden').attr({ id: 'selection-feedback', role: 'status' }).appendTo($chooser);
    let selectedId = null;

    // Rewrite 2: .empty(), .appendTo(), .val() and .text() replace replaceChildren,
    // appendChild, .value and textContent. The helper makes card construction shorter.
    function renderOptions() {
      const phrase = $search.val().trim().toLowerCase();
      let visible = options.filter(function (option) {
        return (option.title + ' ' + option.description).toLowerCase().includes(phrase) &&
          ($category.val() === 'all' || option.category === $category.val());
      });
      if ($sort.val() === 'effort') visible.sort(function (a, b) { return a.effort - b.effort; });
      if ($sort.val() === 'title') visible.sort(function (a, b) { return a.title.localeCompare(b.title); });
      $list.empty();
      visible.forEach(function (option) {
        const $column = element('div', 'col-12 col-md-6 col-lg-4').appendTo($list);
        const $card = element('article', 'card h-100').attr('data-option-id', option.id)
          .toggleClass('is-selected', selectedId === option.id).appendTo($column);
        const $body = element('div', 'card-body d-flex flex-column').appendTo($card);
        element('h4', 'h5 card-title', option.title).appendTo($body);
        element('p', 'card-text', option.description).appendTo($body);
        element('p', 'small text-muted mt-auto', 'Planning effort: ' + option.effort + ' per ' + option.unit).appendTo($body);
        button('Choose this option', 'btn btn-success').attr('data-choose', option.id).appendTo($body);
      });
      $count.text(visible.length + ' of ' + options.length + ' support options shown.');
      $empty.toggleClass('is-hidden', visible.length !== 0);
    }
    // The parent exists now and survives .empty(). Direct binding to future buttons
    // would miss buttons created after filtering; click bubbles to this stable parent.
    $list.on('click', '[data-choose]', function () {
      const $card = $(this).closest('.card'); // $(this): the clicked dynamic button
      selectedId = Number($card.attr('data-option-id'));
      const option = options.find(function (item) { return item.id === selectedId; });
      $list.find('.card').removeClass('is-selected');
      $card.addClass('is-selected');
      $('#help-type').val(option.category).trigger('change');
      $feedback.stop(true, true).addClass('is-hidden').removeAttr('style')
        .text(option.title + ' selected. Complete the form below.').removeClass('is-hidden').hide().fadeIn(180);
    });
    $search.on('input', renderOptions);
    $category.add($sort).on('change', renderOptions);
    $reset.on('click', function () {
      $search.val(''); $category.val('all'); $sort.val('default');
      renderOptions(); $search.trigger('focus');
    });
    $toggle.on('click', function () {
      const $button = $(this); // second handler using $(this)
      const expanded = $button.attr('aria-expanded') === 'true';
      $button.attr('aria-expanded', String(!expanded)).text(expanded ? 'Show filters' : 'Hide filters');
      // Finish the previous effect before changing state, so fast clicks stay in sync.
      $controls.stop(true, true).slideToggle(200, function () {
        if (!expanded) $search.trigger('focus'); // callback after the panel opens
      });
    });
    renderOptions();

    const $estimate = element('p', 'alert alert-secondary mt-2').attr({ id: 'planning-estimate', 'aria-live': 'polite' }).insertAfter('#quantity');
    function chosenOption() {
      return options.find(function (option) { return option.id === selectedId && option.category === $('#help-type').val(); }) ||
        options.find(function (option) { return option.category === $('#help-type').val(); });
    }
    function effort(option) { return option.effort * (option.category === 'supplies' ? Number($('#quantity').val() || 1) : 1); }
    function updateEstimate() {
      const option = chosenOption();
      const count = Number($('#quantity').val() || 1);
      $estimate.text(!option ? 'Choose a support type for a planning estimate.' :
        (!Number.isInteger(count) || count < 1 || count > 20 ? 'Enter a whole number from 1 to 20.' :
          'Planning estimate: ' + effort(option) + ' effort point(s). This is not a price or confirmed arrangement.'));
    }
    $('#help-type').on('change', function () {
      if (!options.some(function (option) { return option.id === selectedId && option.category === $('#help-type').val(); })) {
        selectedId = null; $list.find('.card').removeClass('is-selected'); $feedback.addClass('is-hidden');
      }
      updateEstimate();
    });
    $('#quantity').on('input change', updateEstimate);
    updateEstimate();

    // .html() copies only trusted markup already in the page, preserving its span.
    // All visitor values and errors use .text(), so typed markup is never executed.
    const $agreementNote = element('p', 'small text-success mt-2 is-hidden').attr({ id: 'agreement-note', role: 'status' })
      .insertAfter($('#volunteer-agreement').parent());
    $('#volunteer-agreement').on('change', function () {
      const $checkbox = $(this);
      // .prop('checked') reads the LIVE boolean; .attr('checked') is the initial
      // markup attribute and does not reliably track a visitor's toggles.
      if ($checkbox.prop('checked')) {
        $agreementNote.html($checkbox.siblings('label').html()).removeClass('is-hidden');
      } else { $agreementNote.addClass('is-hidden').empty(); }
    });

    // Rewrite 3: .find(), .each(), .val(), .closest() and class methods replace
    // querySelectorAll/forEach/.value/classList. Rules are similar length; error DOM is clearer.
    const $fields = $form.find('input:not([type="hidden"]):not([name="_honey"]), select, textarea');
    const touched = new Set();
    function errorId($field) { return $field.attr('id') + '-error'; }
    function clearError($field) {
      const id = errorId($field);
      $('#' + id).remove();
      const described = ($field.attr('aria-describedby') || '').split(/\s+/).filter(function (value) { return value && value !== id; });
      $field.removeClass('has-error is-success').removeAttr('aria-invalid');
      if (described.length) $field.attr('aria-describedby', described.join(' '));
      else $field.removeAttr('aria-describedby');
    }
    function showError($field, message) {
      const id = errorId($field);
      $field.addClass('has-error').attr({ 'aria-invalid': 'true', 'aria-describedby': (($field.attr('aria-describedby') || '') + ' ' + id).trim() });
      element('p', 'small text-danger mt-1 mb-0', message).attr({ id: id, role: 'alert' }).appendTo($field.parent());
    }
    function validationMessage($field) {
      const id = $field.attr('id');
      if ($field.attr('type') === 'radio') {
        return $form.find('input[name="contact-method"]:checked').length ? '' : 'Choose email or phone contact.';
      }
      if ($field.attr('type') === 'checkbox') return ''; // optional acknowledgement
      const value = String($field.val() || '').trim();
      // Do not trim date/time/number by assignment: their browser properties are typed.
      if (['text', 'email', 'tel'].includes($field.attr('type')) || $field.is('textarea')) $field.val(value);
      if ($field.prop('required') && !value) return 'Please complete this field.';
      if (id === 'full-name' && value.length < 2) return 'Enter at least 2 characters for your name.';
      if (id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter an email such as name@example.com.';
      if (id === 'phone') {
        if ($('#contact-phone').prop('checked') && !value) return 'Enter a phone number for phone contact.';
        if (value && (!/^\+?[\d\s().-]+$/.test(value) || !/^[0-9]{7,15}$/.test(value.replace(/\D/g, '')))) return 'Use 7–15 digits, with an optional leading +, spaces, brackets or hyphens.';
      }
      if (id === 'help-type' && !options.some(function (option) { return option.category === value; })) return 'Choose a listed support type.';
      if (id === 'quantity' && value && (!Number.isInteger(Number(value)) || Number(value) < 1 || Number(value) > 20)) return 'Enter a whole number from 1 to 20.';
      if (id === 'visit-date' && value) {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const date = new Date(value + 'T00:00:00');
        if (Number.isNaN(date.getTime()) || date < today) return 'Choose today or a future date.';
      }
      // Include optional time/message and browser-specific malformed values.
      if (!$field.prop('validity').valid) return 'Check the format or allowed range of this field.';
      return '';
    }
    function validate($field) {
      clearError($field);
      const message = validationMessage($field);
      if (message) { showError($field, message); return false; }
      $field.addClass('is-success'); return true;
    }
    function hideOldSuccess() {
      if ($result.hasClass('alert-success') && !$result.hasClass('is-hidden')) {
        // fadeOut removes an outdated success when the visitor starts a new request.
        $result.stop(true, true).fadeOut(150, function () { $result.addClass('is-hidden').empty().removeAttr('style'); });
      }
    }
    $fields.on('input change', function () {
      const $field = $(this);
      hideOldSuccess();
      if (touched.has($field.attr('id'))) validate($field);
      if ($field.is('[name="contact-method"]')) {
        $fields.filter('[name="contact-method"]').each(function () {
          if (touched.has($(this).attr('id'))) validate($(this));
        });
        if (touched.has('phone')) validate($('#phone'));
      }
    });
    let keepSuccess = false;
    function clearFormState() {
      $fields.each(function () { clearError($(this)); }); touched.clear();
      selectedId = null; $list.find('.card').removeClass('is-selected');
      $feedback.add($agreementNote).addClass('is-hidden').empty();
      updateEstimate();
    }
    $form.on('reset', function (event) {
      // Cancel native reset so values and errors can be reset synchronously in jQuery.
      event.preventDefault();
      $fields.each(function () {
        const $field = $(this);
        if ($field.is('[type="radio"], [type="checkbox"]')) $field.prop('checked', $field.prop('defaultChecked'));
        else if ($field.is('select')) $field.val('');
        else $field.val($field.prop('defaultValue'));
      });
      clearFormState();
      if (!keepSuccess) $result.stop(true, true).addClass('is-hidden').empty().removeAttr('style');
    });
    $form.on('submit', function (event) {
      // Without preventDefault the POST action would send personal data to FormSubmit
      // and navigate away. This assignment only prepares a local demonstration.
      event.preventDefault();
      $result.stop(true, true).addClass('is-hidden').empty().removeAttr('style');
      let $firstInvalid = null;
      // No short circuit: EVERY visible user-editable field is checked.
      $fields.each(function () {
        const $field = $(this); touched.add($field.attr('id'));
        if (!validate($field) && !$firstInvalid) $firstInvalid = $field;
      });
      if ($firstInvalid) { $firstInvalid.trigger('focus'); return; }
      // Browser validation improves feedback; users can bypass it. A real backend
      // must repeat all checks before accepting or storing any submitted data.
      const option = chosenOption();
      const summary = 'Demo request prepared for ' + $('#full-name').val() + ': ' + option.title +
        ', contact by ' + $form.find('[name="contact-method"]:checked').val() +
        ', planning effort ' + effort(option) + '. No data was sent. Contact the shelter directly.';
      keepSuccess = true; $form.trigger('reset'); keepSuccess = false;
      // Chain: remove old severity, add success styling, insert SAFE text, reveal,
      // then fade in. The callback focuses the completed confirmation for readers.
      $result.removeClass('alert-info alert-danger').addClass('alert-success').text(summary)
        .removeClass('is-hidden').hide().fadeIn(220, function () { $result.trigger('focus'); });
    });
  });
});
