"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CRYPTO_MAP = void 0;
exports.generateMessage = generateMessage;
exports.CRYPTO_MAP = {
    bitcoin: 'BTC',
    ethereum: 'ETH',
    binancecoin: 'BNB',
    xrp: 'XRP',
    solana: 'SOL',
    cardano: 'ADA',
    dogecoin: 'DOGE',
    polkadot: 'DOT',
    litecoin: 'LTC',
    chainlink: 'LINK',
    uniswap: 'UNI',
    'binance-usd': 'BUSD',
    'avalanche-2': 'AVAX',
    polygon: 'MATIC',
    'ethereum-classic': 'ETC',
    stellar: 'XLM',
    vechain: 'VET',
};
function generateMessage(crypto) {
    const res = Object.entries(crypto)
        .sort((a, b) => b[1].usd - a[1].usd)
        .map(([key]) => {
        const usd = crypto[key].usd.toFixed(2);
        const change = crypto[key].usd_24h_change;
        const changeFixed = change.toFixed(2);
        const emoji = change > 0 ? '📈' : '📉';
        return `${exports.CRYPTO_MAP[key].padEnd(6)} ${usd.padStart(10)}$ ${changeFixed.padStart(7)}% ${emoji}`;
    })
        .join('\n');
    return `
HEEEEEEEEY 😈

That's your current market state at the moment 👀:
(24h price change in %)
<code>
${'Coin'.padEnd(6)} ${'Price'.padStart(9)} ${'Change %'.padStart(13)}
-------------------------------
${res}
</code>`;
}
