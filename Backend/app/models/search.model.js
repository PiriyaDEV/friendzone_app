const sql = require("./db.connection.js");

const Search = function (search) {
  this.total = search.total;
  this.friends = search.friends;
  this.events = search.events;
  this.discount = search.discount;
};

Search.getSearchUserToInvite = (keyword, user_id, event_id, result) => {
  sql.query(
    `SELECT US.user_id, US.username,
    COALESCE((SELECT AVG(PR.rating) FROM ParticipantReview PR, EventParticipant EP WHERE EP.participant_id = US.user_id AND PR.participant_id = EP.event_participant_id), 0) as rating,
      IF(COALESCE((SELECT F.status_id FROM Follower F WHERE F.follower_id = '${user_id}' AND F.following_id = US.user_id ), 'ST06') = 'ST06' ,0,1) AS follow,
      IF( EXISTS ( SELECT * 
                   FROM EventInvited 
                   WHERE invitee_id = US.user_id
                        AND  inviter_id = ANY(SELECT event_participant_id 
                                     FROM EventParticipant 
                                     WHERE event_id = '${event_id}' AND 	
                                         participant_id = '${user_id}')),1,0) AS invited
  FROM User US 
  WHERE US.user_id NOT IN (SELECT participant_id FROM EventParticipant WHERE event_id = '${event_id}') 
      AND US.username LIKE '%${keyword}%'`,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        result(null, res);
        return;
      } else {
        result(null, []);
        return;
      }
    }
  );
};

Search.getSearchUser = (keyword, user_id, result) => {
  sql.query(
    `SELECT US.user_id, US.bio, US.birthdate, (SELECT gender_name FROM Gender WHERE gender_id = US.gender_id) AS gender, US.username, US.firstname, US.lastname,
    (SELECT COUNT(*) FROM Follower WHERE follower_id = US.user_id AND status_id = 'ST09') AS following, 
    (SELECT COUNT(*) FROM Follower WHERE following_id = US.user_id AND status_id = 'ST09') AS follower,
    (SELECT COUNT(*)
    FROM EventParticipant EP
    LEFT JOIN Event EV
           ON EP.event_participant_id = EV.host_id
    LEFT JOIN User USR
           ON USR.user_id = EP.participant_id
    WHERE  EP.participant_id = US.user_id AND NOT 
           EP.status_id = 'ST15' AND 
           EV.host_id = EP.event_participant_id) AS host,
    (SELECT COUNT(*)
    FROM EventParticipant EP
      LEFT JOIN Event EV
            ON EP.event_id = EV.event_id
    LEFT JOIN EventParticipant HOST
          ON EV.host_id = HOST.event_participant_id
      LEFT JOIN User USR
          ON USR.user_id = HOST.participant_id
    WHERE  EP.participant_id = US.user_id AND
          EP.status_id = 'ST11' AND 
          EV.status_id = 'ST03' AND NOT
          HOST.participant_id = US.user_id) AS joined,
    COALESCE((SELECT AVG(PR.rating) FROM ParticipantReview PR, EventParticipant EP WHERE EP.participant_id = US.user_id AND PR.participant_id = EP.event_participant_id), 0) as rating,
    IF(COALESCE((SELECT F.status_id FROM Follower F WHERE F.follower_id = '${user_id}' AND F.following_id = US.user_id ), 'ST06') = 'ST06' ,0,1) AS status_id
    FROM User US
    WHERE US.username LIKE '%${keyword}%' AND NOT US.user_id = '${user_id}'
    ORDER BY status_id DESC`,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        result(null, res);
        return;
      } else {
        result(null, []);
        return;
      }
    }
  );
};

Search.getSearchEvent = (keyword, user_id, result) => {
  let currentTime = new Date().getTime();
  sql.query(
    `SET @sql = NULL;
    SELECT
      GROUP_CONCAT(DISTINCT
        CONCAT(
          'MAX(CASE WHEN EC.category_id = ''',
          CA.category_id,
          '''THEN EC.status END) AS  ',
          replace(CA.category_id, ' ', '')
        )
      ) INTO @sql
    FROM Category CA;
    
    
    SET @sql = CONCAT('SELECT EV.*, ', @sql, '
      ,US.username, US.user_id, (SELECT Count(*) FROM EventParticipant WHERE event_id = EV.event_id AND status_id = "ST11") AS joined, 
      COALESCE((SELECT interest FROM UserInterest WHERE user_id = "${user_id}" AND event_id = EP.event_id ),0) AS interest,
        COALESCE((SELECT EP.event_participant_id
          FROM EventParticipant EP
         WHERE EP.event_id = EV.event_id
            AND EP.participant_id = "${user_id}"),0) AS event_participant_id,
        MAX(CASE WHEN EG.gender_id = "GE01" THEN EG.status END) AS  "GE01",
  	    MAX(CASE WHEN EG.gender_id = "GE02" THEN EG.status END) AS "GE02",
  	    MAX(CASE WHEN EG.gender_id = "GE03" THEN EG.status END) AS "GE03"
        FROM EventParticipant EP
        LEFT JOIN Event EV
            ON EP.event_participant_id = EV.host_id
        LEFT JOIN User US
            ON US.user_id = EP.participant_id
        INNER JOIN EventCategory EC
          ON EC.event_id = EV.event_id
        INNER JOIN EventGender EG
          ON EG.event_id = EV.event_id
        WHERE (title LIKE "%${keyword}%" OR location LIKE "%${keyword}%") AND 
              ${currentTime} < EV.end_at AND EV.status_id = "ST03"
        GROUP BY EV.event_id
        ORDER BY created_at');
    
    PREPARE stmt FROM @sql;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;`,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        result(null, res[4]);
        return;
      } else {
        result(null, []);
        return;
      }
    }
  );
};

Search.getSearchDiscount = (keyword, result) => {
  let currentTime = new Date().getTime();
  sql.query(
    `SELECT discount_id, name, description, redeem_point, limits, period_start, period_end, expired
    FROM Discount 
    WHERE (name LIKE '%${keyword}%' OR description LIKE '%${keyword}%') AND
          status_id = 'ST02' AND ${currentTime} BETWEEN period_start AND period_end
    ORDER BY created_at`,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        result(null, res);
        return;
      } else {
        result(null, []);
        return;
      }
    }
  );
};

module.exports = Search;
