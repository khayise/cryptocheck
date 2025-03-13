"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openSubscriptionDialog = openSubscriptionDialog;
const telegraf_1 = require("telegraf");
const getUserSubscriptions_1 = require("../helpers/getUserSubscriptions");
async function openSubscriptionDialog(ctx) {
    const message = ctx.message;
    await ctx.deleteMessage(message?.message_id);
    const chatId = ctx.chat.id;
    const userSubs = await (0, getUserSubscriptions_1.getUserSubscriptions)(chatId);
    await ctx.reply(userSubs.length ? `You become statistic daily at: ${userSubs}` : 'You have no subs', telegraf_1.Markup.inlineKeyboard([
        [telegraf_1.Markup.button.callback('01:00', 'set_1'), telegraf_1.Markup.button.callback('02:00', 'set_2')],
        [telegraf_1.Markup.button.callback('03:00', 'set_3'), telegraf_1.Markup.button.callback('04:00', 'set_4')],
        [telegraf_1.Markup.button.callback('05:00', 'set_5'), telegraf_1.Markup.button.callback('06:00', 'set_6')],
        [telegraf_1.Markup.button.callback('07:00', 'set_7'), telegraf_1.Markup.button.callback('08:00', 'set_8')],
        [telegraf_1.Markup.button.callback('09:00', 'set_9'), telegraf_1.Markup.button.callback('10:00', 'set_10')],
        [telegraf_1.Markup.button.callback('11:00', 'set_11'), telegraf_1.Markup.button.callback('12:00', 'set_12')],
        [telegraf_1.Markup.button.callback('13:00', 'set_13'), telegraf_1.Markup.button.callback('14:00', 'set_14')],
        [telegraf_1.Markup.button.callback('15:00', 'set_15'), telegraf_1.Markup.button.callback('16:00', 'set_16')],
        [telegraf_1.Markup.button.callback('17:00', 'set_17'), telegraf_1.Markup.button.callback('18:00', 'set_18')],
        [telegraf_1.Markup.button.callback('19:00', 'set_19'), telegraf_1.Markup.button.callback('20:00', 'set_20')],
        [telegraf_1.Markup.button.callback('21:00', 'set_21'), telegraf_1.Markup.button.callback('22:00', 'set_22')],
        [telegraf_1.Markup.button.callback('23:00', 'set_23'), telegraf_1.Markup.button.callback('00:00', 'set_0')],
    ]));
}
