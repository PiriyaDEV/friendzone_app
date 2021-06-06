const sql = require("./db.connection.js");

const UserCategory = function (userCategory) {
  this.user_id = userCategory.user_id;
  this.category_id = userCategory.category_id;
  this.interest = userCategory.interest;
  this.created_at = userCategory.created_at;
  this.updated_at = userCategory.updated_at;
};

UserCategory.create = (newUserCategory, result) => {
  sql.query(
    `INSERT INTO UserCategory VALUES ? ON DUPLICATE KEY UPDATE interest = VALUES(interest), updated_at = VALUES(updated_at)`,
    [newUserCategory],
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }

      //console.log("Updated user category : ", { ...newUserCategory });
      result(null, { ...newUserCategory });
    }
  );
};

module.exports = UserCategory;
