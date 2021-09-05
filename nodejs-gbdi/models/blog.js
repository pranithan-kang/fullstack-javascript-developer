'use strict';
const {
  Model
} = require('sequelize');
const User = require('./user');

module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Blog.belongsTo(models.User, {
        as: 'author',
        sourceKey: 'id',
        foreignKey: 'userId'
      });
    }
  };
  Blog.init({
    title: {
      type: DataTypes.STRING,
      get: function () { return this.getDataValue('title').toUpperCase() }
    },
    display: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.getDataValue("id")}: ${this.title}`;
      }
    },
    isActive: DataTypes.BOOLEAN,
    userId: {
      type: DataTypes.INTEGER,
      references: {
        // tableName: "Users",
        model: User,
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Blog',
  });
  return Blog;
};