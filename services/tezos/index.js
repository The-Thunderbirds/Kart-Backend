const { MichelsonMap } = require('@taquito/taquito');
const { char2Bytes } = require('@taquito/utils');

const { ADMIN_WALLET_PRIVATE_KEY, OP_CONFIRMATIONS } = require("../../constants");
const { SHOW_ERROR, getTezosAccount } = require("./helper");

const add_joining_bonus = async (pkh) => {
    const Tezos = await getTezosAccount(ADMIN_WALLET_PRIVATE_KEY);
    const bal = await (await Tezos.tz.getBalance(pkh)).toNumber();
    if(bal >= 5e6){
        return {"success": false};
    }
    const op = await Tezos.contract.transfer({to: pkh, amount: 5});
    return {"success": true, "hash":op.hash};
}

const add_joining_bonus_admin = async (pkh) => {
    const Tezos = await getTezosAccount(ADMIN_WALLET_PRIVATE_KEY);
    const bal = await (await Tezos.tz.getBalance(pkh)).toNumber();
    if(bal >= 5e6){
        return {"success": false};
    }
    const op = await Tezos.contract.transfer({to: pkh, amount: 5});
    return {"success": true, "hash":op.hash};
}

const mint = async (mint_params, contract_address, private_key) => {
    
    params = [];
    mint_params.forEach((p) => {
        params.push({
            tokenId: p.tokenId,
            metadata : MichelsonMap.fromLiteral({
                "name" : char2Bytes(p.metadata.name),
                "symbol" : char2Bytes(p.metadata.symbol),
                "artifactUri" : char2Bytes(p.metadata.artifactUri),
                "displayUri" : char2Bytes(p.metadata.artifactUri),
                "thumbnailUri" : char2Bytes(p.metadata.thumbnailUri),
                "metadata" : char2Bytes(p.metadata.metadata),
                "decimals" : char2Bytes("0")
            }),
            itemId: p.itemId,
            warranty: p.warranty,
            mintkart_address: p.mintkart_address           
        });
    })

    const Tezos = await getTezosAccount(private_key);
    const contract = await Tezos.contract.at(contract_address);
    const op = await contract.methods.mint(params).send();
    // await op.confirmation(OP_CONFIRMATIONS);
    return {"hash":op.hash};
};

const init_replace_item = async (tokenId, oldItemId, newItemId, mintkart_address, contract_address, private_key) => {
    const Tezos = await getTezosAccount(private_key);
    const contract = await Tezos.contract.at(contract_address);
    const op = await contract.methods.init_replace_item(mintkart_address, newItemId, oldItemId, tokenId).send();
    // await op.confirmation(OP_CONFIRMATIONS);
    return {"hash":op.hash};
};

const init_burn = async (tokenId, mintkart_address, contract_address, private_key) => {
    const Tezos = await getTezosAccount(private_key);
    const contract = await Tezos.contract.at(contract_address);
    const op = await contract.methods.init_burn(mintkart_address, tokenId).send();
    // await op.confirmation(OP_CONFIRMATIONS);
    return {"hash":op.hash};
};

const add_seller = async (seller, contract_address, private_key) => {
    const Tezos = await getTezosAccount(private_key);
    const contract = await Tezos.contract.at(contract_address);
    const op = await contract.methods.add_seller(seller).send({amount : 5});
    // await op.confirmation(OP_CONFIRMATIONS);
    return {"hash":op.hash};
};

const remove_seller = async (seller, contract_address, private_key) => {
    const Tezos = await getTezosAccount(private_key);
    const contract = await Tezos.contract.at(contract_address);
    const op = await contract.methods.remove_seller(seller).send();
    // await op.confirmation(OP_CONFIRMATIONS);
    return {"hash":op.hash};
};

const add_customer_service = async (customer_service, contract_address, private_key) => {
    const Tezos = await getTezosAccount(private_key);
    const contract = await Tezos.contract.at(contract_address);
    const op = await contract.methods.add_customer_service(customer_service).send({amount : 5});
    // await op.confirmation(OP_CONFIRMATIONS);
    return {"hash":op.hash};
};

const remove_customer_service = async (customer_service, contract_address, private_key) => {
    const Tezos = await getTezosAccount(private_key);
    const contract = await Tezos.contract.at(contract_address);
    const op = await contract.methods.remove_customer_service(customer_service).send();
    // await op.confirmation(OP_CONFIRMATIONS);
    return {"hash":op.hash};
};

const buy = async (itemId, buyer, contract_address, private_key) => {
    const Tezos = await getTezosAccount(private_key);
    const contract = await Tezos.contract.at(contract_address);
    const op = await contract.methods.buy(buyer, itemId).send();
    // await op.confirmation(OP_CONFIRMATIONS);
    return {"hash":op.hash};
}

module.exports = {
    add_joining_bonus,
    add_joining_bonus_admin,
    mint,
    init_replace_item,
    init_burn,
    add_seller,
    remove_seller,
    add_customer_service,
    remove_customer_service,
    buy
}