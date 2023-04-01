const axios = require('axios');

const cohereApiKey =  process.env.COHERE_API_KEY;
const alerts = ['⚠️ Natural Hazard Alert! ⚠️']; 

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
