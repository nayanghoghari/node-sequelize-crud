const { Router } = require("express");
const { validate } = require("express-validation");

const {
  SIGN_UP_VALIDATION,
  SIGN_IN_VALIDATION,
} = require("../validations/auth.validation");
const { signUp, singIn, logout } = require("../controllers/auth.controller");
const passport = require("passport");

const authRouter = Router();

authRouter.post("/sign-up", validate(SIGN_UP_VALIDATION), signUp);
authRouter.post(
  "/sign-in",
  validate(SIGN_IN_VALIDATION),
  passport.authenticate("local", { session: false }),
  singIn
);
authRouter.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  logout
);

module.exports = authRouter;
