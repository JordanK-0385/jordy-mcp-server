"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const run_1 = require("./controllers/run");
const router = (0, express_1.Router)();
router.get("/capabilities", (req, res) => {
    res.json({
        capabilities: [
            {
                id: "ping",
                title: "Tester la connexion",
                description: "Répond simplement pong",
                parameters: {
                    name: "string"
                }
            }
        ]
    });
});
router.post("/run", run_1.runHandler);
exports.default = router;
