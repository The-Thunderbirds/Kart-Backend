const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const { buy } = require('../services/tezos/index');
const { ADMIN_WALLET_PRIVATE_KEY, FA2_CONTRACT_ADDRESS, MINTKART_CONTRACT_ADDRESS } = require('../constants.js');
const Product = require('../models/productModel');
const Order = require('../models/orderModel');
const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');
const {sendSms, buildMessage} = require('../services/twilio/twilio');
const { getNodeExplorer } = require('../services/tezos/helper');

exports._buy = asyncErrorHandler(async (req, res, next) => {
    console.log(req.body);
    const {serialNum, user_wallet_address} = req.body;
    itemId = serialNum;
    buyer = user_wallet_address;
    console.log(itemId,buyer);
    const op = await buy(itemId, buyer, MINTKART_CONTRACT_ADDRESS, ADMIN_WALLET_PRIVATE_KEY);
    console.log(op);
    const products = await Product.find({serialNumber: serialNum});
    const product = products[0];
    await sendSms('+917207895340', buildMessage(itemId, product.nft_id, getNodeExplorer(op['hash'])));
    res.status(200).json({
        success: true,
        op,
    });
});

exports.fetchWarrantyDetails = asyncErrorHandler(async (req, res, next) => {
    const {serialNum, user_email} = req.body;

    const products = await Product.find({serialNumber: serialNum});
    if (products.length === 0) {
        return next(new ErrorHandler("Product Not Found", 404));
    }
    const product = products[0];
    const users = await User.find({email:user_email});
    if (users.length === 0) {
        return next(new ErrorHandler("User Not Found", 404));
    }
    const user = users[0];
    const orders = await Order.find({user: user._id});
    if(orders.length === 0) {
        return next(new ErrorHandler("No orders found", 404));
    }
    
    let flag = false;
    let order = {};
    for(const curr_order of orders){
        if(curr_order.orderItems[0].product.toString() === product._id.toString() ){
            flag = true;
            order = curr_order;
            break;
        }
    }
    if(!flag){
        return next(new ErrorHandler("Order Not Found", 404));
    }
    res.status(200).json({
        success: true,
        order,
        product,
        user,
    });
});