const controller = require("../controllers/analyst.controller.js");
const { auth } = require("../middleware");


module.exports = function (app) {
  app.get("/api/analyst/getAppSummary",auth, controller.getAppSummary);

  app.get("/api/analyst/getEventSummary", auth,controller.getEventSummary);

  app.get(
    "/api/analyst/getEventCategorySummary",
    auth,controller.getEventCategorySummary
  );

  app.get("/api/analyst/getUserSummary", auth,controller.getUserSummary);

  app.get(
    "/api/analyst/getUserHistorySummary",auth,
    controller.getUserHistorySummary
  );

  app.get("/api/analyst/getDiscountSummary", auth,controller.getDiscountSummary);

  app.get("/api/analyst/getReportSummary", auth,controller.getReportSummary);

  app.get("/api/analyst/getReportTypeSummary", auth,controller.getReportTypeSummary);
};
