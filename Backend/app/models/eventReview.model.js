const sql = require("./db.connection.js");

const EventReview = function (eventReview) {
  this.event_review_id = eventReview.event_review_id;
  this.reviewer_id = eventReview.reviewer_id;
  this.rating = eventReview.rating;
  this.comment = eventReview.comment;
  this.status_id = eventReview.status_id;
  this.created_at = eventReview.created_at;
  this.updated_at = eventReview.updated_at;
};

EventReview.getCount = (result) => {
  sql.query("SELECT COUNT(*) AS count FROM EventReview;", (err, res) => {
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

EventReview.create = (newEventReview, result) => {
  sql.query(
    `INSERT INTO EventReview VALUES (
      '${newEventReview.event_review_id}',
      (SELECT event_participant_id 
        FROM EventParticipant 
        WHERE participant_id = '${newEventReview.user_id}' 
        AND event_id = '${newEventReview.event_id}'),
      ${newEventReview.rating},
      NULLIF('${newEventReview.comment}',''),
      '${newEventReview.status_id}',
      '${newEventReview.created_at}',
      '${newEventReview.updated_at}'
    );`,
    newEventReview,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }

      console.log("Create event review : ", { ...newEventReview });
      result(null, { ...newEventReview });
    }
  );
};

module.exports = EventReview;
