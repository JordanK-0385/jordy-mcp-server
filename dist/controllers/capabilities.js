"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.capabilitiesHandler = void 0;
const capabilities_json_1 = __importDefault(require("../capabilities.json"));
const capabilitiesHandler = (req, res) => {
    res.json({ capabilities: capabilities_json_1.default });
};
exports.capabilitiesHandler = capabilitiesHandler;
