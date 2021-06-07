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
    `        
    SELECT
            US.username,
            REVIEWEE.event_participant_id,
            IF(
                COALESCE(PR.participant_id, 0) = PR.participant_id,
                1,
                0
            ) AS reviewed
        FROM
            EventParticipant REVIEWER
            LEFT JOIN EventParticipant REVIEWEE ON REVIEWEE.event_id = REVIEWER.event_id
            LEFT JOIN ParticipantReview PR ON PR.participant_id = REVIEWEE.event_participant_id AND 
                              PR.reviewer_id = REVIEWER.event_participant_id
            LEFT JOIN User US ON REVIEWEE.participant_id = US.user_id
        WHERE
            REVIEWER.event_id = '${data.event_id}'
            AND REVIEWER.participant_id = '${data.user_id}'
            AND REVIEWEE.status_id = 'ST11'
            AND NOT REVIEWEE.participant_id = '${data.user_id}'
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
