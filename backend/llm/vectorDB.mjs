import { MilvusClient, ConsistencyLevelEnum, DataType } from "@zilliz/milvus2-sdk-node";
import { getEmbeddingFromHF } from "./getEmbedding";
import 'dotenv/config';

const ZILLIZ_ENDPOINT_URL = process.env.ZILLIZ_ENDPOINT_URL;
const ZILLIZ_API_TOKEN = process.env.ZILLIZ_API_TOKEN;

const getClient = () => new MilvusClient({
  address: ZILLIZ_ENDPOINT_URL,
  token: ZILLIZ_API_TOKEN,
});

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
      name: "context_type",
      description: "message or preference",
      data_type: DataType.VarChar,
      max_length: 100,
    },
    {
      name: "id",
      data_type: DataType.Int64,
      is_primary_key: true,
      autoID: true,
      description: "ID",
    },
    {
      name: "text",
      description: "context text",
      data_type: DataType.VarChar,
      max_length: 10000,
    },
  ]
};

const createCollection = await milvusClient.createCollection(params);

console.log('Database is created', createCollection);

return milvusClient;
};

const insertVector = async (text, context_type) => {
const milvusClient = getClient();

data = [{
  context_type,
  text,
  vector: getEmbeddingFromHF(text),
}];

console.log(await milvusClient.insert({
  collection_name: "context",
  data: data,
}));

console.log(await milvusClient.flushSync({ collection_names: ["context"] }));

const index_params = {
  metric_type: "L2",
  index_type: "FLAT",
  params: JSON.stringify({ nlist: 1024 }),
};

console.log(await milvusClient.createIndex({
  collection_name: "context",
  field_name: "vector",
  index_name: "index",
  extra_params: index_params,
}));

console.log(await milvusClient.loadCollection({collection_name: "context"}))
}

const queryVector = async (text) => {
const res = await milvusClient.search({
  collection_name: "context",
  vector: data[0]["vector"],
  output_fields: ["id"],
  limit: 10,
  consistency_level: ConsistencyLevelEnum.Strong,
});
console.log(res);
}