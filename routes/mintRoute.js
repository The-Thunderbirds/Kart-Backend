const express = require('express');
const { _mint, _init_replace_item, _init_burn } = require('../controllers/tz.fa2.controller');
const { _buy, fetchWarrantyDetails } = require("../controllers/tz.mintkart.controller");
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();

router.route('/batch-mint').post(isAuthenticatedUser, authorizeRoles("seller"), _mint);
router.route('/buy-item').post(isAuthenticatedUser, authorizeRoles("user"), _buy);
router.route('/fetch-warranty').post(isAuthenticatedUser, authorizeRoles("seller","customer-service"), fetchWarrantyDetails);
router.route('/replace-item').post(isAuthenticatedUser, authorizeRoles("seller","customer-service"), _init_replace_item);
router.route('/burn-nft/:id').get(isAuthenticatedUser, authorizeRoles("seller","customer-service"), _init_burn);

module.exports = router;

