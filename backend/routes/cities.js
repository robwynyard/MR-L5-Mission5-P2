// backend/routes/cities.js
const express = require('express');
const router = express.Router();
const City = require('../models/City');

router.get('/', async (req, res) => {
  try {
    const cities = await City.find({});
    res.json(cities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cities' });
  }
});

module.exports = router;
