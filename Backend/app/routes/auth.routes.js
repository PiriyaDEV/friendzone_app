const { bodyValidation } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
  app.post("/api/auth/signup", controller.signup);

  app.post("/api/auth/signin", controller.signin);

  app.post("/api/auth/checkUniqueExists", controller.checkUniqueExists);
};
