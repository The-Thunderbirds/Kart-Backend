const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const { mint, init_replace_item, init_burn, add_seller, remove_seller, add_customer_service, remove_customer_service } = require('../services/tezos/index');
const { ADMIN_WALLET_PRIVATE_KEY, FA2_CONTRACT_ADDRESS, MINTKART_CONTRACT_ADDRESS } = require('../constants.js');
const { encode, decode, generateId } = require('../utils/math');
const Product = require('../models/productModel');

exports._mint = asyncErrorHandler(async (req, res, next) => {
    const {serialNums, password} = req.body;
    const user = req.user;

    user_private_key = decode(ADMIN_WALLET_PRIVATE_KEY, user.private_key, password);
    private_key = user_private_key;// seller-private-key after decoding
    params = []
    for (const serialNum of serialNums) {
        const products = await Product.find({serialNumber: serialNum});

        const product = products[0];
        product.nft_id = generateId();
        await product.save({ validateBeforeSave: false });
        const obj = {
            tokenId: product.nft_id,
            metadata: {
                "name": product.name,
                "symbol" : "MINTKART",// leave
                "decimals" : "0",// leave
                "artifactUri" : product.images[0].url,// picture
                "displayUri" : product.images[0].url,// picture
                "thumbnailUri" : product.images[0].url,// picture
                "metadata" : "ipfs://QmYP9i9axHywpMEaAcCopZz3DvAXvR7Bg7srNvrRbNUBTh"// leave
            },
            itemId: serialNum,
            warranty: product.warranty,
            mintkart_address: MINTKART_CONTRACT_ADDRESS
        }
        console.log(obj);
        params.push(obj);
    }
    // params = [
    //     {
    //         tokenId: 1,// NFTid
    //         metadata: {
    //             "name" : "Item Name 1",// fetch from backend
    //             "symbol" : "MINTKART",// leave
    //             "decimals" : "0",// leave
    //             "artifactUri" : "ipfs://QmdByT2kNwSLdYfASoWEXyZhRYgLtvBnzJYBM1zvZXhCnS",// picture
    //             "displayUri" : "ipfs://QmdByT2kNwSLdYfASoWEXyZhRYgLtvBnzJYBM1zvZXhCnS",// picture
    //             "thumbnailUri" : "ipfs://QmXJSgZeKS9aZrHkp81hRtZpWWGCkkBma9d6eeUPfJsLEV",// picture
    //             "metadata" : "ipfs://QmYP9i9axHywpMEaAcCopZz3DvAXvR7Bg7srNvrRbNUBTh"// leave
    //         },
    //         itemId: "item-id-1",// fetch
    //         warranty: 5,// fetch
    //         mintkart_address: MINTKART_CONTRACT_ADDRESS// leave
    //     },
    //     {
    //         tokenId: 2,
    //         metadata: {
    //             "name" : "Item Name 2",
    //             "symbol" : "MINTKART",
    //             "decimals" : "0",
    //             "artifactUri" : "ipfs://QmdByT2kNwSLdYfASoWEXyZhRYgLtvBnzJYBM1zvZXhCnS",
    //             "displayUri" : "ipfs://QmdByT2kNwSLdYfASoWEXyZhRYgLtvBnzJYBM1zvZXhCnS",
    //             "thumbnailUri" : "ipfs://QmXJSgZeKS9aZrHkp81hRtZpWWGCkkBma9d6eeUPfJsLEV",
    //             "metadata" : "ipfs://QmYP9i9axHywpMEaAcCopZz3DvAXvR7Bg7srNvrRbNUBTh"
    //         },
    //         itemId: "item-id-2",
    //         warranty: 10,
    //         mintkart_address: MINTKART_CONTRACT_ADDRESS
    //     }
    // ];
    const op = await mint(params, FA2_CONTRACT_ADDRESS, private_key);

    console.log("OP\n",op);

    res.status(200).json({
        success: true,
        op
    });

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
    seller = 'tz1TpvrMd352n7LZgb3TAd1kE4XZvTLS5EvR';// public-key-hash
    const op = await add_seller(seller, FA2_CONTRACT_ADDRESS, ADMIN_WALLET_PRIVATE_KEY);
    console.log(op);
});

exports._remove_seller = asyncErrorHandler(async (req, res, next) => {
    seller = 'tz1TpvrMd352n7LZgb3TAd1kE4XZvTLS5EvR';
    const op = await remove_seller(seller, FA2_CONTRACT_ADDRESS, ADMIN_WALLET_PRIVATE_KEY);
    console.log(op);
});

exports._add_customer_service = asyncErrorHandler(async (req, res, next) => {
    customer_service = 'tz1iCSMCuUWiEFjSzDLWvK9hMht9zzCw7kXb';// public-key-hash
    const op = await add_customer_service(customer_service, FA2_CONTRACT_ADDRESS, ADMIN_WALLET_PRIVATE_KEY);
    console.log(op);
});

exports._remove_customer_service = asyncErrorHandler(async (req, res, next) => {
    customer_service = 'tz1iCSMCuUWiEFjSzDLWvK9hMht9zzCw7kXb';
    const op = await remove_customer_service(customer_service, FA2_CONTRACT_ADDRESS, ADMIN_WALLET_PRIVATE_KEY);
    console.log(op);
});