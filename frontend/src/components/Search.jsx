import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./css/Search.module.css";
import myLocation from "../assets/atoms/icons/my_location.svg";
import showPriceIcon from "../assets/atoms/priceToggle/show_price.svg";
import hidePriceIcon from "../assets/atoms/priceToggle/hide_price.svg";
import fuelTypeIcon from "../assets/atoms/dropdown/default_fueltype.svg";
import ZulFuelIcon from "../assets/atoms/dropdown/91_fuel.svg";
import PremiumFuelIcon from "../assets/atoms/dropdown/premium_fuel.svg";
import DieselFuelIcon from "../assets/atoms/dropdown/diesel_fuel.svg";
import gasIcon from "../assets/atoms/icons/local_gas_station.svg";
import cityIcon from "../assets/atoms/icons/distance.svg";

export default function Search({
  onStationSelect,
  showPrice,
  setShowPrice,
  selectedFuelType,
  setSelectedFuelType,
  resetMap,
}) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [stationList, setStationList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const fuelTypes = [
    { name: "Z91 Unleaded", icon: ZulFuelIcon },
    { name: "ZX Premium", icon: PremiumFuelIcon },
    { name: "Z Diesel", icon: DieselFuelIcon },
  ];

  useEffect(() => {
    axios.get("http://localhost:3000/api/aucklandStations").then((res) => {
      const stations = res.data.map((station) => ({
        ...station,
        icon: gasIcon,
      }));
      setStationList(stations);
    });

    axios.get("http://localhost:3000/api/cities").then((res) => {
      const cities = res.data.map((city) => ({
        ...city,
        icon: cityIcon,
      }));
      setCityList(cities);
    });
  }, []);

  const handleClear = () => {
    setQuery("");
    setSuggestions([]);
    resetMap && resetMap();
  };

  const handleChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 0) {
      const stationMatches = stationList.filter((station) =>
        station.Name.toLowerCase().includes(value.toLowerCase())
      );

      const cityMatches = cityList.filter((city) =>
        city.Name.toLowerCase().includes(value.toLowerCase())
      );

      const combined = [...stationMatches, ...cityMatches];
      setSuggestions(combined);

      if (combined.length === 0) {
        try {
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json`,
            {
              params: {
                address: value,
                key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
              },
            }
          );
          const results = response.data.results;
          if (results.length > 0) {
            const location = results[0].geometry.location;
            const dummyStation = {
              Name: results[0].formatted_address,
              location: {
                coordinates: [location.lng, location.lat],
              },
              icon: gasIcon,
            };
            if (onStationSelect) {
              onStationSelect(dummyStation);
            }
          }
        } catch (error) {
          console.error("Geocoding failed:", error);
        }
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (item) => {
    setQuery(item.Name);
    setSuggestions([]);
    if (onStationSelect) {
      const itemWithZoom = item.zoom ? { ...item, zoom: item.zoom } : item;
      onStationSelect(itemWithZoom);
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
            {suggestions.slice(0, 5).map((item, index) => (
              <li
                key={index}
                className={styles.SuggestionItem}
                onClick={() => handleSelect(item)}
              >
                <img
                  src={item.icon || gasIcon}
                  alt=""
                  className={styles.SuggestionIcon}
                />
                {item.Name}
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
          className={`${styles.FuelTypeContainer} ${showPrice ? styles.visible : styles.hidden}`}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <img
            src={selectedFuelType?.icon || fuelTypeIcon}
            alt="Fuel Type"
            className={`${styles.FuelTypeIcon} ${selectedFuelType?.name === "Z Diesel" ? styles.DieselIconShift : ""}`}
          />
          {isDropdownOpen && (
            <ul className={styles.FuelDropdown}>
              {fuelTypes.map((fuel, index) => (
                <li
                  key={index}
                  className={styles.FuelTypeOption}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFuelType(fuel);
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
