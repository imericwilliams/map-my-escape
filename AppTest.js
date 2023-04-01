// THIS IS IMPLEMENTATION OF app.js or index.js, update wherever see fit

const express = require('express');
const bodyParser = require('body-parser');
const sendLocationToCohere = require('./src/backend/sendLocationToCohere');
const searchNaturalHazards = require('./src/backend/searchNaturalHazards');
const summarizeInformation = require('./src/backend/summarizeInformation');
const sendInstructionToUser = require('./src/backend/sendInstructionToUser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/location', (req, res) => {
  const location = req.body.location;

  // Send location to Cohere API
  sendLocationToCohere(location)
    .then((result) => {
      // Search for natural hazards based on location
      const hazards = searchNaturalHazards(result.data);
      // Summarize hazard information
      const summary = summarizeInformation(hazards);
      // Send instruction to user
      sendInstructionToUser(summary)
        .then(() => {
          res.sendStatus(200);
        })
        .catch((error) => {
          console.error(error);
          res.sendStatus(500);
        });
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});
