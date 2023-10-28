import 'dotenv/config';
import { getEmbeddingFromHF } from "./getEmbedding";
import { getClient, queryVector } from "./vectorDB.mjs"

const client = getClient()

console.log(queryVector("test"));
