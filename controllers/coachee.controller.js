const coacheeService = require("../service/coachee.service");

const coacheeController = {
  registerCoacheeDetails: async (req, res) => {
    try {
      const coacheeObj = {
        companyName: req.body.companyName,
        mobileNumber: req.body.mobileNumber,
        jobTitle: req.body.jobTitle,
        profession: req.body.profession,
        preferredLanguage: req.body.preferredLanguage,
        guidanceFor: req.body.guidanceFor,
        uprightNiche: req.body.uprightNiche,
        shortTermAchievement: req.body.shortTermAchievement,
        currentRole: req.body.currentRole,
        communicationStyle: req.body.communicationStyle,
        topicsForCoach: req.body.topicsForCoach,
        firstSessionExpectation: req.body.firstSessionExpectation,
        careerSupportNiche: req.body.careerSupportNiche,
      };
      const response = await coacheeService.registerCoacheeDetails(
        coacheeObj,
        req.user.userId
      );
      if (response) {
        res.status(201).json({ message: "Details added successfully" });
      } else res.status(500).json({ error: "Something went wrong" });
    } catch (error) {
      return res.status(500).json({
        error: "Something went wrong",
      });
    }
  },
};

module.exports = coacheeController;
