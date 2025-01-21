import express, { Request, Response } from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import 'reflect-metadata';
import { AppDataSource } from './datasource';
import { buildSchema } from 'type-graphql';
import AccountResolvers from './Resolvers/Account-resolvers';
import customAuthChecker from './auth-checker';

// REST API Endpoint
const app = express();
const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
.then(() => {
  console.log('Data Source has been initialized!');
})
.catch((err) => {
  console.error('Error during Data Source initialization', err);
});

app.get('/rest', (req: Request, res: Response) => {
  res.json({ message: 'Hello from REST endpoint!' });
});

// GraphQL Schema
const typeDefs = `
  type Query {
    hello: String
    getNumber: Int
    greet(name: String!): String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello, GraphQL!',
    getNumber: () => 42,
    greet: (_: any, { name }: { name: string }) => `Hello, ${name}!`,
  },
};

// Apollo Server Setup

async function startServer() {
  const schema = await buildSchema({
    resolvers: [AccountResolvers],
    authChecker: customAuthChecker,
  });

  const apolloServer = new ApolloServer({ schema });

  // Start Apollo Server
  await apolloServer.start();

  // Apply Apollo Middleware to Express
  app.use(express.json());
  app.use(
    '/graphql',
    cors(), // Enable CORS
    expressMiddleware(apolloServer) // Apollo middleware
  );

  // Start Express Server
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
  });
}

startServer();
