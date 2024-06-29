const passport = require("passport");
const createError = require("http-errors");
const { Strategy: LocalStrategy } = require("passport-local");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");

const { USER_MODEL } = require("../models/index");
const { APP_CONFIG } = require("../config");
const { UnauthorizedError } = require("../utils/error.util");

passport.use(
  "local",
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      const existingUser = await USER_MODEL.findOne({ where: { email } });

      if (!existingUser)
        return done(new UnauthorizedError("Invalid Credentials"));

      const isValidPassword = await existingUser.comparePassword(password);
      if (!isValidPassword)
        return done(new UnauthorizedError("Invalid Credentials"));

      const { password: _password, ...rest } = existingUser.dataValues;      
      return done(
        null,
        { user: rest },
        { message: "User Logged In Successfully" }
      );
    }
  )
);

passport.use(
  "jwt",
  new JwtStrategy(
    {
      secretOrKey: APP_CONFIG.ACCESS_TOKEN_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        const { id } = token;
        const user = await USER_MODEL.findOne({ where: { id } });
        if (!user)
          done(createError.Unauthorized("Unauthorized Access!"), null, {
            message: "Unauthorized Access!",
          });        
        done(null, { user: user.dataValues });
      } catch (error) {
        done(error);
      }
    }
  )
);
