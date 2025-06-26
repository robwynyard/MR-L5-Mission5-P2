import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import styles from "./css/Map.module.css";
import pinIcon from "../assets/atoms/station_pin.svg";

export default function Map() {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [stations, setStations] = useState([]);
  const [center, setCenter] = useState({ lat: -37.787, lng: 175.265 });

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    // Change the URL if needed!
    fetch("http://localhost:3000/api/aucklandStations")
      .then((res) => res.json())
      .then((data) => {
        setStations(data);
        // Optionally center map on the first station
        if (data.length > 0 && data[0].location && data[0].location.coordinates) {
          setCenter({
            lat: data[0].location.coordinates[1], // [lng, lat] => lat
            lng: data[0].location.coordinates[0], // [lng, lat] => lng
          });
        }
      });
  }, []);

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerClassName={styles.mapContainer}
        center={center}
        zoom={10}
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
          stations.map((station, index) =>
            station.location && station.location.coordinates ? (
              <Marker
                key={station._id}
                position={{
                  lat: station.location.coordinates[1], // GeoJSON: [lng, lat]
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
    </LoadScript>
  );
}
