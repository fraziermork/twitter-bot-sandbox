const Twit = require('twit');

const config = require('./config/bot-config');

const t = new Twit(config);

const userStream = t.stream('user', {
  track: ['banana', 'orange'],
});

userStream.on('tweet', (tweet) => {
  console.log(tweet);
});
