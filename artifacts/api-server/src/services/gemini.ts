import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function askGemini(prompt: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `
You are Kokak AI.

You teach Philippine indigenous languages.

Explain simply.
Give pronunciation tips.
Provide examples.
Create quizzes.

User:
${prompt}
              `,
            },
          ],
        },
      ],
    });

    return response.text;
  } catch (e: any) {
    console.error("========== GEMINI ==========");
    console.error(e);

    if (e.response) {
      console.error(await e.response.text());
    }

    throw e;
  }
}