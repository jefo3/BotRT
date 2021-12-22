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
        const containBlockeWord = BlockedWords_1.default.evaluate(text);
        if (containBlockeWord)
            return;
        twitterConnection_1.tweet.post(`statuses/retweet/${id_str}`, {}).then(() => {
            console.log('RETWEETADO: ', `https://twitter.com/${name}/status/${id_str}`);
        }).catch(err => {
            console.log('Erro no retweet: ' + err);
        });
        like(id_str, name);
    }
    else {
        return;
    }
}
function like(id_str, name) {
    twitterConnection_1.tweet.post('favorites/create', { id: id_str }).then(() => {
        console.log('LIKE IN: ', `https://twitter.com/${name}/status/${id_str}`);
    }).catch(err => {
        console.log('Erro no like: ' + err);
    });
}
exports.default = {
    retweet,
};
