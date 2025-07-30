import { Router } from "express";
import { capabilitiesHandler } from "./controllers/capabilities";
import { runHandler } from "./controllers/run";

const router = Router();

router.get("/capabilities", capabilitiesHandler);
router.post("/run", runHandler);
router.post("/execute", runHandler);

export default router;
