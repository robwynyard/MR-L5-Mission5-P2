require('dotenv').config();

const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const stationsRouter = require('./routes/aucklandStations');
const MONGO_URI = process.env.MONGO_URI;


const app = express();
app.use(cors());
app.use(express.json());




const stationRoutes = require("./routes/stations");
app.use("/api/stations", stationRoutes);


// -------------------------- Rob - DB Setup for Coordinates ---------------------------- //



// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Use the stations routes
app.use('/api/aucklandStations', stationsRouter);


// -------------------------- Basic Server Setup ---------------------------- //
const PORT = process.env.PORT || 3000; // default to 3000 if no env var set

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;