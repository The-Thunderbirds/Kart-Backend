const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const { mint } = require('../services/tezos/index');
const { ADMIN_WALLET_PRIVATE_KEY, FA2_CONTRACT_ADDRESS, MINTKART_CONTRACT_ADDRESS } = require('../constants.js');

exports._buy = asyncErrorHandler(async (req, res, next) => {
    itemId = 'item-id-1';
    buyer = 'tz1TuAWC3z9ZgEMgHWVUCPubgSMpSZEePK2k'
    const op = await buy(itemId, buyer, MINTKART_CONTRACT_ADDRESS, ADMIN_WALLET_PRIVATE_KEY);
    console.log(op);
});