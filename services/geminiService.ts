import { GoogleGenAI } from "@google/genai";
import { characters } from "../data";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const systemInstruction = `
You are an expert guide for the Majora's Mask D&D Adventure.
You have access to a database of characters and locations.
Your goal is to help the user find information about NPCs, quests, and schedules.
Do not make up information not present in the lore of Majora's Mask or standard D&D 5e rules.
Be helpful, concise, and thematic.

Here is a summary of key characters you know about:
${characters.map(c => `- ${c.name} (${c.locationRegion}): ${c.description}`).join('\n')}
`;

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: systemInstruction,
      }
    });
    return response.text || "I couldn't decipher the stars for an answer.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The flow of time is distorted. I cannot answer right now.";
  }
};