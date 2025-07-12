'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
await queryInterface.addColumn("Users", "verify", {
  type: Sequelize.BOOLEAN,
  defaultValue: false,
});

await queryInterface.addColumn("Users", "verificationToken", {
  type: Sequelize.STRING,
});
