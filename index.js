const api_endpoint = 'https://restcountries.eu/rest/v2/all';

// Check if browser support template elements
if ('content' in document.createElement('template')) {
  console.log('HTML template supported');
} else {
  throw new Error('HTML template element is not supported');
}

// Helpers
const show = selector => {
  const element = document.querySelector(selector);
  element.removeAttribute('hidden');
}
const hide = selector => {
  const element = document.querySelector(selector);
  element.setAttribute('hidden', '');
}

// Render list items
const renderListItems = list => list.map(value => {
    const node = document.createElement('li');
    node.textContent = value;
    return node;
});

const renderCurrencies = items => {
  const strings = items.map(({ code, symbol }) => `${code} - ${symbol}`);
  return renderListItems(strings);
}

const renderTranslations = data => {
  const strings = Object.entries(data).map(([lang, translation]) => `${lang}: ${translation}`)
  return renderListItems(strings);
}

// Render country card
const renderCard = (template, props) => {
  const {
    name,
    flag,
    region,
    capital,
    population,
    timezones,
    currencies,
    translations
  } = props;
  
  // Render list items
  const timezoneNodes = renderListItems(timezones);
  const currencyNodes = renderCurrencies(currencies);
  const translationNodes = renderTranslations(translations);
  
  // Clone node from template
  const node = template.content.cloneNode(true);
  
  // Fill card content
  node.querySelector('.card img').setAttribute('src', flag);
  node.querySelector('.card-title').textContent = name;
  node.querySelector('.card-subtitle').textContent = region;
  node.querySelector('.card-slot-capital').textContent = capital;
  node.querySelector('.card-slot-population').textContent = population;
  node.querySelector('.card-slot-timezone').append(...timezoneNodes);
  node.querySelector('.card-slot-currencies').append(...currencyNodes);
  node.querySelector('.card-slot-translations').append(...translationNodes);
  return node;
}

// Render array of cards
const renderCards = (data, rootNode) => {
  const template = document.querySelector('#countryCard');
  const nodes = data.map(item => renderCard(template, item));
  rootNode.append(...nodes);
}

document.addEventListener("DOMContentLoaded", () => {
  const req = new XMLHttpRequest();

  // Handle response
  const reqListener = (e) => {
    // Parse response
    const json = JSON.parse(req.responseText);

    // Fill content
    renderCards(json, document.querySelector('#countries'));

    // Hide Spinner
    hide('#spinner')

    // Show content
    show('#countries')
  }

  // Make request
  req.addEventListener("load", reqListener);
  req.open("GET", api_endpoint);
  req.send();
});