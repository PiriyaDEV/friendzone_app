const controller = require("../controllers/search.controller");
const { auth } = require("../middleware");

module.exports = function (app) {
  app.get("/api/search/userToInvite", auth, controller.getSearchUserToInvite);

  app.get("/api/search/user", auth, controller.getSearchUser);

  app.get("/api/search/event", auth, controller.getSearchEvent);

  app.get("/api/search/discount", auth, controller.getSearchDiscount);
};
