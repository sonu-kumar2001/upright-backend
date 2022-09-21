const coacheeModel = require("../models/mongo/coachee/dml");

const coacheeService = {
  async registerCoacheeDetails(coacheeObj, userId) {
    const response = await coacheeModel.registerCoacheeDetails(
      coacheeObj,
      userId
    );
    return response;
  },
};

module.exports = coacheeService;
