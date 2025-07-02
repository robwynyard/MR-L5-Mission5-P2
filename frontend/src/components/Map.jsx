import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import styles from "./css/Map.module.css";
import pinIcon from "../assets/atoms/station_pin.svg";

export default function Map({ center, zoom }) {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [stations, setStations] = useState([]);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    fetch("http://localhost:3000/api/aucklandStations")
      .then((res) => res.json())
      .then((data) => setStations(data));
  }, []);

  return (
      <GoogleMap
        mapContainerClassName={styles.mapContainer}
        center={center}
        zoom={zoom}
        onLoad={() => setMapLoaded(true)}
        options={{
          mapTypeControl: false,
          fullscreenControl: false,
          streetViewControl: false,
          zoomControl: false,
          scaleControl: false,
        }}
      >
        {mapLoaded &&
          stations.map((station) =>
            station.location && station.location.coordinates ? (
              <Marker
                key={station._id}
                position={{
                  lat: station.location.coordinates[1], // [lng, lat]
                  lng: station.location.coordinates[0],
                }}
                title={station.Name}
                icon={{
                  url: pinIcon,
                  scaledSize: new window.google.maps.Size(52, 52),
                }}
              />
            ) : null
          )}
      </GoogleMap>
  );
}
