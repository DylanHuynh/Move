const { request, gql } = require('graphql-request');

// eventDataService.js
const axios = require('axios');

async function getEventData() {
  try {
    const response = await axios.get('http://127.0.0.1:8000/get-events/');
    console.log(response);
    return response.data; // Assuming the event data is in the response body
  } catch (error) {
    console.error('Error fetching event data:', error);
    throw error;
  }
}

module.exports = { getEventData };
