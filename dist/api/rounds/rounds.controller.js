"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
function getRoundListHandler(req, res, next) {
    try {
    }
    catch (error) {
        logger_1.default.error(error, "getRoundListHandlder: get");
    }
}
