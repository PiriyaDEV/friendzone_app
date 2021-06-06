const Admin = require("../models/admin.model.js");

exports.getReportList = (req, res) => {
  Admin.getReportList((err, report) => {
    if (err) return res.status(500).send({ message: err.message });
    if (report) return res.status(200).send(report);
  });
};

exports.getUserList = (req, res) => {
    Admin.getUserList((err, user) => {
      if (err) return res.status(500).send({ message: err.message });
      if (user) return res.status(200).send(user);
   });
};

exports.getDiscountList = (req, res) => {
    Admin.getDiscountList((err, discount) => {
      if (err) return res.status(500).send({ message: err.message });
      if (discount) return res.status(200).send(discount);
    });
};

exports.searchReport = (req, res) => {
  Admin.searchReport(req.query.keyword,(err, report) => {
    if (err) return res.status(500).send({ message: err.message });
    if (report) return res.status(200).send(report);
  });
};

exports.searchUser = (req, res) => {
  Admin.searchUser(req.query.keyword,(err, user) => {
    if (err) return res.status(500).send({ message: err.message });
    if (user) return res.status(200).send(user);
  });
};

exports.searchDiscount = (req, res) => {
  Admin.searchDiscount(req.query.keyword,(err, discount) => {
    if (err) return res.status(500).send({ message: err.message });
    if (discount) return res.status(200).send(discount);
  });
};