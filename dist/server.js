"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const twitter_1 = __importDefault(require("twitter"));
require("dotenv/config");
const tweet = new twitter_1.default({
    consumer_key: process.env.BOT_CONSUMER_KEY,
    consumer_secret: process.env.BOT_CONSUMER_SECRET,
    access_token_key: process.env.BOT_ACESS_TOKEN,
    access_token_secret: process.env.BOT_ACESS_TOKEN_SECRET,
});
function action(event) {
    const { retweeted_status, id_str, screen_name, is_quote_status } = event;
    const { name } = event.user;
    if (!retweeted_status && !is_quote_status) {
        tweet.post(`statuses/retweet/${id_str}`, erro => {
            if (erro) {
                console.log("Erro no retweet: " + erro);
            }
            else {
                console.log("RETWEETADO: ", `https://twitter.com/${name}/status/${id_str}`);
            }
        });
    }
    else {
        return;
    }
}
const stream = tweet.stream('statuses/filter', { track: 'egirl' });
stream.on('data', action);
stream.on('error', erro => console.log("Erro: " + erro));
