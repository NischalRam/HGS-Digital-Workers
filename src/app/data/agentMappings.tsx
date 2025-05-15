import { Calendar, Plane, WalletCards } from "lucide-react";
import React from "react";
import { AgentMappings, LandingMappings, VisibleAgents } from "../types";

const agentMappings: AgentMappings = {
  "harmony": {
    "fontColor": "#1A9EAD",
    "filter": "hue-rotate(-30deg) brightness(105%) saturate(90%)"
  },
  "friday": {
    "fontColor": "#E63946",
    "filter": "hue-rotate(120deg) brightness(110%) saturate(120%)"
  },
  "jarvis": {
    "fontColor": "#2A3B8F",
    "filter": ""
  }
}

const landingMappings: LandingMappings = {
  "harmony": {
    name: "Harmony",
    description: "Effortlessly manage your PTO scheduling with AI precision.",
    icon: <Calendar
      className="w-5 h-5 sm:w-9 sm:h-9 md:w-9 md:h-9 lg:w-10 lg:h-10"
      color="#1A9EAD"
    />
  },
  "friday": {
    name: "Friday",
    description: "Instantly craft custom travel experiences tailored exactly to your preferences!",
    icon: <Plane className="w-5 h-5 sm:w-9 sm:h-9 md:w-9 md:h-9 lg:w-10 lg:h-10" size={20} color="#E63946" />
  },
  "jarvis": {
    name: "Jarvis",
    description: "Secure your finances with instant fraud detection and resolution available 24/7.",
    icon: <WalletCards className="w-5 h-5 sm:w-9 sm:h-9 md:w-9 md:h-9 lg:w-10 lg:h-10" size={20} color="#2A3B8F" />
  }
}

const visibleAgents: VisibleAgents = {
  names: ["harmony", "friday", "jarvis"]
}

export {
  landingMappings,
  visibleAgents,
}
export default agentMappings