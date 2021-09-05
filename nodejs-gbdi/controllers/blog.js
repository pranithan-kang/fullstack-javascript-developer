const model = require('models/index');
const composeWhereObject = require('helpers/compose-where-object');
const { Op } = require("sequelize");

exports.index = async (req, res, next) => {
  const blogs = await model.Blog.findAll({
    include: [{
      model: model.User,
      as: 'author',
      attributes: ['id', 'fullname', 'email']
    }]
  });
  res.status(200).json({
    data: blogs
  });
};

exports.search = async (req, res, next) => {
  throw "NotImplemented";
};

exports.show = async (req, res, next) => {
  throw "NotImplemented";
};

exports.destroy = async (req, res, next) => {
  throw "NotImplemented";
};

exports.update = async (req, res, next) => {
  throw "NotImplemented";
};