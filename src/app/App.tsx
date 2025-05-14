"use client";

import React, { Suspense, useCallback, useEffect, useState } from "react";
import LegacyMain from "./components/legacyMain";
import Main from "./components/Main";
import LandingPage from "./components/LandingPage";

import 'react-device-frameset/styles/marvel-devices.min.css'
import 'react-device-frameset/styles/device-selector.min.css'
import { useSearchParams } from "next/navigation";

import { allAgentSets } from "./agentConfigs";


// Create a wrapper component that uses searchParams
function AppContent() {
  const searchParams = useSearchParams()
  const [useLegacy, setUseLegacy] = useState(false)

  const agentConfig = searchParams.get("agentConfig")

  const agentList = Object.entries(allAgentSets)
    .flatMap(([scenarioKey, agents]) => [
      scenarioKey.toLowerCase(),
      ...agents.map(agent => agent.name.toLowerCase())
    ]);


  const landingPage = !agentList.includes((agentConfig ?? "").toLocaleLowerCase() ?? "")

  useEffect(() => {
    localStorage.setItem('useLegacyUI', JSON.stringify(useLegacy))
  }, [useLegacy])

  const toggleLegacy = useCallback(() => {
    setUseLegacy((prev: boolean) => !prev)
  }, [])

  return (landingPage ?
    <LandingPage />
    :
    useLegacy ? (
      <LegacyMain setUseLegacy={toggleLegacy} />
    ) : (
      <Main setUseLegacy={toggleLegacy} />
    )
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