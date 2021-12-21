"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const twitterConnection_1 = require("./connection/twitterConnection");
const twitterController_1 = __importDefault(require("./controllers/twitterController"));
const stream = twitterConnection_1.tweet.stream('statuses/filter', { track: 'egirl' });
stream.on('data', twitterController_1.default.retweet);
stream.on('error', err => console.log('Erro: ' + err));
