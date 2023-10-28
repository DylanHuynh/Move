const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema.graphql');
const resolvers = require('./resolvers');

async function startServer() {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4001;
  
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();
