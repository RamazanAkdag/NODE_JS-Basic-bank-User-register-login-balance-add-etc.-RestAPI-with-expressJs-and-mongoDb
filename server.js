const express = require("express");
const app = express();
const connectDatabase = require("./helpers/connectDatabase");
require("dotenv").config();
const bodyParser = require("body-parser");

const router = require("./router/index");
app.use(bodyParser.json());
connectDatabase();

app.use("/api", router);

app.listen(5000, () => {
  console.log("sunucu başlatıldı");
});
