const jwt = require("jsonwebtoken");
const secretKey = require("../config/auth.config").secret;

const authMiddleware = (req, res, next) => {
  const token = req.headers["x-access-token"];

  jwt.verify(token, secretKey, (err, payload) => {
    if (err) return res.sendStatus(401);
    if (payload.user_id) return next();
    return res.sendStatus(400);
  });
};

const authJwt = {
  verifyToken: verifyToken
};

module.exports = authMiddleware;
