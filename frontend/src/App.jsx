import React from "react";
import Footer from "./components/Footer"; // ✅ adjust path if your folder is nested
import Map from "./components/Map";

function App() {
  return (
    <>
      {/* Your other page content goes here */}
      <div className="min-h-screen">{/* More main content */}</div>
      <Map></Map>
      <Footer /> {/* ✅ Drop your footer here */}
    </>
  );
}

export default App;
