// api.service.js

const ApiModel = require('./api.model');

async function fetchCurrencyExchangeRates(apiKey) {
  try {
    const currencyRates = await ApiModel.getCurrencyExchangeRates(apiKey);
    return currencyRates;
  } catch (error) {
    throw new Error('Failed to fetch currency exchange rates');
  }
}

module.exports = {
  fetchCurrencyExchangeRates,
};
