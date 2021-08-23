'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    fullname: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    userGroup: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    // tableName: 'table_name',
    
    // NOTE: disable when the createdAt updatedAt columns do not exist in a table
    // timestamps: false

    // NOTE: Converts all camelCased columns to underscored if true. Default false
    // underscored: true
  });
  return User;
};