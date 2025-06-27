import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Map from "./components/Map";
import Search from "./components/Search";
import TestPreview from "./pages/TestPreview";

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
    </Router>
  );
}

export default App;
