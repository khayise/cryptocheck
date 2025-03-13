"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionController = void 0;
const Subsription_model_1 = require("../models/Subsription.model");
class SubscriptionController {
    async getUserSubscriptionTime(chatId) {
        const res = await Subsription_model_1.SubscriptionModel.find({ chatId }).sort([['time', 'asc']]);
        return res;
    }
    async setSubscription(chatId, time) {
        try {
            await Subsription_model_1.SubscriptionModel.create({ chatId, time });
        }
        catch (error) {
            return error;
        }
    }
    async isSubscribed(chatId, time) {
        try {
            const res = await Subsription_model_1.SubscriptionModel.findOne({ chatId, time });
            return res !== null ? true : false;
        }
        catch (error) {
            return error;
        }
    }
    async deleteSubscription(chatId, time) {
        await Subsription_model_1.SubscriptionModel.deleteOne({ chatId, time });
    }
    async allSubscribedAtTime(time) {
        return await Subsription_model_1.SubscriptionModel.find({ time });
    }
}
exports.SubscriptionController = SubscriptionController;
