const { APP_CONFIG } = require("../config");

module.exports = {
  development: {
    username: APP_CONFIG.DB_USER,
    password: APP_CONFIG.DB_PASSWORD,
    database: APP_CONFIG.DB_NAME,
    host: APP_CONFIG.DB_HOST,
    dialect: "mysql",
  },
  test: {
    username: APP_CONFIG.DB_USER,
    password: APP_CONFIG.DB_PASSWORD,
    database: APP_CONFIG.DB_NAME,
    host: APP_CONFIG.DB_HOST,
    dialect: "mysql",
  },
  production: {
    username: APP_CONFIG.DB_USER,
    password: APP_CONFIG.DB_PASSWORD,
    database: APP_CONFIG.DB_NAME,
    host: APP_CONFIG.DB_HOST,
    dialect: "mysql",
  },
};
