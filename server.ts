import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import cors from "cors";

// Initialize Gemini Client Lazily
let genAI: GoogleGenAI | null = null;
function getGenAI() {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    genAI = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return genAI;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cors());

  // API Routes
  app.post("/api/ai/translate-prompt", async (req, res) => {
    try {
      const { text, targetLang } = req.body;
      const ai = getGenAI();
      
      const prompt = `Translate the following Spanish sentence to ${targetLang}. Output ONLY the translation. Sentence: "${text}"`;
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });
      res.json({ translatedText: response.text });
    } catch (error: any) {
      console.error("Translation error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/ai/translate-word", async (req, res) => {
    try {
      const { word, context, targetLang } = req.body;
      const ai = getGenAI();
      
      const prompt = `Translate the word "${word}" from its source language into Japanese. 
Use the sentence context: "${context}". 
Provide the response in the following format: "Hiragana (Romaji)".
Example: "りんご (ringo)".
Output ONLY this string.`;
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });
      res.json({ translatedText: (response.text || "").replace(/[「」]/g, '') });
    } catch (error: any) {
      console.error("Word translation error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/ai/get-advice", async (req, res) => {
    try {
      const { userInput, targetAnswer, displayPrompt, languageName } = req.body;
      const ai = getGenAI();
      
      const prompt = `あなたは日本語教育の専門家です。
${languageName}の課題「${displayPrompt}」に対して、ユーザーは「${userInput}」と答えましたが、正解は「${targetAnswer}」でした。
ユーザーの答えのどこが間違っているのか、またはどうすればより自然な日本語になるのか、短く1〜2文でアドバイスを提供してください。
【重要】提供するアドバイスは「ひらがな」と「N5レベルの漢字」のみを使用してください。カタカナや難しい漢字は避けてください。
丁寧で励ますような口調でお願いします。`;
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });
      res.json({ advice: response.text });
    } catch (error: any) {
      console.error("Advice error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/ai/judge", async (req, res) => {
    try {
      const { userInput, targetAnswer, romaji } = req.body;
      const ai = getGenAI();
      
      const prompt = `
Task: Judge if a Japanese learner's input matches the target answer phonetically or as a direct equivalent.
Target Answer: "${targetAnswer}" (${romaji || ''})
Student Input: "${userInput}"

Rules:
- Accept if the input is the correct reading of the target (e.g. "ミラー" for "ミラー").
- Accept synonyms like "こちら" for "ここ".
- Accept Kanji/Kana/Romaji variations.
- Ignore minor spelling errors or particle typos if the core meaning is right.

Return ONLY 'CORRECT' or 'WRONG'.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });
      res.json({ judgement: (response.text || "").toUpperCase() });
    } catch (error: any) {
      console.error("Judging error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Vite Middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
