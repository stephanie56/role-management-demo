import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { RegisterUserResolver } from './modules/user/Register';
import { UpdateUserResolver } from './modules/user/Update';

// Initialize an apollo server instance
const main = async () => {
  // Create a database connection using the ormconfig.json setup
  await createConnection();

  const schema = await buildSchema({
    resolvers: [RegisterUserResolver, UpdateUserResolver],
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
