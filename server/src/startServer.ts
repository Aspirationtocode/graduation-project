import * as express from "express";
import { serverConfig } from "../configs/server/config";
import bodyParser = require("body-parser");
import { buildSchema } from "type-graphql";
import { UserResolver } from "./models/user/resolver";
import * as path from "path";
import * as graphqlHTTP from "express-graphql";
import { paths } from "../../common/paths";

const app = express();

app.use(bodyParser.json());

app.use(express.static(paths.frontend.DIST));

app.get("/", (request, response) => {
  response.sendFile(paths.frontend.INDEX_HTML);
});

app.get("/r", (request, response) => {
  response.send("Hello");
});

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
