import { config } from "./config";
import * as mongoProvider from "./database_provider/atlasMongodb";
import * as dynamoProvider from "./database_provider/cyclicDynamodb";

let provider;

switch (config.dbProvider) {
  case "DynamoDB":
    provider = dynamoProvider;
    break;
  case "MongoDB":
    provider = mongoProvider;
    break;
  default:
    provider = dynamoProvider;
}

export const { connect, readOne, readAll, readList, insert, remove } = provider;
