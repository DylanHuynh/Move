const axios = require('axios')

const endpoint = 'http://localhost:4001/graphql';

const graphqlQuery = `
  query getUsers {
    user(id: $userId) {
      id
      name
      email
    }
  }
`;

const queryGQL = () => 
  axios.post(endpoint, { query: graphqlQuery })
    .then((response) => {
      if (response.data.errors) {
        console.error('GraphQL Errors:', response.data.errors);
      } else {
        console.log('GraphQL Data:', response.data.data);
      }
    })
    .catch((error) => {
      console.error('Network/Server Error:', error);
    });

exports.queryGQL = queryGQL