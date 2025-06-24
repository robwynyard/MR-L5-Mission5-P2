const express = require("express");
const app = express();

const stationRoutes = require("./routes/stations");
app.use("/api/stations", stationRoutes);

const PORT = process.env.PORT || 3000; // default to 3000 if no env var set

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;