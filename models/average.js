'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class average extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      average.belongsTo(models.user, { foreignKey: 'user_id' });
    }
  }
  average.init({
    user_id:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    average_score: DataTypes.DECIMAL,
    average_time: DataTypes.DECIMAL,
    average_fails: DataTypes.DECIMAL,
    average_hits: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'average',
  });
  return average;
};