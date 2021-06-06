const controller = require("../controllers/eventInvited.controller.js");
const { auth } = require("../middleware");


module.exports = function (app) {
  app.post("/api/eventInvited/create", auth,controller.create);

  app.post("/api/eventInvited/acceptedInvited",auth, controller.acceptedInvited);

  app.post("/api/eventInvited/declinedInvited", auth,controller.declinedInvited);

  app.get(
    "/api/eventInvited/getNotification/:user_id",auth,
    controller.getNotification
  );
};
