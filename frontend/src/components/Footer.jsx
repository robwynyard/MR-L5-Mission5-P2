import React from "react";
import styles from "./Footer.module.css";
import Logo from "../assets/atoms/Logo.svg"; // Adjust path if needed
import CTAButton from "../assets/atoms/CTA button.svg";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        {/* Left: Logo */}
        <div className={styles.footerLogo}>
          <img src={Logo} alt="Z Energy Logo" className={styles.footerLogoImage} />
        </div>

        {/* Center: Navigation links */}
        <nav className={styles.footerNav}>
          <div className={styles.footerNavColumn}>
            <h6 className={styles.footerNavTitle}>Products & Services</h6>
            <ul>
              <li><a href="#">At the station</a></li>
              <li><a href="#">Z App</a></li>
              <li><a href="#">Rewards and promotions</a></li>
            </ul>
          </div>

          <div className={styles.footerNavColumn}>
            <h6 className={styles.footerNavTitle}>For Business</h6>
            <ul>
              <li><a href="#">Z Business fuel Card</a></li>
              <li><a href="#">Fuel and services</a></li>
              <li><a href="#">Business tips and stories</a></li>
            </ul>
          </div>

          <div className={styles.footerNavColumn}>
            <h6 className={styles.footerNavTitle}>About Z</h6>
            <ul>
              <li><a href="#">Our story</a></li>
              <li><a href="#">Our people</a></li>
              <li><a href="#">What we stand for</a></li>
              <li><a href="#">Sustainabilty</a></li>
              <li><a href="#">News</a></li>
              <li><a href="#">Careers at Z</a></li>
              <li><a href="#">Corporate centre</a></li>
            </ul>
          </div>
        </nav>

        {/* Right: Social Icons */}
        <div className={styles.footerCta}>
          <a href="/contact" aria-label="Contact Us">
            <img src={CTAButton} alt="Contact Us" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
