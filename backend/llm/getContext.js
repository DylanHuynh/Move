require('dotenv').config();
const { getEmbeddingFromHF } = require("./getEmbedding");
const { getClient, queryVector, initVectorDB, insertVector, wipeVectorDB } = require("./vectorDB.js");

const getContext = async (userMessage) => {
  similaritySearch = await queryVector(userMessage)
  return similaritySearch;
}
// (async ()=>{
//   await wipeVectorDB();
//   await initVectorDB();

//   await insertVector(1, "i like drinking alcohol", "message");
//   await insertVector(1, "my friend ron can't drink any vodka.", "message");
//   await insertVector(1, "i love dogs!!", "message");
//   await insertVector(1, "i want to go to a zoo.", "message");
//   console.log(await queryVector(1, "should i go to a bar?"));
// })()
module.exports = {getContext};