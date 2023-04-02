const createUser = async (db, user) => {
  console.log("Creating user in db");
  return db.collection("users").insertOne(user);
};

const getAllUsers = async (db) => {
  return db.collection("users").find().toArray();
};

const getUserWithPhone = async (db, phone) => {
  return db.collection("users").findOne({ phone });
};

const updateUserLocation = async ({ db, phone, locationLat, locationLong }) => {
  console.log("Updating user location in db");
  return db
    .collection("users")
    .updateOne({ phone }, { $set: { locationLat, locationLong } });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserWithPhone,
  updateUserLocation,
};
