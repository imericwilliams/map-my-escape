const axios = require('axios');
require("dotenv").config();

const location = {
    "lat": 47.6062,
    "long": -122.3321
}
// const startDate = new Date(Date.now() - 86400000).toISOString(); // 24 hours ago

axios.get(`https://api.predicthq.com/v1/events?category=health-warnings%2Cdisasters%2Csevere-weather&location_around.offset=20mi&location_around.origin=${location.lat}%2C${location.long}&rank.lt=15`, {
    headers: {
        Authorization: `Bearer ${process.env.PREDICTHQ_API_KEY}`,
        "Accept": "application/json"
    },
})
.then((response) => {
    console.log(response.data);
})
.catch((error) => {
    console.error(error);
});
