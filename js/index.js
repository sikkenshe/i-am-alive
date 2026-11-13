'use strict';

// Suggestions describe visitor actions, not confirmed appointments or services.
(function () {
  const suggestions = [
    { title: 'Donate useful supplies', description: 'Check which food or household supplies are currently needed.', steps: ['Review the published support information.', 'Ask the shelter which items it needs now.', 'Prepare your support plan.'] },
    { title: 'Ask about dog walks', description: 'Confirm whether you can help with walking dogs.', steps: ['Consider when you could visit.', 'Ask about availability and safety rules.', 'Prepare your questions before contacting the shelter.'] },
    { title: 'Consider responsible adoption', description: 'Think about lifelong care before choosing an animal.', steps: ['Review your time, space and care budget.', 'Ask the shelter about suitable animals.', 'Arrange any meeting directly with the shelter.'] }
  ];
  const section = document.querySelector('.help-options');
  if (!section) return;
  function element(tag, classes, text) {
    const node = document.createElement(tag);
    node.className = classes; node.textContent = text;
    return node;
  }
  const panel = element('div', 'border rounded-3 p-3 mt-3', '');
  const title = element('h3', 'h5 fw-bold', '');
  const description = element('p', 'mb-3', '');
  description.setAttribute('aria-live', 'polite');
  const steps = document.createElement('ol');
  const link = element('a', 'btn btn-success mb-2', 'Prepare a support plan');
  link.href = 'help.html#support-form';
  const next = element('button', 'btn btn-outline-secondary ms-2 mb-2', 'Show another suggestion');
  next.type = 'button';
  let current = 0;
  function renderSuggestion(index) {
    const suggestion = suggestions[index];
    title.textContent = suggestion.title; description.textContent = suggestion.description;
    steps.replaceChildren();
    suggestion.steps.forEach(function (step) { steps.append(element('li', '', step)); });
  }
  next.addEventListener('click', function () { current = (current + 1) % suggestions.length; renderSuggestion(current); });
  panel.append(title, description, steps, link, next); section.append(panel);
  renderSuggestion(current);
})();
