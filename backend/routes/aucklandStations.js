const express = require('express');
const router = express.Router();
const Station = require('../models/aucklandStations');

// GET all stations
router.get('/', async (req, res) => {
  try {
    const stations = await Station.find({});
    res.json(stations);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stations' });
  }
});

// GET single station by ID
router.get('/:id', async (req, res) => {
  try {
    const station = await Station.findOne({ ID: Number(req.params.id) });
    if (!station) return res.status(404).json({ error: 'Not found' });
    res.json(station);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch station' });
  }
});

module.exports = router;
