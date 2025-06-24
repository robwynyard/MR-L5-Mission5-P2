import React from 'react';
import Footer from './components/Footer'; // ✅ adjust path if your folder is nested
import Header from './components/Header';
function App() {
  return (
    <>
      {/* Your other page content goes here */}
      <div className="min-h-screen">
        {/* More main content */}
      </div>
      <Header /> {/* ✅ Drop your header here */}
      
      {/* Main content of the page */}
      <Footer /> {/* ✅ Drop your footer here */}
    </>
  );
}

export default App;
