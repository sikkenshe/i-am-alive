'use strict';

const helpOptions = [
  {
    id: 1,
    title: 'Volunteer',
    category: 'volunteer',
    description: 'Give your time to help animals.',
    effort: 2
  },
  {
    id: 2,
    title: 'Donate Supplies',
    category: 'supplies',
    description: 'Provide food, blankets, and useful items.',
    effort: 1
  },

  {
    id: 3,
    title: 'Support Adoption',
    category: 'adoption',
    description: 'Help animals find loving homes.',
    effort: 3
  },
  {
    id: 4,
    title: 'Share Our Mission',
    category: 'other',
    description: 'Tell others about the shelter.',
    effort: 1
  },
  {
    id: 5,
    title: 'Help with Transport',
    category: 'volunteer',
    description: 'Help animals travel to appointments.',
    effort: 2
  },
  {
    id: 6,
    title: 'Prepare Supplies',
    category: 'supplies',
    description: 'Organize essential items for animals.',
    effort: 2
  }
];


const suppliesSection = document.querySelector('.supplies-section');

if (suppliesSection) {
  const finder = document.createElement('section');

  finder.id = 'help-finder';
  finder.classList.add('container', 'py-4');

  const heading = document.createElement('h2');
  heading.textContent = 'Find Your Way to Help';

  const intro = document.createElement('p');
  intro.textContent =
    'Search, filter, and choose the way you would like to help.';

  finder.append(heading, intro);
  
const controls = document.createElement('div');
controls.classList.add('row', 'g-3', 'mb-4');

const searchInput = document.createElement('input');
searchInput.type = 'search';
searchInput.placeholder = 'Search help options...';
searchInput.setAttribute('aria-label', 'Search help options');
searchInput.classList.add('form-control');

const categoryFilter = document.createElement('select');
categoryFilter.classList.add('form-select');
categoryFilter.setAttribute('aria-label', 'Filter by category');

const categories = [
  { value: 'all', label: 'All categories' },
  { value: 'volunteer', label: 'Volunteer' },
  { value: 'supplies', label: 'Supplies' },
  { value: 'adoption', label: 'Adoption' },
  { value: 'other', label: 'Other' }
];

categories.forEach(function (category) {
  const option = document.createElement('option');
  option.value = category.value;
  option.textContent = category.label;
  categoryFilter.append(option);
});

const sortSelect = document.createElement('select');
sortSelect.classList.add('form-select');
sortSelect.setAttribute('aria-label', 'Sort help options');

const sortOptions = [
  { value: 'default', label: 'Default order' },
  { value: 'easy', label: 'Easiest first' },
  { value: 'hard', label: 'Most effort first' }
];

sortOptions.forEach(function (item) {
  const option = document.createElement('option');
  option.value = item.value;
  option.textContent = item.label;
  sortSelect.append(option);
});

const searchColumn = document.createElement('div');
searchColumn.classList.add('col-12', 'col-md-6');
searchColumn.append(searchInput);

const categoryColumn = document.createElement('div');
categoryColumn.classList.add('col-12', 'col-md-3');
categoryColumn.append(categoryFilter);

const sortColumn = document.createElement('div');
sortColumn.classList.add('col-12', 'col-md-3');
sortColumn.append(sortSelect);

controls.append(searchColumn, categoryColumn, sortColumn);
finder.append(controls);


const buttonContainer = document.createElement('div');
buttonContainer.classList.add('d-flex', 'flex-wrap', 'gap-2', 'mb-4');

const randomButton = document.createElement('button');
randomButton.type = 'button';
randomButton.classList.add('btn', 'btn-success');
randomButton.textContent = '🎲 Random recommendation';

const resetButton = document.createElement('button');
resetButton.type = 'button';
resetButton.classList.add('btn', 'btn-outline-secondary');
resetButton.textContent = 'Reset filters';

buttonContainer.append(randomButton, resetButton);
finder.append(buttonContainer);


const resultsInfo = document.createElement('p');
resultsInfo.setAttribute('aria-live', 'polite');

const resultsContainer = document.createElement('div');
resultsContainer.classList.add('row', 'g-3');

finder.append(resultsInfo, resultsContainer);

function renderHelpOptions(options) {
  resultsContainer.replaceChildren();

  resultsInfo.textContent =
    `Showing ${options.length} of ${helpOptions.length} options`;

  if (options.length === 0) {
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent =
      'No options found. Try changing your search or filters.';
    resultsContainer.append(emptyMessage);
    return;
  }

  options.forEach(function (option) {
    const column = document.createElement('div');
    column.classList.add('col-12', 'col-md-6', 'col-lg-4');

    const card = document.createElement('article');
    card.classList.add('card', 'h-100', 'p-3');

    const title = document.createElement('h3');
    title.classList.add('h5');
    title.textContent = option.title;

    const description = document.createElement('p');
    description.textContent = option.description;

    const effort = document.createElement('p');
    effort.textContent = `Effort level: ${option.effort}/3`;

    const chooseButton = document.createElement('button');
    chooseButton.type = 'button';
    chooseButton.classList.add('btn', 'btn-primary', 'mt-auto');
    chooseButton.textContent = 'Choose this option';

    chooseButton.addEventListener('click', function () {
      const helpType = document.querySelector('#help-type');

      if (helpType) {
        helpType.value = option.category;
        helpType.dispatchEvent(
          new Event('change', { bubbles: true })
        );
        helpType.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    });

    card.append(title, description, effort, chooseButton);
    column.append(card);
    resultsContainer.append(column);
  });
}

function updateHelpOptions() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const selectedCategory = categoryFilter.value;
  const selectedSort = sortSelect.value;

  let filteredOptions = helpOptions.filter(function (option) {
    const matchesSearch =
      option.title.toLowerCase().includes(searchTerm) ||
      option.description.toLowerCase().includes(searchTerm);

    const matchesCategory =
      selectedCategory === 'all' ||
      option.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (selectedSort === 'easy') {
    filteredOptions.sort(function (a, b) {
      return a.effort - b.effort;
    });
  } else if (selectedSort === 'hard') {
    filteredOptions.sort(function (a, b) {
      return b.effort - a.effort;
    });
  }

  renderHelpOptions(filteredOptions);
}


randomButton.addEventListener('click', function () {
  const randomIndex = Math.floor(Math.random() * helpOptions.length);
  const randomOption = helpOptions[randomIndex];

  searchInput.value = '';
  categoryFilter.value = 'all';
  sortSelect.value = 'default';

  updateHelpOptions();

  resultsInfo.textContent =
    `Recommended for you: ${randomOption.title}`;

  const helpType = document.querySelector('#help-type');

  if (helpType) {
    helpType.value = randomOption.category;
  }
});

resetButton.addEventListener('click', function () {
  searchInput.value = '';
  categoryFilter.value = 'all';
  sortSelect.value = 'default';

  updateHelpOptions();
});


searchInput.addEventListener('input', updateHelpOptions);
categoryFilter.addEventListener('change', updateHelpOptions);
sortSelect.addEventListener('change', updateHelpOptions);

updateHelpOptions();


  suppliesSection.after(finder);
}
