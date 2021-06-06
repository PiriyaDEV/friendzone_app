const sql = require("./db.connection.js");

// Constructor
const Discount = function (discount) {
  this.discount_id = discount.discount_id;
  this.name = discount.name;
  this.description = discount.description;
  this.discount_pic = discount.discount_pic;
  this.redeem_point = discount.redeem_point;
  this.limits = discount.limits;
  this.period_start = discount.period_start;
  this.period_end = discount.period_end;
  this.expired = discount.expired;
  this.status_id = discount.status_id;
  this.created_at = discount.created_at;
  this.updated_at = discount.updated_at;
};

Discount.getCount = (result) => {
  sql.query("SELECT COUNT(*) AS count FROM Discount;", (err, res) => {
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

Discount.create = (newDiscount, result) => {
  sql.query(`INSERT INTO Discount SET ?`, newDiscount, (err, res) => {
    if (err) {
      console.log("error : ", err);
      result(err, null);
      return;
    }

    result(null, { ...newDiscount });
  });
};

Discount.update = (data, result) => {
  sql.query(
    `UPDATE Discount SET status_id = '${data.status_id}', updated_at = '${data.updated_at}' WHERE discount_id = '${data.discount_id}'`,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }

      //console.log("Updated discount : ", { ...data });
      result(null, { ...data });
    }
  );
};

Discount.editDiscount = (discount, result) => {
  sql.query(
    `UPDATE Discount Set ? WHERE discount_id = "${discount.discount_id}"`,
    discount,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }

      result(null, { ...discount });
    }
  );
};

Discount.uploadDiscountPic = (data, result) => {
  sql.query(
    `UPDATE Discount SET discount_pic = '${data.discount_pic}', updated_at = '${data.updated_at}' WHERE discount_id = '${data.discount_id}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, { ...data });
    }
  );
};

Discount.getHotDiscount = (user_id, result) => {
  let currentTime = new Date().getTime();
  sql.query(
    `SELECT DC.discount_id, DC.name, DC.description, DC.redeem_point, DC.limits, DC.period_start, DC.period_end, DC.expired, COUNT(UD.discount_id) AS count, 
    (SELECT COUNT(*) FROM UserDiscount UD WHERE UD.user_id = '${user_id}' AND UD.discount_id = DC.discount_id) AS myDiscount
     FROM Discount DC
     LEFT JOIN UserDiscount UD
            ON UD.discount_id = DC.discount_id
     WHERE DC.status_id = 'ST02' AND ${currentTime} BETWEEN period_start AND period_end
     GROUP BY DC.discount_id
     ORDER BY count DESC
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
      }

      result(null, { message: "not found" });
      return;
    }
  );
};

Discount.getBrowseDiscount = (user_id, result) => {
  let currentTime = new Date().getTime();
  sql.query(
    `	SELECT DC.discount_id, DC.name, DC.description, DC.redeem_point, DC.limits, DC.period_start, DC.period_end, DC.expired,
    (SELECT COUNT(*) FROM UserDiscount UD WHERE UD.user_id = '${user_id}' AND UD.discount_id = DC.discount_id) AS myDiscount
     FROM Discount DC
     WHERE DC.status_id = 'ST02' AND ${currentTime} BETWEEN DC.period_start AND DC.period_end
     ORDER BY DC.period_start`,
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

      result(null, { message: "not found" });
      return;
    }
  );
};

Discount.getMyDiscount = (user_id, result) => {
  sql.query(
    `SELECT DC.discount_id, DC.name, DC.description, DC.redeem_point, DC.limits, DC.period_start, DC.period_end, DC.expired,
      UD.user_discount_id, UD.status_id, UD.created_at, UD.updated_at
    FROM UserDiscount UD
    LEFT JOIN Discount DC
           ON UD.discount_id = DC.discount_id
    WHERE UD.user_id = '${user_id}'
    ORDER BY UD.created_at DESC`,
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

      result(null, { message: "not found" });
      return;
    }
  );
};

Discount.getDiscountPicturePath = (discount_id, result) => {
  sql.query(
    `SELECT discount_pic FROM Discount WHERE discount_id = '${discount_id}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        //console.log("found discount: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found discount with the this discount id
      result({ message: "not_found" }, null);
      return;
    }
  );
};

module.exports = Discount;
