declare global {
	interface ICrypto {
		[key: string]: {
			usd: number;
			usd_24h_change: number;
		};
	}

	interface IPossibleCrypto {
		id: string;
		name: string;
		action: string;
	}

	interface ISubscription {
		chatId: number;
		time: number;
	}
}

export {};
