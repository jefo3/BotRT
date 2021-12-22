"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const twitterConnection_1 = require("../connection/twitterConnection");
const BlockedWords_1 = __importDefault(require("../services/BlockedWords"));
function retweet(event) {
    const { retweeted_status, id_str, is_quote_status, text } = event;
    const { name } = event.user;
    if (!retweeted_status && !is_quote_status) {
        const res = BlockedWords_1.default.evaluate(text);
        if (res)
            return;
        twitterConnection_1.tweet.post(`statuses/retweet/${id_str}`, err => {
            if (err) {
                console.log('Erro no retweet: ' + err);
            }
            else {
                console.log('RETWEETADO: ', `https://twitter.com/${name}/status/${id_str}`);
            }
        });
        like(id_str, name);
    }
    else {
        return;
    }
}
function like(id_str, name) {
    twitterConnection_1.tweet.post('favorites/create', { id: id_str }, err => {
        if (err) {
            console.log('Erro no like: ' + err);
        }
        else {
            console.log('LIKE IN: ', `https://twitter.com/${name}/status/${id_str}`);
        }
    });
}
exports.default = {
    retweet,
};
