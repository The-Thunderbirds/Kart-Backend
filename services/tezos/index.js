const { MichelsonMap } = require('@taquito/taquito');
const { char2Bytes } = require('@taquito/utils');

const { ADMIN_WALLET_PRIVATE_KEY, OP_CONFIRMATIONS } = require("../../constants");
const { SHOW_ERROR, getTezosAccount } = require("./helper");

const add_joining_bonus = async (pkh) => {
    const Tezos = await getTezosAccount(ADMIN_WALLET_PRIVATE_KEY);

    const op = await Tezos.contract.transfer({to: pkh, amount: 0.1});
    return {"hash":op.hash};
}

const add_joining_bonus_admin = async (pkh) => {
    const Tezos = await getTezosAccount(ADMIN_WALLET_PRIVATE_KEY);

    const op = await Tezos.contract.transfer({to: pkh, amount: 5});
    return {"hash":op.hash};
}

const mint = async (mint_params, contract_address) => {
    
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

    const Tezos = await getTezosAccount(ADMIN_WALLET_PRIVATE_KEY);
    const contract = await Tezos.contract.at(contract_address);
    const op = await contract.methods.mint(params).send();
    // await op.confirmation(OP_CONFIRMATIONS);
    return {"hash":op.hash};
};

module.exports = {
    add_joining_bonus,
    add_joining_bonus_admin,
    mint
}