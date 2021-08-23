var express = require('express');
var router = express.Router();

/** NOTE:
 * In app.js, if there is statement `app.use(express.static(path.join(__dirname, 'public')));`,
 * this route is skipping/neclected
 */
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
