const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db.util");

exports.userTokensModel = sequelize.define(
  "UserToken",
  {
    userId: {
      type: DataTypes.INTEGER,
    },
    accessToken: {
      type: DataTypes.TEXT,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  { timestamps: true, tableName: "user_tokens" }
);
