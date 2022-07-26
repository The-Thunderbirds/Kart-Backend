// https://console.twilio.com/

require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const buildMessage = (nft_id, serial_number, explorer) => {
  return `Thank you for shopping with Flipkart!\nYou have successfully claimed your warranty NFT. Please find the details below:\nItem Serial Number: ${serial_number}\nWarranty NFT ID: ${nft_id}\nYou can also verify the same at ${explorer}`;
}

const sendSms = async (phone, message) => {
  const client = require('twilio')(accountSid, authToken);
  const msg = await client.messages.create({
       body: message,
       from: process.env.TWILIO_PHONE_NUMBER,
       to: phone
     });
  
  console.log(msg.sid);
}

module.exports = {
  sendSms,
  buildMessage
};