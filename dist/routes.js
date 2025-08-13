"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const run_1 = require("./controllers/run");
const capabilities_json_1 = __importDefault(require("./capabilities.json"));
const router = (0, express_1.Router)();
// Healthcheck
router.get("/", (_req, res) => {
    res.status(200).json({ ok: true }); // pas de "status"
});
// ⚠️ IMPORTANT : Make poste sur "/" lors de la vérification → on délègue au JSON-RPC
router.post("/", run_1.runHandler);
// Capabilities
router.get("/capabilities", (_req, res) => {
    res.json({ capabilities: capabilities_json_1.default });
});
// Entrée JSON-RPC officielle
router.post("/run", run_1.runHandler);
exports.default = router;
