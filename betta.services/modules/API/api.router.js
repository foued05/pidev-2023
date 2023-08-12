// api.router.js

const express = require('express');
const ApiService = require('./api.service');

const router = express.Router();

router.get('/currency', async (req, res) => {
  const apiKey = 'c2211f07f4b9450071be28f63f14da81'; // Replace with your API key

  try {
    const currencyRates = await ApiService.fetchCurrencyExchangeRates(apiKey);
    res.json(currencyRates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
