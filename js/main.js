'use strict';

// Shared features use native DOM APIs. They do not depend on jQuery.
(function () {
  function element(tag, classes, text) {
    const node = document.createElement(tag);
    node.className = classes;
    node.textContent = text;
    return node;
  }

  const topButton = element('button', 'btn btn-success position-fixed bottom-0 end-0 m-3 shadow is-hidden', 'Back to top');
  topButton.type = 'button';
  topButton.setAttribute('aria-label', 'Return to the top of this page');
  document.body.append(topButton);
  function updateTop() { topButton.classList.toggle('is-hidden', window.scrollY <= 300); }
  window.addEventListener('scroll', updateTop, { passive: true });
  topButton.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    document.querySelector('header').focus({ preventScroll: true });
  });
  document.querySelector('header').setAttribute('tabindex', '-1');
  updateTop();

  // Earlier commits removed this existing page from three menus. Restore it in code.
  const navigation = document.querySelector('.navbar-nav');
  if (navigation && !navigation.querySelector('a[href="colophon.html"]')) {
    const item = element('li', 'nav-item', '');
    const link = element('a', 'nav-link px-md-3', 'Colophon');
    link.href = 'colophon.html'; item.append(link); navigation.append(item);
  }

  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar .nav-link').forEach(function (link) {
    const active = link.getAttribute('href') === currentPage;
    link.classList.toggle('active', active);
    link.classList.toggle('is-active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });

  const technology = document.querySelector('.technology-section');
  if (technology) {
    technology.querySelectorAll('p')[2].textContent = 'Native JavaScript runs navigation, suggestions and the information catalogue. A separate jQuery file runs the support planner and validation. Bootstrap supports the responsive menu.';
    ['Plain JavaScript', 'jQuery 3.7.1'].forEach(function (name) {
      technology.querySelector('ul').append(element('li', 'col-12 col-sm-6 col-lg-4 border rounded p-3 bg-light', name));
    });
    const paragraphs = document.querySelectorAll('.forms-section p');
    paragraphs[1].textContent = 'The support planner validates fields locally and creates a downloadable plan. Nothing is sent to FormSubmit or the shelter.';
    paragraphs[2].textContent = 'There is no backend or database. Personal details remain in the current page until cleared or closed; a downloaded plan is saved only when the visitor chooses to download it.';
    document.querySelectorAll('.limitations-note li').forEach(function (item) {
      if (item.textContent.includes('No custom JavaScript')) item.textContent = 'Plain JavaScript and jQuery features are kept in separate files.';
      if (item.textContent.includes('email-forwarding')) item.textContent = 'Plans are prepared locally; real visits and adoption must be arranged directly with the shelter.';
    });
    const sourceList = document.querySelector('.image-source-section ol');
    sourceList.replaceChildren();
    ['dog-volunteer.jpeg', 'dog-walk.jpeg', 'shelter-dog.jpeg'].forEach(function (filename) {
      const item = document.createElement('li');
      item.append(document.createTextNode(filename + ' — published photograph from an EGI shelter visit, 26 February 2023. '));
      const link = element('a', '', 'Original publication');
      link.href = 'https://egi.edu.kz/ru_ru/2023/02/26/poseshhenie-priyuta-dlya-zhivotnyh/';
      link.target = '_blank'; link.rel = 'noopener noreferrer';
      item.append(link); sourceList.append(item);
    });
    document.querySelector('.image-source-section p:last-child').textContent = 'These are attributed published photographs, not photographs taken by the student. No AI-generated or stock photographs are loaded by the current scripts.';
  }

  // A blocked Bootstrap CDN must not leave a dead navigation toggle.
  const menuToggle = document.querySelector('#navbar-toggle');
  menuToggle.addEventListener('click', function () {
    if (window.bootstrap && window.bootstrap.Collapse) return;
    const menu = document.querySelector('#mainNavbar');
    const opened = menu.classList.toggle('show');
    menuToggle.setAttribute('aria-expanded', String(opened));
  });
})();

// Only help.html needs jQuery. Existing HTML script links remain untouched.
window.iamAliveReady = new Promise(function (resolve) {
  const form = document.querySelector('#support-request-form');
  if (!form) { resolve(null); return; }
  const submit = form.querySelector('[type="submit"]');
  submit.disabled = true;
  // Neutralise the old external action immediately, including while the CDN loads.
  form.removeAttribute('action');
  form.setAttribute('method', 'get');
  const preventExternalSubmit = function (event) { event.preventDefault(); };
  form.addEventListener('submit', preventExternalSubmit);
  const intro = document.querySelector('#support-form > p');
  intro.textContent = 'Prepare a personal support plan on this page. No data is sent to the shelter. Loading planner...';
  document.querySelector('#form-result').textContent = 'Loading the local planner. Contact the shelter directly for real arrangements.';
  let finished = false;
  let timeout;
  function finish(loaded) {
    if (finished) return;
    finished = true;
    window.clearTimeout(timeout);
    if (!loaded) {
      intro.textContent = 'The local planner could not load. Check your connection and reload, or use the contact information below.';
      document.querySelector('#form-result').textContent = 'Planner unavailable. No data has been sent. Contact the shelter directly.';
      resolve(null);
      return;
    }
    // The feature handler owns validation; this fallback only guards CDN loading.
    form.removeEventListener('submit', preventExternalSubmit);
    resolve(window.jQuery);
  }
  const script = document.createElement('script');
  script.src = 'https://code.jquery.com/jquery-3.7.1.min.js';
  script.integrity = 'sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=';
  script.crossOrigin = 'anonymous';
  script.addEventListener('load', function () { finish(Boolean(window.jQuery)); });
  script.addEventListener('error', function () { finish(false); });
  timeout = window.setTimeout(function () { finish(false); }, 12000);
  document.head.append(script);
});
