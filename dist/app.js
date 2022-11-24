"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const api_1 = __importDefault(require("./api"));
const app = (0, express_1.default)();
app.use((0, helmet_1.default)()); // add security layer
app.use((0, cors_1.default)()); // allow cross-origin requests
app.use(express_1.default.json()); // allow JSON in POST
app.get("/", (req, res) => {
    return res.send("Nothing to see here.");
});
app.use("/api/v1", api_1.default);
exports.default = app;
