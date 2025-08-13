import { Router, Request, Response } from "express";
import { runHandler } from "./controllers/run";
import capabilities from "./capabilities.json"; // utilise ton fichier

const router = Router();

// Healthcheck simple
router.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ ok: true });
});

// Désactive toute tentative de POST sur "/"
router.post("/", (_req: Request, res: Response) => {
  res.status(405).json({ error: "Use POST /run with JSON-RPC 2.0" });
});

// Capabilities complètes depuis capabilities.json
router.get("/capabilities", (_req: Request, res: Response) => {
  res.json({ capabilities });
});

// Entrée JSON-RPC 2.0 unique
router.post("/run", runHandler);

export default router;
