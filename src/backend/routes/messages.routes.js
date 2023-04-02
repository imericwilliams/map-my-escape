"use strict";

const express = require("express");
const {
  getUserWithPhone,
  updateUserLocation,
  createUser,
} = require("../services/user.service");
const sendWhatsappMsg = require("../utils/sendWhatsappMsg");
const searchAndSendAlerts = require("../utils/searchAndSendAlerts");

const router = express.Router();

router.route("/register").post(async (req, res) => {
  const { phone } = req.body;
  console.log(req.body);
  const user = await getUserWithPhone(req.app.locals.db, phone);
  if (!user) {
    createUser(req.app.locals.db, { phone });
    res.send({ message: "success" });
  } else {
    res.send({ message: "already registered" });
  }
});

router.route("/msg").post(async (req, res) => {
  const { From: phone, Latitude, Longitude, Body } = req.body;
  console.log(
    req.body.Body || `Latitude: ${Latitude}, Longitude: ${Longitude}`
  );
  const user = await getUserWithPhone(req.app.locals.db, phone);
  console.log({ user });
  const locationExistsInMessage = Latitude && Longitude;
  const userHasLocation = user && user.locationLat && user.locationLong;

  // if phone does not exist in db, send message welcoming and explaining function, ask user to send location
  if (!user && !locationExistsInMessage) {
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
    const message = await sendWhatsappMsg(
      "Please send your location to get started.",
      phone
    );
  } else if (!locationExistsInMessage && userHasLocation) {
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
    const message = await sendWhatsappMsg(
      "Thanks for updating your location. Here are some alerts for you.",
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

  res.send({ message: "success" });
});

module.exports = router;
