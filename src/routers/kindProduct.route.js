const {kindProductController} = require('../controllers');
const express = require('express');
const validate = require('../middlewares/validate');
const kindProductValidate = require('../validations/kindProduct.validation');
const router = express.Router();


router.route('/')
.post(validate(kindProductValidate.addKindProduct), kindProductController.addKindProduct)
.get(validate(kindProductValidate.getKindProduct),kindProductController.getKindProduct)

router.route('/:ID')
.put(validate(kindProductValidate.updateKindProduct), kindProductController.updateKindProductByID)
.delete(validate(kindProductValidate.deleteKindProduct), kindProductController.deleteKindProductByID)
.get(validate(kindProductValidate.getKindProductByID),kindProductController.getKindProductByID)

router.route('/idcategory/:ID')
.get(validate(kindProductValidate.getKindProductByID),kindProductController.getKindProudctByIDCategory)

module.exports = router;