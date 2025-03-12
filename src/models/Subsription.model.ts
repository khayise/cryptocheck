import mongoose from 'mongoose';
const { Schema } = mongoose;

const SubscriptionSchema = new Schema({
	chatId: Number,
	time: Number,
});

export const SubscriptionModel = mongoose.model<ISubscription>('Test', SubscriptionSchema);
