const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
  ID: Number,
  Name: String,
  Address: String,
  location: {
    type: { type: String },
    coordinates: [Number]
  },
  Services: [String],
  fuelPrices: Object,
  Contact: Object,
  openingHours: Object
}, { collection: 'aucklandStations' });

module.exports = mongoose.model('Station', stationSchema);
