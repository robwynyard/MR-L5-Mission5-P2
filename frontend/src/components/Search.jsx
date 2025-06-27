import React, { useState, useEffect } from "react";
import styles from "./css/Search.module.css";
import myLocation from "../assets/atoms/icons/my_location.svg";
import showPriceIcon from "../assets/atoms/priceToggle/show_price.svg";
import hidePriceIcon from "../assets/atoms/priceToggle/hide_price.svg";
import fuelTypeIcon from "../assets/atoms/dropdown/default_fueltype.svg";
import gasIcon from "../assets/atoms/icons/local_gas_station.svg";

// Main Search component
export default function Search({ onStationSelect }) {
  // State for user’s search query input
  const [query, setQuery] = useState("");
  // State for matching station suggestions as user types
  const [suggestions, setSuggestions] = useState([]);
  // List of all stations (populated via fetch)
  const [stationList, setStationList] = useState([]);
  // Toggle to show/hide price section
  const [showPrice, setShowPrice] = useState(false);
  // Toggle for showing/hiding fuel type dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // State to track which fuel type is selected
  const [selectedFuelType, setSelectedFuelType] = useState(null);

  // Hardcoded list of fuel types (could come from API)
  const fuelTypes = [
    { name: "Z91 Unleaded" },
    { name: "ZX Premium" },
    { name: "Z Diesel" },
  ];

  // On mount: fetch list of Auckland Z stations from API
  useEffect(() => {
    fetch("http://localhost:3000/api/aucklandStations")
      .then((res) => res.json())
      .then((data) => {
        // Add a gas station icon to each station object for UI display
        const stations = data.map(station => ({
          ...station,
          icon: gasIcon,
        }));
        setStationList(stations);
      });
  }, []);

  // Clear the search query and suggestions list
  const handleClear = () => {
    setQuery("");
    setSuggestions([]);
  };

  // On user input: update query and filter stationList for suggestions
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 0) {
      // Filter stations by name, case-insensitive match
      const matches = stationList.filter((station) =>
        station.Name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  // When a user clicks a suggestion, update input and notify parent
  const handleSelect = (station) => {
    setQuery(station.Name);
    setSuggestions([]);
    if (onStationSelect) {
      onStationSelect(station); // Pass selected station object to parent
    }
  };

  return (
    <div className={styles.Container}>
      {/* Heading */}
      <p className={styles.SearchHeading}>Search Z stations</p>

      {/* Search input with clear button and suggestion dropdown */}
      <div className={styles.InputWrapper}>
        <input
          type="text"
          className={styles.SearchInput}
          placeholder="Search by location, services, fuel"
          value={query}
          onChange={handleChange}
        />
        {/* Show clear button when there is input */}
        {query && (
          <button
            className={styles.ClearButton}
            onClick={handleClear}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
        {/* Suggestions dropdown, max 5 visible */}
        {suggestions.length > 0 && (
          <ul className={styles.SuggestionList}>
            {suggestions.slice(0, 5).map((station, index) => (
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

      {/* My Location prompt (currently just UI, not functional here) */}
      <p className={styles.MyLocation}>
        <img
          src={myLocation}
          alt="My location"
          className={styles.MyLocationIcon}
        />
        Use my current location
      </p>

      {/* Price toggle row (show/hide price and fuel type selector) */}
      <div className={`${styles.PriceToggleRow} ${showPrice ? styles.expanded : ""}`}>
        {/* Price toggle button, switches icon and toggles price section */}
        <div
          className={styles.PriceToggleContainer}
          onClick={() => setShowPrice(!showPrice)}
        >
          <div className={styles.ToggleIconWrapper}>
            {/* Show price icon when collapsed, hide price icon when expanded */}
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

        {/* Fuel type dropdown (only visible when price toggle is on) */}
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
          {/* Dropdown menu with fuel types */}
          {isDropdownOpen && (
            <ul className={styles.FuelDropdown}>
              {fuelTypes.map((fuel, index) => (
                <li
                  key={index}
                  className={styles.FuelOption}
                  onClick={() => {
                    setSelectedFuelType(fuel.name); // Select fuel type
                    setIsDropdownOpen(false);        // Close dropdown
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
