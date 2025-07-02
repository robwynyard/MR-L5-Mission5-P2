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
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);

  // Responsive check
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 600;

  const mapRef = useRef(null);

  useEffect(() => {
    if (showPrice && (!selectedFuelType || !selectedFuelType.name)) {
      setSelectedFuelType(fuelTypes[0]);
    }
    // eslint-disable-next-line
  }, [showPrice]);

  useEffect(() => {
    fetch("http://localhost:3000/api/aucklandStations")
      .then((res) => res.json())
      .then((data) => setStations(data));
  }, []);

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
    if (isMobile) setIsMobileSheetOpen(true);
  };

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
  
      {/* STATION CARDS - Responsive Sheet for Mobile */}
      {showCards && visibleStations.length > 0 && (
        <div
          className={`${styles.StationCardsContainer} ${
            isMobile
              ? isMobileSheetOpen
                ? styles.expanded
                : styles.minimized
              : ""
          }`}
        >
          {/* Drag handle always at very top */}
          {isMobile && (
            <div
              className={styles.DragHandle}
              onClick={(e) => {
                e.stopPropagation();
                setIsMobileSheetOpen((v) => !v);
              }}
              title={isMobileSheetOpen ? "Minimize results" : "Show results"}
              aria-label={isMobileSheetOpen ? "Minimize results" : "Show results"}
            />
          )}
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
          {/* Show station cards only if expanded or on desktop */}
          {(isMobileSheetOpen || !isMobile) &&
            visibleStations.map((station, idx) => (
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

function mapStationToCard(station) {
  if (!station) return {};
  return {
    name: station.Name,
    distance: station.distance || "",
    location: station.Address || station.Name,
    services: station.services,
    lat: station.location?.coordinates?.[1],
    lng: station.location?.coordinates?.[0],
  };
}
