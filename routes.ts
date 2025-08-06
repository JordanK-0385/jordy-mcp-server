import { Router } from "express";
import { runHandler } from "./controllers/run";

const router = Router();

// Route racine GET (pour test Make)
router.get("/", (_req, res) => {
  res.status(200).json({ status: "MCP OK" });
});

// Route racine POST (pour test Make)
router.post("/", (_req, res) => {
  res.status(200).json({ status: "MCP OK" });
});

router.get("/capabilities", (_req, res) => {
  res.json({
    capabilities: [
      {
        id: "ping",
        title: "Tester la connexion",
        description: "Répond simplement pong",
        parameters: {
          name: "string"
        }
      }
    ]
  });
});

router.post("/run", runHandler);

export default router;
