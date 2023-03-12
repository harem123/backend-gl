'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('stats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      
      score: {
        type: Sequelize.INTEGER
      },
      total_blue: {
        type: Sequelize.INTEGER
      },
      total_red: {
        type: Sequelize.INTEGER
      },
      total_green: {
        type: Sequelize.INTEGER
      },
      total_white: {
        type: Sequelize.INTEGER
      },
      total_time_sec: {
        type: Sequelize.DECIMAL
      },
      total_shots: {
        type: Sequelize.INTEGER
      },
      machine_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('stats');
  }
};