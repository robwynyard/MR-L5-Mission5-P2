import React, { useState, useRef, useEffect } from "react";
import Search from "./Search";
import Map from "./Map";
import StationCard from "./StationCard";

const initialCenter = { lat: -41.53379864953193, lng: 173.78365868976863 };
const initialZoom = 5.7;

export default function StationSearchMap() {
  const [mapCenter, setMapCenter] = useState(initialCenter);
  const [zoom, setZoom] = useState(initialZoom);
  const [showPrice, setShowPrice] = useState(false);
  const [selectedFuelType, setSelectedFuelType] = useState(null);
  const [stations, setStations] = useState([]);
  const [visibleStations, setVisibleStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);

  const mapRef = useRef(null);

  // Fetch stations on mount
  useEffect(() => {
    fetch("http://localhost:3000/api/aucklandStations")
      .then((res) => res.json())
      .then((data) => setStations(data));
  }, []);

  // Handle selecting a station from the search suggestions
  const handleStationSelect = (station) => {
    setSelectedStation(station);
    if (
      station.location &&
      station.location.coordinates &&
      station.location.coordinates.length === 2 &&
      mapRef.current
    ) {
      const newCenter = {
        lat: station.location.coordinates[1],
        lng: station.location.coordinates[0],
      };
      mapRef.current.panTo(newCenter);
      mapRef.current.setZoom(station.zoom || 15);
      setMapCenter(newCenter);
      setZoom(station.zoom || 15);
    }
  };

  // Handle map viewport change to update visible stations
  const handleBoundsChanged = (bounds) => {
    if (!stations.length) return;
    const filtered = stations.filter((station) => {
      if (!station.location || !station.location.coordinates) return false;
      const [lng, lat] = station.location.coordinates;
      return (
        lat <= bounds.north &&
        lat >= bounds.south &&
        lng <= bounds.east &&
        lng >= bounds.west
      );
    });
    setVisibleStations(filtered);
  };

  const resetMap = () => {
    if (mapRef.current) {
      mapRef.current.panTo(initialCenter);
      mapRef.current.setZoom(initialZoom);
    }
    setMapCenter(initialCenter);
    setZoom(initialZoom);
    setSelectedStation(null);
  };

  return (
    <>
      <Search
        onStationSelect={handleStationSelect}
        showPrice={showPrice}
        setShowPrice={setShowPrice}
        selectedFuelType={selectedFuelType}
        setSelectedFuelType={setSelectedFuelType}
        resetMap={resetMap}
      />
      <Map
        center={mapCenter}
        zoom={zoom}
        showPrice={showPrice}
        selectedFuelType={selectedFuelType}
        mapRef={mapRef}
        onBoundsChanged={handleBoundsChanged}
      />

      {/* STATION CARDS */}
      <div style={{ position: "absolute", top: 415, left: 170, zIndex: 2000 }}>
        {selectedStation ? (
          <StationCard station={mapStationToCard(selectedStation)} />
        ) : (
          visibleStations.map((station) => (
            <StationCard
              key={station._id}
              station={mapStationToCard(station)}
            />
          ))
        )}
      </div>
    </>
  );
}

// Helper: shape your station object to match StationCard props
function mapStationToCard(station) {
  if (!station) return {};
  return {
    name: station.Name,
    distance: station.distance || "", // Add your distance logic if needed
    location: station.Address || station.Name,
    services: station.services,
    lat: station.location?.coordinates?.[1],
    lng: station.location?.coordinates?.[0],
  };
}
