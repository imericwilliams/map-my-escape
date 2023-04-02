const createUser = async (db, user) => {
  return db("map-my-escape").collection("users").insertOne(user);
};

const getAllUsers = async (db) => {
  return db("map-my-escape").collection("users").find().toArray();
};

const getUserWithPhone = async (db, phone) => {
  return db("map-my-escape").collection("users").find({ phone }).toArray();
};

const updateUserLocation = async (db, phone, location) => {
  return db("map-my-escape")
    .collection("users")
    .find({ phone })
    .updateOne({ location }, { $set: user });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserWithPhone,
};
