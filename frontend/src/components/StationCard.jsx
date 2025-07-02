import React from "react";
import styles from "./StationCard.module.css";
import getDirectionsIcon from "../assets/atoms/getDirections/Property 1=Subtle.svg";
import dropdown from "../assets/header/Dropdown.svg";
import LocationPin from "../assets/atoms/icons/distance.svg";
import ForwardArrow from "../assets/atoms/icons/arrow_forward.svg";
export default function StationCard({ station }) {
  const isOpen = true; // You can replace with real logic

  // Extract lat/lng from GeoJSON coordinates
  const [lng, lat] = station.location.coordinates || [];

  return (
    <div className={styles.card}>
      {/* Name + distance row */}
      <div className={styles.topRow}>
        <h2 className={styles.name}>{station.Name}</h2>
        <span className={styles.distance}>{station.distance ?? "N/A"} km</span>
      </div>

      {/* Location row */}
      <div className={styles.locationRow}>
        <img
          src={LocationPin}
          alt="location pin"
          className={styles.locationIcon}
        />
        <p className={styles.location}>{station.Address}</p>
      </div>

      {/* Services preview row */}
      <div className={styles.row}>
        <span className={styles.inlineWithIcon}>
          {station.Services?.[0] || "No services listed"}
          <img
            src={dropdown}
            alt="dropdown arrow"
            className={styles.dropdownIcon}
          />
        </span>
      </div>

      {/* Open/Closed status row */}
      <div className={styles.row}>
        <span className={styles.inlineWithIcon}>
          {isOpen ? "Open now" : "Closed"}
          <img
            src={dropdown}
            alt="dropdown arrow"
            className={styles.dropdownIcon}
          />
        </span>
      </div>

      {/* Get Directions */}
      <div className={styles.directionsRow}>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.directionsBtn}
        >
          <img src={getDirectionsIcon} alt="Get directions" />
        </a>

        <img
          src={ForwardArrow}
          alt="forward arrow"
          className={styles.forwardArrow}
        />
      </div>
    </div>
  );
}
