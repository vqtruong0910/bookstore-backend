const {productController} = require('../controllers');
const express = require('express');
const validate = require('../middlewares/validate');
const productValidate = require('../validations/product.validation');
const router = express.Router();

router.get('/search',validate(productValidate.search),productController.filterByName);
router.get('/id_theloai',validate(productValidate.getProductByKind),productController.getProductByIDTheLoai);
router.get('/id_danhmuc',validate(productValidate.getProductByCategory),productController.getProductByIDDanhMuc);
router.get('/filter',validate(productValidate.filter),productController.filter);
router.get('/pages',validate(productValidate.getProductPage),productController.getProductPagination);
router.route('/new').get(validate(productValidate.getProduct),productController.getNewProduct);
router.route('/bestseller').get(validate(productValidate.getProduct),productController.getBestSeller);
router.route('/toptenbestsellerperday').get(validate(productValidate.getProduct),productController.getTopTenBestsellerPerDay);
router.route('/')
//validate(productValidate.addProduct),
.post(productController.addProduct)
.get(validate(productValidate.getProduct),productController.getAllProduct);

router.route('/:ID')
// validate(productValidate.updateProduct),
.put( productController.updateProductByID)
.delete(validate(productValidate.deleteProduct), productController.deleteProductByID)
.get(validate(productValidate.getProductByID),productController.getProductByID)




router.get('/id_nhaxuatban/:ID',validate(productValidate.getProductByID),productController.getProductByIDNhaXuatBan);
router.get('/id_theloai/:ID',validate(productValidate.getProductByID),productController.getAllProductByIDTheLoai);

module.exports = router;