const express = require('express');
const { getAllProducts, getProductDetails, getProductDetailsFromSerialNo, updateProduct, deleteProduct, getProductReviews, deleteReview, createProductReview, createProduct, getAdminProducts, getProducts } = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();

router.route('/products').get(getAllProducts);
router.route('/products/all').get(getProducts);

router.route('/admin/products').get(isAuthenticatedUser, authorizeRoles("admin","seller"), getAdminProducts);
router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles("admin","seller"), createProduct);

router.route('/admin/product/:id')
    .put(isAuthenticatedUser, authorizeRoles("admin","seller"), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("admin","seller"), deleteProduct);

router.route('/product/:id').get(getProductDetails);
router.route('/product/serial/:id').get(getProductDetailsFromSerialNo);
router.route('/review').put(isAuthenticatedUser, createProductReview);

router.route('/admin/reviews')
    .get(getProductReviews)
    .delete(isAuthenticatedUser, deleteReview);

module.exports = router;