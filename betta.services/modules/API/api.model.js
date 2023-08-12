// api.model.js

const axios = require('axios');

async function getCurrencyExchangeRates(apiKey) {
  const apiUrl = 'http://api.exchangeratesapi.io/v1/latest'; // API endpoint URL

  try {
    const response = await axios.get(apiUrl, {
      params: {
        access_key: apiKey,
      },
    });

    return response.data.rates;
  } catch (error) {
    throw new Error('Error fetching currency exchange rates');
  }
}

module.exports = {
  getCurrencyExchangeRates,
};
