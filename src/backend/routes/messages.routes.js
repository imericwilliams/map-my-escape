"use strict";

const { sendWhatsappMsg } = require("../sendWhatsappMsg");
const express = require("express");
const { getUserWithPhone } = require("../services/user.service");

const router = express.Router();

const users = [];

// router.route("/test/:message").get(async (req, res) => {
//   console.log("params", req.params);

//   sendWhatsappMsg(req.params.message, process.env.DEMO_PHONE_NUMBER).then(
//     (message) => {
//       console.log(message);
//       res.send("success");
//     }
//   );
// });

router.route("/msg").post(async (req, res) => {
  const phone = req.body.From;
  const user = getUserWithPhone(req.app.locals.db, phone);

  // if phone does not exist in db, send message welcoming and explaining function, ask user to send location
  if (!user) {
    const message = await sendWhatsappMsg(
      "Welcome to Map My Escape! Please send your location to get started.",
      phone
    );
    res.send(message);

  }

  // if request does have Lat and Long, overwrite location in db, perform api lookup and return any alerts
  if (req.body.Latitude && req.body.Longitude) {
    const location = `${req.body.Latitude}, ${req.body.Longitude}`;
    const user = await updateUserLocation(req.app.locals.db, phone, location);
    const alerts = await Promise.resolve(["Alert 1", "Alert 2"]);
    const message = await sendWhatsappMsg(alerts, phone);
    res.send(alerts);
  }

  // if request does not have Lat and Long, perform conversation with user
  // TODO

  res.send({ message: "success" });
});

module.exports = router;
