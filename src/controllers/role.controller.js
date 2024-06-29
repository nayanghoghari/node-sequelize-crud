const createError = require("http-errors");
const { ROLE_MODEL, USER_MODEL } = require("../models");
const {
  getSuccessResponse,
  getErrorResponse,
} = require("../utils/response.util");
const { NotFoundError } = require("../utils/error.util");
const { Op } = require("sequelize");

exports.getAllRoles = async (req, res, next) => {
  try {
    const { limit = 10, offset = 0 } = req.query;
    const roleList = await ROLE_MODEL.findAll({
      offset: +offset,
      limit: +limit
    });

    const totalRoles = await ROLE_MODEL.count();
    return res.json(
      getSuccessResponse("All roles fetched successfully.", {
        list: roleList,
        offset,
        limit,
        count: totalRoles
      })
    );
  } catch (error) {
    next(error);
  }
};

exports.getRoleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const role = await ROLE_MODEL.findOne({ where: { id } });
    if (!role) throw new NotFoundError("Role not found for given ID!");
    return res.json(
      getSuccessResponse("User for given id fetched successfully.", {
        role,
      })
    );
  } catch (error) {
    next(error);
  }
};

exports.createRole = async (req, res, next) => {
  try {
    const { ...payload } = req.body;
    const role = await ROLE_MODEL.create(payload);
    return res.json(
      getSuccessResponse("Role created successfully.", {
        role,
      })
    );
  } catch (error) {
    next(error);
  }
};

exports.updateRole = async (req, res, next) => {
  try {
    const { id, ...payload } = req.body;
    const role = await ROLE_MODEL.findOne({ where: { id } });
    if (!role) throw new NotFoundError("Role not found for given ID!");
    const [updatedRows] = await ROLE_MODEL.update(payload, { where: { id } });
    if (updatedRows) {
      const updatedRole = await ROLE_MODEL.findOne({ where: { id } });
      return res.json(
        getSuccessResponse("Role updated successfully.", {
          role: updatedRole,
        })
      );
    }
    return res.json(getErrorResponse(500, "Error updating role"));
  } catch (error) {
    next(error);
  }
};

exports.deleteRole = async (req, res, next) => {
  try {
    const { id } = req.params;

    const isUserExists = await USER_MODEL.findAll({
      include: [
        {
          model: ROLE_MODEL,
          attributes: ["name"],
          where: { id: { [Op.eq]: id } },
        },
      ],
    });
    if (isUserExists.length)
      throw new NotFoundError(
        "User with given role exists, can not delete role!"
      );
    await ROLE_MODEL.destroy({ where: { id } });
    return res.json(getSuccessResponse("Role deleted successfully."));
  } catch (error) {
    next(error);
  }
};
