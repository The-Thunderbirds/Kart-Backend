const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const { buy } = require('../services/tezos/index');
const { ADMIN_WALLET_PRIVATE_KEY, FA2_CONTRACT_ADDRESS, MINTKART_CONTRACT_ADDRESS } = require('../constants.js');

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