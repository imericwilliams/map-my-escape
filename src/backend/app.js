const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const routes = require("./routes/messages.routes");
const notifyAtInterval = require("./utils/notifyAtInterval");

require("dotenv").config();

const app = express();

const client = new MongoClient(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let interval;
client
  .connect()
  .then((client) => {
    console.log("Connected to MongoDB");
    const db = client.db("map-my-escape");
    app.locals.db = db;
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
      interval = notifyAtInterval(db);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options('*', cors());

// v1 api routes
app.use(routes);

const shutdown = () => {
  clearInterval(interval);
  client.close();
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

// send back a 404 error for any unknown api request
// app.use((req, res, next) => {
//   next(new Error(httpStatus.NOT_FOUND, "Not found"));
// });
