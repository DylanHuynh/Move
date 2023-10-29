fetch = require("node-fetch");
require('dotenv').config();
const { generateReplyPrompt, generateIsolateLocationPrompt } = require('./prompts');
const { getContext } = require('./getContext');
const { getActivities } = require('../utils/getActivities');

const ENDPOINT = process.env.TOGETHER_ENDPOINT_URL;
const API_TOKEN = process.env.TOGETHER_API_TOKEN;
const MODEL = "lmsys/vicuna-13b-v1.5"

const postLLM = async (prompt) => {
  const body = `{"model": "${MODEL}", "prompt": "${prompt}", "temperature": 0.7, "stop": "</s>"}`
  const response = await fetch(
      ENDPOINT,
      {
          headers: { Authorization: `Bearer ${API_TOKEN}`, "Content-Type": "application/json" },
          method: "POST",
          body
      }
  );
  const result = await response.json();
  console.log(result);
  return result.output.choices[0].text;
}

const isolateLocation = async (userMessage) => {
  return postLLM(generateIsolateLocationPrompt(userMessage));
}

const getReply = async (user, userMessage) => {
  const { _, name} = user;
  const context = await getContext(userMessage);
  const activities = await getActivities(location);
  // console.log(activities)

  return postLLM(generateReplyPrompt(activities, context, userMessage, name));
};

(async () => {
  // console.log(await getReply({name: "Evan", location: "San Francisco"}, "2023-10-28T07:10:51.11", "What should my friend and I do this weekend?"));
  // console.log(await postTogetherAI());
  console.log(await isolateLocation("It's friday... what's the move?"));
})()

module.exports = { getReply };
