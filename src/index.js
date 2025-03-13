"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const dotenv = __importStar(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const getStatistic_1 = require("./functions/getStatistic");
const openSubscriptionDialog_1 = require("./functions/openSubscriptionDialog");
const applySubscribeActions_1 = require("./helpers/applySubscribeActions");
const applySchedule_1 = require("./functions/applySchedule");
dotenv.config();
mongoose_1.default
    .connect(process.env.MONGO_URL ?? 'error')
    .then(() => console.log('connected to db'))
    .catch((e) => console.log(e.message));
const bot = new telegraf_1.Telegraf(process.env.BOT_TOKEN);
bot.start(async (ctx) => {
    await ctx.reply(`Hello, ${ctx.from?.first_name}!
I am yours personal assistant in the world of Cryptocurrency.
How can I help you?`, telegraf_1.Markup.inlineKeyboard([
        [telegraf_1.Markup.button.callback('Get current price for cryptocurrency', 'get_statistic')],
        [telegraf_1.Markup.button.callback('Receive statistic daily', 'get_subscription')],
    ]));
});
bot.on('text', async (ctx) => {
    await ctx.reply(`Hello, ${ctx.from?.first_name}! How can I help you?`, telegraf_1.Markup.inlineKeyboard([
        [telegraf_1.Markup.button.callback('Get current price for cryptocurrency', 'get_statistic')],
        [telegraf_1.Markup.button.callback('Receive statistic daily', 'get_subscription')],
    ]));
});
bot.action('get_statistic', getStatistic_1.getStatistic);
bot.action('get_subscription', openSubscriptionDialog_1.openSubscriptionDialog);
(0, applySubscribeActions_1.applySubscriptionActions)(bot);
(0, applySchedule_1.applySchedule)(bot);
bot.launch();
