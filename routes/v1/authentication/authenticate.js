const { sign, verify } = require("jsonwebtoken");

module.exports = {
  generateJwt: async (user) => {
    const payload = { userId: user.id, email: user.email };
    const token = await sign(payload, process.env.SECRET, {
      expiresIn: "7d",
    });
    return token;
  },
  verifyToken: async (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
      try {
        const payload = await verify(token, process.env.SECRET);
        req.user = payload;
        next();
      } catch (error) {
        res.status(401).json({ error });
      }
    } else return res.status(401).json({ err: "Please SignIn" });
  },
  currentUserLoggedIn: async (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
      try {
        const payload = await verify(token, process.env.SECRET);
        req.user = payload;
        next();
      } catch (error) {
        res.status(401).json({ error });
      }
    } else {
      req.user = {};
      next();
    }
  },
};
