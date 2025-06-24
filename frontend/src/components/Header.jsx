import { useState } from "react";
import Logo from "../assets/atoms/Logo.svg";
import personalBtn from "../assets/header/Personal.svg";
import businessBtn from "../assets/header/Business.svg";
import searchIcon from "../assets/atoms/icons/Search.svg";
import loginIcon from "../assets/header/Login.svg";
import DropdownArrow from "../assets/header/Dropdown.svg";
import hamburgerIcon from "../assets/header/Hamburger.svg"; // ✅ Add this line

import styles from "./Header.module.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "At the station", hasDropdown: true },
    { label: "Power", hasDropdown: true },
    { label: "Rewards and promotions", hasDropdown: true },
    { label: "Locations", hasDropdown: false },
  ];

  return (
    <header>
      {/* ===== DESKTOP HEADER ===== */}
      <div className={`${styles.header} ${styles.header1}`}>
        <div className={styles.header1Left}>
          <div className={styles.headerLogo}>
            <img src={Logo} alt="Z Energy Logo" className={styles.headerLogoImage} />
          </div>
          <div className={styles.personalBtn}>
            <img src={personalBtn} alt="Personal Button" className={styles.headerBtn} />
          </div>
          <div className={styles.businessBtn}>
            <img src={businessBtn} alt="Business Button" className={styles.headerBtn} />
          </div>
        </div>

        <div className={styles.header1Right}>
          <nav className={styles.headerNav}>
            <a href="#" className={styles.headerLink}>Z App</a>
            <a href="#" className={styles.headerLink}>About Z</a>
          </nav>
          <div className={styles.headerIcons}>
            <button className={styles.iconBtn} aria-label="Search">
              <img src={searchIcon} alt="Search Icon" className={styles.headerIcon} />
            </button>
            <button className={styles.iconBtn} aria-label="Login">
              <img src={loginIcon} alt="Login Icon" className={styles.headerIcon} />
            </button>
          </div>
        </div>
      </div>

      <hr className={styles.headerDivider} />

      <div className={`${styles.header} ${styles.header2}`}>
        <nav className={styles.header2Nav} aria-label="Secondary navigation">
          <ul className={styles.secondaryNavList}>
            {navItems.map(({ label, hasDropdown }) => (
              <li key={label} className={styles.secondaryNavItem}>
                <button className={styles.dropdownBtn} type="button" aria-haspopup={hasDropdown ? "true" : undefined}>
                  <span>{label}</span>
                  {hasDropdown && (
                    <img src={DropdownArrow} alt="" aria-hidden="true" className={styles.arrowIcon} />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* ===== MOBILE HEADER ===== */}
      <div className={styles.mobileHeader}>
        <img src={Logo} alt="Z Energy Logo" className={styles.logoMobile} />
        <div className={styles.mobileIcons}>
          <img src={searchIcon} alt="Search" className={styles.icon} />
          <div className={styles.mobileDivider}></div>
          <button className={styles.iconBtn} onClick={() => setMenuOpen((prev) => !prev)} aria-label="Toggle menu">
            <img src={hamburgerIcon} alt="Menu" className={styles.icon} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className={styles.mobileMenu} aria-label="Mobile Navigation">
          <ul>
            {navItems.map(({ label }) => (
              <li key={label}><a href="#">{label}</a></li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
