import {ApolloServer} from "apollo-server-express";
import {buildSchema} from "type-graphql";
import {HelloResolver} from "../resolvers/hello-resolver";
import {Express} from "express";
import {pgDatabaseService} from "./pg-database-service";
import {CourseResolver} from "../resolvers/course-resolver";
import {UserResolver} from "../resolvers/user-resolver";
import {MyContext} from "../types/graphql-types";

class ApolloService {
  private _server: ApolloServer;

  async server() {
    const {db} = pgDatabaseService;

    this._server = new ApolloServer({
      schema: await buildSchema({
        resolvers: [HelloResolver, CourseResolver, UserResolver],
        validate: false,
      }),
      context: ({req, res}): MyContext => ({em: db.em, req, res})
    })
  }

  use(app: Express) {
    this._server.applyMiddleware({app});
  }
}

export const apolloService = new ApolloService;
