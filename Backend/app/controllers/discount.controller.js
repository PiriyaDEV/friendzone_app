const UserDiscount = require("../models/userDiscount.model.js");
const Discount = require("../models/discount.model.js");
const Point = require("../models/pointTransaction.model.js");
const multer = require("multer");
const fs = require("fs");
const fsPromises = fs.promises;
const _discountPicDir = "./data/discount/";
const path = require("path");

function getTimeStamp() {
  return new Date().getTime();
}

exports.uploadDiscountPic = (req, res) => {
  fsPromises
    .mkdir(
      _discountPicDir + req.query.discount_id,
      { recursive: true },
      (err) => {
        console.log("mkdir err -->" + err);
      }
    )
    .then(() => {
      console.log("id: ", req.query.discount_id);
      upload(req, res, (err) => {
        if (err) {
          console.log("error by uploading IMG");
          res.status(500).send({ message: err.message });
        } else {
          console.log("id UPLOAD IMG --> " + req.query.discount_id);
          res.send({ message: "upload discount picture success" });
        }
      });
    });
};

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    Discount.uploadDiscountPic(
      {
        discount_id: req.query.discount_id,
        discount_pic:
          req.query.discount_id +
          "/" +
          req.query.discount_id +
          "-" +
          file.originalname,
        updated_at: getTimeStamp()
      },
      (err, data) => {
        if (err) return res.status(500).send({ message: err.message });
        else console.log(data);
      }
    );
    callback(null, _discountPicDir + req.query.discount_id);
  },
  filename: function (req, file, callback) {
    callback(null, req.query.discount_id + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage }).single("uploadedImages");

exports.displayPic = (req, res) => {
  Discount.getDiscountPicturePath(req.params.discount_id, async (err, discount) => {
    if (err) return res.status(500).send({ message: err.message });
    if (!discount)
      return res.status(404).send({ message: "this discount is not found" });
    else {
      let fileType = path.extname(discount.discount_pic);

      if (fileType === ".png") contentType = "image/png";
      else if (fileType === ".jpg") contentType = "image/jpg";
      else if (fileType === ".jpeg") contentType = "image/jpeg";
      else contentType = "text/plain";

      fs.readFile(
        _discountPicDir + discount.discount_pic,
        function (error, content) {
          if (error) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Internal server error");
          } else {
            res.writeHead(200, { "Content-Type": contentType });
            res.end(content);
          }
        }
      );
    }
  });
};

exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Discount.getCount((err, count) => {
    if (err) return res.status(500).send({ message: err.message });
    else {
      count++;
      count = count.toString();
      var discount_id = "DC" + count.padStart(6, "0");
      var discount = new Discount("");
      discount.discount_id = discount_id;
      discount.name = req.body.name;
      discount.description = req.body.description;
      discount.redeem_point = req.body.redeem_point;
      discount.limits = req.body.limits;
      discount.period_start = req.body.period_start;
      discount.period_end = req.body.period_end;
      discount.expired = req.body.expired;
      discount.status_id = "ST02";
      discount.created_at = getTimeStamp();
      discount.updated_at = getTimeStamp();
      Discount.create(discount, (err, result) => {
        if (err) return res.status(500).send({ message: err.message });
        else return res.status(200).send({ discount_id: result.discount_id });
      });
    }
  });
};

exports.editDiscount = (req, res) => {
  req.body.updated_at = getTimeStamp();

  Discount.editDiscount(req.body, (err, discount) => {
    if (err) return res.status(500).send({ message: err.message });
    if (discount) return res.status(200).send(discount);
  });
};

exports.deleteDiscount = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  let discount = {
    discount_id: req.body.discount_id,
    status_id: "ST10",
    updated_at: getTimeStamp()
  };

  Discount.update(discount, (err, result) => {
    if (err) return res.status(500).send({ message: err.message });
    else return res.status(200).send(result);
  });
};

exports.getHotDiscount = (req, res) => {
  Discount.getHotDiscount(req.params.user_id, (err, result) => {
    if (err) return res.status(500).send({ message: err.message });
    else return res.status(200).send(result);
  });
};

exports.getBrowseDiscount = (req, res) => {
  Discount.getBrowseDiscount(req.params.user_id, (err, result) => {
    if (err) return res.status(500).send({ message: err.message });
    else return res.status(200).send(result);
  });
};

exports.getMyDiscount = (req, res) => {
  Discount.getMyDiscount(req.params.user_id, (err, result) => {
    if (err) return res.status(500).send({ message: err.message });
    else return res.status(200).send(result);
  });
};

exports.useDiscount = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  let userDiscount = {
    user_discount_id: req.body.user_discount_id,
    status_id: "ST17",
    updated_at: getTimeStamp()
  };

  UserDiscount.update(userDiscount, (err, result) => {
    if (err) return res.status(500).send({ message: err.message });
    else return res.status(200).send(result);
  });
};

exports.discountTransaction = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  UserDiscount.getCount((err, count) => {
    if (err) return res.status(500).send({ message: err.message });
    else {
      count++;
      count = count.toString();
      var user_discount_id = "UD" + count.padStart(6, "0");
      var userDiscount = new UserDiscount("");
      userDiscount.user_discount_id = user_discount_id;
      userDiscount.user_id = req.body.user_id;
      userDiscount.discount_id = req.body.discount_id;
      userDiscount.status_id = "ST16";
      userDiscount.created_at = getTimeStamp();
      userDiscount.updated_at = getTimeStamp();
      UserDiscount.create(userDiscount, (err, result) => {
        if (err) return res.status(500).send({ message: err.message });
        else {
          if (result.user_discount_id) {
            Point.PointTransaction.getCount((err, count) => {
              if (err) return res.status(500).send({ message: err.message });
              else {
                count++;
                count = count.toString();
                var point_transaction_id = "PT" + count.padStart(6, "0");
                var pointEvent = new Point.PointEvent("");
                pointEvent.point_transaction_id = point_transaction_id;
                pointEvent.user_discount_id = result.user_discount_id;
                pointEvent.description = "Buy Discount";
                pointEvent.amount = req.body.redeem_point;
                pointEvent.created_at = getTimeStamp();
                pointEvent.updated_at = getTimeStamp();
                Point.PointTransaction.addPoint(pointEvent, (err, result) => {
                  if (err)
                    return res.status(500).send({ message: err.message });
                  else
                    return res
                      .status(200)
                      .send({ user_discount_id: result.user_discount_id });
                });
              }
            });
          }
        }
      });
    }
  });
};
