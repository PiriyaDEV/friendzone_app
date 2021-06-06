const sql = require("./db.connection.js");

const EventGender = function (event) {
  this.event_id = event.event_id;
  this.gender_id = event.gender_id;
  this.status = event.status;
  this.created_at = event.created_at;
  this.updated_at = event.updated_at;
};

EventGender.create = (newEventGender, result) => {
  console.log(newEventGender)
  sql.query(
    `INSERT INTO EventGender VALUES ?`,
    [newEventGender],
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }

      result(null, { ...newEventGender });
    }
  );
};

EventGender.getEventGenderList = (event_id, result) => {
  sql.query(
    `SELECT GE.gender_id, GE.gender_name\
      FROM EventGender EG\
      LEFT JOIN Gender GE\ 
        ON EG.gender_id = GE.gender_id\
      WHERE EG.event_id = '${event_id}'\
        AND EG.status = 1
      `,
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

module.exports = EventGender;
