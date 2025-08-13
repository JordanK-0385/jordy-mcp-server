"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const run_1 = require("./controllers/run");
const capabilities_json_1 = __importDefault(require("./capabilities.json")); // utilise ton fichier
const router = (0, express_1.Router)();
// Healthcheck simple
router.get("/", (_req, res) => {
    res.status(200).json({ ok: true });
});
// Désactive toute tentative de POST sur "/"
router.post("/", (_req, res) => {
    res.status(405).json({ error: "Use POST /run with JSON-RPC 2.0" });
});
// Capabilities complètes depuis capabilities.json
router.get("/capabilities", (_req, res) => {
    res.json({ capabilities: capabilities_json_1.default });
});
// Entrée JSON-RPC 2.0 unique
router.post("/run", run_1.runHandler);
exports.default = router;
