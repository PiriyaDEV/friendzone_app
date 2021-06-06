const sql = require("./db.connection.js");

// Constructor
const Report = function (report) {
  this.report_id = report.report_id;
  this.reporter_id = report.reporter_id;
  this.report_type_id = report.report_type_id;
  this.title = report.title;
  this.description = report.description;
  this.event_id = report.event_id;
  this.suspect_id = report.suspect_id;
  this.admin_id = report.admin_id;
  this.status_id = report.status_id;
  this.created_at = report.created_at;
  this.updated_at = report.updated_at;
};

Report.getCount = (result) => {
  sql.query("SELECT COUNT(*) AS count FROM Report;", (err, res) => {
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

Report.create = (newReport, result) => {
  sql.query(`INSERT INTO Report SET ?`, newReport, (err, res) => {
    if (err) {
      console.log("error : ", err);
      result(err, null);
      return;
    }

    result(null, { ...newReport });
  });
};

Report.approveReport = (report, result) => {
  sql.query(
    `UPDATE Report RP SET RP.status_id = IF(${report.takeAction} = 1,IF(RP.event_id IS NOT NULL, 'ST07', IF(RP.suspect_id IS NOT NULL, 'ST04' ,'ST14')) ,'ST14' ), RP.updated_at = UNIX_TIMESTAMP(NOW())*1000, RP.admin_id = '${report.admin_id}' WHERE RP.report_id = '${report.report_id}';
              UPDATE Event EV 
              INNER JOIN Report RP
                      ON EV.event_id = RP.event_id AND RP.report_id = '${report.report_id}' 
              SET EV.status_id =  IF(${report.takeAction} = 1 AND RP.event_id IS NOT NULL, 'ST07', EV.status_id);
              UPDATE User US
              INNER JOIN Report RP
                      ON US.user_id = RP.suspect_id AND RP.report_id = '${report.report_id}' 
              SET US.status_id =  IF(${report.takeAction} = 1 AND RP.suspect_id IS NOT NULL, 'ST04', US.status_id);
              SELECT RP.report_id,   
                  CASE 
                    WHEN RP.event_id IS NOT NULL
                        THEN 'Event' 
                    WHEN RP.suspect_id IS NOT NULL
                        THEN 'User'
                    ELSE 'Web'
                  END AS type, US.username AS reporter, 
                DATE_FORMAT(FROM_UNIXTIME(RP.created_at/1000),'%d %b %Y %H:%i') AS createDate,
                DATE_FORMAT(FROM_UNIXTIME(RP.updated_at/1000),'%d %b %Y %H:%i') AS updateDate,
                CASE 
                    WHEN RP.status_id = 'ST18'
                        THEN 'Waiting' 
                    WHEN RP.status_id = 'ST14'
                        THEN 'Read'
                    WHEN RP.status_id = 'ST04'
                        THEN 'Banned'
                    ELSE 'Deleted'
                  END AS status,
                COALESCE((SELECT(US.username) FROM User US WHERE US.user_id = RP.admin_id),"None") AS admin_id, RP.title, 
                  CASE 
                    WHEN RP.event_id IS NOT NULL
                        THEN RP.event_id 
                    WHEN RP.suspect_id IS NOT NULL 
                        THEN RP.suspect_id
                    ELSE 'None'
                END AS suspect,
                RT.type_name,
                RP.description
              FROM Report RP 
              INNER JOIN ReportType RT 
                    ON RP.report_type_id = RT.report_type_id
              INNER JOIN User US 
                    ON US.user_id = RP.reporter_id 
              WHERE RP.report_id = '${report.report_id}'`,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }

      if (res) {
        //console.log("Count : ", res[0].count);
        result(null, res[3]);
        return;
      }
    }
  );
};

module.exports = Report;
