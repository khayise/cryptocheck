"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applySchedule = applySchedule;
const fetchCrypto_1 = require("../helpers/fetchCrypto");
const generateMessage_1 = require("../helpers/generateMessage");
const cryptos_1 = require("../helpers/cryptos");
const node_cron_1 = __importDefault(require("node-cron"));
const Subscription_contoller_1 = require("../controller/Subscription.contoller");
async function applySchedule(bot) {
    const subscription = new Subscription_contoller_1.SubscriptionController();
    const times = Array(24)
        .fill(0)
        .map((_, index) => index);
    times.forEach((time) => node_cron_1.default.schedule(`0 ${time} * * *`, async () => {
        const crpt = cryptos_1.POSSIBLE_CRYPTO.map((item) => item.id).join(',');
        const crypto = await (0, fetchCrypto_1.fetchCrypto)(crpt);
        const rooms = (await subscription.allSubscribedAtTime(time)) || [];
        console.log(rooms);
        const messageToSend = (0, generateMessage_1.generateMessage)(crypto);
        await Promise.all(rooms.map(async (room) => {
            try {
                await bot.telegram.sendMessage(room.chatId, messageToSend);
            }
            catch (error) {
                console.error(`Error in room: ${room.id}:`, error);
            }
        }));
    }));
}
