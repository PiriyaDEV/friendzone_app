const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");
const fs = require("fs");

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  port: dbConfig.PORT,
  multipleStatements: dbConfig.multipleStatements,
  connectTimeout: dbConfig.connectTimeout,
  acquireTimeout: dbConfig.acquireTimeout
});

// open the MySQL connection
connection.connect((error) => {
  if (error) throw error;

  console.log("Successfully connected to the " + dbConfig.DB + " database.");

  // var tables = fs.readFileSync('./app/sql/tables.sql').toString();
  // connection.query(tables)
  // var foreignKey = fs.readFileSync('./app/sql/foreign.keys.sql').toString();
  // connection.query(foreignKey)
  // var genderData = fs.readFileSync('./app/sql/gender.data.sql').toString();
  // connection.query(genderData)
  // var roleData = fs.readFileSync('./app/sql/role.data.sql').toString();
  // connection.query(roleData)
  // var statusData = fs.readFileSync('./app/sql/status.data.sql').toString();
  // connection.query(statusData)
  // var categoryData = fs.readFileSync('./app/sql/category.data.sql').toString();
  // connection.query(categoryData)
  // var reportTypeData = fs.readFileSync('./app/sql/reportType.data.sql').toString();
  // connection.query(reportTypeData)
});

module.exports = connection;
