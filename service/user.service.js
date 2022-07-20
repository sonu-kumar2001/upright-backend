const userModel = require("../models/mongo/users/dml");

const userService = {
  async signup(userObj) {
    const response = await userModel.signup(userObj);
    return response;
  },
  async findUserByEmail(email) {
    const response = await userModel.findUserByEmail(email);
    return response;
  },
  async updateUser(email, updatedObj) {
    const response = await userModel.updateUser(email, updatedObj);
    return response;
  },
  async findUserByVerifyLink(verifyLink) {
    const response = await userModel.findUserByVerifyLink(verifyLink);
    return response;
  },
};

module.exports = userService;
