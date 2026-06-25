import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

import { db } from "@workspace/db";

import {
  languagesTable,
  wordsTable,
} from "@workspace/db/schema";

console.log("Seed script started");
console.log(languagesTable);
console.log(wordsTable);
console.log("KEY EXISTS:", !!process.env.GEMINI_API_KEY);

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

await db.insert(languagesTable)
  .values({
    code: "ceb",
    name: "Cebuano",
  })
  .catch(() => {});
  
async function generateWords() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
Return ONLY valid JSON.

Generate 20 common Cebuano vocabulary entries.

[
  {
    "filipinoWord": "",
    "targetWord": "",
    "meaning": "",
    "pronunciation": "",
    "exampleSentence": "",
    "usageNotes": ""
  }
]
`,
    config: {
      responseMimeType: "application/json",
    },
  });

  const words = JSON.parse(response.text!);

  const rows = words.map((word: any) => ({
    ...word,
    languageCode: "ceb",
  }));

  await db.insert(wordsTable).values(rows);

  console.log(`Inserted ${rows.length} Cebuano words`);
}

await generateWords();