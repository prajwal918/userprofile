import express from "express";
import cors from "cors";

export function createServer() {
  const app = express();
  
  app.use(cors());
  app.use(express.json());

  app.get("/api/health", (req, res) => {
    try {
      res.status(200).json({ status: "healthy" });
    } catch (error) {
      console.error("Health check failed:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  return app;
}
