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
  };
  user.init({
    empNum: DataTypes.STRING,
    phone: DataTypes.STRING,
    pwd: DataTypes.STRING,
    money: DataTypes.BIGINT,
    company: DataTypes.STRING,
    hiredate: DataTypes.INTEGER,
    opendate: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};