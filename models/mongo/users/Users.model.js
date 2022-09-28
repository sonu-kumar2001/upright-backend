const mongoose = require("mongoose");
const { hash } = require("bcrypt");

const { Schema } = mongoose;

const userProfile = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    verified: { type: Boolean, default: false },
    verifyLink: { type: String, default: "" },
  },
  { timestamps: true }
);

// eslint-disable-next-line func-names
userProfile.pre("save", async function (next) {
  if (this.password) {
    this.password = await hash(this.password, 12);
  } else next();
});

module.exports = mongoose.model("UserProfile", userProfile);
