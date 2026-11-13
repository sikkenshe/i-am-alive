'use strict';
window.iamAliveReady.then(function ($) {
  if (!$) return;
  $(function () {
    $.fx.off = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const $form = $('#support-request-form'); // id selector
    if (!$form.length) return;
    const $section = $('#support-form');
    const $result = $('#form-result');
    const options = [
      { id: 1, title: 'Dog walking', category: 'volunteer', description: 'Ask about dog walks and visitor rules.' },
      { id: 2, title: 'Food supplies', category: 'supplies', description: 'Confirm which food products are currently accepted.' },
      { id: 3, title: 'Responsible adoption', category: 'adoption', description: 'Prepare questions about meeting and caring for an animal.' },
      { id: 4, title: 'Blankets and towels', category: 'supplies', description: 'Ask which textiles the shelter currently needs.' },
      { id: 5, title: 'Medical supplies', category: 'supplies', description: 'Confirm exact items with the shelter before buying.' },
      { id: 6, title: 'Household supplies', category: 'supplies', description: 'Ask about useful household items.' },
      { id: 7, title: 'Other questions', category: 'other', description: 'Prepare a question for the shelter before arranging support.' }
    ];
    let downloadUrl = null;
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

    $section.children('p').first().text('Choose a way to help, check your details and download a personal support plan. This does not send a request or confirm a visit.');
    $section.find('h2').first().text('Prepare your support plan');
    $('#submit-support-request').text('Prepare plan');
    $result.empty().addClass('is-hidden').attr({ tabindex: '-1', 'aria-live': 'polite' });
    // Preserve required/type/min/max. novalidate lets submit run all field checks,
    // using native ValidityState as well as jQuery rules, instead of one browser bubble.
    $form.prop('noValidate', true);
    $('#submit-support-request').prop('disabled', false);
    const $phoneLabel = $('label[for="phone"]');
    const $chooser = element('section', 'border rounded-3 p-3 mb-4').attr('aria-labelledby', 'support-choices-title').insertBefore($form);
    element('h3', 'h5 fw-bold', 'Explore ways to help').attr('id', 'support-choices-title').appendTo($chooser);
    const $toggle = button('Hide filters', 'btn btn-outline-secondary mb-3')
      .attr({ 'aria-controls': 'support-filters', 'aria-expanded': 'true' }).appendTo($chooser);
    const $controls = element('div', 'row g-3 mb-3').attr('id', 'support-filters').appendTo($chooser);
    const $searchWrap = element('div', 'col-12 col-md-4').appendTo($controls);
    element('label', 'form-label', 'Search support options').attr('for', 'support-search').appendTo($searchWrap);
    const $search = element('input', 'form-control').attr({ id: 'support-search', type: 'search', placeholder: 'Search options' }).appendTo($searchWrap);
    const $category = select('support-category', 'Category', [['all', 'All categories'], ['volunteer', 'Volunteer'], ['supplies', 'Supplies'], ['adoption', 'Adoption'], ['other', 'Other support']], $controls);
    const $sort = select('support-sort', 'Sort by', [['default', 'Published topics first'], ['category', 'Category'], ['title', 'Name A–Z']], $controls);
    const $count = element('p', 'small text-muted mb-2').attr({ id: 'support-result-count', 'aria-live': 'polite' }).appendTo($chooser);
    const $list = element('div', 'row g-3').attr('id', 'support-option-list').appendTo($chooser);
    const $empty = element('p', 'alert alert-info is-hidden', 'No support options match your filters.').attr('role', 'status').appendTo($chooser);
    const $reset = button('Reset filters', 'btn btn-outline-secondary mt-3').appendTo($chooser);
    const $feedback = element('p', 'small text-success mt-2 mb-0 is-hidden').attr({ id: 'selection-feedback', role: 'status' }).appendTo($chooser);
    let selectedId = null;

    // Cards are rebuilt from data. The delegated parent below survives this rebuild.
    function renderOptions() {
      const phrase = $search.val().trim().toLowerCase();
      let visible = options.filter(function (option) {
        return (option.title + ' ' + option.description).toLowerCase().includes(phrase) &&
          ($category.val() === 'all' || option.category === $category.val());
      });
      if ($sort.val() === 'category') visible.sort(function (a, b) { return a.category.localeCompare(b.category); });
      if ($sort.val() === 'title') visible.sort(function (a, b) { return a.title.localeCompare(b.title); });
      $list.empty();
      visible.forEach(function (option) {
        const $column = element('div', 'col-12 col-md-6 col-lg-4').appendTo($list);
        const $card = element('article', 'card h-100').attr('data-option-id', option.id)
          .toggleClass('is-selected', selectedId === option.id).appendTo($column);
        const $body = element('div', 'card-body d-flex flex-column').appendTo($card);
        element('h4', 'h5 card-title', option.title).appendTo($body);
        element('p', 'card-text', option.description).appendTo($body);
        element('p', 'small text-muted mt-auto', 'Category: ' + option.category).appendTo($body);
        button('Choose this option', 'btn btn-success').attr('data-choose', option.id).appendTo($body);
      });
      $count.text(visible.length + ' of ' + options.length + ' support options shown.');
      $empty.toggleClass('is-hidden', visible.length !== 0);
    }
    // The parent exists now and survives .empty(). Direct binding to future buttons
    // would miss buttons created after filtering; click bubbles to this stable parent.
    $list.on('click', '[data-choose]', function (event) {
      event.preventDefault();
      hideOldSuccess();
      const $card = $(this).closest('.card'); // $(this): the clicked dynamic button
      selectedId = Number($card.attr('data-option-id'));
      const option = options.find(function (item) { return item.id === selectedId; });
      $list.find('.card').removeClass('is-selected');
      $card.addClass('is-selected');
      $('#help-type').val(option.category).trigger('change');
      $feedback.stop(true, true).addClass('is-hidden').removeAttr('style')
        .text(option.title + ' selected. Complete your plan below.').removeClass('is-hidden').hide().fadeIn(180);
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

    const $estimate = element('p', 'alert alert-secondary mt-2').attr({ id: 'supply-summary', 'aria-live': 'polite' }).insertAfter('#quantity');
    function chosenOption() {
      return options.find(function (option) { return option.id === selectedId && option.category === $('#help-type').val(); }) ||
        options.find(function (option) { return option.category === $('#help-type').val(); });
    }
    function updateEstimate() {
      const supplies = $('#help-type').val() === 'supplies';
      const count = Number($('#quantity').val());
      $('#quantity').prop('disabled', !supplies).prop('required', supplies);
      $estimate.text(!supplies ? 'Supply quantity applies only to supply plans.' :
        (!Number.isInteger(count) || count < 1 || count > 20 ? 'Enter the number of packages you plan to bring, from 1 to 20.' :
          'Your plan includes ' + count + ' supply package(s). Confirm their contents with the shelter.'));
    }
    $('#help-type').on('change', function () {
      hideOldSuccess();
      if (!options.some(function (option) { return option.id === selectedId && option.category === $('#help-type').val(); })) {
        selectedId = null; $list.find('.card').removeClass('is-selected'); $feedback.addClass('is-hidden');
      }
      updateEstimate();
      if (touched.has('quantity')) validate($('#quantity'));
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

    // Validate all user-editable fields; configuration and honeypot fields are excluded.
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
      if ($field.prop('disabled')) return '';
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
      if (!$field.prop('disabled')) $field.addClass('is-success');
      return true;
    }
    function releaseDownload() {
      if (downloadUrl) { URL.revokeObjectURL(downloadUrl); downloadUrl = null; }
    }
    function hideOldSuccess() {
      if ($result.hasClass('alert-success') && !$result.hasClass('is-hidden')) {
        releaseDownload();
        // Hide immediately before fading out so stale download links cannot be used.
        $result.find('a').removeAttr('href').addClass('is-hidden');
        $result.stop(true, true).fadeOut(150, function () { $result.addClass('is-hidden').empty().removeAttr('style'); });
      }
    }
    $fields.on('input change', function () {
      const $field = $(this);
      hideOldSuccess();
      if (touched.has($field.attr('id'))) validate($field);
      if ($field.is('[name="contact-method"]')) {
        $phoneLabel.text($('#contact-phone').prop('checked') ? 'Phone number *' : 'Phone number (optional)');
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
      $phoneLabel.text('Phone number (optional)');
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
      if (!keepSuccess) { releaseDownload(); $result.stop(true, true).addClass('is-hidden').empty().removeAttr('style'); }
    });
    $form.on('submit', function (event) {
      // Keep submission on this page. main.js also removes the legacy external action.
      event.preventDefault();
      releaseDownload();
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
      const contactMethod = $form.find('[name="contact-method"]:checked').val();
      const details = [
        ['Name', $('#full-name').val()],
        ['Email', $('#email').val()],
        ['Phone', $('#phone').val() || 'Not provided'],
        ['Support', option.title],
        ['Preferred contact', contactMethod],
        ['Supply packages', option.category === 'supplies' ? $('#quantity').val() : 'Not applicable'],
        ['Preferred visit date', $('#visit-date').val() || 'Not specified'],
        ['Preferred contact time', $('#support-time').val() || 'Not specified'],
        ['Understands visitor rules', $('#volunteer-agreement').prop('checked') ? 'Yes' : 'Not acknowledged'],
        ['Message', $('#message').val() || 'None']
      ];
      const disclaimer = 'No data was sent. This is not a booking or adoption confirmation.';
      const nextStep = 'Next step: contact the shelter directly to confirm current needs and arrangements.';
      const summary = ['I Am Alive — personal support plan'].concat(details.map(function (pair) {
        return pair[0] + ': ' + pair[1];
      }), ['', disclaimer, nextStep,
        'Shelter profile: https://www.instagram.com/i_am_alive_shelter/',
        'Location: https://yandex.kz/maps/ru/org/ya_zhivoy/231771024536/']).join('\n');
      keepSuccess = true; $form.trigger('reset'); keepSuccess = false;
      $result.removeClass('alert-info alert-danger').addClass('alert-success').empty();
      element('h3', 'h5', 'Your support plan is ready').appendTo($result);
      // Each value is text, so visitor input is never parsed as HTML.
      const $details = element('dl', 'mb-3').appendTo($result);
      details.forEach(function (pair) {
        element('dt', '', pair[0]).appendTo($details);
        element('dd', 'text-break', pair[1]).appendTo($details);
      });
      element('p', '', disclaimer + ' ' + nextStep).appendTo($result);
      // Blob/URL are browser file APIs, not a second DOM/event implementation.
      if (typeof URL.createObjectURL === 'function') {
        downloadUrl = URL.createObjectURL(new Blob([summary], { type: 'text/plain;charset=utf-8' }));
        element('a', 'btn btn-success mb-2 me-2', 'Download plan (.txt)')
          .attr({ href: downloadUrl, download: 'i-am-alive-support-plan.txt', id: 'download-support-plan' }).appendTo($result);
      } else element('p', '', 'Downloads are unavailable in this browser. You can select and copy the plan above.').appendTo($result);
      element('a', 'btn btn-outline-secondary mb-2', 'View shelter contacts').attr('href', '#contact').appendTo($result);
      $result.removeClass('is-hidden').hide().fadeIn(220, function () { $result.trigger('focus'); });
    });
  });
});
