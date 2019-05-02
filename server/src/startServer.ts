import * as express from "express";
import { serverConfig } from "../configs/server/config";
import bodyParser = require("body-parser");
import { buildSchema } from "type-graphql";
import { UserResolver } from "./models/user/resolver";
import * as graphqlHTTP from "express-graphql";

const app = express();

app.use(bodyParser.json());
export function startServer() {
  buildSchema({
    resolvers: [UserResolver]
  })
    .then(schema => {
      app.use(
        "/graphql",
        graphqlHTTP({
          schema,
          graphiql: true
        })
      );
    })
    .catch(error => {
      console.log(error);
    });
  app.listen(serverConfig.SERVER_PORT, () => {
    console.log(`App server listening on ports ${serverConfig.SERVER_PORT}`);
  });
}
