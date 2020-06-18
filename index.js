const api_endpoint = 'https://restcountries.eu/rest/v2/all';

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
    try {
      // Parse response
      const json = JSON.parse(req.responseText);
      console.log(json);

      // Fill content

      // Hide Spinner
      hide('#spinner')

      // Show content
      show('#countries')
    } catch (error) {
      console.error('Wrong response');
    }
  }

  // Make request
  req.addEventListener("load", reqListener);
  req.open("GET", api_endpoint);
  req.send();
});