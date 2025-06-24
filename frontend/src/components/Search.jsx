import React, { useState } from "react";
import styles from "./css/Search.module.css";
import myLocation from "../assets/atoms/icons/my_location.svg";
import showPriceToggle from "../assets/atoms/priceToggle/show_price.svg";
import gasIcon from "../assets/atoms/icons/local_gas_station.svg";

const stationList = [
  { name: "Z Frankton", icon: gasIcon },
  { name: "Z Dinsdale", icon: gasIcon },
  { name: "Z Stadium", icon: gasIcon },
  { name: "Z Kahikatea Drive", icon: gasIcon },
  { name: "Z Pukete", icon: gasIcon },
];

export default function Search() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleClear = () => {
    setQuery("");
    setSuggestions([]);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 0) {
      const matches = stationList.filter((station) =>
        station.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (value) => {
    setQuery(value);
    setSuggestions([]);
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
            {suggestions.map((station, index) => (
              <li
                key={index}
                className={styles.SuggestionItem}
                onClick={() => handleSelect(station.name)}
              >
                <img
                  src={station.icon}
                  alt=""
                  className={styles.SuggestionIcon}
                />
                {station.name}
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

      <div className={styles.PriceToggleContainer}>
        <img src={showPriceToggle} alt="Show Price" />
      </div>
    </div>
  );
}
