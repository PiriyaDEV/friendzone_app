const controller = require("../controllers/gender.controller.js");

module.exports = function (app) {
  app.get("/api/gender/getGenderList", controller.getGenderList);
};
