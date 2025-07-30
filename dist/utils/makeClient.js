"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runMakeScenario = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const runMakeScenario = async (scenarioId, parameters) => {
    const baseUrl = `https://${process.env.MAKE_ZONE}/api`;
    const response = await (0, node_fetch_1.default)(`${baseUrl}/v2/scenarios/${scenarioId}/run`, {
        method: "POST",
        headers: {
            Authorization: `Token ${process.env.MAKE_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ parameters })
    });
    if (!response.ok) {
        throw new Error(`Erreur Make: ${response.statusText}`);
    }
    return response.json();
};
exports.runMakeScenario = runMakeScenario;
