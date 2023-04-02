const predictApi = require("./predictAPI");
const summarizeInformation = require("./summarizeInformation");
const sendWhatsappMsg = require("./sendWhatsappMsg");

module.exports = async ({ phone, Latitude, Longitude }) => {
  console.log({ phone, Latitude, Longitude });
  const response = await predictApi({ Latitude, Longitude });
  const uniqueAlertDescriptions = response.results
    .map((result) => {
      return result.description;
    })
    .reduce((acc, curr) => {
      return acc.includes(curr) ? acc : [...acc, curr];
    }, [])
    .slice(0, 3);

  const requests = uniqueAlertDescriptions.map((description) => {
    return summarizeInformation(description).then((res) => {
      return sendWhatsappMsg(res.body.summary, phone);
    });
  });

  return Promise.all(requests)
    .then((messages) => {
      console.log(messages);
    })
    .catch((err) => {
      console.log(err);
    });
};
