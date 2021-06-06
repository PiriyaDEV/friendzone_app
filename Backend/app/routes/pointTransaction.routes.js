const controller = require("../controllers/pointTransaction.controller.js");
const { auth } = require("../middleware");

module.exports = function (app) {
  app.get("/api/point/getPoint/:user_id", auth, controller.getPoint);

  app.get("/api/point/getPointLog/:user_id", auth, controller.getPointLog);
};
