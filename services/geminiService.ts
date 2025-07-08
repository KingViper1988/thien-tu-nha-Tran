
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const getAiClient = (): GoogleGenAI => {
    // Retrieve the API key from the browser's local storage.
    const apiKey = typeof window !== 'undefined' ? window.localStorage.getItem('gemini_api_key') : null;

    if (!apiKey) {
        throw new Error("API key not found in localStorage. Please set it in the main menu.");
    }
    
    // Create a new client instance with the provided key.
    return new GoogleGenAI({ apiKey });
};


/**
 * Generates a yearly summary using the Gemini API.
 * @param prompt The detailed prompt for the model.
 * @returns A string containing the generated summary.
 */
export const generateYearlySummary = async (prompt: string): Promise<string> => {
    try {
        const client = getAiClient();
        const response: GenerateContentResponse = await client.models.generateContent({
            model: "gemini-2.5-flash",
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

    } catch (error: any) {
        console.error("Gemini API call failed:", error);
        if (error.message.includes("API key not found")) {
            return "Tâu bệ hạ, ấn tín của Sử quan (API Key) đã thất lạc. Xin hãy vào mục 'Thiết lập API Key' ở menu chính để thiết lập lại.";
        }
        if (error.message.includes("API key not valid")) {
             return "Tâu bệ hạ, ấn tín của Sử quan (API Key) không hợp lệ. Xin hãy kiểm tra lại.";
        }
        // Provide a user-friendly error message in the game's theme
        return "Tâu bệ hạ, thiên tượng bất thường, thần không thể tiên đoán hay ghi chép lại sự kiện. (A celestial anomaly prevents the scribes from recording the events.)";
    }
};
