require('dotenv').config();
const { getEmbeddingFromHF } = require("./getEmbedding");
const { getClient, queryVector, initVectorDB, insertVector, wipeVectorDB } = require("./vectorDB.js");

const getContext = async (userMessage) => {
  similaritySearch = await queryVector(userMessage)
  console.log(similaritySearch);
  return similaritySearch;
}

getContext("i like animals, whats the move?")
getContext("i like animals, whats the move?")
getContext("i like animals, whats the move?")

// (async ()=>{ 
//   await wipeVectorDB();
//   await initVectorDB();

//   await insertVector("i like drinking alcohol", "message");
//   await insertVector("my friend ron can't drink any vodka.", "message");
//   await insertVector("i love dogs!!", "message");
//   await insertVector("i want to go to a zoo.", "message");
//   console.log(await queryVector("should i go to a bar?"));
// })()

module.exports = {getContext};