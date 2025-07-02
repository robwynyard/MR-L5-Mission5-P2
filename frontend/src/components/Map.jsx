import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  OverlayView,
} from "@react-google-maps/api";
import styles from "./css/Map.module.css";
import pinIcon from "../assets/atoms/station_pin.svg";
import fuelPriceIcon from "../assets/atoms/fuelPins/fuel_pin_blank.svg";
import cityMarker from "../assets/atoms/city_marker.svg";

export default function Map({
  center,
  zoom,
  showPrice,
  selectedFuelType,
  mapRef,
  onBoundsChanged,
  setShowCards, // <--- NEW PROP
}) {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);
  const [currentZoom, setCurrentZoom] = useState(zoom);
  const [stations, setStations] = useState([]);
  const [cities, setCities] = useState([]);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    fetch("http://localhost:3000/api/aucklandStations")
      .then((res) => res.json())
      .then((data) => setStations(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/api/cities")
      .then((res) => res.json())
      .then((data) => setCities(data));
  }, []);

  const getFuelKey = () => {
    if (!selectedFuelType || !selectedFuelType.name) return null;
    const name = selectedFuelType.name.toLowerCase();
    if (name.includes("91")) return "91";
    if (name.includes("premium") || name.includes("95")) return "95";
    if (name.includes("diesel")) return "Diesel";
    return null;
  };

  const selectedFuelKey = getFuelKey();

  return (
    <GoogleMap
      mapContainerClassName={styles.mapContainer}
      center={center}
      zoom={zoom}
      onLoad={(map) => {
        setMapLoaded(true);
        setMapInstance(map);
        setCurrentZoom(map.getZoom());
        if (mapRef) {
          mapRef.current = map;
        }
      }}
      onZoomChanged={() => {
        if (mapInstance) {
          setCurrentZoom(mapInstance.getZoom());
        }
      }}
      onIdle={() => {
        if (mapRef && mapRef.current && onBoundsChanged) {
          const bounds = mapRef.current.getBounds();
          if (bounds) {
            const ne = bounds.getNorthEast();
            const sw = bounds.getSouthWest();
            onBoundsChanged({
              north: ne.lat(),
              east: ne.lng(),
              south: sw.lat(),
              west: sw.lng(),
            });
          }
        }
      }}
      options={{
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        zoomControl: false,
        scaleControl: false,
      }}
    >
      {mapLoaded &&
        cities.map((city, index) => (
          <Marker
            key={`city-${index}`}
            position={{
              lat: city.location.coordinates[1],
              lng: city.location.coordinates[0],
            }}
            title={city.Name}
            opacity={0.6}
            icon={{
              url: cityMarker,
              scaledSize: new window.google.maps.Size(42, 42),
            }}
          />
        ))}

      {mapLoaded &&
        currentZoom > 7 &&
        stations.map((station) => {
          const fuelPrice =
            selectedFuelKey && station.fuelPrices?.[selectedFuelKey];
          const formattedPrice =
            typeof fuelPrice === "number" ? (fuelPrice * 100).toFixed(1) : "";

          return station.location?.coordinates ? (
            <React.Fragment key={station._id}>
              <Marker
                position={{
                  lat: station.location.coordinates[1],
                  lng: station.location.coordinates[0],
                }}
                title={station.Name}
                icon={{
                  url: showPrice ? fuelPriceIcon : pinIcon,
                  scaledSize: new window.google.maps.Size(56, 56),
                }}
                onClick={() => {
                  if (setShowCards) setShowCards(true);
                  // Optionally: select the station here!
                }}
              />
              {showPrice && formattedPrice && (
                <OverlayView
                  position={{
                    lat: station.location.coordinates[1],
                    lng: station.location.coordinates[0],
                  }}
                  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                >
                  <div className={styles.PriceTag}>{formattedPrice}</div>
                </OverlayView>
              )}
            </React.Fragment>
          ) : null;
        })}
    </GoogleMap>
  );
}
