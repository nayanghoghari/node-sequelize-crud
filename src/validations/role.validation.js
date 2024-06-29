const { Joi } = require("express-validation");
const { ROLES } = require("../config");

exports.GET_ALL_ROLES_VALIDATION = {
  query: Joi.object({
    limit: Joi.number().optional(),
    offset: Joi.number().optional(),
  }),
};

exports.GET_ROLE_BY_ID_VALIDATION = {
  params: Joi.object({
    id: Joi.number().required(),
  }),
};

exports.CREATE_ROLE_VALIDATION = {
  body: Joi.object({
    name: Joi.string().valid(...ROLES).required(),
  }),
};

exports.UPDATE_ROLE_VALIDATION = {
  body: Joi.object({
    id: Joi.number().required(),
    name: Joi.string().alphanum().optional(),
  }),
};

exports.DELETE_ROLE_VALIDATION = {
  params: Joi.object({
    id: Joi.number().required(),
  }),
};
