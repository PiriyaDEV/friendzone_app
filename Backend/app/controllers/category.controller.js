const Category = require("../models/category.model.js");
const multer = require("multer");
const fs = require("fs");
const fsPromises = fs.promises;
const _profilePicDir = "./data/category/";
const path = require("path");

function getTimeStamp() {
  return new Date().getTime();
}

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Category.getCount((err, count) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while getting count of the categories."
      });
    else {
      count++;
      count = count.toString();
      var category_id = "CA" + count.padStart(2, "0");
      var category = new Category("");

      category = req.body;
      category.category_id = category_id;
      category.created_at = getTimeStamp();
      category.updated_at = getTimeStamp();

      Category.create(category, (err, category) => {
        if (err) return res.status(500).send({ message: err.message });
        res.status(200).send({
          message: "Category : " + category.category_name + " created",
          category_id: category.category_id
        });
      });
    }
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  req.body.updated_at = getTimeStamp();

  Category.update(req.body, (err, category) => {
    if (err) return res.status(500).send({ message: err.message });
    if (category) return res.status(200).send(category);
  });
};

exports.getCategoryList = (req, res) => {
  Category.getCategoryList((err, category) => {
    if (err) return res.status(500).send({ message: err.message });
    if (category) return res.status(200).send(category);
  });
};

exports.uploadCategoryIcon = (req, res) => {
  if (req.query.type === "white") {
    fsPromises
      .mkdir(_profilePicDir + req.query.type, { recursive: true }, (err) => {
        console.log("mkdir err -->" + err);
      })
      .then(() => {
        console.log("id: ", req.query.category_id);
        upload(req, res, (err) => {
          if (err) {
            console.log("error by uploading white category icon");
            console.log(err);
            res.status(500).send({ message: err.message });
          } else {
            console.log("id UPLOAD ICON --> " + req.query.category_id);
            res.send({ message: "upload white category icon success" });
          }
        });
      });
  } else if (req.query.type === "black") {
    fsPromises
      .mkdir(_profilePicDir + req.query.type, { recursive: true }, (err) => {
        console.log("mkdir err -->" + err);
      })
      .then(() => {
        console.log("id: ", req.query.category_id);
        upload(req, res, (err) => {
          if (err) {
            console.log("error by uploading black category icon");
            console.log(err);
            res.status(500).send({ message: err.message });
          } else {
            console.log("id UPLOAD ICON --> " + req.query.category_id);
            res.send({ message: "upload black category icon success" });
          }
        });
      });
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    var filename =
      req.query.category_id + "-" + req.query.type + "-" + file.originalname;
    if (req.query.type === "white") {
      Category.uploadWhiteCategoryIcon(
        {
          category_id: req.query.category_id,
          icon_white: req.query.type + "/" + filename,
          updated_at: getTimeStamp()
        },
        (err, data) => {
          if (err) return res.status(500).send({ message: err.message });
          else console.log(data);
        }
      );
    } else if (req.query.type === "black") {
      Category.uploadBlackCategoryIcon(
        {
          category_id: req.query.category_id,
          icon_black: req.query.type + "/" + filename,
          updated_at: getTimeStamp()
        },
        (err, data) => {
          if (err) return res.status(500).send({ message: err.message });
          else console.log(data);
        }
      );
    }
    callback(null, _profilePicDir + req.query.type);
  },
  filename: function (req, file, callback) {
    var filename =
      req.query.category_id + "-" + req.query.type + "-" + file.originalname;
    callback(null, filename);
  }
});

const upload = multer({ storage: storage }).single("uploadedImages");

exports.displayCategoryIcon = (req, res) => {
  Category.getCategoryIconPath(
    req.query.category_id,
    async (err, categoryIcon) => {
      if (err) return res.status(500).send({ message: err.message });
      if (!categoryIcon)
        return res.status(404).send({ message: "this category is not found" });
      else {
        let icon;
        if (req.query.type == "white") icon = categoryIcon.icon_white;
        else if (req.query.type == "black") icon = categoryIcon.icon_black;

        let fileType = path.extname(icon);

        if (fileType === ".png") contentType = "image/png";
        else if (fileType === ".jpg") contentType = "image/jpg";
        else if (fileType === ".jpeg") contentType = "image/jpeg";
        else contentType = "text/plain";

        fs.readFile(_profilePicDir + icon, function (error, content) {
          if (error) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Internal server error");
          } else {
            res.writeHead(200, { "Content-Type": contentType });
            res.end(content);
          }
        });
      }
    }
  );
};

exports.getCategoryFromUserID = (req, res) => {
  Category.getCategoryFromUserID(req.params.user_id, (err, category) => {
    if (err) return res.status(500).send({ message: err.message });
    if (category) return res.status(200).send(category);
  });
};
