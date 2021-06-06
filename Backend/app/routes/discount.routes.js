const controller = require("../controllers/discount.controller");
const { auth } = require("../middleware");

module.exports = function (app) {
  app.post("/api/discount/create", auth, controller.create);

  app.post("/api/discount/editDiscount", auth, controller.editDiscount);

  app.post(
    "/api/discount/uploadDiscountPic",
    auth,
    controller.uploadDiscountPic
  );

  app.post("/api/discount/useDiscount", auth, controller.useDiscount);

  app.post("/api/discount/deleteDiscount", auth, controller.deleteDiscount);

  app.get(
    "/api/discount/getHotDiscount/:user_id",
    auth,
    controller.getHotDiscount
  );

  app.get(
    "/api/discount/getBrowseDiscount/:user_id",
    auth,
    controller.getBrowseDiscount
  );

  app.get(
    "/api/discount/getMyDiscount/:user_id",
    auth,
    controller.getMyDiscount
  );

  app.get("/api/discount/displayPic/:discount_id", controller.displayPic);

  app.post(
    "/api/discount/discountTransaction",
    auth,
    controller.discountTransaction
  );
};
