const axios = require('axios');

const cohereApiKey = 'your_cohere_api_key';
const location = 'New York'; // example location

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
