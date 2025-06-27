const mongoose = require("mongoose");

const stationSchema = new mongoose.Schema({
  ID: Number,
  Name: String,
  Address: String,
  Services: [String],
  fuelPrices: {
    "91": Number,
    "95": Number,
    "Diesel": Number,
  },
  Contact: {
    Phone: String,
    Email: String,
  },
  openingHours: {
    Monday: String,
    Tuesday: String,
    Wednesday: String,
    Thursday: String,
    Friday: String,
    Saturday: String,
    Sunday: String,
  },
   location: {
    type: { type: String },
    coordinates: [Number]
  },
});

// 👇 force it to use the exact collection name from Atlas
const Station = mongoose.model("Station", stationSchema, "aucklandStations");

module.exports = Station;
