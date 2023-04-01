"use strict";

const { sendWhatsappMsg } = require("../sendWhatsappMsg");
const express = require("express");

const router = express.Router();

const users = [];

router.route("/test/:message").get(async (req, res) => {
  console.log("params", req.params);

  sendWhatsappMsg(req.params.message, process.env.DEMO_PHONE_NUMBER).then(
    (message) => {
      console.log(message);
      res.send("success");
    }
  );
});

router.route("/msg").post(async (req, res) => {
  console.log("req", req.body);
  // const phone = req.body;

  // if phone does not exist in db, send message welcoming and explaining function, ask user to send location

  // if request does not have Lat and Long, perform conversation

  // if request does have Lat and Long, overwrite location in db, perform api lookup and return any alerts

  const alerts = await Promise.resolve(["Alert 1", "Alert 2"]);
  // const message = await sendWhatsappMsg(alerts, phone);

  res.send(alerts);
});

module.exports = router;
