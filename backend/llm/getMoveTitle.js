fetch = require("node-fetch");
require('dotenv').config({ path: 'llm/.env' });
const prompts = require('./prompts')

const ENDPOINT = process.env.TOGETHER_ENDPOINT_URL;
const API_TOKEN = process.env.TOGETHER_API_TOKEN;
const MODEL = "garage-bAInd/Platypus2-70B-instruct"

async function getMoveTitle(eventDescription) {
  const response = await fetch(
      ENDPOINT,
      {
          headers: { Authorization: `Bearer ${API_TOKEN}`, "Content-Type": "application/json"},
          method: "POST",
          body: `{"model": "${MODEL}", "prompt": "${"Description: " + eventDescription + "\n" prompts.generateMoveTitlePrompt}", "temperature": 0.7, "topP": 0.7, "topK": 50}`
      }
  );
  const result = await response.json();
  console.log(result)
  return result.output.choices[0].text;
}

module.exports = getMoveTitle;

