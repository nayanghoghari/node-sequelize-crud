const { sign } = require("jsonwebtoken");

const { APP_CONFIG } = require("../config");

exports.generateAccessToken = (data, expiresIn = "1d") => {
  return sign(data, APP_CONFIG.ACCESS_TOKEN_SECRET, { expiresIn });
};
