const axios = require('axios');

const cohereApiKey = 'your_cohere_api_key';
const alerts = ['some alert data']; // example alerts data

axios.post('https://api.cohere.ai/baseline-summaries/generate', {
    input: alerts.join('\n'),
    prompt: 'summarize the natural hazards found',
    models: ['baseline-summaries'],
    api_key: cohereApiKey,
})
.then((response) => {
    console.log(response.data);
})
.catch((error) => {
    console.error(error);
});
