import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const getAssistantResponse = async (userMessage: string, history: { role: "user" | "model", parts: { text: string }[] }[]) => {
  try {
    const model = "gemini-3-flash-preview";
    const response = await ai.models.generateContent({
      model,
      contents: [
        ...history.map(h => ({ role: h.role, parts: h.parts })),
        { role: "user", parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: `You are the "TELP Support Assistant", a calm, supportive, and non-judgmental AI for teenagers.
        Your goal is to help users facing bullying, abuse, or sexual violence.
        Rules:
        1. Use gentle, supportive language.
        2. Do not act as a therapist, lawyer, or police officer.
        3. Suggest contacting trusted adults or emergency services if the situation sounds urgent or dangerous.
        4. Provide clear, simple steps for safety.
        5. Never blame the victim.
        6. If asked about emergency services, provide general advice to call local emergency numbers (like 911 or 999).
        7. Keep responses concise and youth-friendly.
        8. Disclaimer: You are an AI assistant providing guidance, not a replacement for professional help or emergency services.`,
        temperature: 0.7,
      },
    });

    return response.text || "I'm here to support you. Could you tell me a bit more about what's happening?";
  } catch (error) {
    console.error("Assistant Error:", error);
    return "I'm sorry, I'm having a little trouble connecting right now. Please remember you can always reach out to a trusted adult or emergency services if you need immediate help.";
  }
};
