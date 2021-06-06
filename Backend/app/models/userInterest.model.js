const sql = require("./db.connection.js");

const UserInterest = function (userInterest) {
  this.user_id = userInterest.user_id;
  this.event_id = userInterest.event_id;
  this.interest = userInterest.interest;
  this.created_at = userInterest.created_at;
  this.updated_at = userInterest.updated_at;
};

UserInterest.create = (newUserInterest, result) => {
  sql.query(
    `INSERT INTO UserInterest SET ? ON DUPLICATE KEY UPDATE interest = ${newUserInterest.interest}, updated_at = ${newUserInterest.updated_at}`,
    newUserInterest,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }

      //console.log("Created user interest : ", { ...newUserInterest });
      result(null, { ...newUserInterest });
    }
  );
};

module.exports = UserInterest;
