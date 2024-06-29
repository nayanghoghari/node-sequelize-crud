const { Joi } = require("express-validation");

exports.SIGN_UP_VALIDATION = {
  body: Joi.object({    
    firstName: Joi.string().alphanum().required(),
    lastName: Joi.string().alphanum().required(),
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().required(),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .label("Confirm password")
      .messages({
        "any.only": "{{#label}} does not match",
      }),
    contactNumber: Joi.string().required().min(10).max(13),
    postCode: Joi.string().max(6),
    hobbies: Joi.array().items(Joi.string()),
    gender: Joi.string().valid("male", "female"),
  }),
};

exports.SIGN_IN_VALIDATION = {
  body: Joi.object({    
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().required(),    
  }),
};
