require('dotenv').config();
const { getEmbeddingFromHF } = require("./getEmbedding");
const { getClient, queryVector, initVectorDB, insertVector, wipeVectorDB } = require("./vectorDB.js");

const getContext = async (userMessage) => {
  similaritySearch = await queryVector(userMessage)
  return similaritySearch;
}

module.exports = {getContext};