const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const routes = require("./routes/v1");
const db = require("./db/config");
const auth = require("./routes/v1/authentication/authenticate");
require("dotenv").config();

const app = express();
app.use(cors());

//  connect to database
db.connect();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(auth.currentUserLoggedIn);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE",
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type",
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.set("trust proxy", 1);

const limiter = rateLimit({
  windowMs: 10 * 1000, // 10 seconds
  max: 500, // limit each IP to 100 requests per windowMs
});

app.use(limiter);

app.use("/api/v1", routes);

module.exports = app;
