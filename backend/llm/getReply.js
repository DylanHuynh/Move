fetch = require("node-fetch");
require('dotenv').config();
const { generateReplyPrompt, generateIsolateLocationPrompt } = require('./prompts');
const { getContext } = require('./getContext');
const { getActivities } = require('../utils/getActivities');
const { formatDialogue } = require('../utils/stringUtils');
const { getLastTenMessagesByUserInChat } = require('../utils/prismaUtils');
const axios = require('axios')

const ENDPOINT = process.env.TOGETHER_ENDPOINT_URL;
const API_TOKEN = process.env.TOGETHER_API_TOKEN;
const MODEL = "garage-bAInd/Platypus2-70B-instruct"
const MODEL_PROMPT = (p) => `### Instruction:\n${p}\n### Response:\n`
const CHAT_HISTORY_MEMORY = 10;

const postLLM = async (prompt) => {
  console.log(MODEL_PROMPT(prompt))
  return axios.post(ENDPOINT, {
    "model": "garage-bAInd/Platypus2-70B-instruct",
    "max_tokens": 512,
    "prompt": MODEL_PROMPT(prompt),
    "request_type": "language-model-inference",
    "temperature": 0.7,
    "top_p": 0.7,
    "top_k": 50,
    "repetition_penalty": 1,
    "stop": [
      "</s>",
      "###"
    ],
    "negative_prompt": "",
    "sessionKey": "d1c09dfae5b24b6604874acdc39e21a9129d306d",
    "safety_model": "",
    "repetitive_penalty": 1,
    "update_at": "2023-10-29T06:06:06.970Z"
  }, {
    headers: {
      Authorization: 'Bearer ' + API_TOKEN
    }    
  }).then((response) => {
    return response.data.output.choices[0].text
  }, (error) => {
    console.log(error);
  });
}

const assembleDialogueContext = async (userName, AIName, userId, chatId) => {
  const userMessages = await getLastTenMessagesByUserInChat(userId, chatId);
  const AIMessages = await getLastTenMessagesByUserInChat(0, chatId);
  return formatDialogue(userName, userMessages, AIName, AIMessages);
}

// Use LLM to parse or prompt user for location
const isolateLocation = async (userMessage, chatHistory) => {
  // console.log(generateIsolateLocationPrompt(userMessage));
  return postLLM(generateIsolateLocationPrompt(userMessage, chatHistory));
}

// Get reply complete with context from history, vectorDB, and scraped activities
const getReply = async (user, userMessage, chatId) => {
  const { _, userId, name} = user;

  const chatHistory = await assembleDialogueContext(name, "MoveAI", userId, chatId);
  const locationDict = await isolateLocation(userMessage, chatHistory);

  // If a location cannot be parsed from userMessage, return a request for a location
  try {
    const {request, location} = JSON.parse(locationDict);
  } catch (error) {
    return locationDict;
  }

  // context strings from different sources, separated by \n
  const context = await getContext(userMessage);
  const activities = await getActivities(location);
  console.log(activities);
  
  return postLLM(generateReplyPrompt(activities, context, request, name));
};

(async () => {
  console.log(await assembleDialogueContext("Input", "Output", 4, 2));
  // console.log(await getReply({name: "Evan"}, "What should my friend and I do this weekend?"));
  // console.log(await postTogetherAI());
  // const chatHistory = await assembleDialogueContext("Evan", "MoveAI", 4, 2);
  // console.log(chatHistory);
  // console.log(await isolateLocation("It's friday... what\\'s the move?", chatHistory));
})()

module.exports = { getReply };
