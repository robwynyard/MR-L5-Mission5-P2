import React, { useState, useRef, useEffect } from "react";
import Search from "./Search";
import Map from "./Map";

const initialCenter = { lat: -41.53379864953193, lng: 173.78365868976863 };
const initialZoom = 5.7;

export default function StationSearchMap() {
  const [mapCenter, setMapCenter] = useState(initialCenter);
  const [zoom, setZoom] = useState(initialZoom);
  const [showPrice, setShowPrice] = useState(false);
  const [selectedFuelType, setSelectedFuelType] = useState(null);
  const mapRef = useRef(null);

  const handleStationSelect = (station) => {
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

  const resetMap = () => {
    if (mapRef.current) {
      mapRef.current.panTo(initialCenter);
      mapRef.current.setZoom(initialZoom);
    }
    setMapCenter(initialCenter);
    setZoom(initialZoom);
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
        mapRef={mapRef} // pass the mapRef down
      />
    </>
  );
}
