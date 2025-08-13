"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes")); // <-- assure-toi que le fichier s'appelle bien routes.ts
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json()); // indispensable pour req.body
app.use("/", routes_1.default); // monte les routes à la racine
// (optionnel) 404 générique pour tout le reste
app.use((_req, res) => res.status(404).json({ error: "Not found" }));
app.listen(PORT, () => {
    console.log(`✅ Jordy MCP Server is running on http://localhost:${PORT}`);
});
