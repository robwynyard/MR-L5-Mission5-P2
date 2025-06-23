const mockStations = [
  {
    id: "z123",
    name: "Z Ponsonby",
    address: "123 K Road",
    suburb: "Ponsonby",
    phone: "09 123 4567",
    location: { lat: -36.859, lng: 174.755 },
    directionsUrl: "https://www.google.com/maps?q=Z+Ponsonby",
    servicesOffered: ["Restrooms", "Fuel", "ATM"],
    fuelPrices: { "91": 2.74, "95": 2.89, Diesel: 2.35 },
    hours: {
      monday: "6am - 10pm",
      tuesday: "6am - 10pm",
      wednesday: "6am - 10pm",
      thursday: "6am - 10pm",
      friday: "6am - 10pm",
      saturday: "7am - 9pm",
      sunday: "7am - 9pm"
    }
  },
  {
    id: "z456",
    name: "Z Albany",
    address: "45 Main Rd",
    suburb: "Albany",
    phone: "09 456 7890",
    location: { lat: -36.726, lng: 174.709 },
    directionsUrl: "https://www.google.com/maps?q=Z+Albany",
    servicesOffered: ["Fuel", "Coffee"],
    fuelPrices: { "91": 2.65, "95": 2.85 },
    hours: {
      monday: "24 hours",
      tuesday: "24 hours",
      wednesday: "24 hours",
      thursday: "24 hours",
      friday: "24 hours",
      saturday: "24 hours",
      sunday: "24 hours"
    }
  }
];

module.exports = mockStations;
