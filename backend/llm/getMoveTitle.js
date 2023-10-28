fetch = require("node-fetch");
require('dotenv').config();
const prompt = require('./prompts')

const ENDPOINT = process.env.TOGETHER_ENDPOINT_URL;
const API_TOKEN = process.env.TOGETHER_API_TOKEN;
const MODEL = "garage-bAInd/Platypus2-70B-instruct"

async function getMoveTitle(eventDescription) {
  console.log(prompt)
  const response = await fetch(
      ENDPOINT,
      {
          headers: { Authorization: `Bearer ${API_TOKEN}` },
          method: "POST",
          body: `{"model": "${MODEL}", "prompt": "${prompt + " " + eventDescription}", "temperature": 0.8, "top_p": 0.7, "top_k": 50, "max_tokens": 1, "repetition_penalty": 1}`
      }
  );
  const result = await response.json();
  return result;
}

module.exports = getMoveTitle;

