// server.js

require('dotenv').config();

const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const stationsRouter = require('./routes/aucklandStations');
const MONGO_URI = process.env.MONGO_URI;


const app = express();
app.use(cors());
app.use(express.json());




// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Routes
const stationRoutes = require("./routes/stations");
app.use("/api/stations", stationRoutes);

// Cities Route (Fetches The Cities in NZ with Z Stations)

const citiesRouter = require('./routes/cities');
app.use('/api/cities', citiesRouter);




// Use the stations routes
app.use('/api/aucklandStations', stationsRouter);


// -------------------------- Basic Server Setup ---------------------------- //
const PORT = process.env.PORT || 3000; // default to 3000 if no env var set

// Connect to MongoDB Atlas and then start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
  });

module.exports = app;
