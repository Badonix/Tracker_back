const requestIp = require("request-ip");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const userRoutes = require("../routes/user.js");
const trackingRoutes = require("../routes/tracking.js");
const pageRoutes = require("../routes/page.js");
const app = express();

app.use(cors());
app.use(express.json());
app.use(requestIp.mw());

let MONGO_URI = process.env.DB_URL.replace(
  "<username>",
  process.env.DB_USERNAME,
).replace("<password>", process.env.DB_PASSWORD);

app.use("/api/user", userRoutes);
app.use("/", trackingRoutes);
app.use("/api/page", pageRoutes);
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to db");
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
module.exports = app;
