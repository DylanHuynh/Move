const { MilvusClient, ConsistencyLevelEnum, DataType } = require("@zilliz/milvus2-sdk-node");
const { getEmbeddingFromHF } = require("./getEmbedding.js");
require('dotenv').config();

const ZILLIZ_ENDPOINT_URL = process.env.ZILLIZ_ENDPOINT_URL;
const ZILLIZ_API_TOKEN = process.env.ZILLIZ_API_TOKEN;

const getClient = () => new MilvusClient({
    address: ZILLIZ_ENDPOINT_URL,
    token: ZILLIZ_API_TOKEN,
});

const wipeVectorDB = async () => {
  const milvusClient = getClient();
  await milvusClient.dropCollection({collection_name: "context"})
  milvusClient.closeConnection();
}

const initVectorDB = async () => {
  const milvusClient = getClient();

  console.log("Connection status: " + milvusClient.connectStatus)
  const params = {
    collection_name: "context",
    description: "Context vector store for LLM",
    fields: [
      {
        name: "vector",
        description: "vector embedding of text",
        data_type: DataType.FloatVector,
        dim: 1024,
      },
      {
        name: "id",
        data_type: DataType.Int64,
        is_primary_key: true,
        autoID: true,
        description: "ID",
      },
      {
        name: "context_type",
        description: "message or preference",
        data_type: DataType.VarChar,
        max_length: 100,
      },
      {
        name: "userId",
        data_type: DataType.Int64,
        description: "USER ID",
      },
      {
        name: "text",
        description: "context text",
        data_type: DataType.VarChar,
        max_length: 10000,
      },
    ]
  }
  
  const createCollection = await milvusClient.createCollection(params);
  
  const index_params = {
    metric_type: "L2",
    index_type: "AUTOINDEX",
    params: JSON.stringify({ nlist: 1024 }),
  };
  
  console.log(await milvusClient.createIndex({
    collection_name: "context",
    field_name: "vector",
    index_name: "index",
    extra_params: index_params,
  }));
  
  console.log(await milvusClient.loadCollection({collection_name: "context"}))
  
  console.log('Database is created', createCollection);
};

const seedDB = async () => { 
  await wipeVectorDB();
  await initVectorDB();

  await insertVector(1, "i like drinking alcohol", "message");
  await insertVector(1, "my friend ron can't drink any vodka.", "message");
  await insertVector(1, "i love dogs!!", "message");
  await insertVector(1, "i want to go to a zoo.", "message");

  // for (let i = 0; i < 10; i++) {
    
  // }
}


const insertVector = async (userId, text, context_type) => {
  const milvusClient = getClient();

  data = [{
    context_type,
    text,
    vector: await getEmbeddingFromHF(text),
    userId,
  }];

  milvusClient.insert({collection_name: "context", data});
}

const queryVector = async (userId, text) => {
  const milvusClient = getClient();
  const vector = await getEmbeddingFromHF(text);
  const res = await milvusClient.search({
    filter: "userId == " + userId.toString(),
    collection_name: "context",
    vector,
    output_fields: ["text"],
    limit: 10,
    consistency_level: ConsistencyLevelEnum.Strong,
  });
  if (res.status.error_code == 'Success'){
    const out = res.results.map((result) => result.text).join("\n");
    milvusClient.closeConnection();
    return out;
  }
  return "Failed"
}

module.exports = { getClient, queryVector, initVectorDB, insertVector, wipeVectorDB };
