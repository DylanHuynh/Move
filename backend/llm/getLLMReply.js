fetch = require("node-fetch");
require('dotenv').config();
const { generateReplyPrompt, generateIsolateLocationPrompt, generateReplyPromptWithActivities } = require('./prompts');
const { getContext } = require('./getContext');
const { getActivities } = require('../utils/getActivities');
const { formatDialogue } = require('../utils/stringUtils');
const { getLastTenMessagesByUserInChat } = require('../utils/prismaUtils');
const axios = require('axios')

const CHAT_HISTORY_MEMORY = 5;
const OpenAI =  require('openai');
const openai = new OpenAI({
  apiKey: "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"
});

const postLLM = async (prompt) => {
  console.log(prompt);
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prompt}],
    model: 'gpt-4',
  });
  return chatCompletion.choices[0].message.content;
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

  const LLMOutput = await postLLM(generateReplyPrompt(context, chatHistory, userName, userMessage));
  if (LLMOutput == "getActivities") {
    console.log("Researching activities")
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
