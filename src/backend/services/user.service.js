const createUser = async (db, user) => {
  return db.collection("users").insertOne(user);
};

const getAllUsers = async (db) => {
  return db.collection("users").find().toArray();
};

const getUserWithPhone = async (db, phone) => {
  return db.collection("users").find({ phone }).toArray();
};

const updateUserLocation = async ({ db, phone, locationLat, locationLong }) => {
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
