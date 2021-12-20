import { tweet } from "./connection/twitterConnection"
import twitterController from "./controllers/twitterController"

const stream = tweet.stream('statuses/filter', {track: 'egirl'}) 

stream.on('data', twitterController.retweet) 
stream.on('error', err => console.log("Erro: "+ err)) 

