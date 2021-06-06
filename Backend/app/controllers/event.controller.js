const Event = require("../models/event.model.js");
const ParticipantReview = require("../models/participantReview.model.js");
const EventReview = require("../models/eventReview.model.js");
const EventParticipant = require("../models/eventParticipant.model.js");
const EventModerator = require("../models/eventModerator.model.js");
const EventCategory = require("../models/eventCategory.model.js");
const EventGender = require("../models/eventGender.model.js");
const UserInterest = require("../models/userInterest.model.js");
const Point = require("../models/pointTransaction.model.js");
const multer = require("multer");
const fs = require("fs");
const fsPromises = fs.promises;
const _eventPicDir = "./data/event/";
const path = require("path");

function getTimeStamp() {
  return new Date().getTime();
}

function createEvent(eventParticipant, event, user_id) {
  eventParticipant.event_id = event.event_id;
  eventParticipant.participant_id = user_id;
  eventParticipant.status_id = "ST11";
  eventParticipant.created_at = getTimeStamp();
  eventParticipant.updated_at = getTimeStamp();

  EventParticipant.create(eventParticipant, (err, eventParticipant) => {
    if (err) return res.status(500).send({ message: err.message });
    else {
      Event.updateHost(
        {
          event_id: event.event_id,
          host_id: eventParticipant.event_participant_id
        },
        (err, result) => {
          if (err) return "err";
          else return "not err";
        }
      );
    }
  });
}

function arrayCategory(event_id, category_id) {
  var eventCategory = [
    (event_id = event_id),
    (category_id = category_id),
    (status = true),
    (created_at = getTimeStamp()),
    (updated_at = getTimeStamp())
  ];
  return eventCategory;
}

function createCategory(categoryList) {
  EventCategory.create(categoryList, (err, eventCategory) => {
    if (err) return "err";
    else return "not err";
  });
}

function arrayGender(event_id, gender_id) {
  var eventGender = [
    (event_id = event_id),
    (gender_id = gender_id),
    (status = true),
    (created_at = getTimeStamp()),
    (updated_at = getTimeStamp())
  ];
  return eventGender;
}

function createGender(genderList) {
  EventGender.create(genderList, (err, eventGender) => {
    if (err) return "err";
    else return "not err";
  });
}

exports.uploadEventPic = (req, res) => {
  fsPromises
    .mkdir(_eventPicDir + req.query.event_id, { recursive: true }, (err) => {
      console.log("mkdir err -->" + err);
    })
    .then(() => {
      console.log("id: ", req.query.event_id);
      upload(req, res, (err) => {
        if (err) {
          console.log("error by uploading IMG");
          res.status(500).send({ message: err.message });
        } else {
          console.log("id UPLOAD IMG --> " + req.query.event_id);
          res.send({ message: "upload event picture success" });
        }
      });
    });
};

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    Event.uploadEventPic(
      {
        event_id: req.query.event_id,
        event_pic:
          req.query.event_id +
          "/" +
          req.query.event_id +
          "-" +
          file.originalname,
        updated_at: getTimeStamp()
      },
      (err, data) => {
        if (err) return res.status(500).send({ message: err.message });
        else console.log(data);
      }
    );
    callback(null, _eventPicDir + req.query.event_id);
  },
  filename: function (req, file, callback) {
    callback(null, req.query.event_id + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage }).single("uploadedImages");

exports.create = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  Event.getCount(async (err, count) => {
    if (err) return res.status(500).send({ message: err.message });
    else {
      count++;
      count = count.toString();
      var event_id = "EV" + count.padStart(6, "0");
      var event = new Event("");
      const user_id = req.body.event.host_id;
      event = req.body.event;

      if (req.body.role_id == "RO01" || req.body.role_id == "RO03") {
        event.approver_id = req.body.user_id;
        event.status_id = "ST03";
      } else {
        event.status_id = "ST13";
      }

      event.event_id = event_id;
      event.host_id = null;
      event.created_at = getTimeStamp();
      event.updated_at = getTimeStamp();

      Event.create(event, async (err, event) => {
        if (err) return res.status(500).send({ message: err.message });
        else {
          if (event.event_id) {
            EventParticipant.getCount(async (err, count) => {
              if (err) return res.status(500).send({ message: err.message });
              else {
                count++;
                count = count.toString();
                var event_participant_id = "EP" + count.padStart(6, "0");
                var eventParticipant = new EventParticipant("");
                eventParticipant.event_participant_id = event_participant_id;
                if (createEvent(eventParticipant, event, user_id) == "err") {
                  res.status(500).send({ message: err.message });
                } else {
                  var categoryList = [];
                  req.body.category_id.forEach((category_id) => {
                    categoryList.push(arrayCategory(event_id, category_id));
                  });
                  if (createCategory(categoryList) == "err") {
                    res.status(500).send({ message: err.message });
                  } else {
                    var genderList = [];
                    req.body.gender_id.forEach((gender_id) => {
                      genderList.push(arrayGender(event_id, gender_id));
                    });
                    if (createGender(genderList) == "err") {
                      res.status(500).send({ message: err.message });
                    } else {
                      if (event.status_id == "ST03") {
                        Point.PointTransaction.getCount(async (err, count) => {
                          if (err)
                            return res
                              .status(500)
                              .send({ message: err.message });
                          else {
                            count++;
                            count = count.toString();
                            var point_transaction_id =
                              "PT" + count.padStart(6, "0");
                            var pointEvent = new Point.PointEvent("");
                            pointEvent.point_transaction_id =
                              point_transaction_id;
                            pointEvent.participant_id = event_participant_id;
                            pointEvent.description = "Host event";
                            pointEvent.amount = 300;
                            pointEvent.created_at = getTimeStamp();
                            pointEvent.updated_at = getTimeStamp();
                            Point.PointTransaction.addPoint(
                              pointEvent,
                              (err, result) => {
                                if (err)
                                  return res
                                    .status(500)
                                    .send({ message: err.message });
                                else
                                  return res.status(200).send({
                                    event_id: event_id
                                  });
                              }
                            );
                          }
                        });
                      } else {
                        return res.status(200).send({
                          event_id: event_id
                        });
                      }
                    }
                  }
                }
              }
            });
          }
        }
      });
    }
  });
};

exports.joinEvent = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  EventParticipant.getCount((err, count) => {
    if (err) return res.status(500).send({ message: err.message });
    else {
      count++;
      count = count.toString();
      var event_participant_id = "EP" + count.padStart(6, "0");
      var eventParticipant = new EventParticipant("");

      eventParticipant.event_participant_id = event_participant_id;
      eventParticipant.event_id = req.body.event_id;
      eventParticipant.participant_id = req.body.user_id;
      eventParticipant.status_id = "ST13";
      eventParticipant.created_at = getTimeStamp();
      eventParticipant.updated_at = getTimeStamp();

      EventParticipant.create(eventParticipant, (err, result) => {
        if (err) return res.status(500).send({ message: err.message });
        else {
          return res.status(200).send(result);
        }
      });
    }
  });
};

exports.cancelRequest = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  let eventParticipant = {
    event_id: req.body.event_id,
    participant_id: req.body.user_id,
    status_id: "ST12",
    updated_at: getTimeStamp()
  };

  EventParticipant.update(eventParticipant, (err, result) => {
    if (err) return res.status(500).send({ message: err.message });
    else return res.status(200).send(result);
  });
};

exports.approveRequest = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  let eventParticipant = {
    event_id: req.body.event_id,
    participant_id: req.body.user_id,
    status_id: "ST11",
    updated_at: getTimeStamp()
  };

  EventParticipant.update(eventParticipant, (err, result) => {
    if (err) return res.status(500).send({ message: err.message });
    else {
      Point.PointTransaction.getCount((err, count) => {
        if (err) return res.status(500).send({ message: err.message });
        else {
          count++;
          count = count.toString();
          var point_transaction_id = "PT" + count.padStart(6, "0");
          var pointEvent = new Point.PointEvent("");
          pointEvent.point_transaction_id = point_transaction_id;
          pointEvent.user_id = req.body.user_id;
          pointEvent.event_id = req.body.event_id;
          pointEvent.description = "Join event";
          pointEvent.amount = 200;
          pointEvent.created_at = getTimeStamp();
          pointEvent.updated_at = getTimeStamp();
          Point.PointTransaction.addPointJoin(pointEvent, (err, result) => {
            if (err) return res.status(500).send({ message: err.message });
          });
        }
      });
      return res.status(200).send(result);
    }
  });
};

exports.declineRequest = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  let eventParticipant = {
    event_id: req.body.event_id,
    participant_id: req.body.user_id,
    status_id: "ST15",
    updated_at: getTimeStamp()
  };

  EventParticipant.update(eventParticipant, (err, result) => {
    if (err) return res.status(500).send({ message: err.message });
    else return res.status(200).send(result);
  });
};

exports.addModerator = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  EventModerator.getCount((err, count) => {
    if (err) return res.status(500).send({ message: err.message });
    else {
      count++;
      count = count.toString();
      var event_moderator_id = "EM" + count.padStart(6, "0");
      var eventModerator = new EventModerator("");

      eventModerator.event_moderator_id = event_moderator_id;
      eventModerator.moderator_id = req.body.participant_id;
      eventModerator.status_id = "ST03";
      eventModerator.created_at = getTimeStamp();
      eventModerator.updated_at = getTimeStamp();

      EventModerator.create(eventModerator, (err, result) => {
        if (err) return res.status(500).send({ message: err.message });
        else {
          return res.status(200).send(result);
        }
      });
    }
  });
};

exports.removeModerator = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  let eventModerator = {
    moderator_id: req.body.participant_id,
    status_id: "ST12",
    updated_at: getTimeStamp()
  };

  EventModerator.update(eventModerator, (err, result) => {
    if (err) return res.status(500).send({ message: err.message });
    else return res.status(200).send(result);
  });
};

exports.createParticipantReview = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  ParticipantReview.getCount((err, count) => {
    if (err) return res.status(500).send({ message: err.message });
    else {
      count++;
      count = count.toString();
      var participant_review_id = "PR" + count.padStart(6, "0");
      var participantReview = new ParticipantReview("");

      participantReview = req.body;
      participantReview.participant_review_id = participant_review_id;
      participantReview.status_id = "ST02";
      participantReview.created_at = getTimeStamp();
      participantReview.updated_at = getTimeStamp();

      ParticipantReview.create(participantReview, (err, result) => {
        if (err) return res.status(500).send({ message: err.message });
        else {
          return res.status(200).send(result);
        }
      });
    }
  });
};

exports.createEventReview = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  EventReview.getCount((err, count) => {
    if (err) return res.status(500).send({ message: err.message });
    else {
      count++;
      count = count.toString();
      var event_review_id = "ER" + count.padStart(6, "0");
      var eventReview = new EventReview("");

      eventReview = req.body;
      eventReview.event_review_id = event_review_id;
      eventReview.status_id = "ST02";
      eventReview.created_at = getTimeStamp();
      eventReview.updated_at = getTimeStamp();

      EventReview.create(eventReview, (err, result) => {
        if (err) return res.status(500).send({ message: err.message });
        else {
          return res.status(200).send(result);
        }
      });
    }
  });
};

exports.displayPic = (req, res) => {
  Event.getEventPicturePath(req.params.event_id, async (err, event) => {
    if (err) return res.status(500).send({ message: err.message });
    if (!event)
      return res.status(404).send({ message: "this event is not found" });
    else {
      let fileType = path.extname(event.event_pic);

      if (fileType === ".png") contentType = "image/png";
      else if (fileType === ".jpg") contentType = "image/jpg";
      else if (fileType === ".jpeg") contentType = "image/jpeg";
      else contentType = "text/plain";

      fs.readFile(_eventPicDir + event.event_pic, function (error, content) {
        if (error) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Internal server error");
        } else {
          res.writeHead(200, { "Content-Type": contentType });
          res.end(content);
        }
      });
    }
  });
};

exports.updateInterestEvent = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  let userInterest = new UserInterest("");

  userInterest = req.body;
  userInterest.created_at = getTimeStamp();
  userInterest.updated_at = getTimeStamp();

  UserInterest.create(userInterest, (err, result) => {
    if (err) return res.status(500).send({ message: err.message });
    else return res.status(200).send(result);
  });
};

exports.findEventByID = (req, res) => {
  Event.findEventByID(req.body.event_id, (err, event) => {
    if (err) return res.status(500).send({ message: err.message });
    if (event) return res.status(200).send(event);
    else return res.status(404).send(event);
  });
};

exports.getEventGenderList = (req, res) => {
  EventGender.getEventGenderList(req.params.event_id, (err, result) => {
    if (err) return res.status(500).send({ message: err.message });
    else return res.status(200).send(result);
  });
};

exports.getEventCategoryList = (req, res) => {
  EventCategory.getEventCategoryList(req.params.event_id, (err, result) => {
    if (err) return res.status(500).send({ message: err.message });
    else return res.status(200).send(result);
  });
};

exports.getHostedEvent = (req, res) => {
  Event.getHostedEvent(req.params.user_id, (err, result) => {
    if (err) return res.status(500).send({ message: err.message });
    else return res.status(200).send(result);
  });
};

exports.getJoinedEvent = (req, res) => {
  Event.getJoinedEvent(req.params.user_id, (err, result) => {
    if (err) return res.status(500).send({ message: err.message });
    else return res.status(200).send(result);
  });
};

exports.getRequestedEvent = (req, res) => {
  Event.getRequestedEvent(req.params.user_id, (err, result) => {
    if (err) return res.status(500).send({ message: err.message });
    else return res.status(200).send(result);
  });
};

exports.getInterestedEvent = (req, res) => {
  Event.getInterestedEvent(req.params.user_id, (err, result) => {
    if (err) return res.status(500).send({ message: err.message });
    else return res.status(200).send(result);
  });
};

exports.getEventParticipantList = (req, res) => {
  EventParticipant.getEventParticipantList(
    req.params.event_id,
    (err, result) => {
      if (err) return res.status(500).send({ message: err.message });
      else return res.status(200).send(result);
    }
  );
};

exports.getParticipantToReview = (req, res) => {
  ParticipantReview.getParticipantToReview(
    {
      event_id: req.query.event_id,
      user_id: req.query.user_id
    },
    (err, result) => {
      if (err) return res.status(500).send({ message: err.message });
      else return res.status(200).send(result);
    }
  );
};

exports.getUserCateogryInterestEvent = (req, res) => {
  Event.getUserCateogryInterestEvent(req.params.user_id, (err, result) => {
    if (err) return res.status(500).send({ message: err.message });
    else return res.status(200).send(result);
  });
};

exports.getEventByCategory = (req, res) => {
  Event.getEventByCategory(
    req.params.user_id,
    req.params.category_id,
    (err, result) => {
      if (err) return res.status(500).send({ message: err.message });
      else return res.status(200).send(result);
    }
  );
};

exports.getApproverList = (req, res) => {
  Event.getApproverList((err, result) => {
    if (err) return res.status(500).send({ message: err.message });
    else return res.status(200).send(result);
  });
};

exports.getEventCount = (req, res) => {
  Event.getEventCount((err, result) => {
    if (err) return res.status(500).send({ message: err.message });
    else return res.status(200).send(result);
  });
};

exports.approving = (req, res) => {
  if (req.body.approve == true) approve = "ST03";
  else approve = "ST15";
  Event.approving(
    req.body.event_id,
    approve,
    req.body.user_id,
    (err, result) => {
      if (err) return res.status(500).send({ message: err.message });
      else if ((approve = "ST03")) {
        Point.PointTransaction.getCount((err, count) => {
          if (err) return res.status(500).send({ message: err.message });
          else {
            count++;
            count = count.toString();
            var point_transaction_id = "PT" + count.padStart(6, "0");
            var pointEvent = new Point.PointEvent("");
            pointEvent.point_transaction_id = point_transaction_id;
            pointEvent.participant_id = req.body.host_id;
            pointEvent.description = "Host event";
            pointEvent.amount = 300;
            pointEvent.created_at = getTimeStamp();
            pointEvent.updated_at = getTimeStamp();
            Point.PointTransaction.addPoint(pointEvent, (err, result) => {
              if (err) return res.status(500).send({ message: err.message });
              else return res.status(200).send(result);
            });
          }
        });
      }
    }
  );
};

exports.deleteEvent = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  let event = {
    event_id: req.body.event_id,
    status_id: "ST07",
    updated_at: getTimeStamp()
  };

  Event.deleteEvent(event, (err, result) => {
    if (err) return res.status(500).send({ message: err.message });
    else return res.status(200).send(result);
  });
};

exports.endEvent = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  let event = {
    event_id: req.body.event_id,
    end_at: req.body.end_at,
    updated_at: getTimeStamp()
  };

  Event.endEvent(event, (err, result) => {
    if (err) return res.status(500).send({ message: err.message });
    else return res.status(200).send(result);
  });
};
