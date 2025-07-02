import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoadScript } from "@react-google-maps/api";
import Header from "./components/Header";
import Footer from "./components/Footer";
import StationSearchMap from "./components/StationSearchMap";
import StationDetails from "./components/StationDetails";
import TestPreview from "./pages/TestPreview";
import ResultsPage from "./pages/ResultsPage";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function App() {
  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <Router>
        <Routes>
          {/* Preview route for testing (no header/footer) */}
          <Route path="/test" element={<TestPreview />} />

          <Route path="/results" element={<ResultsPage />} />

          {/* Landing route with header, search map, footer */}
          <Route
            path="/"
            element={
              <div className="min-h-screen">
                <Header />
                <StationSearchMap />
                <Footer />
              </div>
            }
          />

          {/* Station details route with header and footer */}
          <Route
            path="/station/:id"
            element={
              <div className="min-h-screen">
                <Header />
                <StationSearchMap/>
                <StationDetails />
                <Footer />
              </div>
          }
        />
        </Routes>
      </Router>
    </LoadScript>

  );
}

export default App;

