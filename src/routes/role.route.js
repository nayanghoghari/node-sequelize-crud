const { Router } = require("express");

const {
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
  createRole,
} = require("../controllers/role.controller");
const { validate } = require("express-validation");
const {
  GET_ROLE_BY_ID_VALIDATION,
  CREATE_ROLE_VALIDATION,
  UPDATE_ROLE_VALIDATION,
  DELETE_ROLE_VALIDATION,
  GET_ALL_ROLES_VALIDATION,
} = require("../validations/role.validation");

const roleRouter = Router();

roleRouter.get("/", validate(GET_ALL_ROLES_VALIDATION), getAllRoles);
roleRouter.get("/:id", validate(GET_ROLE_BY_ID_VALIDATION), getRoleById);
roleRouter.post("/", validate(CREATE_ROLE_VALIDATION), createRole);
roleRouter.put("/", validate(UPDATE_ROLE_VALIDATION), updateRole);
roleRouter.delete("/:id", validate(DELETE_ROLE_VALIDATION), deleteRole);

module.exports = roleRouter;
