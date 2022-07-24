const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const { mint } = require('../services/tezos/index');
const { ADMIN_WALLET_PRIVATE_KEY, FA2_CONTRACT_ADDRESS, MINTKART_CONTRACT_ADDRESS } = require('../constants.js');

exports._mint = asyncErrorHandler(async (req, res, next) => {
    const op = await mint([
        {
            tokenId: 1,
            metadata: {
                "name" : "Item Name 1",
                "symbol" : "MINTKART",
                "decimals" : "0",
                "artifactUri" : "ipfs://QmdByT2kNwSLdYfASoWEXyZhRYgLtvBnzJYBM1zvZXhCnS",
                "displayUri" : "ipfs://QmdByT2kNwSLdYfASoWEXyZhRYgLtvBnzJYBM1zvZXhCnS",
                "thumbnailUri" : "ipfs://QmXJSgZeKS9aZrHkp81hRtZpWWGCkkBma9d6eeUPfJsLEV",
                "metadata" : "ipfs://QmYP9i9axHywpMEaAcCopZz3DvAXvR7Bg7srNvrRbNUBTh"
            },
            itemId: "item-id-1",
            warranty: 5,
            mintkart_address: MINTKART_CONTRACT_ADDRESS
        },
        {
            tokenId: 2,
            metadata: {
                "name" : "Item Name 2",
                "symbol" : "MINTKART",
                "decimals" : "0",
                "artifactUri" : "ipfs://QmdByT2kNwSLdYfASoWEXyZhRYgLtvBnzJYBM1zvZXhCnS",
                "displayUri" : "ipfs://QmdByT2kNwSLdYfASoWEXyZhRYgLtvBnzJYBM1zvZXhCnS",
                "thumbnailUri" : "ipfs://QmXJSgZeKS9aZrHkp81hRtZpWWGCkkBma9d6eeUPfJsLEV",
                "metadata" : "ipfs://QmYP9i9axHywpMEaAcCopZz3DvAXvR7Bg7srNvrRbNUBTh"
            },
            itemId: "item-id-2",
            warranty: 10,
            mintkart_address: MINTKART_CONTRACT_ADDRESS
        }
    ], FA2_CONTRACT_ADDRESS);

    console.log(op);
});

exports._init_replace_item = asyncErrorHandler(async (req, res, next) => {
    ;
});

exports._init_burn = asyncErrorHandler(async (req, res, next) => {
    ;
});

exports._add_seller = asyncErrorHandler(async (req, res, next) => {
    ;
});

exports._remove_seller = asyncErrorHandler(async (req, res, next) => {
    ;
});

exports._add_customer_service = asyncErrorHandler(async (req, res, next) => {
    ;
});

exports._remove_customer_service = asyncErrorHandler(async (req, res, next) => {
    ;
});