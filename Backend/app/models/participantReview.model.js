const sql = require("./db.connection.js");

const ParticipantReview = function (participantReview) {
  this.participant_review_id = participantReview.participant_review_id;
  this.reviewer_id = participantReview.reviewer_id;
  this.participant_id = participantReview.participant_id;
  this.rating = participantReview.rating;
  this.comment = participantReview.comment;
  this.status_id = participantReview.status_id;
  this.created_at = participantReview.created_at;
  this.updated_at = participantReview.updated_at;
};

ParticipantReview.getCount = (result) => {
  sql.query("SELECT COUNT(*) AS count FROM ParticipantReview;", (err, res) => {
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

ParticipantReview.create = (newParticipantReview, result) => {
  sql.query(
    `INSERT INTO ParticipantReview VALUES (
      '${newParticipantReview.participant_review_id}',
      (SELECT event_participant_id 
        FROM EventParticipant 
        WHERE participant_id = '${newParticipantReview.user_id}' 
        AND event_id = '${newParticipantReview.event_id}'),
      '${newParticipantReview.participant_id}',
      ${newParticipantReview.rating},
      NULLIF('${newParticipantReview.comment}', ''),
      '${newParticipantReview.status_id}',
      '${newParticipantReview.created_at}',
      '${newParticipantReview.updated_at}'    
    );`,
    newParticipantReview,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }

      console.log("Create participant review : ", { ...newParticipantReview });
      result(null, { ...newParticipantReview });
    }
  );
};

ParticipantReview.getParticipantToReview = (data, result) => {
  sql.query(
    `SELECT
        US.username,
        REVIEW.event_participant_id,
        IF(
            COALESCE(PR.participant_id, 0) = PR.participant_id,
            1,
            0
        ) AS reviewed
    FROM
        EventParticipant EP
        LEFT JOIN EventParticipant REVIEW ON REVIEW.event_id = EP.event_id
        LEFT JOIN ParticipantReview PR ON PR.participant_id = REVIEW.event_participant_id
        LEFT JOIN User US ON REVIEW.participant_id = US.user_id
    WHERE
        EP.event_id = '${data.event_id}'
        AND EP.participant_id = '${data.user_id}'
        AND REVIEW.status_id = 'ST11'
        AND NOT REVIEW.participant_id = '${data.user_id}'
    `,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }

      console.log("Found participant review : ", res);
      result(null, res);
    }
  );
};

module.exports = ParticipantReview;
