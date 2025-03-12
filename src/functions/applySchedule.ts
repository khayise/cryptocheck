import { Telegraf } from 'telegraf';
import { fetchCrypto } from '../helpers/fetchCrypto';
import { generateMessage } from '../helpers/generateMessage';
import { POSSIBLE_CRYPTO } from '../helpers/cryptos';
import cron from 'node-cron';
import { SubscriptionController } from '../controller/Subscription.contoller';

export async function applySchedule(bot: Telegraf) {
	const subscription = new SubscriptionController();

	const times = Array(24)
		.fill(0)
		.map((_, index) => index);

	times.forEach((time) =>
		cron.schedule(`0 ${time} * * *`, async () => {
			const crpt = POSSIBLE_CRYPTO.map((item) => item.id).join(',');
			const crypto = await fetchCrypto(crpt);

			const rooms = (await subscription.allSubscribedAtTime(time)) || [];
			console.log(rooms);
			const messageToSend = generateMessage(crypto);

			await Promise.all(
				rooms.map(async (room) => {
					try {
						await bot.telegram.sendMessage(room.chatId, messageToSend);
					} catch (error) {
						console.error(`Error in room: ${room.id}:`, error);
					}
				}),
			);
		}),
	);
}
