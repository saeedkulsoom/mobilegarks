import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API Routes
  app.post("/api/gargi/chat", async (req, res) => {
    try {
      const { message, context, isAdmin } = req.body;
      
      const systemInstruction = isAdmin 
        ? "You are Gargi, the intelligent AI administrator of GarKS. You analyze inventory, sales data, and store performance. Be professional, data-driven, and proactive."
        : "You are Gargi, the friendly AI fashion assistant of GarKS. Help customers find their perfect style, recommend products, and assist with shopping. Be elegant, kind, and inspiring.";

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          { text: systemInstruction },
          { text: `Context: ${JSON.stringify(context)}` },
          { text: message }
        ],
      });

      res.json({ text: response.text });
    } catch (error) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: "Failed to communicate with AI" });
    }
  });

  // Mock Inventory Analysis
  app.post("/api/admin/analyze-inventory", async (req, res) => {
    try {
      const { inventoryData } = req.body;
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          { text: "Analyze this inventory data and provide 3 key insights. Suggest 1 actionable marketing campaign." },
          { text: JSON.stringify(inventoryData) }
        ],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              insights: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              marketingCampaign: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  impact: { type: Type.STRING }
                },
                required: ["title", "description", "impact"]
              }
            },
            required: ["insights", "marketingCampaign"]
          }
        }
      });

      res.json(JSON.parse(response.text));
    } catch (error) {
      res.status(500).json({ error: "Failed to analyze data" });
    }
  });

  // Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
