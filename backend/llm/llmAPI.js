const express = require('express');
const embed = require('./embedding')
const getMoveTitle = require('./getMoveTitle')

async function startServer() {
  const app = express();

  const PORT = process.env.PORT || 4002;
  
  app.use(express.json());

  app.post('/embedding', async (req, res) => {
    const textData = req.body.text;
    if (textData) {
      res.send(await embed(textData));
    } else {
      res.send('Please provide text data in the request body.');
    }
  });

  app.post('/generate_title', async (req, res) => {
    const moveDescription = req.body.text;
    if (moveDescription) {
      res.send(await getMoveTitle(moveDescription));
    } else {
      res.send('Please provide text data in the request body.');
    }
  });

  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
  });
}

startServer();
