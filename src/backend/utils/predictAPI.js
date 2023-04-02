const axios = require("axios");
require("dotenv").config();

// const startDate = new Date(Date.now() - 86400000).toISOString(); // 24 hours ago
module.exports = ({ Latitude, Longitude }) => {
  return axios
    .get(
      `https://api.predicthq.com/v1/events?category=health-warnings%2Cdisasters%2Csevere-weather&location_around.offset=20mi&location_around.origin=${Latitude}%2C${Longitude}&rank.lt=15`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PREDICTHQ_API_KEY}`,
          Accept: "application/json",
        },
      }
    )
    .then((response) => {
      // console.log(response.data.results[0]);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};
