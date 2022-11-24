"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bribedata_routes_1 = __importDefault(require("./bribedata/bribedata.routes"));
const chartdata_routes_1 = __importDefault(require("./chartdata/chartdata.routes"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    return res.send("Welcome to API v1");
});
router.get("/healthcheck", (req, res) => {
    return res.send("alive");
});
router.use("/bribedata", bribedata_routes_1.default);
router.use("/chartdata", chartdata_routes_1.default);
exports.default = router;
