const controller = require("../controllers/chat.controller.js");
const { auth } = require("../middleware");


module.exports = function (app) {
  app.post("/api/chat/create", controller.create);

  app.get("/api/chat/getChatList/:user_id", auth, controller.getChatList);

  app.get("/api/chat/getChatHead/:event_id", auth,controller.getChatHead);

  app.get("/api/chat/getMessages/:event_id", auth,controller.getMessages);
};
