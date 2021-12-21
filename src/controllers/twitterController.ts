import { tweet } from '../connection/twitterConnection';

function retweet(event) {
  const { retweeted_status, id_str, screen_name, is_quote_status } = event;
  const { name } = event.user;

  if (!retweeted_status && !is_quote_status) {
    tweet.post(`statuses/retweet/${id_str}`, err => {
      if (err) {
        console.log('Erro no retweet: ' + err);
      } else {
        console.log(
          'RETWEETADO: ',
          `https://twitter.com/${name}/status/${id_str}`,
        );
      }
    });

    like(id_str, name)

  } else {
    return;
  }
}

function like(id_str, name) {
  tweet.post('favorites/create', {id: id_str}, err => {
    if (err) {
      console.log('Erro no like: ' + err);
    } else {
      console.log(
        'LIKE IN: ',
        `https://twitter.com/${name}/status/${id_str}`,
      );
    }
  });
}

export default {
  retweet,
};
