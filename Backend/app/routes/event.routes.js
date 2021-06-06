//const { bodyValidation } = require("../middleware");
const controller = require("../controllers/event.controller");
const { auth } = require("../middleware");

module.exports = function (app) {
  app.post("/api/event/create", auth, controller.create);

  app.post("/api/event/uploadEventPic", auth, controller.uploadEventPic);

  app.post(
    "/api/event/updateInterestEvent",
    auth,
    controller.updateInterestEvent
  );

  app.post("/api/event/joinEvent", auth, controller.joinEvent);

  app.post("/api/event/cancelRequest", auth, controller.cancelRequest);

  app.post("/api/event/approveRequest", auth, controller.approveRequest);

  app.post("/api/event/declineRequest", auth, controller.declineRequest);

  app.post("/api/event/addModerator", auth, controller.addModerator);

  app.post("/api/event/removeModerator", auth, controller.removeModerator);

  app.post(
    "/api/event/createParticipantReview",
    auth,
    controller.createParticipantReview
  );

  app.post("/api/event/createEventReview", auth, controller.createEventReview);

  app.post("/api/event/findEventByID", auth, controller.findEventByID);

  app.get("/api/event/displayPic/:event_id", controller.displayPic);

  app.get(
    "/api/event/getEventGenderList/:event_id",
    auth,
    controller.getEventGenderList
  );

  app.get(
    "/api/event/getEventCategoryList/:event_id",
    auth,
    controller.getEventCategoryList
  );

  app.get(
    "/api/event/getHostedEvent/:user_id",
    auth,
    controller.getHostedEvent
  );

  app.get(
    "/api/event/getJoinedEvent/:user_id",
    auth,
    controller.getJoinedEvent
  );

  app.get(
    "/api/event/getRequestedEvent/:user_id",
    auth,
    controller.getRequestedEvent
  );

  app.get(
    "/api/event/getInterestedEvent/:user_id",
    auth,
    controller.getInterestedEvent
  );

  app.get(
    "/api/event/getEventParticipantList/:event_id",
    auth,
    controller.getEventParticipantList
  );

  app.get(
    "/api/event/getParticipantToReview",
    auth,
    controller.getParticipantToReview
  );

  app.get(
    "/api/event/getUserCateogryInterestEvent/:user_id",
    auth,
    controller.getUserCateogryInterestEvent
  );

  app.get(
    "/api/event/getEventByCategory/:user_id/:category_id",
    auth,
    controller.getEventByCategory
  );

  app.get("/api/event/getApproverList", auth, controller.getApproverList);

  app.get("/api/event/getEventCount", auth, controller.getEventCount);

  app.post("/api/event/approving", auth, controller.approving);

  app.post("/api/event/deleteEvent", auth, controller.deleteEvent);

  app.post("/api/event/endEvent", auth, controller.endEvent);
};
