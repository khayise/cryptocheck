"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchCrypto = fetchCrypto;
async function fetchCrypto(id) {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd&include_24hr_change=true`;
    const options = {
        method: 'GET',
        headers: { accept: 'application/json', 'x-cg-demo-api-key': process.env.API_KEY || '' }
    };
    const res = await fetch(url, options);
    const data = await res.json();
    return data;
}
