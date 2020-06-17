import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';
import { Resolver, Query, buildSchema } from 'type-graphql';

// Resolver is like a controller that
// resolve data for the server, this simple
// resolver returns the string 'hello world' back
@Resolver()
class HelloResolver {
  @Query(() => String, { nullable: true })
  async hello() {
    return 'hello world';
  }
}

// Initialize an apollo server instance
const main = async () => {
  const schema = await buildSchema({
    resolvers: [HelloResolver],
  });
  // The ApolloServer constructor requires two parameters:
  // the schema definition and set of resolvers
  const apolloServer = new ApolloServer({ schema });

  const app = express();

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('server started on port http://localhost:4000/graphql');
  });
};

main();
