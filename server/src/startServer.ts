import * as express from "express";
import bodyParser = require("body-parser");
import { buildSchema } from "type-graphql";
import * as graphqlHTTP from "express-graphql";
import { serverConfig } from "../configs/server/config";
import { resolvers } from "./resolvers";
import { authChecker } from "./auth/authChecker";
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

export function startServer() {
  buildSchema({
    resolvers,
    authChecker,
    validate: false
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
