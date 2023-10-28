fetch = require("node-fetch");
require('dotenv').config({ path: 'llm/.env' });
const prompts = require('./prompts')

const ENDPOINT = process.env.TOGETHER_ENDPOINT_URL;
const API_TOKEN = process.env.TOGETHER_API_TOKEN;
const MODEL = "togethercomputer/llama-2-70b-chat"

async function getMoveTitle(eventDescription) {
  const body = `{"model": "${MODEL}", "prompt": "${"Description: " + eventDescription + ". " + prompts.generateMoveTitlePrompt}", "stop": "."}`
  console.log( `"${"Description: " + eventDescription + ". " + prompts.generateMoveTitlePrompt}"`);
  const response = await fetch(
      ENDPOINT,
      {
          headers: { Authorization: `Bearer ${API_TOKEN}`, "Content-Type": "application/json" },
          method: "POST",
          body
      }
  );
  const result = await response.json();
  console.log(result)
  return result.output.choices[0].text;
};

module.exports = getMoveTitle;
