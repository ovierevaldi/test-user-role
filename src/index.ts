import express, { Request, Response } from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';

// REST API Endpoint
const app = express();
const PORT = process.env.PORT || 3000;

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
const apolloServer = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
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
