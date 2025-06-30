import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import StationList from "../components/StationList";
import StationSearchMap from "../components/StationSearchMap";

export default function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userCoords, setUserCoords] = useState(null); // for distance calc, not map centering
  const [selectedStation, setSelectedStation] = useState(null);

  const query = new URLSearchParams(location.search);
  const searchLocation = query.get("location") || "";
  const rawFuel = query.get("fuel") || "";
  const fuelType =
    rawFuel === "Z91 Unleaded"
      ? "91"
      : rawFuel === "ZX Premium"
      ? "95"
      : rawFuel === "Z Diesel"
      ? "Diesel"
      : rawFuel; // fallback

  // Get user location once on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          setUserCoords(null);
        }
      );
    } else {
      setUserCoords(null);
    }
  }, []);

  // Fetch stations on query or userCoords change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchLocation) params.append("location", searchLocation);
    if (fuelType) params.append("fuel", fuelType);
    if (userCoords) {
      params.append("lat", userCoords.lat);
      params.append("lng", userCoords.lng);
    }

    setLoading(true);
    fetch(`http://localhost:3000/api/stations?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setStations(data || []);
        setLoading(false);
      })
      .catch(() => {
        setStations([]);
        setLoading(false);
      });
  }, [searchLocation, fuelType, userCoords]);

  // When stations update, set selectedStation to first in list or clear it
  useEffect(() => {
    if (stations.length > 0) {
      setSelectedStation(stations[0]);
    } else {
      setSelectedStation(null);
    }
  }, [stations]);

  // Handle station selection from StationSearchMap/Search
  const handleStationSelect = (station, fuel) => {
    setSelectedStation(station);

    // Update URL query params with new search
    const query = new URLSearchParams({
      location: station.Name,
      fuel: fuelType, // or use `fuel` param if you want to track fuel change too
    }).toString();

    navigate(`/results?${query}`);
  };

  return (
    <main style={{ padding: "2rem" }}>
      <Header />

      {loading && <p>Loading station results...</p>}

      {!loading && stations.length === 0 && (
        <>
          <StationSearchMap stations={stations} onStationSelectExternal={handleStationSelect} />
          <p>
            No stations found for "{searchLocation}" with fuel type "{fuelType}".
          </p>
        </>
      )}

      {!loading && stations.length > 0 && (
        <>
          <StationSearchMap
            stations={stations}
            selectedStation={selectedStation}
            onStationSelectExternal={handleStationSelect}
          />
          <StationList stations={stations} />
        </>
      )}

      <Footer />
    </main>
  );
}
