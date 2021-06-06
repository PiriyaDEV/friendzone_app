const sql = require("./db.connection.js");

const EventInvited = function (eventInvited) {
  this.event_invited_id = eventInvited.event_invited_id;
  this.inviter_id = eventInvited.inviter_id;
  this.invitee_id = eventInvited.invitee_id;
  this.status_id = eventInvited.status_id;
  this.created_at = eventInvited.created_at;
  this.updated_at = eventInvited.updated_at;
};

EventInvited.getCount = (result) => {
  sql.query("SELECT COUNT(*) AS count FROM EventInvited;", (err, res) => {
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

EventInvited.create = (newEventInvited, result) => {
  sql.query(`INSERT INTO EventInvited SET ?`, newEventInvited, (err, res) => {
    if (err) {
      console.log("error : ", err);
      result(err, null);
      return;
    }

    //console.log("Created event invited : ", { ...newEventInvited });
    result(null, { ...newEventInvited });
  });
};

EventInvited.update = (data, result) => {
  sql.query(
    `UPDATE EventInvited SET status_id = '${data.status_id}', updated_at = '${data.updated_at}' WHERE event_invited_id = '${data.event_invited_id}'`,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }

      //console.log("Updated event invited : ", { ...data });
      result(null, { ...data });
    }
  );
};

EventInvited.getNotification = (user_id, result) => {
  sql.query(
    `SELECT type, inviter_id, user_id, username, event_id, title,date,status 
  FROM(
    (SELECT "inviteRequest" AS type, EI.event_invited_id AS inviter_id, US.user_id, 
           US.username, EV.event_id, EV.title, 
           DATE_FORMAT(FROM_UNIXTIME(EI.updated_at/1000),'%d %b %Y %H:%i') AS date,
           IF(EV.start_at >= UNIX_TIMESTAMP(NOW()) *1000, 1, 0) AS status,
           EI.updated_at AS TIMESTAMP
    FROM EventInvited EI 
    INNER JOIN EventParticipant EP 
          ON EP.event_participant_id = EI.inviter_id
    INNER JOIN Event EV 
        ON EV.event_id = EP.event_id
    INNER JOIN User US 	
        ON US.user_id = EP.participant_id
    WHERE EI.invitee_id = '${user_id}' AND 	
        EI.status_id = 'ST18'
    ORDER BY EI.created_at DESC)
    
    UNION
    
    (SELECT "accept" AS type, null AS inviter_id, null AS user_id,
         null AS username, EV.event_id, EV.title, 
         DATE_FORMAT(FROM_UNIXTIME(EP.updated_at/1000),'%d %b %Y %H:%i') AS date,
         IF(EP.status_id = 'ST11',"accepted","declined") AS status ,
         EP.updated_at AS TIMESTAMP
    FROM Event EV 	
    INNER JOIN EventParticipant EP
        ON EP.event_id = EV.event_id
    WHERE EP.participant_id = '${user_id}' AND NOT
        EV.host_id = EP.event_participant_id AND 
        (EP.status_id = 'ST11' OR EP.status_id = 'ST15')
    ORDER BY EP.updated_at DESC)
    
    UNION
    
    (SELECT "eventRequest" AS type, null AS inviter_id, US.user_id,
         US.username, EV.event_id, EV.title, 
         DATE_FORMAT(FROM_UNIXTIME(EP.updated_at/1000),'%d %b %Y %H:%i') AS date,
         IF(EV.start_at >= UNIX_TIMESTAMP(NOW()) *1000, 1, 0) AS status,
         EP.updated_at AS TIMESTAMP
    FROM User US 
    INNER JOIN EventParticipant EP 
        ON EP.participant_id = US.user_id
    INNER JOIN Event EV 	
        ON EV.event_id = EP.event_id
    WHERE (EV.host_id IN (SELECT EP.event_participant_id FROM EventParticipant EP WHERE EV.event_id = EP.event_id AND EP.participant_id = '${user_id}') OR 
         EP.event_participant_id IN (SELECT EM.moderator_id 
                          FROM EventModerator EM 
                          WHERE EM.moderator_id = (SELECT EP.event_participant_id 
                                     FROM EventParticipant EP 
                                     WHERE EV.event_id = EP.event_id AND EP.participant_id = '${user_id}'))) AND 
         EP.status_id = 'ST13'
    ORDER BY EP.updated_at DESC)
    
    UNION
    
    (SELECT "eventApproval" AS type, null AS inviter_id, null AS user_id, 
         null AS username, EV.event_id, EV.title,
         DATE_FORMAT(FROM_UNIXTIME(EV.updated_at/1000),'%d %b %Y %H:%i') AS date,
         IF(EV.status_id = 'ST03','approved','rejected') AS status,
         EV.updated_at AS TIMESTAMP 
         FROM User US 	
    INNER JOIN EventParticipant EP 	
        ON EP.participant_id = US.user_id 
    INNER JOIN Event EV 
        ON EV.host_id = EP.event_participant_id
    WHERE (EV.status_id = 'ST03' OR EV.status_id = 'ST15') AND NOT        
          (US.role_id = 'RO01' OR US.role_id = 'RO03') AND 
          US.user_id = '${user_id}'
    ORDER BY EV.updated_at DESC)
    )u
  ORDER BY TIMESTAMP DESC
  LIMIT 20`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        //console.log("Count : ", res[0].count);
        result(null, res);
        return;
      } else {
        result(null, []);
        return;
      }
    }
  );
};

module.exports = EventInvited;
