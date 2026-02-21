
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getSmartRecommendation(currentTrackTitle: string, currentArtist: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Based on the song "${currentTrackTitle}" by ${currentArtist}, suggest a short description of the vibe and 3 similar artists in JSON format.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            vibeDescription: { type: Type.STRING },
            similarArtists: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["vibeDescription", "similarArtists"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    return null;
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
}
