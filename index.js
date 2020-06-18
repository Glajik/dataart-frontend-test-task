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

document.addEventListener("DOMContentLoaded", () => {
  const req = new XMLHttpRequest();

  // Handle response
  const reqListener = (e) => {
    // Parse response
    const json = JSON.parse(req.responseText);
    console.log(json);

    // Fill content


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