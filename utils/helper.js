function userInfo(user) {
  return {
    email: user.email,
    fullName: user.fullName,
    role: user.role,
  };
}

module.exports = { userInfo };
