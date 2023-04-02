const axios = require('axios');

const cohereApiKey = process.env.COHERE_API_KEY;
const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;
const latitude = req.body.Latitude;
const longitude = req.body.Longitude;

// Use Google Maps Geocoding API to get readable location string
axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleMapsApiKey}`)
  .then((response) => {
    const location = response.data.results[0].formatted_address;

    // Use location in Cohere API request
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
