const Analyst = require("../models/analyst.model.js");

exports.getAppSummary = (req, res) => {
  Analyst.getAppSummary((err, data) => {
    if (err) return res.status(500).send({ message: err.message });
    if (data) return res.status(200).send(data);
  });
};

exports.getEventSummary = (req, res) => {
  Analyst.getEventSummary((err, data) => {
    if (err) return res.status(500).send({ message: err.message });
    if (data) return res.status(200).send(data);
  });
};

exports.getEventCategorySummary = (req, res) => {
  Analyst.getEventCategorySummary((err, data) => {
    if (err) return res.status(500).send({ message: err.message });
    if (data) return res.status(200).send(data);
  });
};

exports.getUserSummary = (req, res) => {
  Analyst.getUserSummary((err, data) => {
    if (err) return res.status(500).send({ message: err.message });
    if (data) return res.status(200).send(data);
  });
};

exports.getUserHistorySummary = (req, res) => {
  Analyst.getUserHistorySummary((err, data) => {
    if (err) return res.status(500).send({ message: err.message });
    if (data) return res.status(200).send(data);
  });
};

exports.getDiscountSummary = (req, res) => {
  Analyst.getDiscountSummary((err, data) => {
    if (err) return res.status(500).send({ message: err.message });
    if (data) return res.status(200).send(data);
  });
};

exports.getReportSummary = (req, res) => {
  Analyst.getReportSummary((err, data) => {
    if (err) return res.status(500).send({ message: err.message });
    if (data) return res.status(200).send(data);
  });
};

exports.getReportTypeSummary = (req, res) => {
  Analyst.getReportTypeSummary((err, data) => {
    if (err) return res.status(500).send({ message: err.message });
    if (data) return res.status(200).send(data);
  });
};
