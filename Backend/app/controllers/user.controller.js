const User = require("../models/user.model.js");
const UserCategory = require("../models/userCategory.model.js");
const multer = require("multer");
const fs = require("fs");
const fsPromises = fs.promises;
const _profilePicDir = "./data/user/";
const path = require("path");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const { error } = require("jquery");

function getTimeStamp() {
  return new Date().getTime();
}

exports.uploadPic = (req, res) => {
  fsPromises
    .mkdir(_profilePicDir + req.query.user_id, { recursive: true }, (err) => {
      console.log("mkdir err -->" + err);
    })
    .then(() => {
      console.log("id: ", req.query.user_id);
      upload(req, res, (err) => {
        if (err) {
          console.log("error by uploading IMG");
          res.status(500).send({ message: err.message });
        } else {
          console.log("id UPLOAD IMG --> " + req.query.user_id);
          res.send({ message: "upload image success" });
        }
      });
    });
};

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    User.uploadProfilePic(
      {
        user_id: req.query.user_id,
        profile_pic:
          req.query.user_id + "/" + req.query.user_id + "-" + file.originalname,
        updated_at: getTimeStamp()
      },
      (err, data) => {
        if (err) return res.status(500).send({ message: err.message });
        else console.log(data);
      }
    );
    callback(null, _profilePicDir + req.query.user_id);
  },
  filename: function (req, file, callback) {
    callback(null, req.query.user_id + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage }).single("uploadedImages");

exports.displayPic = (req, res) => {
  User.getProfilePicturePath(req.params.user_id, async (err, user) => {
    if (err) return res.status(500).send({ message: err.message });
    if (!user)
      return res.status(404).send({ message: "this user is not found" });
    else {
      let fileType = path.extname(user.profile_pic);

      if (fileType === ".png") contentType = "image/png";
      else if (fileType === ".jpg") contentType = "image/jpg";
      else if (fileType === ".jpeg") contentType = "image/jpeg";
      else contentType = "text/plain";

      fs.readFile(_profilePicDir + user.profile_pic, function (error, content) {
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

exports.changePassword = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  User.findByidentification(req.body.user_id, (err, user) => {
    if (err) return res.status(500).send({ message: err.message });
    else {
      if (res.message != "not_found") {
        var passwordIsValid = bcrypt.compareSync(
          req.body.oldPassword,
          user.password
        );

        if (!passwordIsValid) {
          return res.status(200).send({
            message: "Invalid Password!"
          });
        } else {
          let data = {
            user_id: req.body.user_id,
            password: bcrypt.hashSync(req.body.newPassword, 8),
            updated_at: getTimeStamp()
          };
          User.updatePassword(data, (err, result) => {
            if (err) return res.status(500).send({ message: err.message });
            else {
              if (result.message == "password changed") {
                return res.status(200).send({
                  message: "Password Changed!"
                });
              }
            }
          });
        }
      }
    }
  });
};

exports.getUsername = (req, res) => {
  User.getUser(req.params.user_id, (err, user) => {
    if (err) return res.status(500).send({ message: err.message });
    if (user) return res.status(200).send({ username: user.username });
  });
};

exports.getUserDetail = (req, res) => {
  User.getUser(req.params.user_id, (err, user) => {
    if (err) return res.status(500).send({ message: err.message });
    if (user)
      return res.status(200).send({
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        phone: user.phone,
        gender: user.gender,
        birthdate: user.birthdate,
        profile_pic: user.profile_pic,
        bio: user.bio,
        rating: user.rating,
        host: user.host,
        joined: user.joined,
        following: user.following,
        follower: user.follower
      });
  });
};

exports.findByUsername = (req, res) => {
  User.findByUsername(req.body.username, (err, user) => {
    if (err) return res.status(500).send({ message: err.message });
    if (user) return res.status(200).send(user);
  });
};

exports.editUser = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  req.body.updated_at = getTimeStamp();

  User.editUser(req.body, (err, user) => {
    if (err) return res.status(500).send({ message: err.user });
    if (user) {
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
  });
};

exports.updateUserCategory = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  var categoryList = [];
  req.body.categoryInterest.forEach((category) => {
    categoryList.push([
      (user_id = req.body.user_id),
      (category_id = category.category_id),
      (interest = category.interest),
      (created_at = getTimeStamp()),
      (updated_at = getTimeStamp())
    ]);
  });

  UserCategory.create(categoryList, (err, userCategory) => {
    if (err) return res.status(500).send({ message: err.message });
    else {
      return res
        .status(200)
        .send({ message: "Created user category : " + userCategory });
    }
  });
};

exports.following = (req, res) => {
  if (req.body.follower_id === req.body.following_id)
    return res.status(500).send({ message: "You can't follow yourself!" });

  User.following(
    {
      follower_id: req.body.follower_id,
      following_id: req.body.following_id,
      status_id: "ST09",
      created_at: getTimeStamp(),
      updated_at: getTimeStamp()
    },
    (err, message) => {
      if (err) return res.status(500).send({ message: err.message });
      if (message) return res.status(200).send({ message: "followed" });
    }
  );
};

exports.unfollowing = (req, res) => {
  if (req.body.follower_id === req.body.following_id)
    return res.status(500).send({ message: "You can't follow yourself!" });

  User.unfollowing(
    {
      follower_id: req.body.follower_id,
      following_id: req.body.following_id,
      status_id: "ST06",
      updated_at: getTimeStamp()
    },
    (err, message) => {
      if (err) return res.status(500).send({ message: err.message });
      if (message) return res.status(200).send({ message: "unfollowed" });
    }
  );
};
