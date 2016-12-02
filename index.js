/** @module mainBot */

// npm modules 
const debug       = require('debug')('tb:main-bot');
// internal modules 
const TwitterBot  = require('./lib/twitter-bot');
const credentials = require('./config/bot-config');

const mainBot = new TwitterBot(credentials);

mainBot.createUserStream({
  // track: ['bananas', 'oranges'],
});

// mainBot.stream.on('message', (message) => {
//   debug('MESSAGE: \n', message);
// });
mainBot.stream.on('tweet', (tweet) => {
  debug('TWEET: \n', tweet);
});

mainBot.configureReplyToMention((tweet) => {
  debug('hit reply condition');
  mainBot.tweet(`@${tweet.user.screen_name} ${(new Date()).toJSON()}`);
});


module.exports = mainBot;
