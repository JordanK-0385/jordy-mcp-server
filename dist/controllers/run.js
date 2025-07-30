"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runHandler = void 0;
const makeClient_1 = require("../utils/makeClient");
const scenarioMap_1 = require("../config/scenarioMap");
const runHandler = async (req, res) => {
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
    const scenarioId = scenarioMap_1.scenarioMap[actionKey];
    if (!scenarioId) {
        return res.status(404).json({ error: `Action non reconnue : ${actionKey}` });
    }
    try {
        const result = await (0, makeClient_1.runMakeScenario)(scenarioId, data);
        return res.json(result);
    }
    catch (error) {
        console.error("❌ Erreur lors de l’appel Make :", error.message);
        return res.status(500).json({ error: "Erreur interne MCP" });
    }
};
exports.runHandler = runHandler;
