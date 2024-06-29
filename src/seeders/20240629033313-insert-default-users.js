"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        first_name: "admin",
        last_name: "user",
        email: "admin-user@gmail.com",
        password: "1234",
        contact_number: "7777777777",
        post_code: "394107",
        hobbies: "bike-riding",
        gender: "male",
      },
      {
        first_name: "root",
        last_name: "user",
        email: "root-user@gmail.com",
        password: "1234",
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
