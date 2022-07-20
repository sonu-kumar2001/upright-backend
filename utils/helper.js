function userInfo(user) {
  return {
    email: user.email,
    fullName: user.fullName,
  };
}

module.exports = { userInfo };
