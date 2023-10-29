require('dotenv').config();
const { getEmbeddingFromHF } = require("./getEmbedding");
const { getClient, queryVector, initVectorDB, insertVector, wipeVectorDB } = require("./vectorDB.js");

const getContext = async (userId, userMessage) => {
  similaritySearch = await queryVector(userId, userMessage)
  console.log(similaritySearch)
  return similaritySearch;
}

module.exports = {getContext};