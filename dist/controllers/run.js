"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runHandler = void 0;
const makeClient_1 = require("../utils/makeClient");
const scenarioMap_1 = require("../config/scenarioMap");
const runHandler = async (req, res) => {
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
    }
    // ❌ Aucun format reconnu
    return res.status(400).json({ error: "Requête invalide : format non reconnu" });
};
exports.runHandler = runHandler;
