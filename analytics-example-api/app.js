var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require('mongoose');


var indexRouter = require("./routes/index");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use("/", indexRouter);

const dbPath = `mongodb://${process.env.DB_HOST || 'localhost'}:27017/analytics`
const options = { useNewUrlParser: true, useUnifiedTopology: true };
const mongo = mongoose.connect(dbPath, options);

mongo.then(
  () => {
    console.log("db connected");
  },
  (error) => {
    console.log(error, "db error");
  }
);

module.exports = app;
