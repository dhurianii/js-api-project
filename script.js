async function getCountry(countryName) {
  const input = countryName ||
    document.getElementById('countryInput').value.trim();

  const card = document.getElementById('card');
  const error = document.getElementById('error');
  const loading = document.getElementById('loading');

  card.classList.remove('visible');
  error.style.display = 'none';
  loading.style.display = 'block';

  if (!input) {
    loading.style.display = 'none';
    error.style.display = 'block';
    error.textContent = 'Please type a country name.';
    return;
  }

  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${input}`
    );

    if (!response.ok) throw new Error('Not found');

    const data = await response.json();
    const c = data[0];

    // Extract data
    const name = c.name.common;
    const flag = c.flag;
    const capital = c.capital ? c.capital[0] : 'N/A';
    const population = c.population.toLocaleString('en-IN');
    const region = c.region;
    const area = c.area
      ? c.area.toLocaleString('en-IN') + ' km²'
      : 'N/A';
    const timezone = c.timezones ? c.timezones[0] : 'N/A';

    const currencyCode = Object.keys(c.currencies)[0];
    const currency = c.currencies[currencyCode].name +
      ' (' + (c.currencies[currencyCode].symbol || '') + ')';

    const language = Object.values(c.languages)[0];

    const nativeName = c.name.nativeName
      ? Object.values(c.name.nativeName)[0].common
      : name;

    // Update DOM
    document.getElementById('flag').textContent = flag;
    document.getElementById('name').textContent = name;
    document.getElementById('region').textContent = region;
    document.getElementById('capital').textContent = capital;
    document.getElementById('population').textContent = population;
    document.getElementById('currency').textContent = currency;
    document.getElementById('language').textContent = language;
    document.getElementById('area').textContent = area;
    document.getElementById('timezone').textContent = timezone;
    document.getElementById('native-name').textContent =
      'Native: ' + nativeName;

    loading.style.display = 'none';
    card.classList.add('visible');

    // Scroll to card
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  } catch (err) {
    loading.style.display = 'none';
    error.style.display = 'block';
    error.textContent = 'Country not found. Try again!';
  }
}

// Quick search from chips
function quickSearch(country) {
  document.getElementById('countryInput').value = country;
  getCountry(country);
}

// Enter key support
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('countryInput')
    .addEventListener('keypress', (e) => {
      if (e.key === 'Enter') getCountry();
    });
});