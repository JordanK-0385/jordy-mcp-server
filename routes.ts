import { Router, Request, Response } from "express";
import { runHandler } from "./controllers/run";
import capabilities from "./capabilities.json";

const router = Router();

// Healthcheck
router.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ ok: true }); // pas de "status"
});

// ⚠️ IMPORTANT : Make poste sur "/" lors de la vérification → on délègue au JSON-RPC
router.post("/", runHandler);

// Capabilities
router.get("/capabilities", (_req: Request, res: Response) => {
  res.json({ capabilities });
});

// Entrée JSON-RPC officielle
router.post("/run", runHandler);

export default router;
