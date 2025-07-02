import React, { useState, useRef, useEffect } from "react";
import Search from "./Search";
import Map from "./Map";
import StationCard from "./StationCard";
import styles from "./css/StationSearchMap.module.css";
import FilterIcon from "../assets/atoms/icons/tune.svg";
import SortIcon from "../assets/atoms/icons/swap_vert.svg";
import CloseIcon from "../assets/atoms/icons/close.svg";
import ZulFuelIcon from "../assets/atoms/dropdown/91_fuel.svg";
import PremiumFuelIcon from "../assets/atoms/dropdown/premium_fuel.svg";
import DieselFuelIcon from "../assets/atoms/dropdown/diesel_fuel.svg";

const initialCenter = { lat: -41.53379864953193, lng: 173.78365868976863 };
const initialZoom = 5.7;

// Define your fuel types here so you can use them below
const fuelTypes = [
  { name: "Z91 Unleaded", icon: ZulFuelIcon },
  { name: "ZX Premium", icon: PremiumFuelIcon },
  { name: "Z Diesel", icon: DieselFuelIcon },
];

export default function StationSearchMap() {
  const [mapCenter, setMapCenter] = useState(initialCenter);
  const [zoom, setZoom] = useState(initialZoom);
  const [showPrice, setShowPrice] = useState(false);
  const [selectedFuelType, setSelectedFuelType] = useState(null);
  const [stations, setStations] = useState([]);
  const [visibleStations, setVisibleStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [showCards, setShowCards] = useState(true);

  const mapRef = useRef(null);

  // Default fuel type to 91 when toggling showPrice ON and no type is selected
  useEffect(() => {
    if (showPrice && (!selectedFuelType || !selectedFuelType.name)) {
      setSelectedFuelType(fuelTypes[0]);
    }
    // eslint-disable-next-line
  }, [showPrice]);

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
        setShowCards={setShowCards}
      />

      {/* STATION CARDS */}
      {showCards && visibleStations.length > 0 && (
        <div className={styles.StationCardsContainer}>
          <div className={styles.IconContainer}>
            <img src={FilterIcon} alt="Filter Icon" />
            <img src={SortIcon} alt="Sort Icon" />
            <img
              src={CloseIcon}
              alt="Close Icon"
              className={styles.CloseIcon}
              onClick={() => setShowCards(false)}
            />
          </div>
          <div className={styles.CardCounter}>
            <p>Showing {visibleStations.length} Results</p>
          </div>
          {visibleStations.map((station, idx) => (
            <StationCard
              key={station._id}
              station={mapStationToCard(station)}
              className={
                idx === 0
                  ? `${styles.StationCard} ${styles.FirstStationCard}`
                  : styles.StationCard
              }
            />
          ))}
        </div>
      )}
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
