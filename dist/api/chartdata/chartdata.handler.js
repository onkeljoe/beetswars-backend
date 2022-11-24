"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOne = exports.createOne = exports.findAll = void 0;
const mongodb_1 = require("mongodb");
const database_1 = require("../../utils/database");
const table = database_1.db.collection("chartdata");
async function findAll(req, res, next) {
    try {
        const chartdata = await table.find().toArray();
        res.json(chartdata);
    }
    catch (error) {
        next(error);
    }
}
exports.findAll = findAll;
async function createOne(req, res, next) {
    try {
        const result = await table.insertOne(req.body);
        if (!result.acknowledged)
            throw new Error("Error inserting Chartdata");
        res.status(201);
        res.json({ _id: result.insertedId, ...req.body });
    }
    catch (error) {
        next(error);
    }
}
exports.createOne = createOne;
async function findOne(req, res, next) {
    try {
        const sid = new mongodb_1.ObjectId(req.params.id);
        const result = await table.findOne({ _id: sid });
        if (!result) {
            res.status(404);
            throw new Error("No Object with given ID found");
        }
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}
exports.findOne = findOne;
