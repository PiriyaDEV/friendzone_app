const sql = require("./db.connection.js");

const EventCategory = function (eventCategory) {
  this.event_id = eventCategory.event_id;
  this.category_id = eventCategory.category_id;
  this.status = eventCategory.status;
  this.created_at = eventCategory.created_at;
  this.updated_at = eventCategory.updated_at;
};

EventCategory.create = (newEventCategory, result) => {
  console.log(newEventCategory)
  sql.query(
    `INSERT INTO EventCategory VALUES ?`,
    [newEventCategory],
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }

      //console.log("Created event category : ", { ...newEventCategory });
      result(null, { ...newEventCategory });
    }
  );
};

EventCategory.getEventCategoryList = (event_id, result) => {
  sql.query(
    `SELECT CA.category_name\
      FROM EventCategory EC\
      LEFT JOIN Category CA\ 
        ON EC.category_id = CA.category_id\
      WHERE EC.event_id = '${event_id}'\
        AND EC.status = 1
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

module.exports = EventCategory;
