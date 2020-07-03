import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';
import * as cors from 'cors';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { RegisterUserResolver } from './modules/user/Register';
import { UpdateUserResolver } from './modules/user/Update';

import * as dotenv from 'dotenv';
import { LoginUserResolver } from './modules/user/Login';
dotenv.config();

// Initialize an apollo server instance
const main = async () => {
  // Create a database connection using the ormconfig.json setup
  await createConnection();

  const schema = await buildSchema({
    resolvers: [RegisterUserResolver, UpdateUserResolver, LoginUserResolver],
  });
  // The ApolloServer constructor requires two parameters:
  // the schema definition and set of resolvers
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({ req, res }),
  });

  const app = express();

  app.use(
    cors({
      origin: '*',
      credentials: true,
    })
  );

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('server started on port http://localhost:4000/graphql');
  });
};

main();
