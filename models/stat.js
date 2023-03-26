'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class stat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      stat.belongsTo(models.user, { foreignKey: 'user_id' });
    }
  }
  stat.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    score: DataTypes.INTEGER,
    total_blue: DataTypes.INTEGER,
    total_red: DataTypes.INTEGER,
    total_green: DataTypes.INTEGER,
    total_white: DataTypes.INTEGER,
    total_time_sec: DataTypes.DECIMAL,
    total_shots: DataTypes.INTEGER,
    machine_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'stat',
  });
  return stat;
};