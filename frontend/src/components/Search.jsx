import React, { useState } from 'react';
import styles from './css/Search.module.css';

export default function Search() {
  const [query, setQuery] = useState('');

  const handleClear = () => {
    setQuery('');
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
          onChange={(e) => setQuery(e.target.value)}
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
      </div>
        <p className={styles.MyLocation}>Use my current location</p>

    </div>
  );
}
