const Gender = require("../models/gender.model.js");

exports.getGenderList = (req, res) => {
  Gender.getGenderList((err, gender) => {
    if (err) return res.status(500).send({ message: err.message });
    if (gender) return res.status(200).send(gender);
  });
};
