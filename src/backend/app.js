const express = require("express");
const cors = require("cors");
const routes = require("./routes/messages.routes");
const notifyAtInterval = require("./notifyAtInterval");

require("dotenv").config();

const app = express({
  origin: `http://localhost:${process.env.PORT}}`,
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
// app.use(cors());
// app.options('*', cors());

// v1 api routes
app.use(routes);

const interval = notifyAtInterval();

const shutdown = () => {
  clearInterval(interval);
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

// send back a 404 error for any unknown api request
// app.use((req, res, next) => {
//   next(new Error(httpStatus.NOT_FOUND, "Not found"));
// });
