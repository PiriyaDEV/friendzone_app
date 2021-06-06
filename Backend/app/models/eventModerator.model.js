const sql = require("./db.connection.js");

const EventModerator = function (eventModerator) {
  this.event_moderator_id = eventModerator.event_moderator_id;
  this.moderator_id = eventModerator.moderator_id;
  this.status_id = eventModerator.status_id;
  this.created_at = eventModerator.created_at;
  this.updated_at = eventModerator.updated_at;
};

EventModerator.getCount = (result) => {
  sql.query("SELECT COUNT(*) AS count FROM EventModerator;", (err, res) => {
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

EventModerator.create = (newEventModerator, result) => {
  sql.query(
    `INSERT INTO EventModerator SET ? ON DUPLICATE KEY UPDATE status_id = '${newEventModerator.status_id}', updated_at = ${newEventModerator.updated_at}`,
    newEventModerator,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }

      //console.log("Created event moderator : ", { ...newEventModerator });
      result(null, { ...newEventModerator });
    }
  );
};

EventModerator.update = (data, result) => {
  sql.query(
    `UPDATE EventModerator SET status_id = '${data.status_id}', updated_at = '${data.updated_at}' WHERE moderator_id = '${data.moderator_id}'`,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }

      //console.log("Updated event moderator : ", { ...data });
      result(null, { ...data });
    }
  );
};

module.exports = EventModerator;
