'use strict';

(function () {
  // Published help topics, NOT invented individual animal profiles.
  const source = 'https://sxodim.com/astana/article/4-priyuta-dlya-zhivotnyh-v-astane';
  const topics = [
    { id: 'walks', title: 'Dog walking', category: 'volunteer', description: 'Dog walking is a published way to help.', question: 'Are volunteer dog walks currently available, and what rules should I follow?' },
    { id: 'food', title: 'Food supplies', category: 'supplies', description: 'Published needs include animal food, grains and meat products.', question: 'Which food and quantities do you currently accept?' },
    { id: 'textiles', title: 'Blankets and towels', category: 'supplies', description: 'Blankets and towels appear in the published support list.', question: 'Do you currently accept blankets or towels, and in what condition?' },
    { id: 'medical', title: 'Medical supplies', category: 'supplies', description: 'Medical supplies are mentioned; confirm exact items before buying.', question: 'Which medical supplies, if any, should I bring?' },
    { id: 'household', title: 'Household supplies', category: 'supplies', description: 'Household items are another published form of support.', question: 'Which household supplies are currently needed?' },
    { id: 'adoption', title: 'Responsible adoption', category: 'adoption', description: 'Visitors can ask about meeting animals and responsible adoption.', question: 'What should I prepare before meeting a suitable animal?' }
  ];
  const section = document.querySelector('.animal-list');
  if (!section) return;
  const row = section.querySelector('.row');
  const heading = section.querySelector('h2');
  heading.textContent = 'Animal care and adoption information';
  function element(tag, classes, text) {
    const node = document.createElement(tag);
    node.className = classes; node.textContent = text || '';
    return node;
  }
  // Both helpers take parameters, return values and are reused in separate flows.
  function normalize(value) { return value.trim().toLowerCase(); }
  function findTopic(id) { return topics.find(function (topic) { return topic.id === id; }); }
  const controls = element('div', 'row g-3 mb-3');
  heading.after(controls);
  function field(id, label, choices) {
    const wrapper = element('div', 'col-12 col-md-6');
    const caption = element('label', 'form-label', label); caption.htmlFor = id;
    const input = element(choices ? 'select' : 'input', choices ? 'form-select' : 'form-control');
    input.id = id;
    if (choices) choices.forEach(function (choice) {
      const option = element('option', '', choice[1]); option.value = choice[0]; input.append(option);
    });
    else { input.type = 'search'; input.placeholder = 'Search care and support topics'; }
    wrapper.append(caption, input); controls.append(wrapper); return input;
  }
  const search = field('animal-search', 'Search information');
  const category = field('animal-category', 'Topic', [['all', 'All topics'], ['volunteer', 'Volunteering'], ['supplies', 'Supplies'], ['adoption', 'Adoption']]);
  const count = element('p', 'small text-muted'); count.id = 'animal-result-count'; count.setAttribute('aria-live', 'polite');
  const reset = element('button', 'btn btn-outline-secondary mb-3', 'Reset filters'); reset.type = 'button';
  const empty = element('p', 'alert alert-info is-hidden', 'No topics match. Change your search or reset filters.'); empty.setAttribute('role', 'status');
  const note = element('p', 'small text-muted', 'Published information, not live animal listings. Confirm current needs and availability directly. ');
  const sourceLink = element('a', '', 'Read the source'); sourceLink.href = source; sourceLink.target = '_blank'; sourceLink.rel = 'noopener noreferrer'; note.append(sourceLink);
  controls.after(count, reset, empty, note);

  const shortlist = new Set();
  const planner = element('div', 'border rounded-3 p-3 mt-3');
  planner.append(element('h3', 'h5', 'Questions to ask the shelter'));
  const selectedCount = element('p', 'small text-muted'); selectedCount.id = 'question-count'; selectedCount.setAttribute('aria-live', 'polite');
  const questions = element('ul', 'mb-3'); questions.id = 'shelter-questions';
  const clear = element('button', 'btn btn-outline-secondary mb-2 me-2', 'Clear questions'); clear.type = 'button'; clear.id = 'clear-questions';
  const contact = element('a', 'btn btn-success mb-2', 'View shelter contacts'); contact.href = '#contact';
  planner.append(selectedCount, questions, clear, contact); section.append(planner);

  function renderQuestions() {
    questions.replaceChildren();
    shortlist.forEach(function (id) {
      const topic = findTopic(id);
      const item = element('li', 'mb-2', topic.question + ' ');
      const remove = element('button', 'btn btn-outline-secondary btn-sm', 'Remove');
      remove.type = 'button'; remove.dataset.remove = id; remove.setAttribute('aria-label', 'Remove question about ' + topic.title);
      item.append(remove); questions.append(item);
    });
    selectedCount.textContent = shortlist.size ? shortlist.size + ' question(s) ready. Use the contacts below to ask them.' : 'No questions selected. Add topics above to prepare your conversation.';
    clear.disabled = shortlist.size === 0;
  }
  function renderTopics() {
    const phrase = normalize(search.value);
    const visible = topics.filter(function (topic) {
      return normalize(topic.title + ' ' + topic.description).includes(phrase) && (category.value === 'all' || topic.category === category.value);
    });
    row.replaceChildren();
    visible.forEach(function (topic) {
      const column = element('div', 'col-12 col-md-6 col-lg-4');
      const card = element('article', 'card h-100 shadow-sm');
      card.classList.toggle('is-selected', shortlist.has(topic.id));
      const body = element('div', 'card-body d-flex flex-column');
      const add = element('button', 'btn btn-outline-success mt-auto', shortlist.has(topic.id) ? 'Question added' : 'Add a question');
      add.type = 'button'; add.dataset.add = topic.id; add.disabled = shortlist.has(topic.id);
      body.append(element('h3', 'card-title h5 fw-semibold', topic.title), element('p', 'mb-3', topic.description), add);
      card.append(body); column.append(card); row.append(column);
    });
    count.textContent = visible.length + ' of ' + topics.length + ' topics shown.';
    empty.classList.toggle('is-hidden', visible.length !== 0);
  }
  // Stable parents catch bubbled clicks even after cards/list items are rebuilt.
  row.addEventListener('click', function (event) {
    const button = event.target.closest('button[data-add]');
    if (!button || !row.contains(button) || !findTopic(button.dataset.add)) return;
    shortlist.add(button.dataset.add); renderQuestions(); renderTopics();
  });
  questions.addEventListener('click', function (event) {
    const button = event.target.closest('button[data-remove]');
    if (!button || !questions.contains(button) || !findTopic(button.dataset.remove)) return;
    shortlist.delete(button.dataset.remove); renderQuestions(); renderTopics();
  });
  search.addEventListener('input', renderTopics); category.addEventListener('change', renderTopics);
  reset.addEventListener('click', function () { search.value = ''; category.value = 'all'; renderTopics(); search.focus(); });
  clear.addEventListener('click', function () { shortlist.clear(); renderQuestions(); renderTopics(); });
  renderQuestions(); renderTopics();
})();
