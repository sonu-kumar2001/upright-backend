const mongoose = require("mongoose");

module.exports = {
  connect: () => {
    mongoose.connect(
      process.env.MONGODB_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("MongoDB connected");
        }
      },
    );
  },
};
