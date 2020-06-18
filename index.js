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

// Render country card
const renderCard = (template, props) => {
  const { name, region, population, flag } = props;
  const node = template.content.cloneNode(true);
  node.querySelector('.card img').setAttribute('src', flag);
  node.querySelector('.card-title').textContent = name;
  node.querySelector('.card-subtitle').textContent = region;
  node.querySelector('.card-text').textContent = `Population: ${population}`;
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
    console.log(json);

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