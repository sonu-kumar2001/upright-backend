const mongoose = require("mongoose");

const { Schema } = mongoose;

const coacheeDetails = new Schema(
  {
    companyName: { type: String },
    mobileNumber: { type: Number },
    profession: { type: String },
    jobTitle: { type: String },
    preferredLanguage: { type: String },
    guidanceFor: { type: String },
    uprightNiche: { type: String },
    shortTermAchievement: { type: String },
    currentRole: { type: String },
    communicationStyle: { type: String },
    topicsForCoach: { type: String },
    firstSessionExpectation: { type: String },
    careerSupportNiche: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "UserProfile", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CoacheeDetails", coacheeDetails);
