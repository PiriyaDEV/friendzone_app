const EventInvited = require("../models/eventInvited.model.js");

function getTimeStamp() {
  return new Date().getTime();
}

exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  EventInvited.getCount((err, count) => {
    if (err) return res.status(500).send({ message: err.message });
    else {
      count++;
      count = count.toString();
      var event_invited_id = "EI" + count.padStart(6, "0");
      var eventInvited = new EventInvited("");

      eventInvited = req.body;
      eventInvited.event_invited_id = event_invited_id;
      eventInvited.status_id = "ST18";
      eventInvited.created_at = getTimeStamp();
      eventInvited.updated_at = getTimeStamp();
      EventInvited.create(eventInvited, (err, result) => {
        if (err) return res.status(500).send({ message: err.message });
        else
          return res
            .status(200)
            .send({ event_invited_id: result.event_invited_id });
      });
    }
  });
};

exports.acceptedInvited = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  let eventInvited = {
    event_invited_id: req.body.event_invited_id,
    status_id: "ST01",
    updated_at: getTimeStamp()
  };

  EventInvited.update(eventInvited, (err, result) => {
    if (err) return res.status(500).send({ message: err.message });
    else return res.status(200).send(result);
  });
};

exports.declinedInvited = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  let eventInvited = {
    event_invited_id: req.body.event_invited_id,
    status_id: "ST15",
    updated_at: getTimeStamp()
  };

  EventInvited.update(eventInvited, (err, result) => {
    if (err) return res.status(500).send({ message: err.message });
    else return res.status(200).send(result);
  });
};

exports.getNotification = (req, res) => {
  EventInvited.getNotification(req.params.user_id, (err, notification) => {
    if (err) return res.status(500).send({ message: err.message });
    if (notification) return res.status(200).send(notification);
  });
};
