var router = require('express').Router();
const userController = require('../Controllers/user.controller');
const { tokenValidator } = require('./../middlewares/tokenValidater')
router.post('/userRegister', userController.register)
router.post('/userLogin', userController.login)
router.post('/usersList', tokenValidator.decodeToken, userController.users)
router.post('/deleteUser', tokenValidator.decodeToken, userController.deleteUser)

module.exports = router;