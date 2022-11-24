"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectFromDb = exports.connectToDb = exports.db = void 0;
const config_1 = require("./config");
const logger_1 = __importDefault(require("./logger"));
const mongodb_1 = require("mongodb");
const client = new mongodb_1.MongoClient(config_1.config.databaseUrl);
exports.db = client.db(config_1.config.dbName);
async function connectToDb() {
    try {
        await client.connect();
        logger_1.default.info("Connected to Database");
    }
    catch (error) {
        logger_1.default.error(error);
        process.exitCode = 1;
    }
}
exports.connectToDb = connectToDb;
function disconnectFromDb() {
    logger_1.default.info("Disconnect from Database");
    return client.close();
}
exports.disconnectFromDb = disconnectFromDb;
//#############################################
// from vercel/mongodb-starter
//#############################################
// import { MongoClient } from 'mongodb';
// const uri = process.env.MONGODB_URI as string; // your mongodb connection string
// const options = {};
// let client;
// let clientPromise: Promise<any>;
// declare global {
//   var _mongoClientPromise: Promise<any>;
// }
// if (!process.env.MONGODB_URI) {
//   throw new Error('Please add your Mongo URI to .env.local');
// }
// if (process.env.NODE_ENV === 'development') {
//   // In development mode, use a global variable so that the value
//   // is preserved across module reloads caused by HMR (Hot Module Replacement).
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, options);
//     global._mongoClientPromise = client.connect();
//   }
//   clientPromise = global._mongoClientPromise;
// } else {
//   // In production mode, it's best to not use a global variable.
//   client = new MongoClient(uri, options);
//   clientPromise = client.connect();
// }
// // Export a module-scoped MongoClient promise. By doing this in a
// // separate module, the client can be shared across functions.
// export default clientPromise;
