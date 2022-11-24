"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.json(["😀", "😳", "🙄"]);
});
router.get("/:round", (req, res) => {
    res.json({
        round: 99,
        status: "pending",
    });
});
exports.default = router;
