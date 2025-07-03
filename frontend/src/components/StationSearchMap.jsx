import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
  const [filteredStations, setFilteredStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [showCards, setShowCards] = useState(true);
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("All");
  const [tempSelectedService, setTempSelectedService] = useState("All");
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [hasMapInteracted, setHasMapInteracted] = useState(false);

  const location = useLocation();
  const isDetailsPage = location.pathname.startsWith("/station/");
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 600;
  const mapRef = useRef(null);

  useEffect(() => {
    if (showPrice && (!selectedFuelType || !selectedFuelType.name)) {
      setSelectedFuelType(fuelTypes[0]);
    }
  }, [showPrice]);

  useEffect(() => {
    fetch("http://localhost:3000/api/aucklandStations")
      .then((res) => res.json())
      .then((data) => setStations(data));
  }, []);

  useEffect(() => {
    if (!filtersApplied || selectedService === "All") {
      setVisibleStations(stations);
    } else {
      const filtered = stations.filter((s) =>
        s.Services?.some(
          (svc) => svc.toLowerCase() === selectedService.toLowerCase()
        )
      );
      setVisibleStations(filtered);
    }
  }, [selectedService, stations, filtersApplied]);

  const handleStationSelect = (station) => {
    setSelectedStation(station);
    setVisibleStations([station]);
    if (mapRef.current) {
      const newCenter = {
        lat: station.location.coordinates[1],
        lng: station.location.coordinates[0],
      };
      mapRef.current.panTo(newCenter);
      mapRef.current.setZoom(15);
      setMapCenter(newCenter);
      setZoom(15);
    }
  };

  const handleBoundsChanged = (bounds) => {
    if (!stations.length || filtersApplied) return;

    setHasMapInteracted(true);

    const filtered = stations.filter((station) => {
      if (!station.location?.coordinates) return false;
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

      {!isDetailsPage && showCards && hasMapInteracted && (
        <div
          className={`${styles.StationCardsContainer} ${
            isMobile
              ? isMobileSheetOpen
                ? styles.expanded
                : styles.minimized
              : ""
          }`}
        >
          {isMobile && (
            <div
              className={styles.DragHandle}
              onClick={(e) => {
                e.stopPropagation();
                setIsMobileSheetOpen((v) => !v);
              }}
              title={isMobileSheetOpen ? "Minimize results" : "Show results"}
              aria-label={
                isMobileSheetOpen ? "Minimize results" : "Show results"
              }
            />
          )}
          <div className={styles.IconContainer}>
            <img
              src={FilterIcon}
              alt="Filter Icon"
              onClick={() => setIsFilterOpen(true)}
              style={{ cursor: "pointer" }}
            />
            <img src={SortIcon} alt="Sort Icon" />
            <img
              src={CloseIcon}
              alt="Close Icon"
              className={styles.CloseIcon}
              onClick={() => setShowCards(false)}
            />
          </div>

          {isFilterOpen && (
            <div className={styles.FilterPanelStyled}>
              <h2 className={styles.FilterHeader}>Filter</h2>
              <div className={styles.PopularFilters}>
                <span className={styles.SelectedPill}>
                  {tempSelectedService} ✕
                </span>
                <span className={styles.Pill}>Open now</span>
                <span className={styles.Pill}>91 Unleaded</span>
              </div>
              <div className={styles.DropdownsStyled}>
                <label>Services</label>
                <select
                  value={tempSelectedService}
                  onChange={(e) => setTempSelectedService(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="EV charging">EV charging</option>
                  <option value="Car wash">Car wash</option>
                  <option value="Bathrooms">Bathrooms</option>
                  <option value="Trailer hire">Trailer hire</option>
                </select>
                <label>Station type</label>
                <select disabled>
                  <option>Select station type</option>
                </select>
                <label>Fuel type</label>
                <select>
                  <option>91 Unleaded</option>
                  <option>Premium</option>
                  <option>Diesel</option>
                </select>
                <div className={styles.ButtonRowStyled}>
                  <button
                    className={styles.CancelBtn}
                    onClick={() => {
                      setIsFilterOpen(false);
                      setFiltersApplied(false);
                      setTempSelectedService(selectedService);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className={styles.ApplyBtn}
                    onClick={() => {
                      setIsFilterOpen(false);
                      setFiltersApplied(true);
                      setSelectedService(tempSelectedService);
                    }}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className={styles.CardCounter}>
            <p>Showing {visibleStations.length} Results</p>
          </div>
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
    id: station.ID,
    name: station.Name,
    distance: station.distance ? `${station.distance}` : "",
    location: station.Address || station.Name,
    services: station.services || station.Services || [],
    lat: station.location?.coordinates?.[1],
    lng: station.location?.coordinates?.[0],
  };
}
