import React, { useState } from "react";
import Search from "./Search";
import Map from "./Map";

export default function StationSearchMap() {
  const [mapCenter, setMapCenter] = useState({ lat: -36.8485, lng: 174.7633 });
  const [zoom, setZoom] = useState(9.5);

  const handleStationSelect = (station) => {
    if (
      station.location &&
      station.location.coordinates &&
      station.location.coordinates.length === 2
    ) {
      setMapCenter({
        lat: station.location.coordinates[1],
        lng: station.location.coordinates[0],
      });
      setZoom(15);
    }
  };

  return (
    <>
      <Search onStationSelect={handleStationSelect} />
      <Map center={mapCenter} zoom={zoom} />
    </>
  );
}
