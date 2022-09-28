const express = require("express");

const router = express.Router();
const coacheeController = require("../../controllers/coachee.controller");
const authenticate = require("./authentication/authenticate");

router.post(
  "/coachee/register",
  authenticate.verifyToken,
  coacheeController.registerCoacheeDetails
);

module.exports = router;
