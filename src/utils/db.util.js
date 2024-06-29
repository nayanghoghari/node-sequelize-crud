const { Sequelize } = require("sequelize");

const { APP_CONFIG } = require("../config");

exports.sequelize = new Sequelize({
  dialect: "mysql",
  host: APP_CONFIG.DB_HOST,
  port: APP_CONFIG.DB_PORT,
  database: APP_CONFIG.DB_NAME,
  username: APP_CONFIG.DB_USER,
  password: APP_CONFIG.DB_PASSWORD,
  logging: false,
  define: {
    underscored: true
  }
});

exports.connectDB = () => {
  return this.sequelize.authenticate();
};
