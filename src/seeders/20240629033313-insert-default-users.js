"use strict";

const { hash } = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashPass = await hash("1234", 10)
    await queryInterface.bulkInsert("users", [
      {
        first_name: "admin",
        last_name: "user",
        email: "admin-user@gmail.com",
        password: hashPass,
        contact_number: "7777777777",
        post_code: "394107",
        hobbies: "bike-riding",
        gender: "male",
      },
      {
        first_name: "root",
        last_name: "user",
        email: "root-user@gmail.com",
        password: hashPass,
        contact_number: "7777777777",
        post_code: "394107",
        hobbies: "video-games",
        gender: "male",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
