import React, { useEffect } from 'react';
import Image from 'next/image';

// Import agent configurations
import { allAgentSets } from "@/app/agentConfigs";
import agentMappings, { landingMappings, visibleAgents } from "@/app/data/agentMappings";
import AgentCard from './AgentCard';

const LandingPage = () => {
  useEffect(() => {
    // Add staggered animation to each agent card
    const cards = document.querySelectorAll('.agent-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('appear');
      }, 100 * index);
    });
  }, []);


  return (
    <div className="flex flex-col h-screen bg-gray-100 text-gray-800">
      {/* Header */}
      <div className="p-5 text-lg font-semibold flex justify-between items-center bg-white shadow-sm">
        <div className="flex items-center">
          <div style={{ cursor: 'pointer' }}>
            <Image
              src="/HGS-Logomark_Blue.svg"
              alt="HGS Logo"
              width={20}
              height={20}
              className="mr-2"
            />
          </div>
          <div>
            HGS Digital <span className="text-gray-500">Workers</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-6xl w-full">
          <h1 className="text-3xl font-bold text-center mb-8">Select a Digital Worker</h1>

          <div className="w-full max-w-6xl mx-auto">

            <div
              className="flex grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 justify-center"
              style={{
                height: "90%"
              }}
            >
              {Object.entries(allAgentSets).map(([scenarioKey, agents]) => (
                agents.filter(
                  agent => visibleAgents.names.includes((agent?.name ?? "").toLowerCase())
                ).map((agent, index) => {
                  return (
                    <AgentCard
                      key={`${scenarioKey}-${(agent?.name ?? "").toLowerCase()}-${index}`}
                      scenarioKey={scenarioKey}
                      agent={agent}
                      agentMappings={agentMappings}
                      landingMappings={landingMappings}
                    />
                  );
                })
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;