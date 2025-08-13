import { Request, Response } from "express";
import { runMakeScenario } from "../utils/makeClient";
import { scenarioMap } from "../config/scenarioMap";

export const runHandler = async (req: Request, res: Response) => {
  const { jsonrpc, id, method, params } = req.body ?? {};

  // Validation JSON-RPC minimale
  if (jsonrpc !== "2.0" || typeof id === "undefined" || !method) {
    return res.status(400).json({
      jsonrpc: "2.0",
      id: typeof id === "undefined" ? null : id,
      error: { code: -32600, message: "Invalid Request: JSON-RPC 2.0 required" }
    });
  }

  try {
    // Test simple
    if (method === "ping") {
      const name = params?.name ?? "anonyme";
      return res.json({
        jsonrpc: "2.0",
        id,
        result: { pong: `pong 🏓 (hello ${name})` }
      });
    }

    // Mapping capabilities -> scenarios Make (facultatif si tu gères tout en local)
    const scenarioId = (scenarioMap as Record<string, string | undefined>)[method];
    if (scenarioId) {
      const result = await runMakeScenario(scenarioId, params ?? {});
      return res.json({ jsonrpc: "2.0", id, result });
    }

    // Exemple local pour add_task si tu ne veux pas appeler Make tout de suite
    if (method === "add_task") {
      return res.json({ jsonrpc: "2.0", id, result: { message: "Tâche créée", params } });
    }

    return res.status(404).json({
      jsonrpc: "2.0",
      id,
      error: { code: -32601, message: `Method not found: ${method}` }
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return res.status(500).json({
      jsonrpc: "2.0",
      id,
      error: { code: -32000, message: "Internal error: " + msg }
    });
  }
};
