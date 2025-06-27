import React from "react";
import Footer from "./components/Footer";
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Map from "./components/Map";
import Search from "./components/Search";
import SearchRoute from "/routes/SearchRoute";
import StationSearchMap from "./components/StationSearchMap";

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
        </Routes>
        <Header /> {/* ✅ Drop your header here */}
        <Search></Search>
        <StationSearchMap></StationSearchMap>
        <Footer /> {/* ✅ Drop your footer here */}
      </div>
    </Router>
  );
}
 
export default App;