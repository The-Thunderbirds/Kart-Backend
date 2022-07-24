const { TezosToolkit } = require('@taquito/taquito');
const { RPC_URL } = require("../../constants");
var {InMemorySigner} = require('@taquito/signer');

const SHOW_ERROR = (error) => console.log(JSON.stringify(error, null, 2));

const getTezosAccount = (sk) => {
    const Tezos = new TezosToolkit(RPC_URL);
    Tezos.setProvider({
    signer: new InMemorySigner(sk),
    });

    return Tezos;
}

const getNodeExplorer = (hash) => {
    return `https://jakarta.tzstats.com/${hash}`;
}

const getUri = (hash) => {
    return `ipfs://${hash}`;
}

module.exports = {
    SHOW_ERROR,
    getTezosAccount,
    getNodeExplorer,
    getUri,
}