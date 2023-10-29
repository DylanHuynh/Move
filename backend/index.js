const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema.graphql');  // Assuming this exports a string or array of strings
const resolvers = require('./resolvers');
const { spawn } = require('child_process');

async function startServer() {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();
  server.applyMiddleware({ app });


  const PORT = process.env.PORT || 4001;
  
  const uvicorn = spawn('uvicorn', ['utils.eventAPI.eventScraper:app', '--host', '0.0.0.0', '--port', '8000']);

  uvicorn.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });
  
  uvicorn.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
  
  uvicorn.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();
