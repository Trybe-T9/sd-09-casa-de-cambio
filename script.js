const handleRates = (ratesData) => {
  const currencyList = document.querySelector('#currency-list');

  const entries = Object.entries(ratesData.rates);
  
  entries.forEach((array) => {
    const [ currency, rate ] = array;

    const formattedRate = Math.round(rate * 100) / 100;
    
    const li = document.createElement('li');
    li.innerHTML = `<strong>${currency}:</strong> ${formattedRate}`

    currencyList.appendChild(li);
  });
}

const fetchCurrency = (currency) => {
  const endpoint = `https://api.ratesapi.io/api/latest?base=${currency}`;
  
  fetch(endpoint)
    .then((response) => response.json())
    .then((object) => { 
      if (object.error) {
        throw new Error(object.error);
      }

      handleRates(object);
    })
    .catch((error) => {
      window.alert(error);
    });
}

const fetchCurrencyAsyncAwait = async (currency) => {
  // SE eu vou usar await dentro de uma função, então
  // a assinatura da função TEM QUE TER a palavra async

  const endpoint = `https://api.ratesapi.io/api/latest?base=${currency}`;

  try {
    const response = await fetch(endpoint);
    const object = await response.json();

    if (object.error) {
      throw new Error(object.error);
    }

    handleRates(object);
  } catch (error) {
    window.alert(error);
  }
}

const hendleBTC = (object) => {
  const btcRates = Object.values(object.bpi);
  btcRates.forEach(({ code, rate_float }) => {
    const ul = document.querySelector('#currency-list');
    const li = document.createElement('li');
    const rateFormated = Math.round(rate_float * 100) / 100;
    li.innerHTML = `<strong>${code}:</strong> ${rateFormated}`;
    ul.appendChild(li);
  });
}

const fetchBTCAsyncAwait = async () => {
  const linkBTC = `https://api.coindesk.com/v1/bpi/currentprice.json`;

  try {
    const promise = await fetch(linkBTC);
    const object = await promise.json();
    hendleBTC(object);
  } catch (error) {
    alert(error);
  }
}

const clearList = () => {
  const currencyList = document.querySelector('#currency-list');
  currencyList.innerHTML = '';
}

const handleSearchEvent = () => {
  const searchInput = document.querySelector('#currency-input');
  const currency = searchInput.value.toUpperCase();
  
  clearList();

  if (currency === 'BTC') fetchBTCAsyncAwait();
  else fetchCurrencyAsyncAwait(currency);
}

const setupEvents = () => {
  const searchButton = document.querySelector('#search-button');
  searchButton.addEventListener('click', handleSearchEvent);
}

window.onload = () => {
  setupEvents();
}
