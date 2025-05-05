type AgentMapping = {
  fontColor: string;
  filter: string;
};

type AgentMappings = {
  [key: string]: AgentMapping;
};

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

export default agentMappings