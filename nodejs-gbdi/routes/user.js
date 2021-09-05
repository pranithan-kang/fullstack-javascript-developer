const express = require('express');
const router = express.Router();
const userController = require('controllers/user');
const passportJwt = require('middlewares/passport-jwt');

router.get('/', userController.index);
router.post('/', userController.register);

router.get('/me', passportJwt.isLogin, userController.me);

router.get('/search', userController.search);

router.get('/:id', userController.show);
router.delete('/:id', userController.destroy);
router.put('/:id', userController.update);

router.post('/login', userController.login);

module.exports = router;
