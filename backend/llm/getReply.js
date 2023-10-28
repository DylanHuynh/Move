const { generateReplyPrompt } = require('./prompts');
fetch = require("node-fetch");
require('dotenv').config();

const ENDPOINT = process.env.TOGETHER_ENDPOINT_URL;
const API_TOKEN = process.env.TOGETHER_API_TOKEN;
const MODEL = "mistralai/Mistral-7B-Instruct-v0.1"

const getReply = async (locations, context, userMessage, name) => {
  const body = `{"model": "${MODEL}", "prompt": "${generateReplyPrompt(locations, context, userMessage, name)}", "max_tokens": 256, "top-p": 0.8}`
  console.log(body);
  const response = await fetch(
      ENDPOINT,
      {
          headers: { Authorization: `Bearer ${API_TOKEN}`, "Content-Type": "application/json" },
          method: "POST",
          body
      }
  );
  const result = await response.json();
  return result.output.choices[0].text;
};

// (async ()=>{ 
//   console.log(await getReply(["Club X Nightclub, San Francisco", "The Zoo, San Francisco", "Disneyland, LA"], ["I enjoy going to night clubs"], "Can you come up with a plan for this month? It's friday and I'm bored.", "Evan"));
// })()

module.exports = getReply;
