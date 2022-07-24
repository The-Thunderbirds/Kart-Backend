const { ADMIN_WALLET_PRIVATE_KEY } = require("../../constants");
const { SHOW_ERROR, getTezosAccount } = require("./helper");


const getFunctionSchema = async(address) => {
    try{
        const Tezos = getTezosAccount(ADMIN_WALLET_PRIVATE_KEY);
        // const meta_data = MichelsonMap.fromLiteral({
        //     'symbol': char2Bytes("SUPERSTAR")
        // })
        const contract = await Tezos.contract.at(address);
        const result = contract.methods.default(address).schema;
        console.log(result);
    }catch(error){
        console.log(error);
    }
}

const getContractSchema = async(address) => {
    try{
        const Tezos = getTezosAccount(ADMIN_WALLET_PRIVATE_KEY);
        const contract = await Tezos.contract.at(address);
        const methods = contract.parameterSchema.ExtractSchema();
        console.log(JSON.stringify(methods, null, 2));
    }catch(error){
        SHOW_ERROR(error);
    }
}

/*Returns michelson code*/
const getEntrypoints = async(address) => {
    try{
        const Tezos = getTezosAccount(ADMIN_WALLET_PRIVATE_KEY);
        const entrypoints = await Tezos.rpc.getEntrypoints(address);
        console.log(entrypoints);
        return entrypoints;
    }catch(error){
        SHOW_ERROR(error);
    }
}

/*Returns michelson code*/
const getContractScript = async(address) => {
    try{
        const Tezos = getTezosAccount(ADMIN_WALLET_PRIVATE_KEY);
        const script = await Tezos.rpc.getScript(address);
        console.log(script);
        return script;
    }catch(error){
        SHOW_ERROR(error);
    }
}

const estimateTransfer = async() => {
    try{
        const Tezos = getTezosAccount(ADMIN_WALLET_PRIVATE_KEY);
        const estimate = await Tezos.estimate.transfer({to:_addr, amount: 1});
        console.log(estimate);
    }catch(error){
        SHOW_ERROR(error);
    }
}

module.exports = {
    getFunctionSchema,
    getContractSchema,
    getEntrypoints,
    getContractScript,
    estimateTransfer
}