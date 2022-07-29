const express = require('express');
const { _mint, _add_customer_service, _add_seller } = require('../controllers/tz.fa2.controller');
const { _buy, fetchWarrantyDetails } = require("../controllers/tz.mintkart.controller");
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();

router.route('/batch-mint').post(isAuthenticatedUser, authorizeRoles("seller"), _mint);
router.route('/buy-item').post(isAuthenticatedUser, authorizeRoles("user"), _buy);
router.route('/fetch-warranty').post(isAuthenticatedUser, authorizeRoles("seller","customer-service"), fetchWarrantyDetails);

module.exports = router;

