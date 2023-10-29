require('dotenv').config();
const { getEmbeddingFromHF } = require("./getEmbedding");
const { getClient, queryVector, initVectorDB, insertVector, wipeVectorDB } = require("./vectorDB");

const getContext = async (userId, userMessage) => {
  const similaritySearch = await queryVector(userId, userMessage)
  return similaritySearch;
}

module.exports = {getContext};