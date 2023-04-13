const {provideController} = require('../controllers');
const express = require('express');
const validate = require('../middlewares/validate');
const provideValidate = require('../validations/provide.validation')
const router = express.Router();


router.route('/')
.post(validate(provideValidate.addProvider), provideController.addProvider)
.get(validate(provideValidate.getProvider),provideController.getProvider)

router.route('/:ID')
.put(validate(provideValidate.updateProvider), provideController.updateProvider)
.delete(validate(provideValidate.deleteProvider), provideController.deleteProvider)
.get(validate(provideValidate.getProviderByID),provideController.getProviderByID)

module.exports = router;