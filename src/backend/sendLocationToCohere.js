const axios = require('axios');

const cohereApiKey = process.env.COHERE_API_KEY;
const location = 'New York'; // the location will come via an HTTP Request by the Twilio WhatsApp API

axios.post('https://api.cohere.ai/baseline-summaries/generate', {
    input: `natural hazards in ${location}`,
    prompt: 'summarize information on natural hazards within 24 hours',
    models: ['baseline-summaries'],
    api_key: cohereApiKey,
})
.then((response) => {
    console.log(response.data);
})
.catch((error) => {
    console.error(error);
});
