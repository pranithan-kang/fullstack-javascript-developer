
exports.index = (req, res, next) => {
  res.send('respond with a resource');
};

exports.search = (req, res, next) => {
  const { fullname, age } = req.query;
  res.status(200).json({fullname, age});
};

exports.show = (req, res, next) => {
  const { id } = req.params
  res.status(200).json(id);
};

exports.register = (req, res, next) => {
  const { fullname, email, password } = req.body;

  res.status(200).json({
    fullname: fullname,
    email: email,
    password: password
  });
};