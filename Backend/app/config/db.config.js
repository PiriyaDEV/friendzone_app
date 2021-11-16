module.exports = {
  HOST: process.env.DB_URL,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  PORT: process.env.DB_PORT,
  DB: process.env.DB_NAME,
  dialect: process.env.DB_TYPE,
  multipleStatements: true,
  connectTimeout: 20000,
  acquireTimeout: 20000
};
