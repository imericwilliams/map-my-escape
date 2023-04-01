const axios = require('axios');

const predictHQApiKey = process.env.PREDICTHQ_API_KEY;
const cohereApiKey = process.env.COHERE_API_KEY;

const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;

const lat = req.body.Latitude;
const lon = req.body.Longitude;

// Use Google Maps Geocoding API to convert the lat/lon to a formatted address string
axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${googleMapsApiKey}`)
.then((response) => {
    const addressComponents = response.data.results[0].address_components;
    const city = addressComponents.find(component => component.types.includes('locality')).long_name;
    const state = addressComponents.find(component => component.types.includes('administrative_area_level_1')).short_name;
    const country = addressComponents.find(component => component.types.includes('country')).long_name;
    const location = `${city}, ${state}, ${country}`;

    const startDate = new Date(Date.now() - 86400000).toISOString(); // 24 hours ago

    axios.get(`https://api.weather.gov/alerts/active?status=actual&message_type=alert&point=${lat},${lon}&start=${startDate}`, {
        headers: {
            'User-Agent': 'MapMyEscape/1.0.0',
            'Accept': 'application/geo+json',
            'token': predictHQApiKey,
        },
    })
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.error(error);
    });

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
})
.catch((error) => {
    console.error(error);
});
