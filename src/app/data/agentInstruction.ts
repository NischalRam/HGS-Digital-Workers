import { TranscriptMappings, InstructionMappings, InstructionTranscriptMappings } from "../types";

// Transcript Messages
const transcripts: TranscriptMappings = {
    "jarvis": [
        {
            itemId: "jarvis-1",
            role: "assistant",
            title: "Hello! I'm Jarvis. How can I assist you with your credit card today?"
        },
        {
            itemId: "jarvis-2",
            role: "user",
            title: "I lost my credit card Jarvis, can you help me with that?"
        },
        {
            itemId: "jarvis-3",
            role: "assistant",
            title: "Of course! I'm here to help. Let's start by verifying your identity. Could you please provide the last four digits of your credit card and your date of birth?"
        },
        {
            itemId: "jarvis-4",
            role: "user",
            title: "Uh, sure. My last four digits of the credit card is 1111 and my date of birth is October 2nd, 2000."
        },
        {
            itemId: "jarvis-5",
            role: "assistant",
            title: "It seems like there was a slight issue verifying your information. Let's try again. Could you please confirm the last four digits of your credit card and your date of birth once more?"
        },
        {
            itemId: "jarvis-6",
            role: "user",
            title: "my card ends with 1111 and my dob is 1995-02-25"
        },
        {
            itemId: "jarvis-7",
            role: "assistant",
            title: "You've been successfully verified! Now, I can help you block your lost card and issue a new one. Would you like me to proceed with that?"
        },
        {
            itemId: "jarvis-8",
            role: "user",
            title: "Yeah, sure. Can you block my card, please?"
        },
        {
            itemId: "jarvis-9",
            role: "assistant",
            title: "Absolutely, give me just a few seconds to process your request. I'll block your card right away."
        },
        {
            itemId: "jarvis-10",
            role: "user",
            title: "Yeah, sure, that would be great."
        },
        {
            itemId: "jarvis-11",
            role: "assistant",
            title: "Got it! Give me a moment to check your current address for the new card shipment."
        },
        {
            itemId: "jarvis-12",
            role: "assistant",
            title: "Your address is 3311 S Emerald Ave, Chicago, IL 60616. I'll proceed with issuing your new card right away."
        },
        {
            itemId: "jarvis-13",
            role: "assistant",
            title: "Your new card has been issued and will be sent to Nischal Vooda at 3311 S Emerald Ave, Chicago, IL 60616. You can track your shipment with FedEx using Shipment ID: 3548385219. Is there anything else I can assist you with today?"
        },
        {
            itemId: "jarvis-14",
            role: "user",
            title: "There are also been unknown transactions recently, so can I review those transactions and make a dispute?"
        },
        {
            itemId: "jarvis-15",
            role: "assistant",
            title: "Absolutely, I'll help you review your recent transactions. Give me a moment to retrieve them for you."
        },
        {
            itemId: "jarvis-16",
            role: "assistant",
            title: "Here are your latest transactions:\nSpringfield Store, IL: Credit of $110 on January 26, 2025.\nSpringfield Electronics: Debit of $190 on January 27, 2025.\nTech Gadgets, Springfield, IL: Credit of $215 on February 28, 2025.\nLocal Diner, Springfield, IL: Debit of $20.50 on March 1, 2025.\nSpringfield Market, Springfield, IL: Credit of $85 on March 2, 2025.\nPlease let me know which transactions you'd like to dispute."
        },
        {
            itemId: "jarvis-17",
            role: "user",
            title: "the debit of $190 on January 27th it's not me so can you dispute that transaction for me"
        },
        {
            itemId: "jarvis-18",
            role: "assistant",
            title: "The disputed amount of $190 has been successfully credited back to your account. Is there anything else I can assist you with today?"
        },
        {
            itemId: "jarvis-19",
            role: "user",
            title: "no good I'm good thank you so much"
        },
        {
            itemId: "jarvis-20",
            role: "assistant",
            title: "You're welcome! I'm glad I could help. If you need anything else in the future, don't hesitate to reach out. Have a wonderful day!"
        }
    ],
    "friday": [
        {
            itemId: "friday-1",
            role: "assistant",
            title: "Hello there! Are you looking to create a personalized travel plan today? I'd love to help you get started on your next adventure!"
        },
        {
            itemId: "friday-2",
            role: "user",
            title: "Yeah, sure."
        },
        {
            itemId: "friday-3",
            role: "assistant",
            title: "Fantastic! Let's start by getting a few details. First, could you please provide your email address? I'll use it to send your personalized travel plan once we've got everything sorted out."
        },
        {
            itemId: "friday-4",
            role: "user",
            title: "Nischal.vooda@teamhgs.com"
        },
        {
            itemId: "friday-5",
            role: "assistant",
            title: "Great, let me confirm that: your email is nischal.vooda@teamhgs.com. Is that correct?"
        },
        {
            itemId: "friday-6",
            role: "user",
            title: "yes"
        },
        {
            itemId: "friday-7",
            role: "assistant",
            title: "Perfect! Next, where will you be starting your journey from? This could be a city or a specific location."
        },
        {
            itemId: "friday-8",
            role: "user",
            title: "I will start from Chicago"
        },
        {
            itemId: "friday-9",
            role: "assistant",
            title: "Starting from Chicago, got it! Now, where would you like to travel to? What's your dream destination for this trip?"
        },
        {
            itemId: "friday-10",
            role: "user",
            title: "I wanted to go to New York."
        },
        {
            itemId: "friday-11",
            role: "assistant",
            title: "Wonderful choice! Heading to New York, it is. How many travelers will be joining you on this adventure, including yourself?"
        },
        {
            itemId: "friday-12",
            role: "user",
            title: "I think it will be around 4 people."
        },
        {
            itemId: "friday-13",
            role: "assistant",
            title: "Four travelers, got it. When are you planning to depart on your journey to New York?"
        },
        {
            itemId: "friday-14",
            role: "user",
            title: "It's going to be 30th May"
        },
        {
            itemId: "friday-15",
            role: "assistant",
            title: "Leaving on the 30th of May, excellent. And when do you plan to return from your trip?"
        },
        {
            itemId: "friday-16",
            role: "user",
            title: "Next month, 15th."
        },
        {
            itemId: "friday-17",
            role: "assistant",
            title: "Returning on the 15th of June, that's a nice long trip! Lastly, what kind of activities or experiences are you interested in during your stay in New York?"
        },
        {
            itemId: "friday-18",
            role: "user",
            title: "I love architecture so I wanted to go through architecture tours and any tall buildings."
        },
        {
            itemId: "friday-19",
            role: "assistant",
            title: "Fantastic choice! New York is perfect for architecture tours and exploring tall buildings. Now that we have all the details, please give me a few moments to look into this."
        },
        {
            itemId: "friday-20",
            role: "assistant",
            title: "Great news! Your personalized travel plan has been sent to nischal.vooda@teamhgs.com. You should receive it shortly. Is there anything else you'd like to know or any other way I can assist with your upcoming trip?"
        },
        {
            itemId: "friday-21",
            role: "user",
            title: "I received my mail. Thank you so much."
        },
        {
            itemId: "friday-22",
            role: "assistant",
            title: "You're very welcome! I'm glad you received it. If you have any more questions or need further assistance, feel free to ask. Have an amazing time in New York! Safe travels!"
        }
    ],
    "harmony": [
        {
            itemId: "harmony-1",
            role: "assistant",
            title: "Hello! How can I assist you today with your PTOs?"
        },
        {
            itemId: "harmony-2",
            role: "user",
            title: "Hey can I know how many PTO I have"
        },
        {
            itemId: "harmony-3",
            role: "assistant",
            title: "You currently have 300 hours of PTO. Is there anything else I can assist you with?"
        },
        {
            itemId: "harmony-4",
            role: "user",
            title: "nice, can i request for 8 hr of PTO"
        },
        {
            itemId: "harmony-5",
            role: "assistant",
            title: "Just to confirm, you'd like to request 8 hours of PTO. Is that correct?"
        },
        {
            itemId: "harmony-6",
            role: "user",
            title: "yes"
        },
        {
            itemId: "harmony-7",
            role: "assistant",
            title: "Your request for 8 hours of PTO has been approved! You now have 292 hours remaining in your balance. Is there anything else I can help you with?"
        },
        {
            itemId: "harmony-8",
            role: "user",
            title: "Thank you so much"
        },
        {
            itemId: "harmony-9",
            role: "assistant",
            title: "You're welcome! If you need any more help, feel free to ask. Have a great day!"
        },
        {
            itemId: "harmony-10",
            role: "user",
            title: "can I know the company PTO policys"
        },
        {
            itemId: "harmony-11",
            role: "assistant",
            title: "Certainly! Here's an overview of the company PTO policy:\nPTO accrues at a rate of 1.25 days per month for full-time employees, totaling 15 days annually.\nUnused PTO can roll over up to a maximum of 5 days into the next calendar year.\nPTO cannot be cashed out, except in specific offboarding scenarios.\nNew employees begin accruing PTO after completing a 30-day probationary period.\nPersonal days are separate from PTO and must be requested in advance.\n\nIf you have any questions or need clarification on any specific part of the policy, please feel free to ask!"
        },
        {
            itemId: "harmony-12",
            role: "user",
            title: "Thank you so much"
        },
        {
            itemId: "harmony-13",
            role: "assistant",
            title: "You're welcome! If you have any other questions or need further assistance, just let me know. Have a wonderful day!"
        },
        {
            itemId: "harmony-14",
            role: "user",
            title: "what about my personal day"
        },
        {
            itemId: "harmony-15",
            role: "assistant",
            title: "You have 100 hours of personal day off per year. Let me know if there's anything else I can help you with!"
        },
        {
            itemId: "harmony-16",
            role: "user",
            title: "Nice Thank you"
        },
        {
            itemId: "harmony-17",
            role: "assistant",
            title: "You're very welcome! If you need anything else, just let me know. Have a great day!"
        }
    ]
};

// Instructions in Markdown format
const instructions: InstructionMappings = {
    "jarvis": `## Jarvis Bot Instructions

The Jarvis bot is designed to assist users who have lost their credit card and need immediate help. The bot will first verify the user's identity before proceeding with any further actions.

### How Verification Works:

To verify the user's identity, ask them to provide their credit card's last four digits and date of birth. For example, they can say:

- "My card ends with 1111 and my DOB is 1995-02-25."
- "My card ends with 1111 and my DOB is Feb 25th, 1995."

The bot will check this information against Salesforce records. If the details match, the user will be allowed to perform further actions.

### Key Capabilities of JARVIS:

- **Verifying User Identity:** The bot will verify the user's card details before proceeding with any requests.
- **Block Credit Card:** If a card is reported lost, JARVIS can block the credit card to prevent unauthorized transactions.
- **Ship a New Credit Card:** Once the card is blocked, JARVIS can issue and ship a new credit card to the user.
- **Address Confirmation & Update:** JARVIS can retrieve the current address on file and confirm whether it's correct. If the user needs to update their address, an email will be sent to their registered email address to complete the update.
- **Dispute Transactions:** The bot can retrieve the user's last 5 transactions and allow them to dispute any transaction they describe.

### Important Notes:

- **For Verification:** Always ask the user to provide the last four digits of their credit card and their date of birth in the format:
  - "My card ends with 1111 and my DOB is 1995-02-25" or
  - "My card ends with 1111 and my DOB is Feb 25th, 1995."
`,

    "friday": `
## Friday Bot Instructions

The Friday bot is designed to create a personalized travel plan based on the user's provided information. To ensure an accurate plan, the user needs to provide the following details:

1. Email Address
2. Start Location
3. Destination
4. Total Number of Travelers
5. Start Date
6. End Date
7. Activities of Interest

Once the user provides this information, the bot will process it and send an email containing:

- The top 2 best flights to the destination
- The top 2 recommended hotels or restaurants to stay at
- Suggested activities to do at the destination

You can either answer these questions individually, as shown in the example conversation, or give all the information at once in a single sentence. The bot is capable of extracting the required details from a single sentence.

### Example Input:

"I want to go to New York starting from Chicago. I will depart on May 25th and return on May 30th. There will be 4 people including me, and I love architecture tours."

In cases where the email is not mentioned initially, the bot will prompt for it and then process the request. The email should always end with **@teamhgs.com**. If the email is incorrect, the bot will not be able to send the travel plan.

### Important Notes:

- Ensure the email provided ends with **@teamhgs.com**.
- If the email is incorrect, the travel plan will not be sent.
- Please wait for at least 1 minute to receive the email.
- The bot can handle both individual questions and a single sentence with all the information at once.
`,

    "harmony": `
## Harmony Bot Instructions

The Harmony bot is designed to simplify the process of managing PTO requests. With this bot, you can:

- **Check Available PTO Hours:** Inquire about the remaining PTO hours.
- **Request PTO:** Submit a request for new PTO hours.
- **Track PTO Usage:** Ask how many PTO hours you have used so far.
- **Track Personal Days Off:** Inquire about the remaining personal days off or track how many you've used.
- **Review PTO Policies:** Request information about the company's PTO policies.

The bot processes all requests and updates the database accordingly.

### Important Notes:

- No Login Required: The bot automatically identifies the user once they're logged into the company's employee management system. This bot is for internal use only, available to employees. It will handle PTO requests and related actions based on the authenticated user's account.
`
};

// Function to combine instructions and transcripts
function combineInstructionsAndTranscripts(): InstructionTranscriptMappings {
    const combined: InstructionTranscriptMappings = {};

    for (const key in instructions) {
        if (transcripts[key]) {
            combined[key] = {
                transcript: transcripts[key],
                instruction: instructions[key]
            };
        }
    }

    return combined;
}

const instructionsAndTranscripts = combineInstructionsAndTranscripts();

export {
    transcripts,
    instructions,
    instructionsAndTranscripts
};