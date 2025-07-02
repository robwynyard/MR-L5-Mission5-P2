const express = require("express");
const Station = require("../models/Station");
const haversine = require("../utils/haversine");

const router = express.Router();

router.get("/", async (req, res) => {
  const { fuel, open, lat, lng, location } = req.query;

  try {
    let results = await Station.find();
    results = results.map((station) => station.toObject());

    if (fuel) {
      results = results.filter((station) =>
        station.fuelPrices.hasOwnProperty(fuel)
      );
    }

    // Filter by location (name or address)
    if (location) {
      const lowerLocation = location.toLowerCase();
      results = results.filter(
        (station) =>
          (station.Name &&
            station.Name.toLowerCase().includes(lowerLocation)) ||
          (station.Address &&
            station.Address.toLowerCase().includes(lowerLocation))
      );
    }

    if (lat && lng) {
      const userLat = parseFloat(lat);
      const userLng = parseFloat(lng);

      results = results.map((station) => {
        const distance = haversine(
          userLat,
          userLng,
          station.location?.coordinates[1] ?? 0, // lat
          station.location?.coordinates[0] ?? 0 // lng
        );
        return { ...station, distance };
      });

      results.sort((a, b) => a.distance - b.distance);
    }

    if (open === "true") {
      results = results.map((station) => ({ ...station, isOpen: true }));
    } else {
      results = results.map((station) => ({ ...station, isOpen: false }));
    }

    res.json(results);
  } catch (err) {
    console.error("Failed to fetch stations:", err);
    res.status(500).json({ error: "Failed to fetch stations" });
  }
});

module.exports = router;
