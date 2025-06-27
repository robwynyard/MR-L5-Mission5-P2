import React, { useEffect, useState } from "react";
import StationList from "../components/StationList";

export default function TestPreview() {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/stations")
      .then((res) => res.json())
      .then((data) => {
        setStations(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching stations:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading stations...</p>;

  return (
    <main style={{ padding: "2rem", background: "#f9f9f9" }}>
      <h1>Station List (from DB)</h1>
      <StationList stations={stations} />
    </main>
  );
}

  // const dummyStations = [
  //   {
  //     _id: "1",
  //     name: "Z Sylvia Park",
  //     distance: 3.2,
  //     location: "Auckland, NZ",
  //     services: ["Car Wash", "Toilets", "EV Charger"],
  //     lat: -36.914,
  //     lng: 174.840,
  //   },
  //   {
  //     _id: "2",
  //     name: "Z Mt Eden",
  //     location: "Auckland, NZ",
  //     distance: 1.2,
  //     services: ["Toilets", "EV Charger"],
  //     lat: -36.87,
  //     lng: 174.76,
  //   },
  //   {
  //     _id: "3",
  //     name: "Z Henderson",
  //     location: "Auckland, NZ",
  //     distance: 4.5,
  //     services: ["Car Wash"],
  //     lat: -36.85,
  //     lng: 174.65,
  //   },
  // ];
