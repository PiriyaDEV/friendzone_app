const User = require("../models/user.model.js");
const config = require("../config/auth.config");

const { validationResult } = require("express-validator");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

function getTimeStamp() {
  return new Date().getTime();
}

exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  User.getCount((err, count) => {
    if (err) return res.status(500).send({ message: err.message });
    else {
      count++;
      count = count.toString();
      var user_id = "US" + count.padStart(6, "0");
      var user = new User("");

      req.body.password = bcrypt.hashSync(req.body.password, 8);

      user = req.body;
      user.user_id = user_id;
      user.username = user.username.toLowerCase();
      user.email = user.email.toLowerCase();
      user.role_id = "RO04";
      user.status_id = "ST02";
      user.created_at = getTimeStamp();
      user.updated_at = getTimeStamp();

      // Save User in the database
      User.create(user, (err, user) => {
        if (err) return res.status(500).send({ message: err.message });
        else {
          if (user.user_id) {
            const payload = {
              user_id: user.user_id,
              role_id: user.role_id,
              gender_id: user.gender_id,
              birthdate: user.birthdate
            };

            var token = jwt.sign(payload, config.secret, {
              expiresIn: 86400 // 24 hours
              // expiresIn: 5,
            });

            res.cookie("user", token, { httpOnly: true, maxAge: 900000 });

            res.status(200).send({
              user_id: user.user_id,
              token
            });
          }
        }
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findByidentification(req.body.identification, (err, user) => {
    if (err) return res.status(500).send({ message: err.message });
    if (user.message == "not_found") {
      return res.status(404).send({ message: "User not found." });
    } else {
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
          status : 401
        });
      }
      if(user.status_id === 'ST04') {
        return res.status(403).send ({
          accessToken: null,
          message: "You are banned from the server!",
          status : 403
        })
      }

      const payload = {
        user_id: user.user_id,
        role_id: user.role_id,
        gender_id: user.gender_id,
        birthdate: user.birthdate
      };

      var token = jwt.sign(payload, config.secret, {
        expiresIn: 86400 // 24 hours
        // expiresIn: 5,
      });
      res.cookie("user", token, { httpOnly: true, maxAge: 900000 });

      res.status(200).send({
        token
      });
    }
  });
};

exports.checkUniqueExists = (req, res) => {
  User.IsUserDuplicated(req.body, (err, user) => {
    if (err) return res.status(500).send({ message: err.message });
    if (user) return res.status(200).send(user);
    else return res.status(404).send(user);
  });
};
