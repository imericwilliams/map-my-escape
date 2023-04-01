// make a script that every hour, retieves the location of each user from the mongo db and requests the api for alerts
// if there are alerts, and the alerts has not been sent, send messages to the users in the affected area


module.exports = () => {
  const interval = setInterval(() => {
    // get all user locations from db
    // for each user, request api for alerts
    // if there are alerts, and the alerts has not been sent, send messages to the users in the affected area
    // update db with alerts sent
  }, 60 * 60 * 1000);

  return interval;
};
