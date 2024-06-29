const { USER_TOKEN_MODEL } = require("../models");
const { UnauthorizedError } = require("../utils/error.util");

exports.validateToken = async (req, res, next) => {
  const { user } = req.user;
  const accessToken = req.headers.authorization?.split(" ")[1];
  const isValidToken = await USER_TOKEN_MODEL.findOne({
    where: {
      userId: user.id,
      accessToken,
    },
  });
  if (!isValidToken)
    next(new UnauthorizedError(
      "Token has been invalidated, please login again!"
    ))

  next();
};
