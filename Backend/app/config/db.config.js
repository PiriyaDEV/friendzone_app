module.exports = {
  HOST: process.env.DB_URL || "localhost",
  USER: "root",
  PASSWORD: "friendzone",
  PORT: 3306,
  DB: "Friendzone",
  dialect: "mysql",
  multipleStatements: true,
  connectTimeout: 20000,
  acquireTimeout: 20000
};
