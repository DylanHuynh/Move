const express = require('express');
const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./typeDefs');  // Assuming this exports a string or array of strings
const resolvers = require('./resolvers');
const { createMove } = require('./moveService');  // Make sure createMove is exported from moveService.js

async function startServer() {
  const app = express();
  app.use(bodyParser.json());

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  app.post('/save-events', async (req, res) => {
    try {
      const events = req.body;
      for (const event of events) {
        console.log(event);
        await createMove(event);
      }
      res.send('Events saved successfully');
    } catch (error) {
      console.error('Error saving events:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();
