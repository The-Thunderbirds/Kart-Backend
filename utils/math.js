const crypto = require("crypto");
const aes256 = require("aes256");

function sha256(msg){
    return crypto.createHash('sha256').update(msg).digest('hex')
}

function strTohex(str){
    return Buffer.from(str).toString('hex');
}

function hexTostr(hex){
    return Buffer.from(hex, 'hex').toString();
}

function encode(admin_sk, user_sk, user_password){
    const new_password = sha256(user_password + admin_sk);
    return strTohex(aes256.encrypt(new_password, user_sk));
}

function decode(admin_sk, encoded_sk, user_password){
    const new_password = sha256(user_password+admin_sk);
    return aes256.decrypt(new_password, hexTostr(encoded_sk));
}

function generateId(){
    let str = '';
    const characters = '123456789';
    for (let i = 0; i < 8; i += 1) {
      str += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return Number(str);
};

module.exports = {
  encode,
  decode,
  generateId
};