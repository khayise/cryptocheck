"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserSubscriptions = getUserSubscriptions;
const Subscription_contoller_1 = require("../controller/Subscription.contoller");
const subscription = new Subscription_contoller_1.SubscriptionController();
async function getUserSubscriptions(chatId) {
    const receiveTime = await subscription.getUserSubscriptionTime(chatId);
    return receiveTime.map((item) => item.time.toString().padEnd(0) + ':00').join(', ');
}
