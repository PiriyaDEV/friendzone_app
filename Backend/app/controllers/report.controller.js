const Report = require("../models/report.model.js");
const ReportType = require("../models/reportType.model.js");

function getTimeStamp() {
  return new Date().getTime();
}

exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Report.getCount((err, count) => {
    if (err) return res.status(500).send({ message: err.message });
    else {
      count++;
      count = count.toString();
      var report_id = "RP" + count.padStart(6, "0");
      var report = new Report("");

      report = req.body;
      report.report_id = report_id;
      report.status_id = "ST18";
      report.created_at = getTimeStamp();
      report.updated_at = getTimeStamp();
      Report.create(report, (err, result) => {
        if (err) return res.status(500).send({ message: err.message });
        else return res.status(200).send({ report_id: result.report_id });
      });
    }
  });
};

exports.createType = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  ReportType.getCount((err, count) => {
    if (err) return res.status(500).send({ message: err.message });
    else {
      count++;
      count = count.toString();
      var report_type_id = "RT" + count.padStart(2, "0");
      var reportType = new ReportType("");

      reportType = req.body;
      reportType.report_type_id = report_type_id;
      reportType.status_id = "ST02";
      reportType.created_at = getTimeStamp();
      reportType.updated_at = getTimeStamp();
      ReportType.create(reportType, (err, reportType) => {
        if (err) return res.status(500).send({ message: err.message });
        else return res.status(200).send({report_type_id: reportType.report_type_id, type_name: reportType.type_name});
      });
    }
  });
};

exports.updateType = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  req.body.updated_at = getTimeStamp();

  ReportType.update(req.body, (err, reportType) => {
    if (err) return res.status(500).send({ message: err.message });
    if (reportType) return res.status(200).send({report_type_id: reportType.report_type_id, type_name: reportType.type_name});
  });
};

exports.getReportTypeUserList = (req, res) => {
  ReportType.getReportTypeUserList((err, reportType) => {
    if (err) return res.status(500).send({ message: err.message });
    if (reportType) return res.status(200).send(reportType);
  });
};

exports.getReportTypeEventList = (req, res) => {
  ReportType.getReportTypeEventList((err, reportType) => {
    if (err) return res.status(500).send({ message: err.message });
    if (reportType) return res.status(200).send(reportType);
  });
};

exports.getReportTypeWebList = (req, res) => {
  ReportType.getReportTypeWebList((err, reportType) => {
    if (err) return res.status(500).send({ message: err.message });
    if (reportType) return res.status(200).send(reportType);
  });
};

exports.approveReport = (req, res) => {
  Report.approveReport(req.body, (err, result) => {
    if (err) return res.status(500).send({ message: err.message });
    if (result) return res.status(200).send(result);
  });
};
