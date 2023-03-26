'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    // Add foreign key constraints for Stats and Averages
    await queryInterface.addConstraint('stats', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_stats_user_id',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'NO ACTION',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('averages', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_averages_user_id',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'NO ACTION',
      onUpdate: 'cascade'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the foreign key constraints
    await queryInterface.removeConstraint('stats', 'fk_stats_user_id');
    await queryInterface.removeConstraint('averages', 'fk_averages_user_id');

  }
};