const sql = require("./db.connection.js");

const ReportType = function (reportType) {
  this.report_type_id = reportType.report_type_id;
  this.type_name = reportType.type_name;
  this.require_event = reportType.require_event;
  this.require_suspect = reportType.require_suspect;
  this.created_at = reportType.created_at;
  this.updated_at = reportType.updated_at;
};

ReportType.getCount = (result) => {
  sql.query("SELECT COUNT(*) AS count FROM ReportType;", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res) {
      //console.log("Count : ", res[0].count);
      result(null, res[0].count);
      return;
    }
  });
};

ReportType.create = (newReportType, result) => {
  sql.query(`INSERT INTO ReportType SET ?`, newReportType, (err, res) => {
    if (err) {
      console.log("error : ", err);
      result(err, null);
      return;
    }

    //console.log("Created report type : ", { ...newReportType });
    result(null, { ...newReportType });
  });
};

ReportType.update = (reportType, result) => {
  sql.query(
    `Update ReportType Set ? WHERE report_type_id = "${reportType.report_type_id}"`,
    reportType,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }

      //console.log("Updated report type : ", { ...reportType });
      result(null, { ...reportType });
    }
  );
};

ReportType.getReportTypeUserList = (result) => {
  sql.query(
    `SELECT report_type_id, type_name FROM ReportType WHERE require_suspect = 1 AND status_id = "ST02"`,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

ReportType.getReportTypeEventList = (result) => {
  sql.query(
    `SELECT report_type_id, type_name FROM ReportType WHERE require_event = 1 AND status_id = "ST02"`,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

ReportType.getReportTypeWebList = (result) => {
  sql.query(
    `SELECT report_type_id, type_name FROM ReportType WHERE require_suspect = 0 AND require_event = 0 AND status_id = "ST02"`,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

module.exports = ReportType;
