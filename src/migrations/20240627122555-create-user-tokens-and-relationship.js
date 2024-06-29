"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create user_tokens table
    await queryInterface.createTable("user_tokens", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        field: "user_id",
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      accessToken: {
        field: "access_token",
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: {
        field: "created_at",
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        field: "updated_at",
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // Add foreign key constraint
    await queryInterface.addConstraint("user_tokens", {
      fields: ["user_id"],
      type: "foreign key",
      name: "fk_user_tokens_user_id",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove foreign key constraint first
    await queryInterface.removeConstraint(
      "user_tokens",
      "fk_user_tokens_user_id"
    );

    // Drop user_tokens table
    await queryInterface.dropTable("user_tokens");
  },
};
