const { Joi } = require("express-validation");
const { ROLES } = require("../config");

exports.GET_ALL_USERS_VALIDATION = {
  query: Joi.object({
    limit: Joi.number().optional(),
    offset: Joi.number().optional(),
  }),
};

exports.GET_USER_BY_ID_VALIDATION = {
    params: Joi.object({
      id: Joi.number().required()
    }),
};

exports.UPDATE_USER_VALIDATION = {
  body: Joi.object({
    id: Joi.number().required(),
    firstName: Joi.string().alphanum().optional(),
    lastName: Joi.string().alphanum().optional(),
    email: Joi.string().email().optional(),    
    contactNumber: Joi.string().min(10).max(13).optional(),
    postCode: Joi.string().max(6).optional(),
    hobbies: Joi.array().items(Joi.string()).optional(),
    gender: Joi.string().valid("male", "female").optional(),
  }),
};

exports.UPDATE_USER_ROLE_VALIDATION = {
  body: Joi.object({
    id: Joi.number().required(),
    addRoles: Joi.array().items(Joi.string().valid(...ROLES)).optional(),
    removeRoles: Joi.array().items(Joi.string().valid(...ROLES)).optional(),
  })
}

exports.DELETE_USER_VALIDATION = {
    params: Joi.object({
      id: Joi.number().required()
    }),
};