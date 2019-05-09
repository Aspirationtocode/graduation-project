import * as mongoose from "mongoose";
import "reflect-metadata";
import { mongoDBConfig } from "../configs/mongodb/config";
import { startServer } from "./startServer";

const mondoDBConnectionURI = `mongodb://${mongoDBConfig.USERNAME}:${
  mongoDBConfig.PASSWORD
}@ds050539.mlab.com:50539/${mongoDBConfig.DATABASE_NAME}?retryWrites=true`;

mongoose
  .connect(mondoDBConnectionURI, {
    useNewUrlParser: true
  })
  .then(() => {
    startServer();
  })
  .catch(error => {
    console.log(error);
  });
