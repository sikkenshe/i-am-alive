'use strict';

/*
 * Shared site-wide behaviour:
 * - creates a keyboard-accessible Back to Top button using DOM methods;
 * - adds a simple live page status and a random, temporary reference helper.
 * No visitor data is sent or stored.
 */
document.addEventListener('DOMContentLoaded', function () {
  const main = document.querySelector('main');
  if (main === null) {
    return;
  }

  const backToTop = document.createElement('button');
  backToTop.type = 'button';
  backToTop.className = 'btn btn-success position-fixed bottom-0 end-0 m-3 shadow';
  backToTop.textContent = 'Back to top';
  backToTop.setAttribute('aria-label', 'Return to the top of this page');
  backToTop.classList.add('is-hidden');
  document.body.appendChild(backToTop);

  function updateBackToTop() {
    if (window.scrollY > 300) {
      backToTop.classList.remove('is-hidden');
    } else {
      backToTop.classList.add('is-hidden');
    }
  }

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  window.addEventListener('scroll', updateBackToTop);
  updateBackToTop();

  // A non-promissory reference for the current browser session only.
  const reference = 'IA-' + Math.floor(100000 + Math.random() * 900000);
  document.body.dataset.demoReference = reference;
});
