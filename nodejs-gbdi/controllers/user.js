const bcrypt = require('bcrypt');
const model = require('models/index');
const composeWhereObject = require('helpers/compose-where-object');
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

exports.index = async (req, res, next) => {

  // const sql = 'select id, fullname, email from "Users" order by id desc';
  // const users_by_sql = await model.sequelize.query(sql, {
  //   type: model.sequelize.QueryTypes.SELECT
  // });

  // const users = await model.User.findAll({
  //   attributes: { exclude: ['password'] },
  //   order: [['id', 'desc']]
  // });

  let { page, pageSize } = req.query;
  page = page ? parseInt(page) : 1;
  pageSize = pageSize ? parseInt(pageSize) : 10;

  const users = await model.User.findAndCountAll({
    attributes: { exclude: ['password'] },
    order: [['id', 'desc']],
    offset: (page - 1) * pageSize,
    limit: pageSize
  });

  res.status(200).json({
    total: users.count,
    data: users.rows
  });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // 1. Check whether email existing in Database
  const user = await model.User.findOne({where: {email: email}});
  if(!user) {
    res.status(401).json({message: "Username or password is incorrect"});
    return;
  }

  // 2. Verify the password
  const isValid = await bcrypt.compare(password, user.password);
  if(!isValid) {
    res.status(401).json({message: "Username or password is incorrect"});
    return;
  }
  
  // 3. Generate JWT and response
  const token = jwt.sign(
    {userId: user.id},
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.status(200).json({ access_token: token });
};

exports.search = async (req, res, next) => {
  const searchCatalog = {
    "fullname": Op.substring,
    "email": Op.substring,
    "userGroup": Op.substring
  };

  const users = await model.User.findAll({
    attributes: { exclude: ['password'] },
    where: composeWhereObject(searchCatalog, req.query)
  });

  if (users.length <= 0) {
    res.status(404).json({ message: "user is not found" })
    return;
  }

  res.status(200).json(users);
};

exports.show = async (req, res, next) => {
  const { id } = req.params

  const user = await model.User.findByPk(id, {
    attributes: { exclude: ['password'] },
    include: [{
      model: model.Blog,
      as: 'blogs',
      attributes: ['id', 'title', 'isActive']
    }],
    order: [['id', 'desc']],
  });

  if (!user) {
    res.status(404).json({ message: "user is not found" })
    return;
  }

  res.status(200).json(user);
};

exports.register = async (req, res, next) => {
  const { fullname, email, password, userGroup } = req.body;

  const record = await model.User.findOne({
    where: { email: email }
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

exports.destroy = async (req, res, next) => {
  const { id } = req.params;

  const num = await model.User.destroy({
    where: { id: id }
  });

  if(num === 0) {
    res.status(404).json({ message: "user is not found" })
    return;
  }

  res.status(200).json({
    message: "Removing User completed"
  });
};

exports.update = async (req, res, next) => {
  const { id } = req.params;
  const { fullname, email, userGroup } = req.body;

  const [num] = await model.User.update({
    fullname: fullname,
    email: email,
    userGroup: userGroup
  }, {
    where: { id: id }
  });

  if(num === 0) {
    res.status(404).json({ message: "user is not found" })
    return;
  }

  res.status(200).json({
    message: "Updating User completed"
  });
};

exports.me = (req, res, next) => {
  res.status(200).json({
    user: {
      id: req.user.id,
      fullname: req.user.fullname,
      email: req.user.email
    }
  });
}