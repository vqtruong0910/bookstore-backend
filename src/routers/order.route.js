const {orderController} = require('../controllers');
const express = require('express');
const validate = require('../middlewares/validate');
const orderValidate = require('../validations/order.validation')
const verifyRoles = require('../middlewares/verifyRoles');
const verifyJWT = require('../middlewares/verifyJWT');
const ROLES_LIST = require('../config/roles.list');
const router = express.Router();

router.use(verifyJWT);
router.get('/user_id',validate(orderValidate.getOrder),orderController.getOrderByIDUser)
router.get('/pages',verifyRoles(ROLES_LIST.Admin),validate(orderValidate.getOrderPage),orderController.getOrderPagination);
router.get('/revanue',verifyRoles(ROLES_LIST.Admin),validate(orderValidate.getOrder),orderController.getRevanue);
router.get('/revanueperday',verifyRoles(ROLES_LIST.Admin),validate(orderValidate.getOrder),orderController.getRevanuePerDay);
router.get('/amountperday',verifyRoles(ROLES_LIST.Admin),validate(orderValidate.getOrder),orderController.getAmountPerDay);
router.get('/amount',verifyRoles(ROLES_LIST.Admin),validate(orderValidate.getOrder),orderController.getAmount)
router.route('/')
.post(validate(orderValidate.addOrder),orderController.addOrder)
.get(validate(orderValidate.getOrder),orderController.getAllOrder)

router.route('/:ID')
.put(validate(orderValidate.updateOrderByID),orderController.updateOrderByID)
// .delete(validate(provideValidate.deleteProvider), provideController.deleteProvider)
.get(validate(orderValidate.getOrderByID),orderController.getOrderByID);

router.route('/order_detail/:ID')
.get(validate(orderValidate.getOrderByID),orderController.getOrderDetailByIDOrder);

module.exports = router;