"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const twitter_1 = __importDefault(require("twitter"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const tweet = new twitter_1.default({
    consumer_key: process.env.BOT_CONSUMER_KEY,
    consumer_secret: process.env.BOT_CONSUMER_SECRET,
    access_token_key: process.env.BOT_ACCESS_TOKEN,
    access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET,
});
function retweet(event) {
    const { retweeted_status, id_str, screen_name, is_quote_status } = event;
    const { name } = event.user;
    if (!retweeted_status && !is_quote_status) {
        tweet.post(`statuses/retweet/${id_str}`, err => {
            if (err) {
                console.log("Erro no retweet: " + err);
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
var stream = tweet.stream('statuses/filter', { track: 'egirl' });
stream.on('data', retweet);
stream.on('error', err => console.log("Erro: " + err));
