const Station = require("../models/Station");

export const getAllStations = async (req, res) => {
  try {
    const stations = await Station.find();
    res.status(200).json(stations);
  } catch (err) {
    console.error("Error fetching stations:", err);
    res.status(500).json({ error: "Failed to fetch stations" });
  }
};
