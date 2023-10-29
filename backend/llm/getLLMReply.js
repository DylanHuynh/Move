fetch = require("node-fetch");
require('dotenv').config();
const { generateReplyPrompt, generateIsolateLocationPrompt, generateReplyPromptWithActivities } = require('./prompts');
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
const isolateLocation = async (userMessage, chatHistory, name) => {
  // console.log(generateIsolateLocationPrompt(userMessage));
  return postLLM(generateIsolateLocationPrompt(userMessage, chatHistory, name));
}

// Get reply complete with context from history, vectorDB, and scraped activities
const getLLMReply = async (user, userMessage, chatId) => {
  const { _, id: userId, name: userName} = user;

  const chatHistory = await assembleDialogueContext(userName, "MoveAI", userId, chatId);

  // context strings from different sources, separated by \n
  const context = await getContext(userId, userMessage);
  console.log(context)
  const LLMOutput = await postLLM(generateReplyPrompt(context, chatHistory, userName, userMessage));
  if (LLMOutput == "getActivities") {
    let request, location;
    const locationOutput = await isolateLocation(userMessage, chatHistory, userName);

    // If a location cannot be parsed from userMessage, return a request for a location
    try {
      ({request, location} = JSON.parse(locationOutput));
    } catch (error) {
      return locationOutput;
    }
    const activities = await getActivities(location);
    return postLLM(generateReplyPromptWithActivities(activities, context, chatHistory, userName, request));
  }
  return LLMOutput;
};

(async () => {
  // console.log(await assembleDialogueContext("Input", "Output", 2, 2));
  console.log(await getLLMReply({name: "Evan", id: 2}, "What should my friend and I do this weekend?", 2));
  // console.log(await postTogetherAI());
  // const chatHistory = await assembleDialogueContext("Evan", "MoveAI", 4, 2);
  // console.log(chatHistory);
  // console.log(await isolateLocation("It's friday... what\\'s the move?", chatHistory));
  // console.log(await getContext(2, "hello"))
})()

module.exports = { getLLMReply };
