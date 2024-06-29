const { Router } = require("express");

const {
  getAllUsers,
  updateUser,
  deleteUser,
  getUserById,
  updateUserRole,
  exportUsersToPdf,
  exportUsersToCsv,
  exportUsersToExcel,
} = require("../controllers/user.controller");
const { validate } = require("express-validation");
const {
  UPDATE_USER_VALIDATION,
  GET_ALL_USERS_VALIDATION,
  DELETE_USER_VALIDATION,
  GET_USER_BY_ID_VALIDATION,
  UPDATE_USER_ROLE_VALIDATION,
} = require("../validations/user.validayion");

const userRouter = Router();

// export apis
userRouter.get("/export-csv", exportUsersToCsv);
userRouter.get("/export-pdf", exportUsersToPdf);
userRouter.get("/export-excel", exportUsersToExcel);
// crud apis
userRouter.get("/", validate(GET_ALL_USERS_VALIDATION), getAllUsers);
userRouter.get("/:id", validate(GET_USER_BY_ID_VALIDATION), getUserById);
userRouter.put("/", validate(UPDATE_USER_VALIDATION), updateUser);
userRouter.patch(
  "/role",
  validate(UPDATE_USER_ROLE_VALIDATION),
  updateUserRole
);
userRouter.delete("/:id", validate(DELETE_USER_VALIDATION), deleteUser);

module.exports = userRouter;
