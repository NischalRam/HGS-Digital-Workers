"use client";

import React, { Suspense, useState } from "react";
import LegacyMain from "./components/legacyMain";
import Main from "./components/Main";

import 'react-device-frameset/styles/marvel-devices.min.css'
import 'react-device-frameset/styles/device-selector.min.css'


// Create a wrapper component that uses searchParams
function AppContent() {
  const [useLegacy, setUseLegacy] = useState(true)

  return useLegacy ? (
    <LegacyMain setUseLegacy={() => { setUseLegacy(!useLegacy) }} />
  ) : (
    <Main setUseLegacy={() => { setUseLegacy(!useLegacy) }} />
  )

}

// Main App component that wraps the content in a Suspense boundary
function App() {
  return (
    <Suspense fallback={<div className="p-5">Loading...</div>}>
      <AppContent />
    </Suspense>
  );
}

export default App;