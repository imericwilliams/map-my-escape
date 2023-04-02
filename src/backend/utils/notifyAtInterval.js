const { getAllUsers } = require("../services/user.service");
const searchAndSendAlerts = require("./searchAndSendAlerts");

module.exports = (db) => {
  const interval = setInterval(async () => {
    // get all user locations from db
    const users = await getAllUsers(db);
    // for each user location, request api for alerts

    const requests = users.map((user) => {
      const { locationLat, locationLong } = user;
      return searchAndSendAlerts({
        phone: user.phone,
        Latitude: locationLat,
        Longitude: locationLong,
      });
    });

    const alerts = await Promise.all(requests);

    // if there are alerts, and the alerts has not been sent, send messages to the users in the affected area
    // update db with alerts sent
  }, 5 * 1000);

  return interval;
};
