"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const twitterConnection_1 = require("../connection/twitterConnection");
function retweet(event) {
    const { retweeted_status, id_str, screen_name, is_quote_status } = event;
    const { name } = event.user;
    if (!retweeted_status && !is_quote_status) {
        twitterConnection_1.tweet.post(`statuses/retweet/${id_str}`, err => {
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
function like() {
    return 0;
}
exports.default = {
    retweet, like
};
