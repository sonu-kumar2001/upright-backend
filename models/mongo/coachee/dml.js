const CoacheeDetails = require("./Coachee.model");

module.exports = {
  registerCoacheeDetails: async (coacheeObj, userId) => {
    try {
      const coacheeDetails = new CoacheeDetails({
        companyName: coacheeObj.companyName,
        mobileNumber: coacheeObj.mobileNumber,
        jobTitle: coacheeObj.jobTitle,
        profession: coacheeObj.profession,
        preferredLanguage: coacheeObj.preferredLanguage,
        guidanceFor: coacheeObj.guidanceFor,
        uprightNiche: coacheeObj.uprightNiche,
        shortTermAchievement: coacheeObj.shortTermAchievement,
        currentRole: coacheeObj.currentRole,
        communicationStyle: coacheeObj.communicationStyle,
        topicsForCoach: coacheeObj.topicsForCoach,
        firstSessionExpectation: coacheeObj.firstSessionExpectation,
        careerSupportNiche: coacheeObj.careerSupportNiche,
        user: userId,
      });
      const response = await coacheeDetails.save();
      return response;
    } catch (error) {
      return [];
    }
  },
};
