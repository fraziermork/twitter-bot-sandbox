/* eslint func-names: "off" */

const Promise    = require('bluebird');
const debug      = require('debug')('tb:bot-with-test-utils');
const TwitterBot = require('../../lib/twitter-bot');

module.exports = BotWithTestUtilities;

/**
 * BotWithTestUtilities - This is a decorator around normal instances of TwitterBot that adds test utilities
 * @constructor  
 * @param  {string} botName The name of the bot to be given test utilities
 * @param  {TwitterBot} bot The bot to be given test utilities 
 */ 
function BotWithTestUtilities(botName, bot) {
  debug('BotWithTestUtilities'); 
  this.botName = botName;
  this.bot     = bot;
  this.tweets  = [];
}

BotWithTestUtilities.prototype.tweet            = tweetAndStoreForCleanup;
BotWithTestUtilities.prototype.deleteTweetById  = deleteTweetById;
BotWithTestUtilities.prototype.createUserStream = createUserStream;
BotWithTestUtilities.prototype.cleanupAllTweets = cleanupAllTweets;


/**
 * tweetAndStoreForCleanup - description
 * @see {@link tweet} 
 * @param  {type} status   description 
 * @param  {type} options  description  
 * @return {type}          description 
 */ 
function tweetAndStoreForCleanup(status, options) {
  debug('tweetAndStoreForCleanup', status);
  return this.bot.tweet(status, options)
    .then((data) => {
      debug('data: ', data);
      this.tweets.push(data);
      return data;
    });
}


/**
 * cleanupAllTweets - I
 *  
 * @return {Promise}  description 
 */ 
function cleanupAllTweets() {
  debug(`cleanupAllTweets: deleting ${this.tweets.length} tweets.`);
  let deleteRequests = this.tweets.map((tweet) => {
    return this.bot.deleteTweetById(tweet.id_str);
  });
  return Promise.all(deleteRequests)
    .then((data) => {
      this.tweets = [];
      return data;
    });
}

function deleteTweetById(id) {
  return this.bot.deleteTweetById(id);
}

function createUserStream(options) {
  return this.bot.createUserStream(options);
}

// function getScreenName() {
//   
// }
