import { Context, Markup, Telegraf } from 'telegraf';
import { SubscriptionController } from '../controller/Subscription.contoller';
import { openSubscriptionDialog } from '../functions/openSubscriptionDialog';
import { getUserSubscriptions } from './getUserSubscriptions';

export function applySubscriptionActions(bot: Telegraf) {
	const subscription = new SubscriptionController();
	const times = Array(24)
		.fill(0)
		.map((_, index) => index);

	async function apply(time: number) {
		bot.action(`set_${time}`, async (ctx: Context) => {
			try {
				const isSubscribed = await subscription.isSubscribed(ctx.chat?.id!, time);

				if (isSubscribed) {
					return ctx.reply(
						`You already receive statistic at ${time.toString().padStart(0)}:00. Do you want cross out this time from schedule?`,
						Markup.inlineKeyboard([
							Markup.button.callback('Yes', `deleteSubscription_${time}`),
							Markup.button.callback('No', 'cancel'),
						]),
					);
				}

				await subscription.setSubscription(ctx.chat?.id!!, time);
				const userSubs = await getUserSubscriptions(ctx.chat?.id!);
				ctx.reply(`Great! We gonna send you actual statistic every day at ${userSubs}`);
			} catch (error) {
				ctx.reply('Something went wrong. Try one more time a little bit later.');
			}
		});

		bot.action(`deleteSubscription_${time}`, async (ctx: Context) => {
			await subscription.deleteSubscription(ctx.chat?.id!, time);

			await ctx.deleteMessage(ctx.message?.message_id);
			const userSubs = await getUserSubscriptions(ctx.chat?.id!);
			await ctx.reply(
				userSubs.length
					? 'Now you receive statistic at: ' + userSubs
					: 'Now you don`t receive any statistic automatically',
			);
		});
	}

	times.forEach((time) => apply(time));

	bot.action('cancel', async (ctx: Context) => {
		await ctx.deleteMessage(ctx.message?.message_id);
	});
}
