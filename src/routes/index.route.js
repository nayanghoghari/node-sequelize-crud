const { Router } = require("express");

require("../middlewares/passport.config");
const authRouter = require("./auth.route");
const userRouter = require("./user.route");
const roleRouter = require("./role.route");
const passport = require("passport");
const { validateToken } = require("../middlewares/auth.middleware");

const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.send("Welcome!");
});

indexRouter.use("/auth", authRouter);
indexRouter.use("/user", passport.authenticate('jwt', { session: false }), validateToken, userRouter);
indexRouter.use("/role", passport.authenticate('jwt', { session: false }), validateToken, roleRouter);

exports.IndexRouter = indexRouter;
