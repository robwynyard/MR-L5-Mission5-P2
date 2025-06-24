const express = require("express");
const router = express.Router();
const stations = require("../mock/stations");
const haversine = require("../utils/haversine");

router.get("/", (req, res) => {
  const { fuel, open, lat, lng } = req.query;

  let results = [...stations];

  // Filter by fuel type
  if (fuel) {
    results = results.filter((station) =>
      station.fuelPrices.hasOwnProperty(fuel)
    );
  }

  // Add distance if coords provided
  if (lat && lng) {
    results = results.map((station) => ({
      ...station,
      distance: haversine(
        parseFloat(lat),
        parseFloat(lng),
        station.location.lat,
        station.location.lng
      )
    }));

    // Sort by distance
    results.sort((a, b) => a.distance - b.distance);
  }

  // Optional: basic open filter (mocked always true for now)
  if (open === "true") {
    results = results.filter((station) => true); // replace with real logic later
    results = results.map((station) => ({ ...station, isOpen: true }));
  } else {
    results = results.map((station) => ({ ...station, isOpen: false }));
  }

  return res.json(results);
});

module.exports = router;
