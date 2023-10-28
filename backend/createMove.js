const { getEventData } = require('./eventDataService');
const { createMove } = require('./moveService'); // or require('./graphqlUtils');

async function handleEventSave(req, res) {
  try {
    const eventData = await getEventData();
    for (const eventTitle in eventData) {
      const event = eventData[eventTitle];
      await createMove(event);
    }
    res.send('Events saved successfully');
  } catch (error) {
    console.error('Error handling event save:', error);
    res.status(500).send('Internal Server Error');
  }
}

const mockReq = {

};

// const mockRes = {
//     send: (message) => console.log('Response send:', message),
//     status: function (code) {
//         console.log('Status code set:', code);
//         return this;
//     }
// };
  
// handleEventSave(mockReq, mockRes);
  
handleEventSave();
