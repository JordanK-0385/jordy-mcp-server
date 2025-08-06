import { Request, Response } from "express";
import { runMakeScenario } from "../utils/makeClient";
import { scenarioMap } from "../config/scenarioMap";

export const runHandler = async (req: Request, res: Response) => {
  const { capabilityId, parameters, domain, action, data } = req.body;

  console.log("📨 Reçu de Make :", JSON.stringify(req.body, null, 2));

  // ✅ Cas test de connexion (aucune donnée)
  const isEmptyRequest = !capabilityId && !domain && !action && !data;
  if (isEmptyRequest) {
    return res.status(200).json({
      content: "✅ MCP connecté avec succès à Jordy (test Make)",
    });
  }

  // ✅ Cas Make natif (capabilityId + parameters)
  if (capabilityId === "ping") {
    const name = parameters?.name || "anonyme";
    return res.json({ result: `pong 🏓 (hello ${name})` });
  }

  // ✅ Cas Jordy avancé (domain + action + data)
  if (domain && action && data) {
    // === LOGGING DU threadID SI PRÉSENT ===
    const threadID = data.threadID || data.threadId || data.thread_id;
    if (threadID) {
      console.log("🔗 Thread ID détecté pour ce projet :", threadID);
    } else {
      console.log("⚠️ Aucun Thread ID transmis dans cette requête.");
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
  }

  // ❌ Aucun format reconnu
  return res.status(400).json({ error: "Requête invalide : format non reconnu" });
};
