const Twit = require('twit');

const config = require('./config/bot-config');

const t = new Twit(config);

const userStream = t.stream('user', {
  track: ['banana', 'orange'],
});

t.get('account/settings', (err, data, res) => {
  if (err) console.error(err);
  console.log('-------------------------------------------------------\n', data, '\n-------------------------------------------------------');
});

userStream.on('tweet', (tweet) => {
  console.log(tweet);
});

module.exports = t;
