import { Request, Response } from "express";
import { runMakeScenario } from "../utils/makeClient";
import { scenarioMap } from "../config/scenarioMap";

export const runHandler = async (req: Request, res: Response) => {
  const { domain, action, data } = req.body;

  console.log("📨 Reçu de Make :", JSON.stringify(req.body, null, 2));
  console.log("🧪 Vérif MCP : logique isEmptyRequest =", !domain && !action && !data);


  // ✅ Cas test de connexion sans payload (test initial Make)
  const isEmptyRequest = !domain && !action && !data;
  if (isEmptyRequest) {
    return res.status(200).json({
      content: "✅ MCP connecté avec succès à Jordy (test Make)",
    });
  }

  // ❌ Cas réel incomplet
  if (!domain || !action || !data) {
    return res.status(400).json({ error: "Requête incomplète" });
  }

  const actionKey = `${domain}:${action}`;
  const scenarioId = scenarioMap[actionKey];

  if (!scenarioId) {
    return res.status(404).json({ error: `Action non reconnue : ${actionKey}` });
  }

  try {
    const result = await runMakeScenario(scenarioId, data);
    return res.json(result);
  } catch (error) {
    console.error("❌ Erreur lors de l’appel Make :", (error as Error).message);
    return res.status(500).json({ error: "Erreur interne MCP" });
  }
};
