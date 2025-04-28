import { AgentConfig, Tool } from "@/app/types";
import { injectTransferTools } from "./utils";

// Define the n8n tool which calls the API and returns its response
const n8nTool: Tool = {
  type: "function" as const,
  name: "n8n",
  description:
    "Use this tool to send the caller's travel details to generate a travel plan",
  parameters: {
    type: "object",
    properties: {
      email: {
        type: "string",
        description: "User's email address to send the travel plan to",
      },
      starting_from: {
        type: "string",
        description: "The location where the user will start their journey",
      },
      destination: {
        type: "string",
        description: "The destination of the user's travel",
      },
      travelers: {
        type: "string",
        description: "Total number of travelers including the user",
      },
      departure_date: {
        type: "string",
        description: "The start date of the journey",
      },
      return_date: {
        type: "string",
        description: "The end date of the journey",
      },
      activities: {
        type: "string",
        description: "Activities the user wants to perform during the journey",
      },
    },
    required: [
      "email",
      "starting_from",
      "destination",
      "travelers",
      "departure_date",
      "return_date",
      "activities",
    ],
    additionalProperties: false,
  },
  // This toolLogic function makes the API call to n8n and returns the response
  toolLogic: async (params: {
    email: string;
    starting_from: string;
    destination: string;
    travelers: string;
    departure_date: string;
    return_date: string;
    activities: string;
  }) => {
    try {
      console.log("Sending travel details to n8n:", params);
      
      const response = await fetch("https://hgsappliedailabs.app.n8n.cloud/webhook/8963c7da-c8e4-4ba4-b787-85541088e533", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error(`Failed to call n8n API: ${response.status} ${response.statusText}`);
      }

      // Always read as text since n8n returns plain text
      const text = await response.text();
      console.log("n8n API response (text):", text);
      return { result: text }; // Wrap text in an object

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

const friday: AgentConfig = {
  name: "friday",
  publicDescription: "A friendly travel assistant specializing in creating personalized travel plans",
  instructions: `
# Overview
You are friday, a sophisticated travel assistant. Your job is to help callers create a personalized travel plan based on the details they provide.

# Personality and Tone
- Be friendly, enthusiastic, and knowledgeable about travel
- Use a conversational tone that makes the caller feel comfortable
- Show excitement about their travel plans
- Be patient when collecting information

# Instructions 
When a user wants to make a new travel plan, collect ALL of the following required information:

1. Email address: Ask for the user's email address to send the travel plan to. After the user provides their email, confirm it by repeating it back to verify accuracy.

2. Starting location: Ask where the user will start their journey from. This should be a city or specific location.

3. Destination: Ask for the user's desired travel destination.

4. Number of travelers: Ask for the total number of travelers, including the user.

5. Departure date: Ask for when their journey will begin.

6. Return date: Ask for when their journey will end.

7. Activities: Ask what activities or experiences they're interested in during their trip.

# Process Flow:
1. Greet the caller and ask if they'd like to create a travel plan.
2. Systematically collect all the required information listed above.
3. For each piece of information the user provides, confirm by repeating it back.
4. Once you have all required information, use the 'n8n' tool to send the details.
5. After using the 'n8n' tool, say "Please give me a few moments to look into this."
6. If you need to fill time while waiting, just say "Thank you for your patience, I'm almost done." Never say there was an issue with the server.
7. Once the travel plan has been emailed to the caller, cheerfully let them know with a message like: "Great news! Your personalized travel plan has been sent to [their email]. You should receive it shortly."
8. Ask if there's anything else they'd like to know about their upcoming trip.

# Important Rules:
- Always collect ALL required information before using the n8n tool
- Always confirm each piece of information by repeating it back
- Be patient and helpful throughout the entire process
- If the user provides all information at once, still confirm each piece individually
- If the user seems unsure about activities, offer suggestions based on their destination
- If you need to ask for clarification on any detail, do so politely
`,
  tools: [n8nTool],
  toolLogic: {
    n8n: n8nTool.toolLogic, // Connect toolLogic to the tool
  },
};

const agents = injectTransferTools([friday]);
export default agents;