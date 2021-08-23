const express = require('express');
const router = express.Router();
const userController = require('controllers/user');

router.get('/', userController.index);

router.get('/search', userController.search);

router.get('/:id', userController.show);

router.post('/', userController.register);

module.exports = router;
