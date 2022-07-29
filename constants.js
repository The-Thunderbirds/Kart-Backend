/*Environment*/
require('dotenv').config();
const ADMIN_WALLET_PRIVATE_KEY = process.env.ADMIN_WALLET_PRIVATE_KEY;

/*Constants*/
const RPC_URL = 'https://jakartanet.smartpy.io';
const ADMIN_WALLET_PKH = "tz1TpvrMd352n7LZgb3TAd1kE4XZvTLS5EvR";
const FA2_CONTRACT_ADDRESS = "KT1HHmWUHVCESSEcQAB3q6zxuMpY8Bu2qscw";
const MINTKART_CONTRACT_ADDRESS = "KT1Eff6qXp44ji64UCvTakgCNZXtCdrKBgHJ";
const DEFAULT_PASSPHRASE = 'SECRET';
const ACCOUNT_PREFIX = {
    tz1: new Uint8Array([6, 161, 159]),
    KT: new Uint8Array([2,90,121]),
    edsk: new Uint8Array([43, 246, 78, 7]),
    edpk: new Uint8Array([13, 15, 37, 217])
};
const MNEMONIC_LENGTH = 160;

module.exports = {
    ADMIN_WALLET_PRIVATE_KEY,
    RPC_URL,
    ADMIN_WALLET_PKH,
    FA2_CONTRACT_ADDRESS,
    MINTKART_CONTRACT_ADDRESS,
    DEFAULT_PASSPHRASE,
    ACCOUNT_PREFIX,
    MNEMONIC_LENGTH,
}