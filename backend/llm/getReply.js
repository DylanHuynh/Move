fetch = require("node-fetch");
require('dotenv').config();
const { generateReplyPrompt } = require('./prompts');
const { getContext } = require('./getContext');
const { getActivities } = require('../utils/getActivities');

const ENDPOINT = process.env.TOGETHER_ENDPOINT_URL;
const API_TOKEN = process.env.TOGETHER_API_TOKEN;
const MODEL = "mistralai/Mistral-7B-Instruct-v0.1"

const axios = require('axios')

const postTogetherAI = () => axios.post('https://api.together.xyz/inference', {
  "model": "mistralai/Mistral-7B-Instruct-v0.1",
  "max_tokens": 512,
  "prompt": "You are MoveAI, a friendly, helpful, and enthusiastic chatbot who comes up with spontaneous plans and fun itineraries for users based on their preferences, previous messages sent, and current request context. Always respond with a lot of detail, and whenever possible refer to the user's preferences or relevant past messages to personalize the chat. \\n Your goal, given a user request for an itinerary, is to output a structured itinerary for the user in JSON format, you MUST follow this schema: {message: string, location: string, description: string, time: string}. Think carefully step by step and plan how you would accomplish this. If you need to ask clarifying questions, do so first before outputting the final itinerary JSON. If you are ready to output the JSON itinerary, output ONLY the JSON and NOTHING ELSE. \\n Here is an example: \\n Evan: \\\"Can you come up with a plan for tonight? It's friday and I'm bored.\\\" \\n MoveAI: \\\"Will any friends be coming along with you?\\\" \\n Evan: \\\"No\\\" \\n MoveAI: {message: \\\"There is going to be an Ed Sheeran concert tonight in the Greek Theater in Berkeley at 10PM! You mentioned you love Ed Sheeran so I think you'll enjoy this.\\\", location: \\\"Greek Theater in Berkeley\\\", description: \\\"Ed Sheeran concert\\\", time: \\\"10PM\\\", } \\n Here are a set of activities: {\\\"title\\\":\\\"Lilly Palmer\\\",\\\"date\\\":{\\\"start_date\\\":\\\"Oct 28\\\",\\\"when\\\":\\\"Fri, Oct 27, 10 PM – Sat, Oct 28, 4 AM PDT\\\"},\\\"address\\\":[\\\"Halcyon SF, 314 11th St\\\",\\\"San Francisco, CA\\\"],\\\"description\\\":\\\"Fri, 27 Oct 2023. Line-Up: Lilly Palmer. Get Your Tickets On RA.\\\"},{\\\"title\\\":\\\"CounterPulse Festival\\\",\\\"date\\\":{\\\"start_date\\\":\\\"Oct 28\\\",\\\"when\\\":\\\"Oct 2, 1 PM – Oct 29, 11 PM PDT\\\"},\\\"address\\\":[\\\"CounterPulse, 80 Turk St\\\",\\\"San Francisco, CA\\\"],\\\"description\\\":\\\"The 2023 biennial CounterPulse Festival is a month-long celebration of the kind of mind-bending performance you can only find in San Francisco. Join us this October for experimental dance, late...\\\"},{\\\"title\\\":\\\"Deer Tick\\\",\\\"date\\\":{\\\"start_date\\\":\\\"Oct 29\\\",\\\"when\\\":\\\"Sun, Oct 29 – Mon, Oct 30\\\"},\\\"address\\\":[\\\"Harding Theater, 628 Divisadero St\\\",\\\"San Francisco, CA\\\"],\\\"description\\\":\\\"Emotional Contracts , the latest full-length album from Deer Tick, catalogs all the existential casualties that accompany the passing of time, instilling each song with the irresistibly reckless...\\\"},{\\\"title\\\":\\\"Come As You Are: A Psychedelic San Francisco...\\\",\\\"date\\\":{\\\"start_date\\\":\\\"Oct 28\\\",\\\"when\\\":\\\"Sat, Oct 28, 11 AM – 4 PM PDT\\\"},\\\"address\\\":[\\\"Jerry Garcia Amphitheater, 40 John F Shelley Dr\\\",\\\"San Francisco, CA\\\"],\\\"description\\\":\\\"The event producers of the iconic ‘Do You Remember? Music Festival’ in Golden Gate Park are bringing a new kind of celebration to San Francisco this Halloween. Local arts nonprofit Big Leap...\\\"},{\\\"title\\\":\\\"Oktoberfest\\\",\\\"date\\\":{\\\"start_date\\\":\\\"Oct 28\\\",\\\"when\\\":\\\"Sat, Oct 28, 12:00 – 4:30 PM PDT\\\"},\\\"address\\\":[\\\"Six Flags Discovery Kingdom, 1001 Fairgrounds Dr\\\",\\\"Vallejo, CA\\\"],\\\"description\\\":\\\"Food. Beer. Fun. Enjoy craft & seasonal brews complimented with a menu of German inspired cuisine, music and live entertainment! Don’t miss the Beer Keg Tapping Ceremony, Fun Photo Ops and...\\\"},{\\\"title\\\":\\\"Lohengrin\\\",\\\"date\\\":{\\\"start_date\\\":\\\"Oct 28\\\",\\\"when\\\":\\\"Oct 15 – Nov 1\\\"},\\\"address\\\":[\\\"War Memorial Opera House, 301 Van Ness Ave\\\",\\\"San Francisco, CA\\\"],\\\"description\\\":\\\"Lohengrin | O'Neill, Kutasi, Sigmundsson, Mulligan, Adams, Alden, Kim, San Francisco Opera, Lehman, Steinberg, Davey, Silverman, San Francisco Opera Orchestra, San Francisco Opera Chorus\\\"},{\\\"title\\\":\\\"Open Mic Event\\\",\\\"date\\\":{\\\"start_date\\\":\\\"Oct 28\\\",\\\"when\\\":\\\"Oct 23, 5:30 PM – Nov 22, 12:28 AM PDT\\\"},\\\"address\\\":[\\\"The Riptide, 3639 Taraval St\\\",\\\"San Francisco, CA\\\"],\\\"description\\\":\\\"x\\\"},{\\\"title\\\":\\\"Día de los Muertos Celebration\\\",\\\"date\\\":{\\\"start_date\\\":\\\"Oct 29\\\",\\\"when\\\":\\\"Sun, Oct 29, 5 PM – Mon, Oct 30, 12 AM\\\"},\\\"address\\\":[\\\"International Blvd\\\",\\\"California\\\"],\\\"description\\\":\\\"FacebookTweet 🌼🎶 Get ready for an unforgettable Dia de los Muertos Festival! 🎉 We’ve got an incredible entertainment lineup spanning\\\"},{\\\"title\\\":\\\"Alex Edelman\\\",\\\"date\\\":{\\\"start_date\\\":\\\"Oct 28\\\",\\\"when\\\":\\\"Sat, Oct 28, 2:00 – 8:30 PM PDT\\\"},\\\"address\\\":[\\\"The Curran Theatre, 445 Geary St\\\",\\\"San Francisco, CA\\\"],\\\"description\\\":\\\"Buy Just For Us tickets at the Curran Theatre in San Francisco, CA for Oct 28, 2023 at Ticketmaster.\\\"},{\\\"title\\\":\\\"Open Mic Event\\\",\\\"date\\\":{\\\"start_date\\\":\\\"Oct 28\\\",\\\"when\\\":\\\"Oct 24, 5:30 PM – Nov 23, 10:21 AM PDT\\\"},\\\"address\\\":[\\\"The Riptide, 3639 Taraval St\\\",\\\"San Francisco, CA\\\"],\\\"description\\\":\\\"x\\\"}, and relevant previous messages and preferences sent by Evan. \\n Evan: What should my friend and I do this weekend? \\n MoveAI: ",
  "request_type": "language-model-inference",
  "temperature": 0.5,
  "top_p": 0.8,
  "top_k": 50,
  "repetition_penalty": 1,
  "stream_tokens": false,
  "stop": [
    "[/INST]",
    "</s>"
  ],
  "negative_prompt": "",
  "sessionKey": "5771675b0ebda47d12f3332520047b4b81a3b7de",
  "safety_model": "",
  "repetitive_penalty": 1,
  "update_at": "2023-10-29T00:00:19.607Z"
}, {
  headers: {
    Authorization: 'Bearer db6a9525412547b1fbe52f1f59333016dfea0c6333fec029bab55c294ce7fd07'
  }    
}).then((response) => (response.data.output.choices), (error) => {
  console.log(error);
});

const getReply = async (user, userMessage) => {
  const { _, name, location} = user;
  const context = await getContext(userMessage);
  const activities = await getActivities(location);
  // console.log(activities)

  const body = `{"model": "${MODEL}", "prompt": "${generateReplyPrompt(activities, context, userMessage, name)}"}`
  console.log(body);
  const response = await fetch(
      ENDPOINT,
      {
          headers: { Authorization: `Bearer ${API_TOKEN}`, "Content-Type": "application/json" },
          method: "POST",
          body
      }
  );
  const result = await response.json();
  return result.output.choices[0].text;
};

(async () => { 
  // console.log(await getReply({name: "Evan", location: "San Francisco"}, "2023-10-28T07:10:51.11", "What should my friend and I do this weekend?"));
  // console.log(await postTogetherAI());
})()

module.exports = { getReply };
