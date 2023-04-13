const express = require('express');
const {userController} = require('../controllers');
const ROLES_LIST = require('../config/roles.list');
const verifyRoles = require('../middlewares/verifyRoles');
const verifyJWT = require('../middlewares/verifyJWT');
const validate = require('../middlewares/validate');
const userValidation = require('../validations/user.validation');
const router = express.Router();

router.use(verifyJWT);
router.get('/statisticperday',verifyRoles(ROLES_LIST.Admin),validate(userValidation.getInfor),userController.getNewRegistrationPerDay);
router.get('/statistic',verifyRoles(ROLES_LIST.Admin),validate(userValidation.getInfor),userController.getNewRegistration);

 router.route('/')
//  .post(verifyRoles(ROLES_LIST.Admin),userController.createUser)
 .get(verifyRoles(ROLES_LIST.Admin),validate(userValidation.getInfor), userController.getAllUser)
 .put(validate(userValidation.changeInfo),userController.changeInfoUser);

router.route('/:ID')
.put(verifyRoles(ROLES_LIST.Admin),validate(userValidation.changeInfoByAdmin),userController.changeInfoUserByAdmin)
.get(validate(userValidation.getInforByID),userController.getUser)
.delete(verifyRoles(ROLES_LIST.Admin),validate(userValidation.deleteByID),userController.deleteUser);

router.route('/page/:index')
.get(verifyRoles(ROLES_LIST.Admin),validate(userValidation.getInforByIndex),userController.getUserPagination);

//sua lai khi ghep code
router.post('/avatar',userController.updateAvatar);


module.exports = router; 