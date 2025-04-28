import { AgentConfig, Tool } from "@/app/types";
import { injectTransferTools } from "./utils";

// Define the n8n tool which calls the API and returns its response
const n8nTool: Tool = {
  type: "function" as const,
  name: "n8n",
  description:
    "Use this tool to perform actions: PTOBalance",
  parameters: {
    type: "object",
    properties: {
      sentence: {
        type: "string",
        description: "The command to send to n8n for processing.",
      },
      id: {
        type: "number",
        description: "Static identifier for internal routing (always 2).",
      },
    },
    required: ["sentence", "id"],
    additionalProperties: false,
  },
  toolLogic: async ({ sentence }: { sentence: string }) => {
    try {
      const response = await fetch("https://hgsappliedailabs.app.n8n.cloud/webhook/Balance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sentence, id: 2 }), // Always include id = 2
      });

      if (!response.ok) {
        throw new Error("Failed to call n8n API");
      }

      const text = await response.text();
      console.log("n8n API response (text):", text);
      return { result: text };
    } catch (error) {
      console.error("Error calling n8n API:", error);
      if (error instanceof Error) {
        return { error: error.message };
      } else {
        return { error: "An unknown error occurred" };
      }
    }
  },
};
//Second tool reques PTO
const requestPTOTool: Tool = {
  type: "function" as const,
  name: "requestPTO",
  description: "Use this tool to submit a PTO request with the desired number of hours.",
  parameters: {
    type: "object",
    properties: {
      hours: {
        type: "number",
        description: "Number of hours the employee wants to request off.",
      },
      id: {
        type: "number",
        description: "Static identifier for internal routing (always 2).",
      },
    },
    required: ["hours", "id"],
    additionalProperties: false,
  },
  toolLogic: async ({ hours }: { hours: number }) => {
    try {
      const response = await fetch("https://hgsappliedailabs.app.n8n.cloud/webhook/504582e4-5d3e-42df-8f61-e851e7633041", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: 2, hours }), // Always send id: 2
      });

      if (!response.ok) {
        throw new Error("Failed to call n8n API");
      }

      const text = await response.text();
      console.log("PTO Request API response:", text);
      return { result: text };
    } catch (error) {
      console.error("Error calling PTO request API:", error);
      if (error instanceof Error) {
        return { error: error.message };
      } else {
        return { error: "An unknown error occurred" };
      }
    }
  },
};
//Function personal day off
const personalDayOffHoursTool: Tool = {
  type: "function" as const,
  name: "personalDayOffHours",
  description: "Use this tool to retrieve how many personal day off hours the employee has per year.",
  parameters: {
    type: "object",
    properties: {
      id: {
        type: "number",
        description: "Static identifier for internal routing (always 2).",
      },
    },
    required: ["id"],
    additionalProperties: false,
  },
  toolLogic: async () => {
    try {
      const response = await fetch("https://hgsappliedailabs.app.n8n.cloud/webhook/Personaldays", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: 2 }),
      });

      if (!response.ok) {
        throw new Error("Failed to call personal day off hours API");
      }

      const text = await response.text();
      console.log("Personal Day Off Hours API response:", text);
      return { result: text };
    } catch (error) {
      console.error("Error calling Personal Day Off Hours API:", error);
      if (error instanceof Error) {
        return { error: error.message };
      } else {
        return { error: "An unknown error occurred" };
      }
    }
  },
};

//vacation
const vacationHoursTool: Tool = {
  type: "function" as const,
  name: "vacationHours",
  description: "Use this tool to retrieve how many vacation hours the employee has per year.",
  parameters: {
    type: "object",
    properties: {
      id: {
        type: "number",
        description: "Static identifier for internal routing (always 2).",
      },
    },
    required: ["id"],
    additionalProperties: false,
  },
  toolLogic: async () => {
    try {
      const response = await fetch("https://hgsappliedailabs.app.n8n.cloud/webhook/vacation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: 2 }),
      });

      if (!response.ok) {
        throw new Error("Failed to call vacation hours API");
      }

      const text = await response.text();
      console.log("Vacation Hours API response:", text);
      return { result: text };
    } catch (error) {
      console.error("Error calling Vacation Hours API:", error);
      if (error instanceof Error) {
        return { error: error.message };
      } else {
        return { error: "An unknown error occurred" };
      }
    }
  },
};

const harmony: AgentConfig = {
  name: "Harmony",
  publicDescription: "An HR assistant specializing in paid time off (PTO) management and policy guidance.",
  instructions: `
You are Harmony, a professional, courteous, and helpful HR assistant. Your main responsibility is to help employees manage their paid time off (PTO), answer questions about PTO policy, and assist with requests for time off.

## PTO Balance
- If the user wants to know their current PTO balance, call n8n with:
  "POST my PTO balance"

## Requesting PTO by Hours
- If the user wants to request PTO based on hours (not dates), ask for the number of hours.
- Then call requestPTO tool with:
  "I want to request <hours> hours of PTO"

## Annual Personal Day Off Hours
- If the user asks how many personal day off hours I have per year, call personalDayOffHours tool.

## Annual Vacation Hours
- If the user asks how many vacation hours I have per year, call vacationHours tool.

## PTO Policy
- If the user asks about the PTO policy, respond with the following details:

"PTO accrues at a rate of 1.25 days per month for full-time employees, totaling 15 days annually. Unused PTO can roll over up to a maximum of 5 days into the next calendar year. PTO cannot be cashed out, except in specific offboarding scenarios. New employees begin accruing PTO after completing a 30-day probationary period. Personal days are separate from PTO and must be requested in advance."

- Let the user know they can ask for clarification on any specific part of the policy.


## General Guidance
- Always confirm user inputs before proceeding with any action.
- If dates overlap with company blackout periods, notify the user.
- Respond with clear, friendly messages and confirm when actions are complete.
- Offer to help with anything else after each interaction.

Stay polite, professional, and efficient. Use a helpful tone, and ensure the user feels supported throughout the process.
  `,
    tools: [n8nTool, requestPTOTool], // Add the new tool here
    toolLogic: {
      n8n: n8nTool.toolLogic,
      requestPTO: requestPTOTool.toolLogic,
      personalDayOffHours: personalDayOffHoursTool.toolLogic,
      vacationHours: vacationHoursTool.toolLogic,
    },
  };
  

const agents = injectTransferTools([harmony]);
export default agents;