'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    team: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};