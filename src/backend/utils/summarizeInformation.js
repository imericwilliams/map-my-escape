const axios = require("axios");

const cohereApiKey = process.env.COHERE_API_KEY;

const cohere = require("cohere-ai");
cohere.init(cohereApiKey);

module.exports = (description) => {
  return cohere
    .summarize({
      text: description,
      format: "bullets",
    })
    .then((response) => {
      // console.log(response.body);
      return response;
    })
    .catch((error) => {
      console.error(error);
    });
};
