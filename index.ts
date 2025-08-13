import express from "express";
import dotenv from "dotenv";
import router from "./routes"; // <-- assure-toi que le fichier s'appelle bien routes.ts

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());        // indispensable pour req.body
app.use("/", router);           // monte les routes à la racine

// (optionnel) 404 générique pour tout le reste
app.use((_req, res) => res.status(404).json({ error: "Not found" }));

app.listen(PORT, () => {
  console.log(`✅ Jordy MCP Server is running on http://localhost:${PORT}`);
});
