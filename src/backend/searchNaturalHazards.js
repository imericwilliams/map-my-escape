const axios = require('axios');

const noaaApiKey =  process.env.NOAA_API_KEY;
const location = 'New York'; // the location will come via an HTTP Request by the Twilio WhatsApp API
const startDate = new Date(Date.now() - 86400000).toISOString(); // 24 hours ago

axios.get(`https://api.weather.gov/alerts/active?status=actual&message_type=alert&point=${location}&start=${startDate}`, {
    headers: {
        'User-Agent': 'MapMyEscape/1.0.0',
        'Accept': 'application/geo+json',
        'token': noaaApiKey,
    },
})
.then((response) => {
    console.log(response.data);
})
.catch((error) => {
    console.error(error);
});
