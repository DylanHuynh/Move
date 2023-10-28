const express = require('express');
const embed = require('./getEmbedding')
const getMoveTitle = require('./getMoveTitle')

async function startServer() {
  const app = express();

  const PORT = process.env.PORT || 4002;
  
  app.use(express.json());

  app.post('/get-embedding', async (req, res) => {
    const textData = req.body.text;
    if (textData) {
      res.send(await embed(textData));
    } else {
      res.send('Please provide text data in the request body.');
    }
  });

  app.post('/get-move-title', async (req, res) => {
    const moveDescription = req.body.text;
    if (moveDescription) {
      res.send(await geartMoveTitle(moveDescription));
    } else {
      res.send('Please provide text data in the request body.');
    }
  });

  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
  });
}

startServer();
