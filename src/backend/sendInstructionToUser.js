// Assuming you already have a Twilio account set up and authenticated
// with your Twilio API keys

const client = require('twilio')('twilio_account_sid', 'twilio_auth_token');

const instructions = 'Detailed instructions on what to do during a natural disaster'; // example instructions
const phoneNumber = '+1234567890'; // example phone number

client.messages.create({
    body: instructions,
    from: 'your_twilio_phone_number',
    to: phoneNumber,
})
.then((message) => console.log(`Message sent to ${message.to}`))
.catch((error) => console.error(error));
