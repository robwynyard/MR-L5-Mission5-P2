import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import StationSearchMap from "./components/StationSearchMap";
import StationDetails from "./components/StationDetails";
import TestPreview from "./pages/TestPreview";

function App() {
  return (
    <Router>
      <Routes>
        {/* Preview route for testing (no header/footer) */}
        <Route path="/test" element={<TestPreview />} />

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
              <StationDetails />
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
