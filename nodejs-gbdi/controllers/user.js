const bcrypt = require('bcrypt');
const model = require('models/index');
const composeWhereObject = require('helpers/compose-where-object');
const { Op } = require("sequelize");

exports.index = async (req, res, next) => {

  // const sql = 'select id, fullname, email from "Users" order by id desc';
  // const users_by_sql = await model.sequelize.query(sql, {
  //   type: model.sequelize.QueryTypes.SELECT
  // });

  const users = await model.User.findAll({
    attributes: { exclude: ['password'] },
    order: [['id', 'desc']]
  });

  res.status(200).json({
    data: users
  });
};

exports.search = async (req, res, next) => {
  const searchCatalog = {
    "fullname": Op.substring,
    "email": Op.substring,
    "userGroup": Op.substring
  };

  const users = await model.User.findAll({
    where: composeWhereObject(searchCatalog, req.query)
  });
  
  res.status(200).json(users);
};

exports.show = async (req, res, next) => {
  const { id } = req.params

  const user = await model.User.findOne({
    attributes: { exclude: ['password'] },
    where : { id: id },
    order: [['id', 'desc']]
  });

  res.status(200).json(user);
};

exports.register = async (req, res, next) => {
  const { fullname, email, password, userGroup } = req.body;

  const record = await model.User.findOne({
    where : { email: email}
  });

  if (record) {
    res.status(422).json({ message: "This email is already existing in the system" });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await model.User.create({
    fullname: fullname,
    email: email,
    password: hashedPassword,
    userGroup: userGroup
  });

  let resUser = user.toJSON();
  delete resUser.password;

  res.status(201).json({
    message: "Registration completed",
    user: resUser
  });
};