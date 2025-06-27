import React from "react";
import StationCard from "./StationCard";

// Replace these with your actual icons
import FilterIcon from "../assets/atoms/icons/tune.svg";
import SortIcon from "../assets/atoms/icons/swap_vert.svg";
import CloseIcon from "../assets/atoms/icons/close.svg";

import styles from "./StationList.module.css";

export default function StationList({ stations }) {
  if (!stations || stations.length === 0) {
    return <p className={styles.noResults}>No stations found.</p>;
  }

  return (
    <div className={styles.container}>
      {/* Top filter bar */}
      <div className={styles.filterBar}>
        <div className={styles.iconsLeft}>
          <img src={FilterIcon} alt="Filter" />
          <img src={SortIcon} alt="Sort" />
        </div>
        <button className={styles.closeBtn}>
          <img src={CloseIcon} alt="Close" />
        </button>
      </div>

      {/* Result count */}
      <p className={styles.resultCount}>Showing {stations.length} results</p>

      {/* Station cards */}
      <div className={styles.cardList}>
        {stations.map((station) => (
          <StationCard key={station._id} station={station} />
        ))}
      </div>
    </div>
  );
}
