const { USER_MODEL, ROLE_MODEL, USER_TOKEN_MODEL } = require("../models");
const { ApiError } = require("../utils/error.util");
const { generateAccessToken } = require("../utils/jwt.utils");
const { getSuccessResponse } = require("../utils/response.util");

exports.signUp = async (req, res, next) => {
  try {
    const payload = req.body;
    const { email } = payload;
    const isUserExists = await USER_MODEL.findOne({ where: { email }})
    if(isUserExists) throw new ApiError({ message: "User with given email already exists..", statusCode: 409 })
    const role = await ROLE_MODEL.findOne({ where: { name: "user" } });
    const user = await USER_MODEL.create(payload);

    await user.addRole(role);

    const accessToken = generateAccessToken({ id: user.id });
    const [rowAffected] = await USER_TOKEN_MODEL.update(
      { userId: user.id, accessToken },
      { where: { userId: user.id } }
    );
    if (!rowAffected) {
      await USER_TOKEN_MODEL.create({ userId: user.id, accessToken });
    }
    return res.json(
      getSuccessResponse("User created successfully.", {
        user: {
          ...user.dataValues,
          role: role.name,
          accessToken: `Bearer ${accessToken}`,
        },
      })
    );
  } catch (error) {
    next(error);
  }
};

exports.singIn = async (req, res, next) => {
  try {
    const { user } = req.user;
    const accessToken = generateAccessToken({ id: user.id });
    const [rowAffected] = await USER_TOKEN_MODEL.update(
      { userId: user.id, accessToken },
      { where: { userId: user.id } }
    );
    if (!rowAffected) {
      await USER_TOKEN_MODEL.create({ userId: user.id, accessToken });
    }
    return res.json(
      getSuccessResponse("User logged in successfully.", {
        user: {
          ...user,
          accessToken: `Bearer ${accessToken}`,
        },
      })
    );
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const {
      user: { id },
    } = req.user;
    await USER_TOKEN_MODEL.update(
      {
        accessToken: null,
      },
      {
        where: {
          userId: id,
        },
      }
    );
    res.json(getSuccessResponse("User logged out successfully."));
  } catch (error) {
    next(error);
  }
};
