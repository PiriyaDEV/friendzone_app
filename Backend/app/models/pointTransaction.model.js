const sql = require("./db.connection.js");

// Constructor
const PointTransaction = [];

class PointEvent {
  function(pointEvent) {
    this.point_transaction_id = pointEvent.point_transaction_id;
    this.user_id = pointEvent.user_id;
    this.event_id = pointEvent.event_id;
    this.description = pointEvent.description;
    this.amount = pointEvent.amount;
    this.created_at = pointEvent.created_at;
    this.updated_at = pointEvent.updated_at;
  }
}

class PointDiscount {
  function(pointDiscount) {
    this.point_transaction_id = pointDiscount.point_transaction_id;
    this.user_discount_id = pointDiscount.user_discount_id;
    this.description = pointDiscount.description;
    this.amount = pointDiscount.amount;
    this.created_at = pointDiscount.created_at;
    this.updated_at = pointDiscount.updated_at;
  }
}

PointTransaction.getPoint = (user_id, result) => {
  sql.query(
    `   
    SELECT SUM(amount1.point) AS point
    FROM ((SELECT COALESCE(SUM(amount),0) AS point
          FROM PointTransaction PT
           INNER JOIN EventParticipant EP 
               ON EP.participant_id = '${user_id}' AND 
                  EP.event_participant_id = PT.participant_id
           INNER JOIN Event EV 	
               ON EV.event_id = EP.event_id AND NOT 
                  EV.status_id = 'ST07')
        UNION 
          (SELECT COALESCE(SUM(amount *-1),0) AS point
            FROM PointTransaction PT
            INNER JOIN UserDiscount UD 
                    ON UD.user_id = '${user_id}' AND 
                       UD.user_discount_id = PT.user_discount_id)
     ) amount1 `,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        result(null, res[0]);
        return;
      }
      return;
    }
  );
};

PointTransaction.getCount = (result) => {
  sql.query("SELECT COUNT(*) AS count FROM PointTransaction;", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res) {
      result(null, res[0].count);
      return;
    }
  });
};

PointTransaction.addPointJoin = (newPointTransaction, result) => {
  sql.query(
    `INSERT INTO PointTransaction (point_transaction_id, participant_id, description, amount, created_at, updated_at) VALUES
                                  ('${newPointTransaction.point_transaction_id}', (SELECT event_participant_id 
                                                FROM EventParticipant EP 
                                                WHERE EP.participant_id = '${newPointTransaction.user_id}' AND 
                                                      EP.event_id = '${newPointTransaction.event_id}'), 
                                    '${newPointTransaction.description}', 
                                    '${newPointTransaction.amount}', 
                                    '${newPointTransaction.created_at}', 
                                    '${newPointTransaction.updated_at}');`,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }
      result(null, { ...newPointTransaction });
    }
  );
};

PointTransaction.addPoint = (newPointTransaction, result) => {
  sql.query(
    `INSERT INTO PointTransaction SET ?`,
    newPointTransaction,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }
      result(null, { ...newPointTransaction });
    }
  );
};

PointTransaction.getPointLog = (user_id, result) => {
  sql.query(
    `           SELECT amount1.point AS point, amount1.title, amount1.description, amount1.created_at
    FROM ((SELECT COALESCE(amount,0) AS point, EV.title AS title, PT.description, PT.created_at
         FROM PointTransaction PT
         INNER JOIN EventParticipant EP 
                 ON EP.participant_id = '${user_id}' AND 
                    EP.event_participant_id = PT.participant_id
         INNER JOIN Event EV 
                ON EP.event_id = EV.event_id AND NOT 
                EV.status_id = 'ST07')
      UNION ALL
       (SELECT COALESCE(amount*-1 ,0) AS point, DC.name AS title, PT.description, PT.created_at
        FROM PointTransaction PT
        INNER JOIN UserDiscount UD 
                      ON UD.user_id = '${user_id}' AND 
                         UD.user_discount_id = PT.user_discount_id
        INNER JOIN Discount DC 
               ON DC.discount_id = UD.discount_id)
       ) amount1
       ORDER BY created_at DESC`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        result(null, res);
        return;
      }
      return;
    }
  );
};

module.exports = { PointTransaction, PointEvent, PointDiscount };
