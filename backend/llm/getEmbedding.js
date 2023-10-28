fetch = require("node-fetch");
require('dotenv').config();

const HF_ENDPOINT_URL = process.env.HF_ENDPOINT_URL;
const HF_API_TOKEN = process.env.HF_API_TOKEN;

// POST to HuggingFace inference API to embed text
async function getEmbeddingFromHF(text) {
    const response = await fetch(
        HF_ENDPOINT_URL,
        {
            headers: { Authorization: `Bearer ${HF_API_TOKEN}` },
            method: "POST",
            body: JSON.stringify(text),
        }
    );
    const result = await response.json();
    return result;
}

module.exports = {getEmbeddingFromHF};
