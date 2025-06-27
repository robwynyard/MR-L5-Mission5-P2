const express = require("express");
const Station = require("../models/Station");
const haversine = require("../utils/haversine");

const router = express.Router();

router.get("/", async (req, res) => {
  const { fuel, open, lat, lng } = req.query;

  try {
    // Fetch all stations from Atlas as Mongoose docs
    let results = await Station.find();

    // Convert Mongoose docs to plain JS objects for easy manipulation
    results = results.map(station => station.toObject());

    // Filter by fuel type if specified
    if (fuel) {
      results = results.filter(station => station.fuelPrices.hasOwnProperty(fuel));
    }

    // Calculate distance if lat/lng provided
    if (lat && lng) {
      const userLat = parseFloat(lat);
      const userLng = parseFloat(lng);

      results = results.map(station => {
        const distance = haversine(
          userLat,
          userLng,
          station.location?.lat ?? 0,
          station.location?.lng ?? 0
        );
        return { ...station, distance };
      });

      // Sort by distance ascending
      results.sort((a, b) => a.distance - b.distance);
    }

    // Filter by open status (mocked)
    if (open === "true") {
      results = results.map(station => ({ ...station, isOpen: true }));
    } else {
      results = results.map(station => ({ ...station, isOpen: false }));
    }

    res.json(results);
  } catch (err) {
    console.error("Failed to fetch stations:", err);
    res.status(500).json({ error: "Failed to fetch stations" });
  }
});

module.exports = router;