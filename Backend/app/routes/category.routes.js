const controller = require("../controllers/category.controller.js");
const { auth } = require("../middleware");



module.exports = function (app) {
  app.post("/api/category/create", auth,controller.create);

  app.post("/api/category/update", auth,controller.update);

  app.post("/api/category/uploadCategoryIcon", auth,controller.uploadCategoryIcon);

  app.get("/api/category/getCategoryList", auth,controller.getCategoryList);

  app.get("/api/category/displayIcon", controller.displayCategoryIcon);

  app.get(
    "/api/category/getCategoryFromUserID/:user_id",
    auth,controller.getCategoryFromUserID
  );
};
