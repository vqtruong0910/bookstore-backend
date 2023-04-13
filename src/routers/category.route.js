const {categoryController} = require('../controllers');
const express = require('express');
const validate = require('../middlewares/validate');
const categoryValidate = require('../validations/category.validation');
const router = express.Router();

router.get('/pages',validate(categoryValidate.getCategoryPage),categoryController.getCategoryPagination)
router.route('/')
.post(validate(categoryValidate.addCategory), categoryController.addCategory)
.get(validate(categoryValidate.getCategory),categoryController.getAllCategory)

router.route('/:ID')
.put(validate(categoryValidate.updateCategory), categoryController.updateCategoryByID)
.delete(validate(categoryValidate.deleteCategory), categoryController.deleteCategoryByID)
.get(validate(categoryValidate.getCategoryByID),categoryController.getCategoryByID)

module.exports = router;