const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db.util");

exports.roleModel = sequelize.define(
  "Role",
  {
    name: {
      type: DataTypes.STRING,
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
  { tableName: "roles", timestamps: true }
);
