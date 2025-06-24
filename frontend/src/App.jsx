import React from "react";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Map from "./components/Map";
import Search from "./components/Search";
import SearchRoute from "/routes/SearchRoute";

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
        </Routes>
        <Search></Search>
        <Map />
        <Footer />
      </div>
    </Router>
  );
}
 
export default App;