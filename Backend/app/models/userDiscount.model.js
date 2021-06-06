const sql = require("./db.connection.js");

const UserDiscount = function (userDiscount) {
  this.user_discount_id = userDiscount.user_discount_id;
  this.user_id = userDiscount.user_id;
  this.discount_id = userDiscount.discount_id;
  this.status_id = userDiscount.status_id;
  this.created_at = userDiscount.created_at;
  this.updated_at = userDiscount.updated_at;
};

UserDiscount.getCount = (result) => {
  sql.query("SELECT COUNT(*) AS count FROM UserDiscount;", (err, res) => {
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

UserDiscount.create = (newUserDiscount, result) => {
  sql.query(`INSERT INTO UserDiscount SET ?`, newUserDiscount, (err, res) => {
    if (err) {
      console.log("error : ", err);
      result(err, null);
      return;
    }

    result(null, { ...newUserDiscount });
  });
};

UserDiscount.update = (data, result) => {
  sql.query(
    `UPDATE UserDiscount SET status_id = '${data.status_id}', updated_at = '${data.updated_at}' WHERE user_discount_id = '${data.user_discount_id}'`,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }

      //console.log("Updated user discount : ", { ...data });
      result(null, { ...data });
    }
  );
};

module.exports = UserDiscount;
