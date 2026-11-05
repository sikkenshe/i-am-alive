'use strict';

/* Bootstrap only: existing HTML already loads main.js on all four pages.
 * jQuery 3.7.1 FULL build is pinned because this assignment uses its effects.
 * Load the CDN library first; page scripts await the same promise. No HTML edits.
 * Native DOM is confined to this loader, before jQuery exists.
 */
window.iamAliveReady = new Promise(function (resolve) {
  const script = document.createElement('script');
  script.src = 'https://code.jquery.com/jquery-3.7.1.min.js';
  script.integrity = 'sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=';
  script.crossOrigin = 'anonymous';
  script.onload = function () { resolve(window.jQuery); };
  script.onerror = function () {
    const warning = document.createElement('p');
    warning.className = 'alert alert-danger';
    warning.textContent = 'Interactive features could not load. Check your connection and reload. Contact the shelter directly for support.';
    warning.setAttribute('role', 'alert');
    document.querySelector('main').prepend(warning);
    // Block the external demo-form action even if the CDN is unavailable.
    const form = document.querySelector('#support-request-form');
    if (form) {
      form.querySelector('[type="submit"]').disabled = true;
      form.onsubmit = function (event) { event.preventDefault(); };
    }
    resolve(null);
  };
  document.head.appendChild(script);
});

window.iamAliveReady.then(function ($) {
  if (!$) return;
  // ready waits until the DOM can be queried, even if the CDN loads very quickly.
  $(function () {
    const $main = $('main'); // element selector
    if (!$main.length) return;

    // Rewrite 1: $(), .on() and .toggleClass() replace createElement,
    // addEventListener and classList. The state update is shorter and clearer.
    const $top = $('<button>').attr({ type: 'button', 'aria-label': 'Return to the top of this page' })
      .addClass('btn btn-success position-fixed bottom-0 end-0 m-3 shadow is-hidden')
      .text('Back to top').appendTo('body');
    function updateTop() { $top.toggleClass('is-hidden', $(window).scrollTop() <= 300); }
    $(window).on('scroll', updateTop);
    $top.on('click', function () { $('html, body').stop(true).animate({ scrollTop: 0 }, 250); });
    updateTop();

    // Keep existing project notes consistent with the local form behaviour.
    $('.technology-section p').last().text('External JavaScript uses jQuery for project interactions. Bootstrap supports the responsive navigation. No jQuery plugins or downloaded themes are used.');
    $('.limitations-note li').filter(function () { return $(this).text().includes('No custom JavaScript'); })
      .text('Project interactions use jQuery 3.7.1; Bootstrap handles its navigation component.');
    $('.forms-section p').last().text('This local demonstration has no backend or database. Browser checks must be repeated on the server if real submission is added.');
    $('.forms-section p').eq(1).text('The support form validates a demonstration request locally. No data is sent to FormSubmit or stored.');
    $('.limitations-note li').filter(function () { return $(this).text().includes('email-forwarding'); })
      .text('The support form is a local demonstration without a backend or database.');
    if ($('.technology-section').length) {
      $('<li>').addClass('col-12 col-sm-6 col-lg-4 border rounded p-3 bg-light')
        .text('jQuery 3.7.1').appendTo($('.technology-section ul'));
    }
  });
});
