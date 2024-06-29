const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const ExcelJS = require("exceljs");
const PDFDocument = require("pdfkit");
const fs = require("fs");

const { Op } = require("sequelize");
const { USER_MODEL, ROLE_MODEL } = require("../models");
const {
  getSuccessResponse,
  getErrorResponse,
} = require("../utils/response.util");
const { NotFoundError, ApiError } = require("../utils/error.util");
const { ROLES } = require("../config");
const path = require("path");

exports.getAllUsers = async (req, res, next) => {
  try {
    const { offset = 0, limit = 10 } = req.query;
    const { user } = req.user;

    const userList = await USER_MODEL.findAll({
      include: [
        {
          model: ROLE_MODEL,
          attributes: ["name"],
        },
      ],
      where: { id: { [Op.not]: user.id } },
      offset: +offset,
      limit: +limit,
      attributes: [
        "id",
        "firstName",
        "lastName",
        "email",
        "contactNumber",
        "postCode",
        "gender",
      ],
    });

    const totalUsers = await USER_MODEL.count();
    return res.json(
      getSuccessResponse("All users fetched successfully.", {
        list: userList,
        offset,
        limit,
        count: totalUsers,
      })
    );
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await USER_MODEL.findOne({
      include: [
        {
          model: ROLE_MODEL,
          attributes: ["name"],
        },
      ],
      where: { id },
      attributes: [
        "id",
        "firstName",
        "lastName",
        "email",
        "contactNumber",
        "postCode",
        "gender",
      ],
    });

    if (!user) throw new NotFoundError("User with given id does not exists!");
    return res.json(
      getSuccessResponse("User for given id fetched successfully.", {
        user,
      })
    );
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id, ...payload } = req.body;
    const isUserExists = await USER_MODEL.findOne({ where: { id } });
    if (!isUserExists) {
      throw new NotFoundError("User with given id does not exists!");
    }

    const [updatedRows] = await USER_MODEL.update(payload, { where: { id } });
    if (updatedRows) {
      const updatedUser = await USER_MODEL.findOne({ where: { id } });
      const { password: _password, ...user } = updatedUser.dataValues;
      return res.json(
        getSuccessResponse("User updated successfully.", {
          user,
        })
      );
    }
    return res.json(getErrorResponse(500, "Error updating user"));
  } catch (error) {
    next(error);
  }
};

exports.updateUserRole = async (req, res, next) => {
  try {
    const { id, addRoles, removeRoles } = req.body;
    const user = await USER_MODEL.findOne({ where: { id } });
    if (!user) throw new NotFoundError("User with given id does not exists!");

    if (addRoles?.length) {
      for (const role of addRoles) {
        if (ROLES.includes(role)) {
          const roleData = await ROLE_MODEL.findOne({ where: { name: role } });
          await user.addRole(roleData);
          return res.json(getSuccessResponse("Role added successFully!"));
        }
      }
    }
    if (removeRoles?.length) {
      for (const role of removeRoles) {
        if (ROLES.includes(role)) {
          const roleData = await ROLE_MODEL.findOne({ where: { name: role } });
          await user.removeRole(roleData);
          return res.json(getSuccessResponse("Role removed successFully!"));
        }
      }
    }
    throw new NotFoundError(`Only ${ROLES} are allowed`);
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { user } = req.user;
    const { id } = req.params;
    if (id == user.id)
      throw new ApiError({
        message: "User cannot delete himself.",
        statusCode: 403,
      });
    const isUserExists = await USER_MODEL.findOne({ where: { id } });
    if (!isUserExists)
      throw new NotFoundError("User with given id does not exists!");
    await USER_MODEL.destroy({ where: { id } });
    return res.json(getSuccessResponse("User deleted successfully."));
  } catch (error) {
    next(error);
  }
};

const fetchUserData = async () => {
  return await USER_MODEL.findAll({
    attributes: [
      "firstName",
      "lastName",
      "email",
      "contactNumber",
      "postCode",
      "hobbies",
      "gender",
    ],
  });
};

exports.exportUsersToCsv = async (req, res, next) => {
  try {
    const users = await fetchUserData();
    const csvWriter = createCsvWriter({
      path: "users.csv",
      header: [
        { id: "firstName", title: "First Name" },
        { id: "lastName", title: "Last Name" },
        { id: "email", title: "Email" },
        { id: "contactNumber", title: "Contact Number" },
        { id: "postCode", title: "Postcode" },
        { id: "hobbies", title: "Hobbies" },
        { id: "gender", title: "Gender" },
      ],
    });

    await csvWriter.writeRecords(users);

    return res.download('users.csv');
  } catch (error) {
    next(error);
  }
};

exports.exportUsersToExcel = async (req, res, next) => {
  try {
    const users = await fetchUserData();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Users");

    worksheet.columns = [
      { header: "First Name", key: "firstName", width: 20 },
      { header: "Last Name", key: "lastName", width: 20 },
      { header: "Email", key: "email", width: 30 },
      { header: "Contact Number", key: "contactNumber", width: 20 },
      { header: "Postcode", key: "postCode", width: 10 },
      { header: "Hobbies", key: "hobbies", width: 30 },
      { header: "Gender", key: "gender", width: 10 },
    ];

    users.forEach((user) => {
      worksheet.addRow(user);
    });

    await workbook.xlsx.writeFile("users.xlsx");
    res.header(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.attachment("users.xlsx");
    await workbook.xlsx.write(res);
  } catch (error) {
    next(error);
  }
};

exports.exportUsersToPdf = async (req, res, next) => {
  try {
    const users = await fetchUserData();

    res.header("Content-Type", "application/pdf");
    res.attachment("users.pdf");

    const doc = new PDFDocument();
    doc.pipe(res);
    doc.fontSize(16).text("Users List", { align: "center" });
    doc.moveDown();

    users.forEach((user) => {
      doc.fontSize(12).text(`First Name: ${user.firstName}`);
      doc.text(`Last Name: ${user.lastName}`);
      doc.text(`Email: ${user.email}`);
      doc.text(`Contact Number: ${user.contactNumber}`);
      doc.text(`Postcode: ${user.postCode}`);
      doc.text(`Hobbies: ${user.hobbies}`);
      doc.text(`Gender: ${user.gender}`);
      doc.moveDown();
    });

    doc.end();
  } catch (error) {
    next(error);
  }
};
