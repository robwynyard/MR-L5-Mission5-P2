import React, { useState, useEffect } from "react";
import styles from "./css/Search.module.css";
import myLocation from "../assets/atoms/icons/my_location.svg";
import showPriceIcon from "../assets/atoms/priceToggle/show_price.svg";
import hidePriceIcon from "../assets/atoms/priceToggle/hide_price.svg";
import fuelTypeIcon from "../assets/atoms/dropdown/default_fueltype.svg";
import gasIcon from "../assets/atoms/icons/local_gas_station.svg";


export default function Search({ onStationSelect }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [stationList, setStationList] = useState([]);
  const [showPrice, setShowPrice] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFuelType, setSelectedFuelType] = useState(null);

  const fuelTypes = [
    { name: "Z91 Unleaded" },
    { name: "ZX Premium" },
    { name: "Z Diesel" },
  ];

  // Fetch station details on mount
  useEffect(() => {
    fetch("http://localhost:3000/api/aucklandStations")
      .then((res) => res.json())
      .then((data) => {
        // Attach icon for display, but keep all station info
        const stations = data.map(station => ({
          ...station,
          icon: gasIcon,
        }));
        setStationList(stations);
      });
  }, []);

  const handleClear = () => {
    setQuery("");
    setSuggestions([]);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 0) {
      const matches = stationList.filter((station) =>
        station.Name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  // Change: handleSelect takes the whole station, not just name
  const handleSelect = (station) => {
    setQuery(station.Name);
    setSuggestions([]);
    if (onStationSelect) {
      onStationSelect(station); // Pass station to parent
    }
  };

  return (
    <div className={styles.Container}>
      <p className={styles.SearchHeading}>Search Z stations</p>
      <div className={styles.InputWrapper}>
        <input
          type="text"
          className={styles.SearchInput}
          placeholder="Search by location, services, fuel"
          value={query}
          onChange={handleChange}
        />
        {query && (
          <button
            className={styles.ClearButton}
            onClick={handleClear}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
        {suggestions.length > 0 && (
          <ul className={styles.SuggestionList}>
            {suggestions.slice(0, 5).map((station, index) => ( // Show up to 5, scrolls for more
              <li
                key={index}
                className={styles.SuggestionItem}
                onClick={() => handleSelect(station)}
              >
                <img
                  src={station.icon}
                  alt=""
                  className={styles.SuggestionIcon}
                />
                {station.Name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className={styles.MyLocation}>
        <img
          src={myLocation}
          alt="My location"
          className={styles.MyLocationIcon}
        />
        Use my current location
      </p>
      <div className={`${styles.PriceToggleRow} ${showPrice ? styles.expanded : ""}`}>
        <div
          className={styles.PriceToggleContainer}
          onClick={() => setShowPrice(!showPrice)}
        >
          <div className={styles.ToggleIconWrapper}>
            <img
              src={showPriceIcon}
              alt="Show Price"
              className={`${styles.ToggleIconImage} ${styles.ShowPriceToggle} ${!showPrice ? styles.show : styles.hide}`}
            />
            <img
              src={hidePriceIcon}
              alt="Hide Price"
              className={`${styles.ToggleIconImage} ${styles.hidePriceToggle} ${showPrice ? styles.show : styles.hide}`}
            />
          </div>
        </div>
        <div
          className={`${styles.FuelTypeContainer} ${
            showPrice ? styles.visible : styles.hidden}`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <img
            src={fuelTypeIcon}
            alt="Fuel Type"
            className={styles.FuelTypeIcon}
          />
          {isDropdownOpen && (
            <ul className={styles.FuelDropdown}>
              {fuelTypes.map((fuel, index) => (
                <li
                  key={index}
                  className={styles.FuelOption}
                  onClick={() => {
                    setSelectedFuelType(fuel.name);
                    setIsDropdownOpen(false);
                  }}
                >
                  {fuel.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
