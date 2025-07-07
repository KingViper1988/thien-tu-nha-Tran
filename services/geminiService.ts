
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Ensure the API key is available as an environment variable
if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a yearly summary using the Gemini API.
 * @param prompt The detailed prompt for the model.
 * @returns A string containing the generated summary.
 */
export const generateYearlySummary = async (prompt: string): Promise<string> => {
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-04-17",
            contents: prompt,
            config: {
                systemInstruction: "You are a wise and formal court scribe (Sử quan) for the Tran Dynasty in 13th-century Vietnam. Write in a respectful, slightly archaic, and literary Vietnamese style suitable for royal annals. Your task is to summarize the emperor's year based on the provided decisions.",
                temperature: 0.7,
                topP: 1,
                topK: 32,
            }
        });

        // The .text property directly gives the string output
        return response.text;

    } catch (error) {
        console.error("Gemini API call failed:", error);
        // Provide a user-friendly error message in the game's theme
        return "Tâu bệ hạ, thiên tượng bất thường, thần không thể tiên đoán hay ghi chép lại sự kiện. (A celestial anomaly prevents the scribes from recording the events.)";
    }
};
