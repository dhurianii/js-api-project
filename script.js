async function getCountry() {

  // Step 1 — Get what user typed
  const input = document.getElementById('countryInput').value.trim();

  // Step 2 — Get all the elements we'll update
  const card = document.getElementById('card');
  const error = document.getElementById('error');
  const loading = document.getElementById('loading');

  // Step 3 — Hide old results, show loading
  card.classList.remove('visible');
  error.style.display = 'none';
  loading.style.display = 'block';

  // Step 4 — If input is empty, stop
  if (!input) {
    loading.style.display = 'none';
    error.style.display = 'block';
    error.textContent = 'Please type a country name.';
    return;
  }

  // Step 5 — Fetch data from live API
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${input}`
    );

    // Step 6 — If country not found
    if (!response.ok) {
      throw new Error('Country not found');
    }

    // Step 7 — Convert response to JSON
    const data = await response.json();
    const country = data[0];

    // Step 8 — Extract the data we need
    const name = country.name.common;
    const flag = country.flag;
    const capital = country.capital ? country.capital[0] : 'N/A';
    const population = country.population.toLocaleString('en-IN');
    const region = country.region;

    // Currency
    const currencyCode = Object.keys(country.currencies)[0];
    const currency = country.currencies[currencyCode].name;

    // Language
    const language = Object.values(country.languages)[0];

    // Step 9 — Put data into the page
    document.getElementById('flag').textContent = flag;
    document.getElementById('name').textContent = name;
    document.getElementById('capital').textContent = capital;
    document.getElementById('population').textContent = population;
    document.getElementById('region').textContent = region;
    document.getElementById('currency').textContent = currency;
    document.getElementById('language').textContent = language;

    // Step 10 — Show the card, hide loading
    loading.style.display = 'none';
    card.classList.add('visible');

  } catch (err) {
    // If anything goes wrong
    loading.style.display = 'none';
    error.style.display = 'block';
    error.textContent = 'Country not found. Try again.';
  }
}

// Allow pressing Enter to search
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('countryInput')
    .addEventListener('keypress', (e) => {
      if (e.key === 'Enter') getCountry();
    });
});