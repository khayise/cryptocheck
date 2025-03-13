"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatistic = getStatistic;
const cryptos_1 = require("../helpers/cryptos");
const fetchCrypto_1 = require("../helpers/fetchCrypto");
const generateMessage_1 = require("../helpers/generateMessage");
async function getStatistic(ctx) {
    const crpt = cryptos_1.POSSIBLE_CRYPTO.map((item) => item.id).join(',');
    if (ctx.message?.message_id) {
        await ctx.deleteMessage(ctx.message.message_id).catch((err) => {
            console.error('Error deleting message:', err);
        });
    }
    try {
        const crypto = await (0, fetchCrypto_1.fetchCrypto)(crpt);
        const messageToSend = (0, generateMessage_1.generateMessage)(crypto);
        await ctx.reply(messageToSend, { parse_mode: 'HTML' });
    }
    catch (error) {
        console.error('Error fetching crypto data:', error);
        await ctx.reply('Sorry, something went wrong while fetching crypto data.');
    }
}
