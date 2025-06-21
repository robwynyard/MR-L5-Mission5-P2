import React from "react";
import "./Footer.css";
import Logo from "../assets/atoms/Logo.svg"; // Adjust path if needed
import CTAButton from '../assets/atoms/CTA button.svg';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__inner">
        {/* Left: Logo */}
        <div className="footer__logo">
          <img src={Logo} alt="Z Energy Logo" className="footer__logo-image" />
        </div>

        {/* Center: Navigation links */}
        <nav className="footer__nav">
          <div className="footer__nav-column">
            <h6 className="footer__nav-title">Products & Services</h6>
            <ul>
              <li>
                <a href="#">At the station</a>
              </li>
              <li>
                <a href="#">Z App</a>
              </li>
              <li>
                <a href="#">Rewards and promotions</a>
              </li>
            </ul>
          </div>

          <div className="footer__nav-column">
            <h6 className="footer__nav-title">For Business</h6>
            <ul>
              <li>
                <a href="#">Z Business fuel Card</a>
              </li>
              <li>
                <a href="#">Fuel and services</a>
              </li>
              <li>
                <a href="#">Business tips and stories</a>
              </li>
            </ul>
          </div>

          <div className="footer__nav-column">
            <h6 className="footer__nav-title">About Z</h6>
            <ul>
              <li>
                <a href="#">Our story</a>
              </li>
              <li>
                <a href="#">Our people</a>
              </li>
              <li>
                <a href="#">What we stand for</a>
              </li>
              <li>
                <a href="#">Sustainabilty</a>
              </li>
              <li>
                <a href="#">News</a>
              </li>
              <li>
                <a href="#">Careers at Z</a>
              </li>
              <li>
                <a href="#">Corporate centre</a>
              </li>
            </ul>
          </div>
        </nav>

        {/* Right: Social Icons */}
        <div className="footer__cta">
          <a href="/contact" aria-label="Contact Us">
            <img src={CTAButton} alt="Contact Us" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
