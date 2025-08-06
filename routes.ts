import { Router } from "express";
import { runHandler } from "./controllers/run";

const router = Router();

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
