import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import styles from "./css/Map.module.css";

export default function Map() {
  const center = {
    lat: -37.787,
    lng: 175.265,
  };

  const zStations = [
    { lat: -37.78566, lng: 175.25525, name: "Z Hamilton Truck Stop" },
    { lat: -37.78623445926755, lng: 175.25587171528898, name: "Z Frankton" },
    { lat: -37.7842, lng: 175.2723, name: "Z Kahikatea Drive" },
    { lat: -37.776, lng: 175.253, name: "Z Pukete" },
  ];

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerClassName={styles.mapContainer}
        center={center}
        zoom={13}
        options={{
          mapTypeControl: false,
          fullscreenControl: false,
          streetViewControl: false,
          zoomControl: false,
          scaleControl: false,
        }}
      >
        {zStations.map((station, index) => (
          <Marker
            key={index}
            position={{ lat: station.lat, lng: station.lng }}
            title={station.name}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}
