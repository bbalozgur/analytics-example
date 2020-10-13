var express = require("express");
var router = express.Router();
var analyticSchema = require("../schema/analyticSchema");
var mongoose = require("mongoose");

router.get("/", function (req, res) {
  const { type } = req.query;

  const AnalyticModel = mongoose.model(type, analyticSchema);

  AnalyticModel.find(function (err, analytics) {
    if (err) {
      res.json(err);
    }
    res.send(analytics);
  });
});

router.post("/", function (req, res) {
  const { type, host, value } = req.body;

  const AnalyticModel = mongoose.model(type, analyticSchema);
  const analytic = new AnalyticModel();

  analytic.created_at = new Date();
  analytic.host = host;
  analytic.value = value;

  analytic.save(function (err) {
    if (err) {
      res.json(err);
    }

    res.status(200).send();
  });
});

module.exports = router;
