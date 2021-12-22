import { tweet } from '../connection/twitterConnection';
import BlockedWords from '../services/BlockedWords'

function retweet(event) {
  const { retweeted_status, id_str, is_quote_status,text} = event;
  const { name } = event.user;

  if (!retweeted_status && !is_quote_status) {

    const containBlockeWord = BlockedWords.evaluate(text)

    if(containBlockeWord) return

    tweet.post(`statuses/retweet/${id_str}`, {}).then(()=> {
      console.log(
        'RETWEETADO: ',
        `https://twitter.com/${name}/status/${id_str}`,
      );
    }).catch(err => {
      console.log('Erro no retweet: ' + err);
    })

    like(id_str, name)

  } else {
    return;
  }
}

function like(id_str, name) {
  tweet.post('favorites/create', {id: id_str}).then(()=>{
    console.log(
      'LIKE IN: ',
      `https://twitter.com/${name}/status/${id_str}`,
    );
  }).catch(err => {
    console.log('Erro no like: ' + err);
  })

}

export default {
  retweet,
};
