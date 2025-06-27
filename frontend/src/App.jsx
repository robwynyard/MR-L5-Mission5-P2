import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Map from "./components/Map";
import Search from "./components/Search";
import TestPreview from "./pages/TestPreview";

import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Map from "./components/Map";
import Search from "./components/Search";
import SearchRoute from "/routes/SearchRoute";
import StationSearchMap from "./components/StationSearchMap";
import StationDetails from "./components/StationDetails";

function App() {
  return (
    <Router>

      <Routes>
        {/* ✅ Preview route for testing */}
        <Route path="/test" element={<TestPreview />} />

        {/* ✅ Landing route with full layout */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <Search />
              <Map />
              <Footer />
            </>
          }
        />
      </Routes>

      <div className="min-h-screen">
        <Header /> {/* ✅ Drop your header here */}
        <StationSearchMap></StationSearchMap>
        <Routes>
          <Route path="/station/:id" element={<StationDetails />} />
        </Routes>
        <Footer /> {/* ✅ Drop your footer here */}
      </div>

    </Router>
  );
}

export default App;
