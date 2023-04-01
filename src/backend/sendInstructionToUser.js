// Assuming you already have a Twilio account set up and authenticated
// with your Twilio API keys

const twilioAcctSID = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
import getNaturalHazardType from './naturalDisastersHazards';
const client = require('twilio')(twilioAcctSID, authToken);

// const instructions = 'Detailed instructions on what to do during a natural disaster'; // example instructions
const phoneNumber =  process.env.TEST_PHONE_NUMBER ; // example phone number

function sendInstructions(summary) {
    const naturalDisasterHazardType = getNaturalHazardType(summary);
    let instructions = '';

    switch (naturalDisasterHazardType) {
        case 'earthquake': 
            instructions = '• Drop down to your hands and knees.\n• Cover your head and neck with your arms to protect yourself from falling debris.\n• Hold on to any sturdy furniture or fixtures to prevent them from falling over.';
            break;
        case 'volcanic': 
            instructions = '• Listen to authorities for updates on the volcanic activity.\n• If you\'re told to evacuate, do so immediately.\n• Stay indoors and close windows and doors to avoid ashfall.';
            break;
        case 'landslide': 
            instructions = '• Listen to local news and authorities for information on evacuation or sheltering in place.\n• Avoid walking or driving on roads that are covered by mud, debris, or water.\n• If you are trapped, cover your mouth to avoid breathing in dust and debris.';
            break;
        case 'tsunami': 
            instructions = '• If you feel a strong earthquake, leave all coastal zones immediately and head inland or to higher ground.\n• If a tsunami warning is issued, leave all coastal areas and move inland or to higher ground immediately.';
            break;
        case 'flood': 
            instructions = '• Evacuate immediately if told to do so.\n• Avoid walking or driving through floodwaters.\n• If you\'re caught in your car during a flood, abandon it and move to higher ground.';
            break;
        case 'drought': 
            instructions = '• Limit water usage by taking shorter showers, turning off the faucet while brushing teeth, and fixing leaks.\n• Avoid outdoor activities during peak sun hours and limit overall exposure to the sun.\n• Stay informed of drought conditions and potential water restrictions.';
            break;
        case 'wildfire': 
            instructions = '• Listen to the news and authorities for updates on the wildfire.\n• Evacuate immediately if told to do so.\n• If you can\'t evacuate, find a body of water, such as a pond or river, and lie face down in it.';
            break;
        case 'tornado': 
            instructions = '• Go to the lowest level of your home or building.\n• Stay away from windows and exterior walls.\n• Cover your head and neck with your arms or a pillow.';
            break;
        case 'hurricane': 
            instructions = '• If told to evacuate, do so immediately.\n• If staying home, board up windows and doors with plywood.\n• Stay indoors during the hurricane, away from windows.';
            break;
        case 'heatwave': 
            instructions = '• Stay indoors in air-conditioned spaces or in shaded areas.\n• Drink plenty of fluids and avoid alcohol or caffeine.\n• Wear lightweight, light-colored clothing and avoid strenuous activities during peak heat hours.';
            break;
        case 'blizzard': 
            instructions = '• Stay indoors and limit travel unless it is absolutely necessary.\n• Dress warmly in layers, cover exposed skin, and wear a hat and gloves.\n• Use caution when shoveling snow and avoid overexertion.';
            break;
        case 'hailstorm': 
            instructions = '• Move indoors or seek shelter under a sturdy structure if possible.\n• Protect your head and face from hail by using a thick blanket or other covering.\n• Avoid parking or standing under trees or other tall objects.';
            break;
        case 'thunderstorm': 
            instructions = '• Seek indoor shelter and avoid using electronic devices or plumbing.\n• If you are outdoors, avoid open fields or tall objects and take shelter in a low-lying area.\n• Wait at least 30 minutes after the last thunderclap before resuming outdoor activities.';
            break;
        case 'winterstorm': 
            instructions = '• Stay indoors and limit travel unless it is absolutely necessary.\n• Dress warmly in layers, cover exposed skin, and wear a hat and gloves.\n• Use caution when shoveling snow and avoid overexertion.';
            break;
        case 'avalanche': 
            instructions = '• If you are caught in an avalanche, try to move to the side to avoid being buried.\n• If you cannot move, try to create an air pocket in front of your face to breathe.\n• Use a transceiver, probe, and shovel to locate and dig out buried victims.';
            break;
        case 'epidemic': 
            instructions = '• Stay informed of the latest outbreak information and follow recommended preventive measures.\n• Avoid close contact with sick individuals and practice good hygiene by washing hands regularly.\n• Seek medical attention if you are experiencing symptoms or have been exposed to the disease.';
            break;
        case 'pandemic': 
            instructions = '• Stay informed of the latest outbreak information and follow recommended preventive measures.\n• Avoid close contact with sick individuals and practice good hygiene by washing hands regularly.\n• Seek medical attention if you are experiencing symptoms or have been exposed to the disease.';
            break;
        case 'asteroid': 
            instructions = '• Stay informed of the latest impact trajectory and follow emergency response instructions.\n• If possible, move to a sturdy shelter or basement to protect yourself from the blast.\n• Avoid looking directly at the explosion or debris and seek medical attention if necessary.';
            break;
        default:
            instructions = '• Follow emergency instructions from authorities.';
            break;
    }
}

client.messages.create({
    body: instructions,
    from: process.env.TWILIO_PHONE_NUMBER, // twilio phone number
    to: phoneNumber,
})
.then((message) => console.log(`Message sent to ${message.to}`))
.catch((error) => console.error(error));
