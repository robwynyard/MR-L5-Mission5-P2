import React from 'react';
import Footer from './components/Footer'; // ✅ adjust path if your folder is nested

function App() {
  return (
    <>
      {/* Your other page content goes here */}
      <div className="min-h-screen">
        {/* More main content */}
      </div>

      <Footer /> {/* ✅ Drop your footer here */}
    </>
  );
}

export default App;
