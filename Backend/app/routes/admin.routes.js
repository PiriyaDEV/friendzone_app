const controller = require("../controllers/admin.controller");
const { auth } = require("../middleware");

module.exports = function (app) {
  app.get("/api/admin/getReportList", auth, controller.getReportList);

  app.get("/api/admin/getUserList", auth, controller.getUserList);

  app.get("/api/admin/getDiscountList", auth, controller.getDiscountList);

  app.get("/api/admin/searchReport", auth, controller.searchReport);

  app.get("/api/admin/searchUser", auth, controller.searchUser);

  app.get("/api/admin/searchDiscount", auth, controller.searchDiscount);
};
