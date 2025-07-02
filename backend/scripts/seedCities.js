require('dotenv').config();
const mongoose = require('mongoose');
const City = require('../models/City');
const dbConnect = require('../lib/dbConnect');

const locations = [
  { Name: "Auckland", coords: [174.7633, -36.8485], zoom: 10.5 },
  { Name: "Wellington", coords: [174.7772, -41.2865], zoom: 11.5 },
  { Name: "Christchurch", coords: [172.6306, -43.5321], zoom: 11.5 },
  { Name: "Hamilton", coords: [175.2793, -37.7870], zoom: 11.5 },
  { Name: "Tauranga", coords: [176.1676, -37.6861], zoom: 11.5 },
  { Name: "Dunedin", coords: [170.5036, -45.8788], zoom: 11.5 },
  { Name: "Napier", coords: [176.9120, -39.4928], zoom: 11.5 },
  { Name: "Whangarei", coords: [174.3237, -35.7256], zoom: 11.5 },
  { Name: "New Plymouth", coords: [174.0895, -39.0556], zoom: 11.5 },
  { Name: "Palmerston North", coords: [175.6162, -40.3523], zoom: 11.5 },
  { Name: "Rotorua", coords: [176.2497, -38.1368], zoom: 11.5 },
  { Name: "Taupo", coords: [175.6227, -38.6857], zoom: 11.5 },
  { Name: "Invercargill", coords: [168.6626, -46.4132], zoom: 11.5 },
  { Name: "Gisborne", coords: [178.0124, -38.6623], zoom: 11.5 },
  { Name: "Masterton", coords: [175.6580, -40.9585], zoom: 11.5 },
  { Name: "Ashburton", coords: [171.7481, -43.8910], zoom: 11.5 },
  { Name: "Hastings", coords: [176.8650, -39.6398], zoom: 11.5 },
  { Name: "Cromwell", coords: [169.1838, -45.0392], zoom: 11.5 },
  { Name: "Timaru", coords: [171.2502, -44.3960], zoom: 11.5 },
  { Name: "Whakatane", coords: [176.9755, -37.9535], zoom: 11.5 },
  { Name: "Taupo", coords: [175.6227, -38.6857], zoom: 11.5 },
  // Add more based on truck-stop PDF :contentReference[oaicite:2]{index=2}
];

(async () => {
  await dbConnect();
  try {
    await City.deleteMany({});
    const docs = locations.map(loc => ({
      Name: loc.Name,
      location: { coordinates: loc.coords },
      zoom: loc.zoom,
    }));
    await City.insertMany(docs);
    console.log("✅ Cities seeded:", docs.length);
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
})();
