const controller = require("../controllers/report.controller.js");
const { auth } = require("../middleware");

module.exports = function (app) {
  app.post("/api/report/create", auth, controller.create);

  app.post("/api/report/createType", auth, controller.createType);

  app.post("/api/report/updateType", auth, controller.updateType);

  app.get(
    "/api/report/getReportTypeUserList",
    auth,
    controller.getReportTypeUserList
  );

  app.get(
    "/api/report/getReportTypeEventList",
    auth,
    controller.getReportTypeEventList
  );

  app.get(
    "/api/report/getReportTypeWebList",
    auth,
    controller.getReportTypeWebList
  );

  app.post("/api/report/approveReport", auth, controller.approveReport);
};
