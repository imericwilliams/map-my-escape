const predictApi = require("./predictAPI");
const summarizeInformation = require("./summarizeInformation");
const sendWhatsappMsg = require("./sendWhatsappMsg");

module.exports = async ({ phone, Latitude, Longitude }) => {
  let response;
  try {
    response = await predictApi({ Latitude, Longitude });
  } catch (err) {
    console.log(err);
  }
  const uniqueAlertDescriptions =
    response?.results
      .map((result) => {
        return result.description;
      })
      .reduce((acc, curr) => {
        return acc.includes(curr) ? acc : [...acc, curr];
      }, [])
      .slice(0, 3) || [];

  const requests = uniqueAlertDescriptions.map((description) => {
    console.log("Summarizing description with CoHere");
    return summarizeInformation(description).then((res) => {
      console.log("Sending summarized alert to user")
      return sendWhatsappMsg(res.body.summary, phone);
    });
  });

  return Promise.all(requests)
    .then((messages) => {
      // console.log(messages);
    })
    .catch((err) => {
      console.log(err);
    });
};
