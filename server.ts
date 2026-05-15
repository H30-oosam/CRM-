import express, { Request, Response, NextFunction } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Global Constants
const PORT = 3000;
const HOST = "0.0.0.0";
const IS_PROD = process.env.NODE_ENV === "production";

// AI Initialization
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: { headers: { 'User-Agent': 'hossamelwardany-crm-v1' } }
});

async function startServer() {
  const app = express();

  // 1. Basic Middlewares
  app.use(express.json({ limit: "1mb" }));
  
  // Request Logger
  app.use((req, _res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });

  // 2. Specialized CRM Routes (API)
  const apiRouter = express.Router();

  // AI Assistant Logic (Moved to clean router logic)
  apiRouter.post("/ai/chat", async (req: Request, res: Response) => {
    try {
      const { prompt, context } = req.body;
      if (!prompt) return res.status(400).json({ error: "Prompt is required" });

      const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const systemPrompt = `
        You are a high-level CRM Consultant and AI Assistant for "HossamElwardany CRM".
        Context: ${JSON.stringify(context)}
        
        Focus on:
        - Boosting sales conversion.
        - Analyzing Lead potential.
        - Generating professional WhatsApp/Email templates.
        - Summarizing deal status.
        
        Always prioritize professional tone and accuracy. Support Arabic & English.
      `;

      const result = await model.generateContent([systemPrompt, prompt]);
      const responseText = result.response.text();
      
      res.json({ success: true, text: responseText });
    } catch (error: any) {
      console.error("Gemini AI Error:", error);
      res.status(500).json({ error: "AI Processing Failed" });
    }
  });

  // Analytics & Lead Scoring API (Stub for advanced logic)
  apiRouter.post("/analytics/score-lead", (_req, res) => {
    // In a real app, this would use a ML model or weighted attributes
    const dummyScore = Math.floor(Math.random() * 40) + 60; 
    res.json({ score: dummyScore, insight: "Strong interest based on recent interaction frequency." });
  });

  // PDF Generation Stub (For Invoices/Contracts)
  apiRouter.get("/invoices/export/:id", (req, res) => {
    const { id } = req.params;
    console.log(`Generating PDF for invoice: ${id}`);
    res.json({ message: "PDF generation started. You will be notified via system alerts.", downloadUrl: "#" });
  });

  // Automation Callbacks (Webhooks)
  apiRouter.post("/webhooks/whatsapp", (req, res) => {
    console.log("Received WhatsApp Webhook:", req.body);
    res.status(200).send("EVENT_RECEIVED");
  });

  // Public Health Check
  apiRouter.get("/health", (_req, res) => {
    res.json({ 
      status: "healthy", 
      version: "1.0.0",
      uptime: process.uptime(),
      environment: process.env.NODE_ENV 
    });
  });

  app.use("/api", apiRouter);

  // 3. Frontend Integration
  if (!IS_PROD) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // 4. Global Error Handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error("Critical Server Error:", err);
    res.status(500).json({ 
      error: "Internal Server Error", 
      message: IS_PROD ? "An unexpected error occurred" : err.message 
    });
  });

  // Start Listener
  app.listen(PORT, HOST, () => {
    console.log(`
🚀 HossamElwardany Professional CRM Backend
🌐 URL: http://${HOST}:${PORT}
🛡️ Mode: ${IS_PROD ? "Production" : "Development"}
    `);
  });
}

startServer().catch(err => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
