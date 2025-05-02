"use client";

import React, { Suspense, useCallback, useEffect, useState } from "react";
import LegacyMain from "./components/legacyMain";
import Main from "./components/Main";

import 'react-device-frameset/styles/marvel-devices.min.css'
import 'react-device-frameset/styles/device-selector.min.css'


// Create a wrapper component that uses searchParams
function AppContent() {
  const [useLegacy, setUseLegacy] = useState(false)

  useEffect(() => {
    localStorage.setItem('useLegacyUI', JSON.stringify(useLegacy))
  }, [useLegacy])

  const toggleLegacy = useCallback(() => {
    setUseLegacy((prev: boolean) => !prev)
  }, [])

  return useLegacy ? (
    <LegacyMain setUseLegacy={toggleLegacy} />
  ) : (
    <Main setUseLegacy={toggleLegacy} />
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