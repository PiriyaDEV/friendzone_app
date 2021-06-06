const sql = require("./db.connection.js");

const Admin = [];

Admin.getReportList = (result) => {
  sql.query(
    `SELECT RP.report_id,   
    CASE 
      WHEN RP.event_id IS NOT NULL
           THEN 'Event' 
      WHEN RP.suspect_id IS NOT NULL 
           THEN 'User'
      ELSE 'Web'
     END AS type, US.username AS reporter, 
   DATE_FORMAT(FROM_UNIXTIME(RP.created_at/1000),'%d %b %Y %H:%i') AS createDate,
   DATE_FORMAT(FROM_UNIXTIME(RP.updated_at/1000),'%d %b %Y %H:%i') AS updateDate,
   CASE 
                    WHEN RP.status_id = 'ST18'
                        THEN 'Waiting' 
                    WHEN RP.status_id = 'ST14'
                        THEN 'Read'
                    WHEN RP.status_id = 'ST04'
                        THEN 'Banned'
                    ELSE 'Deleted'
                  END AS status,
   COALESCE((SELECT(US.username) FROM User US WHERE US.user_id = RP.admin_id),"None") AS admin_id, RP.title, 
    CASE 
      WHEN RP.event_id IS NOT NULL
           THEN RP.event_id 
      WHEN RP.suspect_id IS NOT NULL 
           THEN (SELECT US.username FROM User US WHERE US.user_id = RP.suspect_id)
      ELSE 'None'
   END AS suspect,
   RT.type_name,
   RP.description
FROM Report RP 
INNER JOIN ReportType RT 
      ON RP.report_type_id = RT.report_type_id
INNER JOIN User US 
      ON US.user_id = RP.reporter_id 
ORDER BY RP.created_at DESC `,
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
        result(null, []);
        return;
      }
    }
  );
};

Admin.getUserList = (result) => {
  sql.query(
    `SELECT US.user_id, US.bio, US.email, US.phone, DATE_FORMAT(FROM_UNIXTIME(US.birthdate/1000),'%d %b %Y') AS birthdate,
  (SELECT gender_name FROM Gender WHERE gender_id = US.gender_id) AS gender, US.username, US.firstname, US.lastname,
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
    WHERE EP.participant_id = US.user_id AND
            EP.status_id = 'ST11' AND 
          EV.status_id = 'ST03' AND NOT
          HOST.participant_id = US.user_id) AS joined,
   COALESCE((SELECT AVG(PR.rating) 
             FROM   ParticipantReview PR, EventParticipant EP 
             WHERE  EP.participant_id = US.user_id AND PR.participant_id = EP.event_participant_id), 0) as rating,
     RO.role,
     IF(US.status_id = 'ST02', 'Normal', 'Banned') AS status
    FROM User US
    INNER JOIN Role RO 	
    ON RO.role_id = US.role_id
    ORDER BY US.user_id DESC`,
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
        result(null, []);
        return;
      }
    }
  );
};

Admin.getDiscountList = (result) => {
  sql.query(
    `SELECT DC.discount_id, DC.name, DC.description, DC.redeem_point, DC.limits, DC.status_id,
  DATE_FORMAT(FROM_UNIXTIME(DC.period_start/1000),'%d %b %Y %H:%i') AS period_start,
  DATE_FORMAT(FROM_UNIXTIME(DC.period_end/1000),'%d %b %Y %H:%i') AS period_end,
  DATE_FORMAT(FROM_UNIXTIME(DC.expired/1000),'%d %b %Y %H:%i') AS expired,
  CASE 
    WHEN DC.status_id = 'ST10'
       THEN 'Deleted'
    WHEN UNIX_TIMESTAMP(NOW())*1000 BETWEEN DC.period_start AND DC.period_end
       THEN 'Active'
    ELSE 'Inactive'
  END AS status  
FROM Discount DC 
ORDER BY DC.created_at DESC`,
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
        result(null, []);
        return;
      }
    }
  );
};

Admin.searchReport = (keyword, result) => {
  sql.query(
    `SELECT RP.report_id,   
    CASE 
      WHEN RP.event_id IS NOT NULL
           THEN 'Event' 
      WHEN RP.suspect_id IS NOT NULL 
           THEN 'User'
      ELSE 'Web'
     END AS type, US.username AS reporter, 
   DATE_FORMAT(FROM_UNIXTIME(RP.created_at/1000),'%d %b %Y %H:%i') AS createDate,
   DATE_FORMAT(FROM_UNIXTIME(RP.updated_at/1000),'%d %b %Y %H:%i') AS updateDate,
   CASE 
                    WHEN RP.status_id = 'ST18'
                        THEN 'Waiting' 
                    WHEN RP.status_id = 'ST14'
                        THEN 'Read'
                    WHEN RP.status_id = 'ST04'
                        THEN 'Banned'
                    ELSE 'Deleted'
                  END AS status,
   COALESCE((SELECT(US.username) FROM User US WHERE US.user_id = RP.admin_id),"None") AS admin_id, RP.title, 
    CASE 
      WHEN RP.event_id IS NOT NULL
           THEN RP.event_id 
      WHEN RP.suspect_id IS NOT NULL 
           THEN (SELECT US.username FROM User US WHERE US.user_id = RP.suspect_id)
      ELSE 'None'
   END AS suspect,
   RT.type_name,
   RP.description
FROM Report RP 
INNER JOIN ReportType RT 
      ON RP.report_type_id = RT.report_type_id
INNER JOIN User US 
      ON US.user_id = RP.reporter_id 
WHERE title LIKE '%${keyword}%' OR type_name LIKE '%${keyword}%' OR (CASE 
                       WHEN RP.event_id IS NOT NULL 
                            THEN 'Event' 
                       WHEN RP.suspect_id IS NOT NULL 
                            THEN 'User'
                       ELSE 'Web'
                       END) LIKE '%${keyword}%'
ORDER BY RP.created_at DESC`,
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
        result(null, []);
        return;
      }
    }
  );
};

Admin.searchUser = (keyword, result) => {
  sql.query(
    `SELECT US.user_id, US.bio, US.email, US.phone, DATE_FORMAT(FROM_UNIXTIME(US.birthdate/1000),'%d %b %Y') AS birthdate,
    (SELECT gender_name FROM Gender WHERE gender_id = US.gender_id) AS gender, US.username, US.firstname, US.lastname,
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
      WHERE EP.participant_id = US.user_id AND
              EP.status_id = 'ST11' AND 
            EV.status_id = 'ST03' AND NOT
            HOST.participant_id = US.user_id) AS joined,
     COALESCE((SELECT AVG(PR.rating) 
               FROM   ParticipantReview PR, EventParticipant EP 
               WHERE  EP.participant_id = US.user_id AND PR.participant_id = EP.event_participant_id), 0) as rating,
       RO.role,
       IF(US.status_id = 'ST02', 'Normal', 'Banned') AS status
      FROM User US
      INNER JOIN Role RO 	
      ON RO.role_id = US.role_id
  WHERE US.username LIKE '%${keyword}%' OR role LIKE '%${keyword}%'
  ORDER BY status_id DESC`,
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
        result(null, []);
        return;
      }
    }
  );
};

Admin.searchDiscount = (keyword, result) => {
  sql.query(
    `    SELECT DC.discount_id, DC.name, DC.description, DC.redeem_point, DC.limits, DC.status_id,
    DATE_FORMAT(FROM_UNIXTIME(DC.period_start/1000),'%d %b %Y %H:%i') AS period_start,
    DATE_FORMAT(FROM_UNIXTIME(DC.period_end/1000),'%d %b %Y %H:%i') AS period_end,
    DATE_FORMAT(FROM_UNIXTIME(DC.expired/1000),'%d %b %Y %H:%i') AS expired,
    CASE 
      WHEN DC.status_id = 'ST10'
         THEN 'Deleted'
      WHEN UNIX_TIMESTAMP(NOW())*1000 BETWEEN DC.period_start AND DC.period_end
         THEN 'Active'
      ELSE 'Inactive'
    END AS status  
  FROM Discount DC 
WHERE DC.name LIKE '%${keyword}%'`,
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
        result(null, []);
        return;
      }
    }
  );
};
module.exports = Admin;
