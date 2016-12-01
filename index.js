/** @module mainBot */

// npm modules 
const debug       = require('debug')('tb:main-bot');

// internal modules 
const TwitterBot  = require('./lib/twitter-bot');
const credentials = require('./config/bot-config');

const mainBot = new TwitterBot(credentials);

mainBot.createUserStream({
  track: ['bananas', 'oranges'],
});

module.exports = mainBot;
