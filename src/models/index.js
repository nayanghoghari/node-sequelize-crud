const { userModel } = require("./user.model");
const { roleModel } = require("./role.model");
const { userTokensModel } = require("./user-token.model");

/* User and Role relation */
userModel.belongsToMany(roleModel, {
  through: "User_Roles",
});
roleModel.belongsToMany(userModel, {
  through: "User_Roles",
});

/* User and AccessToken relation */
userModel.hasOne(userTokensModel);
userTokensModel.belongsTo(userModel, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = {
  USER_MODEL: userModel,
  ROLE_MODEL: roleModel,
  USER_TOKEN_MODEL: userTokensModel,
};
