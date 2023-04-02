require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
const client = require("twilio")(accountSid, authToken);

module.exports = async function (msg, phone) {
  const message = await client.messages
    .create({
      body: msg,
      from: `whatsapp:${twilioPhone}`,
      to: `${phone}`,
    })
    .catch((error) => console.error(error));
  console.log(message.body);
  return message;
};
