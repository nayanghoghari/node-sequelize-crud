const { hash, compare } = require("bcrypt");
const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db.util");

exports.userModel = sequelize.define(
  "User",
  {
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    contactNumber: {
      type: DataTypes.STRING,
    },
    postCode: {
      type: DataTypes.STRING,
    },
    hobbies: {
      type: DataTypes.STRING,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue("hobbies");
        return rawValue ? rawValue.split(",") : [];
      },
      set(value) {
        this.setDataValue("hobbies", value.join(","));
      },
    },
    gender: {
      type: DataTypes.STRING
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
    },
  },
  { tableName: "users", timestamps: true }
);

this.userModel.addHook("beforeCreate", async function (user) {
  const hashedPassword = await hash(user.password, 10);
  user.password = hashedPassword;
});

this.userModel.prototype.comparePassword = async function (password) {
  return compare(password, this.password);
};
