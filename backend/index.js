const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema.graphql');
const resolvers = require('./resolvers');

async function startServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        // Define a custom logger using the 'logger' option.
        logger: {
          debug: (message) => console.debug(message),
          info: (message) => console.info(message),
          warn: (message) => console.warn(message),
          error: (message) => console.error(message),
        },
        formatError: (error) => {
            console.error('Apollo Server Error:', error);
            return error;
          },
      });

      const app = express();
      await server.start();
      server.applyMiddleware({ app });
      
      const PORT = process.env.PORT || 4001;
      app.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
      });
}

startServer();
