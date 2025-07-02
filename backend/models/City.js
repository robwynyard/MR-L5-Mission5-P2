const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
  Name: String,
  location: {
    coordinates: [Number],
  },
  zoom: Number,
});

module.exports = mongoose.models.City || mongoose.model('City', CitySchema);
