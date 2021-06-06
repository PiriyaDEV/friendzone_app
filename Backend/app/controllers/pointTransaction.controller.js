const Point = require("../models/pointTransaction.model.js");

function getTimeStamp() {
  return new Date().getTime();
}

exports.getPoint = (req, res) => {
  Point.PointTransaction.getPoint(req.params.user_id, (err, point) => {
    if (err) return res.status(500).send({ message: err.message });
    if (point) return res.status(200).send(point);
  });
};

exports.getPointLog = (req, res) => {
  Point.PointTransaction.getPointLog(req.params.user_id, (err, point) => {
    if (err) return res.status(500).send({ message: err.message });
    if (point) return res.status(200).send(point);
  });
};
