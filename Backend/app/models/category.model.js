const sql = require("./db.connection.js");

const Category = function (category) {
  this.category_id = category.category_id;
  this.category_name = category.category_name;
  this.icon_white = category.icon_white;
  this.icon_black = category.icon_black;
  this.color_code = category.color_code;
  this.created_at = category.created_at;
  this.updated_at = category.updated_at;
};

Category.getCount = (result) => {
  sql.query("SELECT COUNT(*) AS count FROM Category;", (err, res) => {
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

Category.create = (newCategory, result) => {
  sql.query(`INSERT INTO Category SET ?`, newCategory, (err, res) => {
    if (err) {
      console.log("error : ", err);
      result(err, null);
      return;
    }

    console.log("Created category : ", { ...newCategory });
    result(null, { ...newCategory });
  });
};

Category.update = (category, result) => {
  sql.query(
    `Update Category Set ? WHERE category_id = "${category.category_id}"`,
    category,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }

      //console.log("Updated category : ", { ...category });
      result(null, { ...category });
    }
  );
};

Category.getCategoryList = (result) => {
  sql.query(
    `SELECT category_id, category_name, color_code FROM Category`,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

Category.uploadWhiteCategoryIcon = (data, result) => {
  sql.query(
    `UPDATE Category SET icon_white = '${data.icon_white}', updated_at = '${data.updated_at}' WHERE category_id = '${data.category_id}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Insert white category icon to: ", { ...data });
      result(null, { ...data });
    }
  );
};

Category.uploadBlackCategoryIcon = (data, result) => {
  sql.query(
    `UPDATE Category SET icon_black = '${data.icon_black}', updated_at = '${data.updated_at}' WHERE category_id = '${data.category_id}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Insert black category icon to: ", { ...data });
      result(null, { ...data });
    }
  );
};

Category.getCategoryIconPath = (category_id, result) => {
  sql.query(
    `SELECT icon_white, icon_black FROM Category WHERE category_id = '${category_id}'`,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        //console.log("found category: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found category with the this category id
      result({ message: "not_found" }, null);
      return;
    }
  );
};

Category.getCategoryFromUserID = (user_id, result) => {
  sql.query(
    `SELECT CA.category_name 
     FROM Category CA, UserCategory UC
     WHERE UC.interest = 1 AND 
           UC.user_id = '${user_id}' AND
           UC.category_id = CA.category_id`,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        //console.log("found category: ", res[0]);
        result(null, res);
        return;
      }

      // not found category with the this category id
      result({ message: "not_found" }, null);
      return;
    }
  );
};

module.exports = Category;
