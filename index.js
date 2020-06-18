const api_endpoint = 'https://restcountries.eu/rest/v2/all';

document.addEventListener("DOMContentLoaded", () => {
  // Make request

  // Fill content

  // Hide Spinner
  const spinnerEl = document.querySelector('#spinner');
  spinnerEl.setAttribute('hidden', '');

  // Show content
  const countriesEl = document.querySelector('#countries');
  countriesEl.removeAttribute('hidden');
})