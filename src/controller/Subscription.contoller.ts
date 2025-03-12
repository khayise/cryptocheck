import { SubscriptionModel } from '../models/Subsription.model';

export class SubscriptionController {
	async getUserSubscriptionTime(chatId: number) {
		const res: ISubscription[] = await SubscriptionModel.find({ chatId }).sort([['time', 'asc']]);

		return res;
	}

	async setSubscription(chatId: number, time: number) {
		try {
			await SubscriptionModel.create({ chatId, time });
		} catch (error) {
			return error;
		}
	}

	async isSubscribed(chatId: number, time: number) {
		try {
			const res: ISubscription | null = await SubscriptionModel.findOne({ chatId, time });

			return res !== null ? true : false;
		} catch (error) {
			return error;
		}
	}

	async deleteSubscription(chatId: number, time: number) {
		await SubscriptionModel.deleteOne({ chatId, time });
	}

	async allSubscribedAtTime(time: number) {
		return await SubscriptionModel.find({ time });
	}
}
