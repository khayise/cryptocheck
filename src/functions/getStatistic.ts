import { Context } from 'telegraf';
import { POSSIBLE_CRYPTO } from '../helpers/cryptos';
import { fetchCrypto } from '../helpers/fetchCrypto';
import { generateMessage } from '../helpers/generateMessage';

export async function getStatistic(ctx: Context) {
	const crpt = POSSIBLE_CRYPTO.map((item) => item.id).join(',');
	if (ctx.message?.message_id) {
		await ctx.deleteMessage(ctx.message.message_id).catch((err) => {
			console.error('Error deleting message:', err);
		});
	}

	try {
		const crypto = await fetchCrypto(crpt);

		const messageToSend = generateMessage(crypto);

		await ctx.reply(messageToSend, { parse_mode: 'HTML' });
	} catch (error) {
		console.error('Error fetching crypto data:', error);
		await ctx.reply('Sorry, something went wrong while fetching crypto data.');
	}
}
