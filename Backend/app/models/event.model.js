const sql = require("./db.connection.js");

const Event = function (event) {
  this.event_id = event.event_id;
  this.host_id = event.host_id;
  this.approver_id = event.approver_id;
  this.title = event.title;
  this.description = event.description;
  this.location = event.location;
  this.event_pic = event.event_pic;
  this.start_at = event.start_at;
  this.end_at = event.end_at;
  this.max_participant = event.max_participant;
  this.min_age = event.min_age;
  this.max_age = event.max_age;
  this.status_id = event.status_id;
  this.created_at = event.created_at;
  this.updated_at = event.updated_at;
};

Event.getCount = (result) => {
  sql.query("SELECT COUNT(*) AS count FROM Event;", (err, res) => {
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

Event.create = (newEvent, result) => {
  sql.query(`INSERT INTO Event SET ?`, newEvent, (err, res) => {
    if (err) {
      console.log("error : ", err);
      result(err, null);
      return;
    }

    //console.log("Created event : ", { ...newEvent });
    result(null, { ...newEvent });
  });
};

Event.uploadEventPic = (data, result) => {
  sql.query(
    `UPDATE Event SET event_pic = '${data.event_pic}', updated_at = '${data.updated_at}' WHERE event_id = '${data.event_id}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      //console.log("Insert event picture to: ", {...data})
      result(null, { ...data });
    }
  );
};

Event.updateHost = (data, result) => {
  sql.query(
    `UPDATE Event SET host_id = "${data.host_id}" WHERE event_id = "${data.event_id}"`,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }

      //console.log("Updated event : ", { ...data });
      result(null, res[0]);
    }
  );
};

Event.deleteEvent = (data, result) => {
  sql.query(
    `UPDATE Event SET status_id = "${data.status_id}", updated_at = ${data.updated_at} WHERE event_id = "${data.event_id}"`,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }

      console.log("Deleted event : ", { ...data });
      result(null, res);
    }
  );
};

Event.endEvent = (data, result) => {
  sql.query(
    `UPDATE Event SET end_at = "${data.end_at}", updated_at = ${data.updated_at} WHERE event_id = "${data.event_id}"`,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }

      console.log("Ended event : ", { ...data });
      result(null, res);
    }
  );
};

Event.getEventPicturePath = (event_id, result) => {
  sql.query(
    `SELECT event_pic FROM Event WHERE event_id = '${event_id}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        //console.log("found event: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found user with the this event id
      result({ message: "not_found" }, null);
      return;
    }
  );
};

Event.findEventByID = (event_id, result) => {
  sql.query(
    `SELECT event_id FROM Event WHERE event_id = '${event_id}' AND NOT status_id = 'ST07'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        result;
      }
      if (res.length) {
        result(null, {
          message: "Found",
          event_id: res[0].event_id,
          exist: true
        });
        return;
      } else {
        result(null, { message: "Not Found", exist: false });
        return;
      }
    }
  );
};

Event.getHostedEvent = (user_id, result) => {
  sql.query(
    `SELECT EV.* , US.username, US.user_id, EP.status_id AS participant_status, (SELECT Count(*) FROM EventParticipant WHERE event_id = EV.event_id AND status_id = 'ST11') AS joined, COALESCE(UI.interest, 0) AS interest,\
     COALESCE((SELECT AVG(rating) FROM EventReview
      WHERE reviewer_id IN (SELECT event_participant_id FROM EventParticipant WHERE event_id = EV.event_id)), 0) AS rating,
      COALESCE(EP.event_participant_id,0) AS event_participant_id,
      COALESCE((SELECT
      IF(status_id = 'ST03', 1, 0)
    FROM
      EventModerator
    WHERE
      moderator_id = (
          SELECT
              EP.event_participant_id
          FROM
              EventParticipant EP
          WHERE
              EP.event_id = EV.event_id
              AND EP.participant_id = '${user_id}'
      )), 0) AS isMod,
    (SELECT
      IF(SUM(IF(
          COALESCE(PR.participant_id, 0) = PR.participant_id,
          0,
          1
      )) = 0 OR COUNT(*) = 0, 1, 0)
      FROM
          EventParticipant EP
          LEFT JOIN EventParticipant REVIEW ON REVIEW.event_id = EP.event_id
          LEFT JOIN ParticipantReview PR ON PR.participant_id = REVIEW.event_participant_id
      WHERE
          EP.event_id = EV.event_id
          AND EP.participant_id = '${user_id}'
          AND REVIEW.status_id = 'ST11'
          AND NOT REVIEW.participant_id = '${user_id}') AS isParticipantRated,
    COALESCE((SELECT
      IF(status_id = 'ST02', 1, 0)
    FROM
      EventReview
    WHERE
      reviewer_id = (
          SELECT
              EP.event_participant_id
          FROM
              EventParticipant EP
          WHERE
              EP.event_id = EV.event_id
              AND EP.participant_id = '${user_id}'
      )), 0) AS isEventRated
    FROM EventParticipant EP\
    LEFT JOIN Event EV\ 
         ON EP.event_participant_id = EV.host_id\
    LEFT JOIN User US\
         ON US.user_id = EP.participant_id\
    LEFT JOIN UserInterest UI\ 
         ON EP.participant_id = UI.user_id AND EV.event_id = UI.event_id\
    WHERE  EP.participant_id = '${user_id}' AND NOT\ 
           EP.status_id = 'ST15' AND \ 
           EV.host_id = EP.event_participant_id\
    GROUP BY EP.event_id , EV.host_id\
    ORDER BY EV.start_at\
  `,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        //console.log("found event: ", res);
        result(null, res);
        return;
      } else {
        // not found user with the this user id
        result(null, { message: "not_found" });
        return;
      }
    }
  );
};

Event.getJoinedEvent = (user_id, result) => {
  sql.query(
    `SELECT EV.* , US.username, US.user_id, EP.status_id AS participant_status, (SELECT Count(*) FROM EventParticipant WHERE event_id = EV.event_id AND status_id = 'ST11') AS joined, COALESCE(UI.interest, 0) AS interest,\ 
    COALESCE((SELECT AVG(rating) FROM EventReview
    WHERE reviewer_id IN (SELECT event_participant_id FROM EventParticipant WHERE event_id = EV.event_id)), 0) AS rating,
    COALESCE(EP.event_participant_id,0) AS event_participant_id,
    COALESCE((SELECT
      IF(status_id = 'ST03', 1, 0)
    FROM
      EventModerator
    WHERE
      moderator_id = (
          SELECT
              EP.event_participant_id
          FROM
              EventParticipant EP
          WHERE
              EP.event_id = EV.event_id
              AND EP.participant_id = '${user_id}'
      )), 0) AS isMod,
    (SELECT
      IF(SUM(IF(
          COALESCE(PR.participant_id, 0) = PR.participant_id,
          0,
          1
      )) = 0 OR COUNT(*) = 0, 1, 0)
      FROM
          EventParticipant EP
          LEFT JOIN EventParticipant REVIEW ON REVIEW.event_id = EP.event_id
          LEFT JOIN ParticipantReview PR ON PR.participant_id = REVIEW.event_participant_id
      WHERE
          EP.event_id = EV.event_id
          AND EP.participant_id = '${user_id}'
          AND REVIEW.status_id = 'ST11'
          AND NOT REVIEW.participant_id = '${user_id}') AS isParticipantRated,
    COALESCE((SELECT
      IF(status_id = 'ST02', 1, 0)
    FROM
      EventReview
    WHERE
      reviewer_id = (
          SELECT
              EP.event_participant_id
          FROM
              EventParticipant EP
          WHERE
              EP.event_id = EV.event_id
              AND EP.participant_id = '${user_id}'
      )), 0) AS isEventRated
    FROM EventParticipant EP
    LEFT JOIN Event EV
         ON EP.event_id = EV.event_id
    LEFT JOIN EventParticipant HOST
         ON EV.host_id = HOST.event_participant_id
    LEFT JOIN UserInterest UI
         ON EP.participant_id = UI.user_id AND EV.event_id = UI.event_id
    LEFT JOIN User US
         ON US.user_id = HOST.participant_id
  WHERE  EP.participant_id = '${user_id}' AND
       EP.status_id = 'ST11' AND NOT
       HOST.participant_id = '${user_id}'
  ORDER BY EV.start_at
  `,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        //console.log("found event: ", res);
        result(null, res);
        return;
      } else {
        // not found user with the this user id
        result(null, { message: "not_found" });
        return;
      }
    }
  );
};

Event.getRequestedEvent = (user_id, result) => {
  sql.query(
    `SELECT EV.* , US.username, US.user_id, EP.status_id AS participant_status, IF(EP.status_id = 'ST15', 1 ,0) AS rejected , (SELECT Count(*) FROM EventParticipant WHERE event_id = EV.event_id AND status_id = 'ST11') AS joined,  COALESCE(UI.interest, 0) AS interest,\ 
    COALESCE((SELECT AVG(rating) FROM EventReview
    WHERE reviewer_id IN (SELECT event_participant_id FROM EventParticipant WHERE event_id = EV.event_id)), 0) AS rating,
    COALESCE((SELECT
      IF(status_id = 'ST03', 1, 0)
    FROM
      EventModerator
    WHERE
      moderator_id = (
          SELECT
              EP.event_participant_id
          FROM
              EventParticipant EP
          WHERE
              EP.event_id = EV.event_id
              AND EP.participant_id = '${user_id}'
      )), 0) AS isMod,
    (SELECT
      IF(SUM(IF(
          COALESCE(PR.participant_id, 0) = PR.participant_id,
          0,
          1
      )) = 0 OR COUNT(*) = 0, 1, 0)
      FROM
          EventParticipant EP
          LEFT JOIN EventParticipant REVIEW ON REVIEW.event_id = EP.event_id
          LEFT JOIN ParticipantReview PR ON PR.participant_id = REVIEW.event_participant_id
      WHERE
          EP.event_id = EV.event_id
          AND EP.participant_id = '${user_id}'
          AND REVIEW.status_id = 'ST11'
          AND NOT REVIEW.participant_id = '${user_id}') AS isParticipantRated,
    COALESCE((SELECT
      IF(status_id = 'ST02', 1, 0)
    FROM
      EventReview
    WHERE
      reviewer_id = (
          SELECT
              EP.event_participant_id
          FROM
              EventParticipant EP
          WHERE
              EP.event_id = EV.event_id
              AND EP.participant_id = '${user_id}'
      )), 0) AS isEventRated
    FROM EventParticipant EP\
    LEFT JOIN Event EV\ 
         ON EP.event_id = EV.event_id\
    LEFT JOIN EventParticipant HOST\
         ON EV.host_id = HOST.event_participant_id\
    LEFT JOIN UserInterest UI \
         ON EP.participant_id = UI.user_id AND EV.event_id = UI.event_id\
    LEFT JOIN User US\
         ON US.user_id = HOST.participant_id\

  WHERE  EP.participant_id = '${user_id}' AND\
         (EP.status_id = 'ST13' OR  EP.status_id = 'ST15') AND\
         EV.end_at > ROUND(UNIX_TIMESTAMP(CURTIME(4)) * 1000)\
  ORDER BY EV.start_at\
  `,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        //console.log("found event: ", res);
        result(null, res);
        return;
      } else {
        // not found user with the this user id
        result(null, { message: "not_found" });
        return;
      }
    }
  );
};

Event.getInterestedEvent = (user_id, result) => {
  sql.query(
    `SELECT EV.*, HOSTUSER.username, HOSTUSER.user_id, (SELECT status_id FROM EventParticipant WHERE event_id = EV.event_id AND participant_id =  '${user_id}') AS participant_status, (SELECT Count(*) FROM EventParticipant WHERE event_id = EV.event_id AND status_id = 'ST11') AS joined,  COALESCE(UI.interest, 0) AS interest,
    COALESCE((SELECT AVG(rating) FROM EventReview
    WHERE reviewer_id IN (SELECT event_participant_id FROM EventParticipant WHERE event_id = EV.event_id)), 0) AS rating,
    COALESCE((SELECT EP.event_participant_id
          	  FROM EventParticipant EP
         	  WHERE EP.event_id = EV.event_id
              	AND EP.participant_id = '${user_id}'),0) AS event_participant_id,
    COALESCE((SELECT
      IF(status_id = 'ST03', 1, 0)
    FROM
      EventModerator
    WHERE
      moderator_id = (
          SELECT
              EP.event_participant_id
          FROM
              EventParticipant EP
          WHERE
              EP.event_id = EV.event_id
              AND EP.participant_id = '${user_id}'
      )), 0) AS isMod,
    (SELECT
      IF(SUM(IF(
          COALESCE(PR.participant_id, 0) = PR.participant_id,
          0,
          1
      )) = 0 OR COUNT(*) = 0, 1, 0)
      FROM
          EventParticipant EP
          LEFT JOIN EventParticipant REVIEW ON REVIEW.event_id = EP.event_id
          LEFT JOIN ParticipantReview PR ON PR.participant_id = REVIEW.event_participant_id
      WHERE
          EP.event_id = EV.event_id
          AND EP.participant_id = '${user_id}'
          AND REVIEW.status_id = 'ST11'
          AND NOT REVIEW.participant_id = '${user_id}') AS isParticipantRated,
    COALESCE((SELECT
      IF(status_id = 'ST02', 1, 0)
    FROM
      EventReview
    WHERE
      reviewer_id = (
          SELECT
              EP.event_participant_id
          FROM
              EventParticipant EP
          WHERE
              EP.event_id = EV.event_id
              AND EP.participant_id = '${user_id}'
      )), 0) AS isEventRated
    FROM User US 
    LEFT JOIN UserInterest UI 
         ON US.user_id = UI.user_id
    LEFT JOIN Event EV
         ON EV.event_id = UI.event_id
    LEFT JOIN EventParticipant HOST
         ON EV.host_id = HOST.event_participant_id
    LEFT JOIN User HOSTUSER
         ON HOSTUSER.user_id = HOST.participant_id		
         
  WHERE  US.user_id = '${user_id}' AND 
       COALESCE(UI.interest, 0) = 1
       
  ORDER BY EV.start_at

  `,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        //console.log("found event: ", res);
        result(null, res);
        return;
      } else {
        // not found user with the this user id
        result(null, { message: "not_found" });
        return;
      }
    }
  );
};

Event.getUserCateogryInterestEvent = (user_id, result) => {
  sql.query(
    `
    SELECT EV.* , US.username,US.user_id, (SELECT Count(*) FROM EventParticipant WHERE event_id = EV.event_id AND status_id = "ST11") AS joined, 
    COALESCE((SELECT interest FROM UserInterest WHERE user_id =  '${user_id}'  AND event_id = EP.event_id ),0) AS interest, EC.category_id
FROM Event EV
LEFT JOIN EventParticipant EP
    ON EP.event_participant_id = EV.host_id
LEFT JOIN User US
    ON US.user_id = EP.participant_id
INNER JOIN EventCategory EC
    ON EV.event_id = EC.event_id
INNER JOIN UserCategory UC
    ON UC.user_id = '${user_id}' AND 
       UC.category_id = EC.category_id
WHERE    NOT EP.status_id = 'ST15' AND 
       (NOT EV.event_id IN (SELECT EP.event_id 
                    FROM EventParticipant EP 
                    WHERE EP.participant_id =  '${user_id}') OR
            EV.event_id IN (SELECT EP.event_id 
                    FROM EventParticipant EP 
                    WHERE EP.participant_id =  '${user_id}' AND EP.status_id =  '${user_id}')) AND          
         EC.status = 1 AND UC.interest = 1 AND 
         EV.start_at > ROUND(UNIX_TIMESTAMP(CURTIME(4)) * 1000) AND 
         EV.status_id = 'ST03'
GROUP BY EP.event_id , EV.host_id
ORDER BY RAND()
LIMIT 20
  `,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        //console.log("found event: ", res);
        result(null, res);
        return;
      } else {
        // not found user with the this user id
        result(null, { message: "not_found" });
        return;
      }
    }
  );
};

Event.getEventByCategory = (user_id, category_id, result) => {
  sql.query(
    `    SELECT EV.* , US.username,US.user_id, (SELECT Count(*) FROM EventParticipant WHERE event_id = EV.event_id AND status_id = "ST11") AS joined,
    COALESCE((SELECT interest FROM UserInterest WHERE user_id = '${user_id}' AND event_id = EP.event_id ),0) AS interest,
    COALESCE(IF((SELECT FO.follower_id 
    			 FROM Follower FO 
    			 WHERE FO.follower_id = '${user_id}' AND 
    			       FO.following_id = US.user_id AND 
    			       FO.status_id = 'ST09' ) = '${user_id}', 1, 0),0) AS followHost
    FROM Event EV
    LEFT JOIN EventParticipant EP
        ON EP.event_participant_id = EV.host_id
    LEFT JOIN User US
        ON US.user_id = EP.participant_id
    LEFT JOIN EventCategory EC 
        ON EV.event_id = EC.event_id 
           AND EC.category_id = '${category_id}'   
    WHERE NOT EP.participant_id = '${user_id}' AND  
              (NOT EV.event_id IN (SELECT EP.event_id 
                               FROM EventParticipant EP 
                               WHERE EP.participant_id = '${user_id}') OR 
               EV.event_id IN (SELECT EP.event_id 
                               FROM EventParticipant EP 
                               WHERE EP.participant_id = '${user_id}' AND EP.status_id = 'ST12')) AND
                          EV.host_id = EP.event_participant_id AND 
                          EC.status = 1 AND 
                          EV.start_at > ROUND(UNIX_TIMESTAMP(CURTIME(4)) * 1000) AND
                          EV.status_id = 'ST03' 
    GROUP BY EP.event_id , EV.host_id
    ORDER BY RAND()
    LIMIT 20
     `,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        //console.log("found event: ", res);
        result(null, res);
        return;
      } else {
        // not found user with the this user id
        result(null, { message: "not_found" });
        return;
      }
    }
  );
};

Event.getApproverList = (result) => {
  sql.query(
    `SELECT EV.*, US.username
      FROM Event EV, User US, EventParticipant EP
      WHERE EV.host_id = EP.event_participant_id AND 
          EP.participant_id = US.user_id 
      ORDER BY EV.created_at DESC
    `,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        result(null, res);
        return;
      } else {
        result(null, { message: "not_found" });
        return;
      }
    }
  );
};

Event.getEventCount = (result) => {
  sql.query(
    `(SELECT COALESCE(status_id, "ST03") AS status_id, count(*) AS count 
     FROM Event 
     WHERE status_id = "ST03") 
   
     UNION 
   
     (SELECT COALESCE(status_id, "ST13") AS status_id, count(*) AS count 
     FROM Event 
     WHERE status_id = "ST13") 
     
     UNION 
    
     (SELECT COALESCE(status_id, "ST15") AS status_id, count(*) AS count 
     FROM Event 
     WHERE status_id = "ST15") 
  `,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        result(null, res);
        return;
      } else {
        result(null, { message: "not_found" });
        return;
      }
    }
  );
};

Event.approving = (event_id, status_id, approver, result) => {
  sql.query(
    `UPDATE Event SET status_id = '${status_id}',approver_id = '${approver}' WHERE event_id = '${event_id}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        result(null, res);
        return;
      } else {
        result(null, { message: "not_found" });
        return;
      }
    }
  );
};

module.exports = Event;
