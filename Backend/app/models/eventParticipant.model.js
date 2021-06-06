const sql = require("./db.connection.js");

const EventParticipant = function (eventParticipant) {
  this.event_participant_id = eventParticipant.event_participant_id;
  this.event_id = eventParticipant.event_id;
  this.participant_id = eventParticipant.participant_id;
  this.status_id = eventParticipant.status_id;
  this.created_at = eventParticipant.created_at;
  this.updated_at = eventParticipant.updated_at;
};

EventParticipant.getCount = (result) => {
  sql.query("SELECT COUNT(*) AS count FROM EventParticipant;", (err, res) => {
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

EventParticipant.create = (newEventParticipant, result) => {
  sql.query(
    `INSERT INTO EventParticipant SET ? ON DUPLICATE KEY UPDATE status_id = '${newEventParticipant.status_id}', updated_at = ${newEventParticipant.updated_at}`,
    newEventParticipant,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }

      //console.log("Created event participant : ", { ...newEventParticipant });
      result(null, { ...newEventParticipant });
    }
  );
};

EventParticipant.update = (data, result) => {
  sql.query(
    `UPDATE EventParticipant SET status_id = '${data.status_id}', updated_at = '${data.updated_at}' WHERE event_id = '${data.event_id}' AND participant_id = '${data.participant_id}'`,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }

      //console.log("Updated event participant : ", { ...data });
      result(null, { ...data });
    }
  );
};

EventParticipant.getEventParticipantList = (event_id, result) => {
  sql.query(
    `SELECT
        US.user_id,
        US.username,
        EP.event_participant_id,
        EP.status_id,
        IF(
            COALESCE(EM.event_moderator_id, 0) = EM.event_moderator_id,
            IF(EM.status_id = 'ST03', EM.event_moderator_id, 0),
            0
        ) AS moderator,
        IF(EV.host_id = EP.event_participant_id, 1, 0) AS host,
        COALESCE((
          SELECT
              AVG(rating)
          FROM
              ParticipantReview
          WHERE
              participant_id IN (
                  SELECT
                      event_participant_id
                  FROM
                      EventParticipant
                  WHERE
                      participant_id = US.user_id
              )
        ), 0) AS rating
    FROM
        EventParticipant EP
        LEFT JOIN User US ON EP.participant_id = US.user_id
        LEFT JOIN EventModerator EM ON EM.moderator_id = EP.event_participant_id
        LEFT JOIN Event EV ON EP.event_participant_id = EV.host_id
    WHERE
        EP.event_id = '${event_id}'
        AND (
            EP.status_id = 'ST11'
            OR EP.status_id = 'ST13'
        )
    ORDER BY host DESC, moderator DESC, EP.updated_at
    `,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }

      //console.log("Found event participant : ", res);
      result(null, res);
    }
  );
};

module.exports = EventParticipant;
