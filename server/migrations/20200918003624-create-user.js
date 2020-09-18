'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      empNum: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      pwd: {
        type: Sequelize.STRING
      },
      money: {
        type: Sequelize.BIGINT
      },
      company: {
        type: Sequelize.STRING
      },
      hiredate: {
        type: Sequelize.INTEGER
      },
      opendate: {
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};