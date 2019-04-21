import * as mongoose from "mongoose";
import "reflect-metadata";
import { mongoDBConfig } from "../configs/mongodb/config";
import { startServer } from "./startServer";

const mondoDBConnectionURI = `mongodb+srv://${mongoDBConfig.USERNAME}:${
  mongoDBConfig.PASSWORD
}@cluster0-pv9q5.mongodb.net/${mongoDBConfig.DATABASE_NAME}?retryWrites=true`;

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
