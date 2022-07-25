const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const { mint, init_replace_item, init_burn, add_seller, remove_seller, add_customer_service, remove_customer_service } = require('../services/tezos/index');
const { ADMIN_WALLET_PRIVATE_KEY, FA2_CONTRACT_ADDRESS, MINTKART_CONTRACT_ADDRESS } = require('../constants.js');

exports._mint = asyncErrorHandler(async (req, res, next) => {
    private_key = '';
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
    ], FA2_CONTRACT_ADDRESS, private_key);

    console.log(op);
});

exports._init_replace_item = asyncErrorHandler(async (req, res, next) => {
    tokenId = 1;
    oldItemId = 'item-id-1';
    newItemId = 'item-id-1-new';
    private_key = '';
    const op = await init_replace_item(tokenId, oldItemId, newItemId, MINTKART_CONTRACT_ADDRESS, FA2_CONTRACT_ADDRESS, private_key);
    console.log(op);
});

exports._init_burn = asyncErrorHandler(async (req, res, next) => {
    tokenId = 1;
    const op = await init_burn(tokenId, MINTKART_CONTRACT_ADDRESS, FA2_CONTRACT_ADDRESS, ADMIN_WALLET_PRIVATE_KEY);
    console.log(op);
});

exports._add_seller = asyncErrorHandler(async (req, res, next) => {
    seller = 'tz1TpvrMd352n7LZgb3TAd1kE4XZvTLS5EvR';
    const op = await add_seller(seller, FA2_CONTRACT_ADDRESS, ADMIN_WALLET_PRIVATE_KEY);
    console.log(op);
});

exports._remove_seller = asyncErrorHandler(async (req, res, next) => {
    seller = 'tz1TpvrMd352n7LZgb3TAd1kE4XZvTLS5EvR';
    const op = await remove_seller(seller, FA2_CONTRACT_ADDRESS, ADMIN_WALLET_PRIVATE_KEY);
    console.log(op);
});

exports._add_customer_service = asyncErrorHandler(async (req, res, next) => {
    customer_service = 'tz1iCSMCuUWiEFjSzDLWvK9hMht9zzCw7kXb';
    const op = await add_customer_service(customer_service, FA2_CONTRACT_ADDRESS, ADMIN_WALLET_PRIVATE_KEY);
    console.log(op);
});

exports._remove_customer_service = asyncErrorHandler(async (req, res, next) => {
    customer_service = 'tz1iCSMCuUWiEFjSzDLWvK9hMht9zzCw7kXb';
    const op = await remove_customer_service(customer_service, FA2_CONTRACT_ADDRESS, ADMIN_WALLET_PRIVATE_KEY);
    console.log(op);
});