import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import haversine from "../utils/haversine"
import styles from "./StationDetails.module.css";
import backArrow from "../assets/atoms/icons/arrow_back.svg";
import close from "../assets/atoms/icons/close.svg";
import pin from "../assets/atoms/icons/distance.svg";
import openedDownArrow from "../assets/atoms/icons/keyboard_arrow_down.svg";
import closedDownArrow from "../assets/atoms/icons/keyboard_arrow_down-1.svg";
import getDirections from "../assets/atoms/getDirections/Property 1=Strong.svg";
import phone from "../assets/atoms/icons/phone-solid.svg";

export default function StationDetails() {
  const { id } = useParams();
  const [station, setStation] = useState(null);
  const [error, setError] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null)
  const [minimise, setMinimise] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    async function fetchStation() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/stations/${id}`
        );
        if (!response.ok) throw new Error("Station not found");
        const data = await response.json();

        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const {latitude: usersLat, longitude: usersLng} = pos.coords
            const distance = haversine(
              usersLat,
              usersLng,
              data.location.coordinates[1],
              data.location.coordinates[0],
            )
            setStation({...data, distance})
          },
          (err) => {
            console.error("Error getting location", err)
            setStation(data)
          }
        )
      } catch (err) {
        setError(err.message);
      }
    }

    fetchStation();
  }, [id]);

  if (error) return <div>Error: {error}</div>;
  if (!station) return <div>Loading...</div>;

  const toggleMinimise = () => setMinimise(prev => !prev)
  

  const toggleHours = () => {
    setOpenDropdown(prev => (prev === "hours" ? null : "hours"));
  } 
  const toggleServices = () => {
    setOpenDropdown(prev => (prev === "services" ? null : "services"));
  } 

  return (
    <div className={`${styles.card} ${minimise ? styles.minimised : ""}`}>

      <div className={styles.minimise}>
        <button className={styles.minimiseBtn} onClick={toggleMinimise}></button>
      </div>

      <div className={styles.close}>
        <button className={`${styles.closeBtns} ${styles.backArrow}`} onClick={() => navigate(-1)}>
          <img src={backArrow} alt="back arrow" />
        </button>
        <button className={styles.closeBtns}>
          <img src={close} alt="close button" />
        </button>
      </div>

      <div className={styles.titleLine}>
        <h1 className={styles.title}>{station.Name}</h1>
        {station.distance != null &&(
          <p className={styles.distance}>{station.distance} km</p>
        )}
      </div>

      <div className={styles.addressLine}>
        <img className={styles.pin} src={pin} alt="Location pin" />
        <span className={styles.address}>{station.Address}</span>
      </div>

      <div className={styles.dropdown}>
        <strong className={styles.listName}>Open now</strong>
        <button className={styles.toggle} onClick={toggleHours}>
          <img
            className={styles.arrows}
            src={openDropdown === "hours" ? closedDownArrow : openedDownArrow}
            alt="dropdown arrows"
          />
        </button>
        {openDropdown ==="hours" && (
          <ul className={styles.list}>
            {Object.entries(station.openingHours).map(([day, hours]) => (
              <li className={styles.listItems} key={day}>
                <span>{day}</span>
                <span>{hours}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.dropdown2}>
        <strong className={styles.listName}>Services</strong>
        <button className={styles.toggle} onClick={toggleServices}>
          <img
            className={styles.arrows}
            src={openDropdown === "services" ? closedDownArrow : openedDownArrow}
            alt="dropdown arrows"
          />
        </button>
        {openDropdown === "services" && (
          <ul className={styles.list}>
            {station.Services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        )}
      </div>

      <a
        href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(station.Address)}`}
        target="_blank"
        rel="norefferer"
      >
        <img
          className={styles.getDirections}
          src={getDirections}
          alt="get directions button"
        />
      </a>

      <div className={styles.phoneLine}>
        <img className={styles.phoneIcon} src={phone} alt="phone icon" />
        <a className={styles.phoneNumber} href={`tel:${station.Contact.Phone}`}>
          {station.Contact.Phone}
        </a>
      </div>
    </div>
  );
}
