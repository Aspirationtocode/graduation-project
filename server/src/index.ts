import * as express from "express";
import * as mongoose from "mongoose";
import { serverConfig } from "./configs/server/config";
import { mongoDBConfig } from "./configs/mongodb/config";

const app = express();

mongoose
  .connect(
    `mongodb+srv://${mongoDBConfig.USERNAME}:${
      mongoDBConfig.PASSWORD
    }@cluster0-pv9q5.mongodb.net/${
      mongoDBConfig.DATABASE_NAME
    }?retryWrites=true`,
    {
      useNewUrlParser: true
    }
  )
  .then(() => {
    app.listen(serverConfig.SERVER_PORT, () => {
      console.log(`App server listening on ports ${serverConfig.SERVER_PORT}`);
    });
  })
  .catch(error => {
    console.log(error);
  });

app.get("/", (request, response) => {
  response.send("Hello!");
});
