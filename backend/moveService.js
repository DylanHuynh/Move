const { request, gql } = require('graphql-request');

async function createMove(event) {
  const mutation = gql`
    mutation createMove($title: String!, $userId: Int!, $location: String!, $time: DateTime!, $description: String!, $chatId: Int!, $type: String!, $status: String!) {
      createMove(title: $title, userId: $userId, location: $location, time: $time, description: $description, chatId: $chatId, type: $type, status: $status) {
        id
      }
    }
  `;

  const variables = {
    title: event.title,
    userId: 7,
    location: event.Location,
    time: new Date(event.Date + ' ' + event.Time), 
    description: event.Description,
    chatId: 3, 
    type: 'event', 
    status: 'active' 
  };

  try {
    const response = await request('http://127.0.0.1:8000/graphql', mutation, variables);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

module.exports = { createMove };
