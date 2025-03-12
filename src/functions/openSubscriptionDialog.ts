import { Markup } from 'telegraf';
import { Context } from 'vm';
import { getUserSubscriptions } from '../helpers/getUserSubscriptions';

export async function openSubscriptionDialog(ctx: Context) {
	const message = ctx.message;
	await ctx.deleteMessage(message?.message_id);
	const chatId = ctx.chat.id;

	const userSubs = await getUserSubscriptions(chatId);

	await ctx.reply(
		userSubs.length ? `You become statistic daily at: ${userSubs}` : 'You have no subs',

		Markup.inlineKeyboard([
			[Markup.button.callback('01:00', 'set_1'), Markup.button.callback('02:00', 'set_2')],
			[Markup.button.callback('03:00', 'set_3'), Markup.button.callback('04:00', 'set_4')],
			[Markup.button.callback('05:00', 'set_5'), Markup.button.callback('06:00', 'set_6')],
			[Markup.button.callback('07:00', 'set_7'), Markup.button.callback('08:00', 'set_8')],
			[Markup.button.callback('09:00', 'set_9'), Markup.button.callback('10:00', 'set_10')],
			[Markup.button.callback('11:00', 'set_11'), Markup.button.callback('12:00', 'set_12')],
			[Markup.button.callback('13:00', 'set_13'), Markup.button.callback('14:00', 'set_14')],
			[Markup.button.callback('15:00', 'set_15'), Markup.button.callback('16:00', 'set_16')],
			[Markup.button.callback('17:00', 'set_17'), Markup.button.callback('18:00', 'set_18')],
			[Markup.button.callback('19:00', 'set_19'), Markup.button.callback('20:00', 'set_20')],
			[Markup.button.callback('21:00', 'set_21'), Markup.button.callback('22:00', 'set_22')],
			[Markup.button.callback('23:00', 'set_23'), Markup.button.callback('00:00', 'set_0')],
		]),
	);
}
