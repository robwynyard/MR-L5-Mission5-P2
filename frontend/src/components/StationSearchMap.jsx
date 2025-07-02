import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Search from "./Search";
import Map from "./Map";

export default function StationSearchMap({ stations = [], selectedStation, onStationSelectExternal }) {
  const [fuelType, setFuelType] = useState("Z91 Unleaded");
  const navigate = useNavigate();

  // Calculate center and zoom based on selectedStation prop
  const defaultCenter = { lat: -36.8485, lng: 174.7633 };
  const center = selectedStation && selectedStation.location && selectedStation.location.coordinates.length === 2
    ? {
        lat: selectedStation.location.coordinates[1],
        lng: selectedStation.location.coordinates[0],
      }
    : defaultCenter;

  const zoom = selectedStation ? 15 : 9.5;

  // Handle selection from Search component
  const handleStationSelect = (station) => {
    if (onStationSelectExternal) {
      onStationSelectExternal(station, fuelType);
    } else {
      // fallback: navigate if no external handler provided
      const query = new URLSearchParams({
        location: station.Name,
        fuel: fuelType,
      }).toString();
      navigate(`/results?${query}`);
    }
  };

  return (
    <>
      <Search onStationSelect={handleStationSelect} setFuelType={setFuelType} />
      <Map center={center} zoom={zoom} />
    </>
  );
}
