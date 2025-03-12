import { SubscriptionController } from '../controller/Subscription.contoller';

const subscription = new SubscriptionController();

export async function getUserSubscriptions(chatId: number) {
	const receiveTime: ISubscription[] = await subscription.getUserSubscriptionTime(chatId);

	return receiveTime.map((item) => item.time.toString().padEnd(0) + ':00').join(', ');
}
