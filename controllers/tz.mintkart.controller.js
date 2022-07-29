const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const { buy } = require('../services/tezos/index');
const { ADMIN_WALLET_PRIVATE_KEY, FA2_CONTRACT_ADDRESS, MINTKART_CONTRACT_ADDRESS } = require('../constants.js');
const Product = require('../models/productModel');
const Order = require('../models/orderModel');
const User = require('../models/userModel');

exports._buy = asyncErrorHandler(async (req, res, next) => {
    console.log(req.body);
    const {serialNum, user_wallet_address} = req.body;
    itemId = serialNum;
    buyer = user_wallet_address;
    console.log(itemId,buyer);
    const op = await buy(itemId, buyer, MINTKART_CONTRACT_ADDRESS, ADMIN_WALLET_PRIVATE_KEY);
    console.log(op);
    res.status(200).json({
        success: true,
        op,
    });
});

exports.fetchWarrantyDetails = asyncErrorHandler(async (req, res, next) => {
    const {serialNum, user_email} = req.body;

    const product = await Product.find({serialNumber: serialNum});
    if (product.length === 0) {
        return next(new ErrorHandler("Product Not Found", 404));
    }
    const user = await User.find({email:user_email});
    if (user.length === 0) {
        return next(new ErrorHandler("User Not Found", 404));
    }
    const order = await Order.find({user: user._id});
    if(order.length === 0) {
        return next(new ErrorHandler("Order Not Found", 404));
    }

    res.status(200).json({
        success: true,
        order,
        product,
        user,
    });
});