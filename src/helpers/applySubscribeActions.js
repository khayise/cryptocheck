"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applySubscriptionActions = applySubscriptionActions;
const telegraf_1 = require("telegraf");
const Subscription_contoller_1 = require("../controller/Subscription.contoller");
const getUserSubscriptions_1 = require("./getUserSubscriptions");
function applySubscriptionActions(bot) {
    const subscription = new Subscription_contoller_1.SubscriptionController();
    const times = Array(24)
        .fill(0)
        .map((_, index) => index);
    async function apply(time) {
        bot.action(`set_${time}`, async (ctx) => {
            try {
                const isSubscribed = await subscription.isSubscribed(ctx.chat?.id, time);
                if (isSubscribed) {
                    return ctx.reply(`You already receive statistic at ${time.toString().padStart(0)}:00. Do you want cross out this time from schedule?`, telegraf_1.Markup.inlineKeyboard([
                        telegraf_1.Markup.button.callback('Yes', `deleteSubscription_${time}`),
                        telegraf_1.Markup.button.callback('No', 'cancel'),
                    ]));
                }
                await subscription.setSubscription(ctx.chat?.id, time);
                const userSubs = await (0, getUserSubscriptions_1.getUserSubscriptions)(ctx.chat?.id);
                ctx.reply(`Great! We gonna send you actual statistic every day at ${userSubs}`);
            }
            catch (error) {
                ctx.reply('Something went wrong. Try one more time a little bit later.');
            }
        });
        bot.action(`deleteSubscription_${time}`, async (ctx) => {
            await subscription.deleteSubscription(ctx.chat?.id, time);
            await ctx.deleteMessage(ctx.message?.message_id);
            const userSubs = await (0, getUserSubscriptions_1.getUserSubscriptions)(ctx.chat?.id);
            await ctx.reply(userSubs.length
                ? 'Now you receive statistic at: ' + userSubs
                : 'Now you don`t receive any statistic automatically');
        });
    }
    times.forEach((time) => apply(time));
    bot.action('cancel', async (ctx) => {
        await ctx.deleteMessage(ctx.message?.message_id);
    });
}
