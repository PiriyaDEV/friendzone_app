const sql = require("./db.connection.js");

const Analyst = [];

Analyst.getAppSummary = (result) => {
  sql.query(
    `SELECT 'Users' AS name, COUNT(*) AS count FROM User 
              UNION
             SELECT 'Events' AS name, COUNT(*) AS count FROM Event 
              UNION
             SELECT 'Discounts' AS name, COUNT(*) AS count FROM Discount`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res) {
        result(null, res);
        return;
      }
    }
  );
};

Analyst.getEventSummary = (result) => {
  sql.query(
    `SELECT ST.status_name AS status, COUNT(*) AS count
             FROM Event EV
             LEFT JOIN Status ST 
              ON ST.status_id = EV.status_id
             GROUP BY EV.status_id`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res) {
        result(null, res);
        return;
      }
    }
  );
};

Analyst.getEventCategorySummary = (result) => {
  sql.query(
    `SELECT CA.category_id, 
    CA.category_name,
    CA.color_code,
    CA.icon_white,
    COALESCE(COUNT(EC.category_id), 0) AS count,
    COALESCE((COUNT(*) / (SELECT COUNT(*) FROM Event) * 100), 0) AS percent
    FROM Category CA
    LEFT JOIN EventCategory EC 
           ON CA.category_id = EC.category_id
    GROUP BY CA.category_id
    ORDER BY percent DESC`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res) {
        result(null, res);
        return;
      }
    }
  );
};

Analyst.getUserSummary = (result) => {
  sql.query(
    `(SELECT GE.gender_name AS name,
      COALESCE((COUNT(US.gender_id) / (SELECT COUNT(*) FROM User) * 100),0) AS percent
      FROM User US 
      RIGHT JOIN Gender GE
       ON GE.gender_id = US.gender_id
      GROUP BY GE.gender_id
      ORDER BY percent)
      UNION
      (SELECT
       CASE 
         WHEN UNIX_TIMESTAMP(NOW() - INTERVAL 18 YEAR)*1000 < US.birthdate AND US.birthdate < UNIX_TIMESTAMP(NOW() - INTERVAL 13 YEAR)*1000 
             THEN '13-17'
         WHEN UNIX_TIMESTAMP(NOW() - INTERVAL 24 YEAR) * 1000 < US.birthdate  
             THEN '18-24'
         WHEN UNIX_TIMESTAMP(NOW() - INTERVAL 34 YEAR) * 1000 < US.birthdate
             THEN '25-34'
         WHEN UNIX_TIMESTAMP(NOW() - INTERVAL 44 YEAR) * 1000 < US.birthdate
             THEN '34-44'
         ELSE '44+'
         END AS name, COALESCE((COUNT(*) / (SELECT COUNT(*) FROM User) * 100),0) AS percent
       FROM User US
       GROUP BY name
       ORDER BY percent DESC
       LIMIT 1)`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res) {
        result(null, res);
        return;
      }
    }
  );
};

Analyst.getUserHistorySummary = (result) => {
  sql.query(
    `SELECT stringDate, sum(count) AS count, date 
    FROM (
	    (SELECT FROM_UNIXTIME(created_at/1000 ,'%Y-%m-%d') AS stringDate,
	    COUNT(*) AS count,
	    created_at AS date
	    FROM User
	    GROUP BY stringDate 
	    ORDER BY stringDate)
	    
	    UNION 
	    
	    (SELECT stringDate,0 AS count, ROUND(UNIX_TIMESTAMP(stringDate)*1000) AS date  FROM
	    (SELECT adddate('1970-01-01',t4*10000 + t3*1000 + t2*100 + t1*10 + t0) stringDate FROM
	    (SELECT 0 t0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t0,
	    (SELECT 0 t1 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t1,
	    (SELECT 0 t2 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t2,
	    (SELECT 0 t3 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t3,
	    (SELECT 0 t4 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t4) v
	     WHERE stringDate 
	     	   BETWEEN  (SELECT FROM_UNIXTIME(created_at/1000 ,'%Y-%m-%d') AS stringDate
					    FROM User
					    GROUP BY stringDate 
					    ORDER BY stringDate 
					    LIMIT 1 )
				   AND  (SELECT FROM_UNIXTIME(created_at/1000 ,'%Y-%m-%d') AS stringDate
					    FROM User
					    GROUP BY stringDate 
					    ORDER BY stringDate DESC
					    LIMIT 1)) 
	)u
	GROUP BY stringDate
	ORDER BY stringDate`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res) {
        result(null, res);
        return;
      }
    }
  );
};

Analyst.getDiscountSummary = (result) => {
  sql.query(
    `SELECT 'Exchanged' AS name,
            COUNT(*) AS count
     FROM UserDiscount
      UNION 
     SELECT 'Average' AS name,
            COALESCE(AVG(redeem_point),0) AS count
      FROM (
        SELECT SUM(DC.redeem_point) AS redeem_point
        FROM Discount DC 
        INNER JOIN UserDiscount UD
          ON DC.discount_id = UD.discount_id
        INNER JOIN User US 
          ON US.user_id = UD.user_id
        GROUP BY US.user_id
        ) AS query`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res) {
        result(null, res);
        return;
      }
    }
  );
};

Analyst.getReportSummary = (result) => {
  sql.query(
    `SELECT 
      CASE 
        WHEN event_id IS NOT NULL
             THEN 'Events' 
        WHEN suspect_id IS NOT NULL 
             THEN 'Users'
        ELSE 'Web'
      END AS type, COUNT(*) AS count
     FROM Report
     GROUP BY type`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res) {
        result(null, res);
        return;
      }
    }
  );
};

Analyst.getReportTypeSummary = (result) => {
  sql.query(
    `SELECT RT.type_name AS type,
      (COUNT(*) / (SELECT COUNT(*) FROM Report) * 100) AS percent
     FROM ReportType RT
     INNER JOIN Report RP
      ON RP.report_type_id = RT.report_type_id
     GROUP BY RP.report_type_id
     ORDER BY percent DESC`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res) {
        result(null, res);
        return;
      }
    }
  );
};

module.exports = Analyst;
