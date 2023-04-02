"use strict";

const express = require("express");
const {
  getUserWithPhone,
  updateUserLocation,
} = require("../services/user.service");
const sendWhatsappMsg = require("../utils/sendWhatsappMsg");
const predictApi = require("../utils/predictAPI");
const summarizeInformation = require("../utils/summarizeInformation");
const searchAndSendAlerts = require("../utils/searchAndSendAlerts");

const router = express.Router();

router.route("/register").post(async (req, res) => {
  const { phone } = req.body;
  const user = await getUserWithPhone(req.app.locals.db, phone);
  if (!user) {
    createUser(req.app.locals.db, { phone });
    res.send({ message: "success" });
  } else {
    res.send({ message: "already registered" });
  }
});

router.route("/msg").post(async (req, res) => {
  const { From: phone, Latitude, Longitude } = req.body;
  const user = await getUserWithPhone(req.app.locals.db, phone);

  const locationExistsInMessage = Latitude && Longitude;
  const userHasLocation = user.locationLat && user.locationLong;

  // if phone does not exist in db, send message welcoming and explaining function, ask user to send location
  if (!user && !locationExistsInMessage) {
    console.log("1");
    const message = await sendWhatsappMsg(
      "Welcome to Map My Escape! Please send your location to get started.",
      phone
    );
    createUser(req.app.locals.db, {
      phone,
      locationLat: null,
      locationLong: null,
    });
    // res.send(message);
  } else if (!user && locationExistsInMessage) {
    console.log("2");
    const message = await sendWhatsappMsg(
      "Welcome to Map My Escape! Please send your location to get started.",
      phone
    );
    createUser(req.app.locals.db, {
      phone,
      locationLat: Latitude,
      locationLong: Longitude,
    });
    // res.send(message);
  } else if (!locationExistsInMessage && !userHasLocation) {
    console.log("3");
    const message = await sendWhatsappMsg(
      "Please send your location to get started.",
      phone
    );
  } else if (!locationExistsInMessage && userHasLocation) {
    console.log("4");
    const message = await sendWhatsappMsg(
      "Sorry, I don't talk to humans. Remember to update you location. Here are some alerts for you.",
      phone
    ).then((res) => {
      return searchAndSendAlerts({
        phone,
        Latitude: user.locationLat,
        Longitude: user.locationLong,
      });
    });
  } else if (locationExistsInMessage) {
    console.log("5");
    const message = await sendWhatsappMsg(
      "Thanks for sending your location. Here are some alerts for you.",
      phone
    );
    updateUserLocation({
      db: req.app.locals.db,
      phone,
      locationLat: Latitude,
      locationLong: Longitude,
    });
    searchAndSendAlerts({ phone, Latitude, Longitude });
  }

  // if request does have Lat and Long, overwrite location in db, perform api lookup and return any alerts
  // if (Latitude && Longitude) {
  //   const location = `${Latitude}, ${Longitude}`;
  //   const user = await updateUserLocation(req.app.locals.db, phone, location);
  //   const response = await predictApi({ Latitude, Longitude });
  //   const uniqueAlertDescriptions = response.results
  //     .map((result) => {
  //       return result.description;
  //     })
  //     .reduce((acc, curr) => {
  //       return acc.includes(curr) ? acc : [...acc, curr];
  //     }, [])
  //     .slice(0, 1);

  //   const requests = uniqueAlertDescriptions.map((description) => {
  //     return summarizeInformation(description).then((res) => {
  //       console.log(res);
  //       return sendWhatsappMsg(res.body.summary, phone);
  //     });
  //   });

  //   Promise.all(requests)
  //     .then((messages) => {
  //       console.log(messages);
  //       // res.send({ message: "success" });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  //   // res.send({});
  // }

  // if request does not have Lat and Long, perform conversation with user
  // TODO

  res.send({ message: "success" });
});

module.exports = router;
