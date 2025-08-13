import { Request, Response } from "express";
import { runMakeScenario } from "../utils/makeClient";
import { scenarioMap } from "../config/scenarioMap";

exports.runHandler = async (req, res) => {
  const { jsonrpc, id, method, params } = req.body;

  // Validation JSON-RPC minimale
  if (jsonrpc !== "2.0" || typeof id === "undefined" || !method) {
    return res.status(400).json({
      jsonrpc: "2.0",
      id: typeof id === "undefined" ? null : id,
      error: { code: -32600, message: "Invalid Request: JSON-RPC 2.0 required" }
    });
  }

  try {
    // Exemple de test
    if (method === "ping") {
      const name = params?.name || "anonyme";
      return res.json({ jsonrpc: "2.0", id, result: { pong: `pong 🏓 (hello ${name})` } });
    }

    // Mappe tes capabilities -> méthodes
    if (method === "add_task") {
      // const result = await runMakeScenario(scenarioId, params);
      return res.json({ jsonrpc: "2.0", id, result: { message: "Tâche créée", params } });
    }

    // ... idem pour get_today_tasks, mark_task_done, etc.

    return res.status(404).json({
      jsonrpc: "2.0",
      id,
      error: { code: -32601, message: `Method not found: ${method}` }
    });
  } catch (e) {
    return res.status(500).json({
      jsonrpc: "2.0",
      id,
      error: { code: -32000, message: "Internal error: " + (e?.message || e) }
    });
  }
};

