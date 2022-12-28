import { config } from "./config";
import mongoProvider from "./database_provider/atlasMongodb";
import dynamoProvider from "./database_provider/cyclicDynamodb";
import { Provider } from "./database_provider/provider.interface";

let provider: Provider;

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

export const { connect, readOne, readAll, readKeyList, insert, remove } =
  provider;
