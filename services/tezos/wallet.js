const taquito = require('@taquito/utils');
const bs58check = require('bs58check');
const sodium = require('libsodium-wrappers');
const bip39 = require('bip39');
const pbkdf2 = require('pbkdf2');

const { DEFAULT_PASSPHRASE, ACCOUNT_PREFIX, MNEMONIC_LENGTH } = require("../../constants.js");

const _generateMnemonic = () => {
    try{
        return bip39.generateMnemonic(MNEMONIC_LENGTH);
    }catch(e){}
};

const createAccount = async (passphrase=DEFAULT_PASSPHRASE) => {
    try{
        const mnemonic = _generateMnemonic();
        const seed = await bip39.mnemonicToSeed(mnemonic, passphrase);
        await sodium.ready;
        const keypair = sodium.crypto_sign_seed_keypair(seed.slice(0, 32));
        return {
            mnemonic: mnemonic,
            sk: taquito.b58cencode(keypair.privateKey, ACCOUNT_PREFIX.edsk),
            pk: taquito.b58cencode(keypair.publicKey, ACCOUNT_PREFIX.edpk),
            pkh: taquito.b58cencode(sodium.crypto_generichash(20, keypair.publicKey), ACCOUNT_PREFIX.tz1),
        };
    }catch(e){}
};

const recoverKeysFromMnemonic = async (mnemonic, passphrase=DEFAULT_PASSPHRASE) => {
    try{
        const seed = await bip39.mnemonicToSeed(mnemonic, passphrase);
        await sodium.ready;
        const keypair = sodium.crypto_sign_seed_keypair(seed.slice(0, 32));
        return {
            mnemonic: mnemonic,
            sk: taquito.b58cencode(keypair.privateKey, ACCOUNT_PREFIX.edsk),
            pk: taquito.b58cencode(keypair.publicKey, ACCOUNT_PREFIX.edpk),
            pkh: taquito.b58cencode(sodium.crypto_generichash(20, keypair.publicKey), ACCOUNT_PREFIX.tz1),
        };
    }catch(e){}
};

module.exports = {
    createAccount,
    recoverKeysFromMnemonic,
}