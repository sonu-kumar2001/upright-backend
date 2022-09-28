const { verify } = require("jsonwebtoken");
const { compare } = require("bcrypt");
const userService = require("../service/user.service");
const authentication = require("../routes/v1/authentication/authenticate");
// const sendEmail = require("../utils/email/sendEmail");
const helper = require("../utils/helper");

const userController = {
  signup: async (req, res) => {
    try {
      const {
        fullName, email, password, role
      } = req.body;
      if (!fullName || !email || !password || !role) {
        return res.status(400).json({
          error: "Please fill all the fields",
        });
      }
      const userDetail = await userService.findUserByEmail(email);
      if (userDetail) {
        return res.status(400).json({
          error: "User already exists",
        });
      }
      const user = await userService.signup({
        fullName,
        email,
        password,
        role
      });
      const createdToken = await authentication.generateJwt(user);
      res.status(201).json({
        user: {
          ...helper.userInfo(user),
          createdToken,
        },
        message: "User created Successfully",
      });
      // if (user) {
      //   const userId = user.id;
      //   const token = await sign({ userId }, process.env.EMAIL_SECRET, {
      //     expiresIn: 1800,
      //   });
      //   const link = `${process.env.CLIENT_URL}/verify?token=${token}`;
      //   const updatedUser = await userService.updateUser(email, {
      //     verifyLink: token,
      //   });
      //   if (updatedUser) {
      //     sendEmail(
      //       res,
      //       user.email,
      //       "Verify Email",
      //       {
      //         name: user.fullName,
      //         link,
      //       },
      //       "./template/template.hbs",
      //       "Please Verify your email"
      //     );
      //   } else {
      //     return res.status(400).json({ err: "verify password link error" });
      //   }
      // } else return res.status(400).json({ err: "User doesn't Exists" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: "Something went wrong",
      });
    }
  },
  verify: async (req, res) => {
    const verifyLink = req.body;
    if (!verifyLink) {
      return res.status(400).json({
        error: "Please fill all the fields",
      });
    }
    const verification = await verify(verifyLink, process.env.EMAIL_SECRET);
    if (verification) {
      const userUpdate = await userService.findUserByVerifyLink(verifyLink);
      if (!userUpdate) {
        return res
          .status(401)
          .json({ err: "User with this token doesn't exist" });
      }
      const updatedUser = await userService.updateUser(userUpdate.email, {
        isVerified: true,
        verifyLink: "",
      });
      if (updatedUser) {
        return res.status(200).json({
          message: "User verified successfully",
        });
      }
      return res.status(400).json({ err: "User doesn't Exists" });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          error: "Please fill all the fields",
        });
      }
      const user = await userService.findUserByEmail(email);
      if (!user) {
        return res.status(400).json({
          error: "User doesn't exists",
        });
      }
      // if (!user.isVerified) {
      //   return res.status(400).json({
      //     error: "User is not verified",
      //   });
      // }
      const result = await compare(password, user.password);
      if (user && result) {
        const token = await authentication.generateJwt(user);
        return res.status(200).json({
          userInfo: { ...helper.userInfo(user), token },
          message: "User logged in successfully",
        });
      }
      return res.status(403).json({ err: "credential is incorrect" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: "Something went wrong",
      });
    }
  },
};

module.exports = userController;
