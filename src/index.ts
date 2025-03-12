import { Telegraf, Context, Markup } from 'telegraf';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import { getStatistic } from './functions/getStatistic';
import { openSubscriptionDialog } from './functions/openSubscriptionDialog';
import { applySubscriptionActions } from './helpers/applySubscribeActions';
import { applySchedule } from './functions/applySchedule';

dotenv.config();

mongoose
	.connect(process.env.MONGO_URL ?? 'error')
	.then(() => console.log('connected to db'))
	.catch((e) => console.log(e.message));

const bot = new Telegraf(process.env.BOT_TOKEN!);

bot.start(async (ctx: Context) => {
	await ctx.reply(
		`Hello, ${ctx.from?.first_name}!
I am yours personal assistant in the world of Cryptocurrency.
How can I help you?`,
		Markup.inlineKeyboard([
			[Markup.button.callback('Get current price for cryptocurrency', 'get_statistic')],
			[Markup.button.callback('Receive statistic daily', 'get_subscription')],
		]),
	);
});

bot.on('text', async (ctx: Context) => {
	await ctx.reply(
		`Hello, ${ctx.from?.first_name}! How can I help you?`,
		Markup.inlineKeyboard([
			[Markup.button.callback('Get current price for cryptocurrency', 'get_statistic')],
			[Markup.button.callback('Receive statistic daily', 'get_subscription')],
		]),
	);
});

bot.action('get_statistic', getStatistic);

bot.action('get_subscription', openSubscriptionDialog);

applySubscriptionActions(bot);

applySchedule(bot);

bot.launch();
