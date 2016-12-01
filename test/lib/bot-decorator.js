/* eslint func-names: "off" */

const Promise    = require('bluebird');
const debug      = require('debug')('tb:tweet-manager');
const TwitterBot = require('../../lib/twitter-bot');


/**
 * BotWithTestUtilities - This is a decorator around normal instances of TwitterBot that adds test utilities
 * @constructor  
 * @param  {TwitterBot} bot The bot to be given test utilities 
 */ 
function BotWithTestUtilities(bot) {
  this.bot    = bot;
  this.tweets = [];
}

BotWithTestUtilities.prototype                  = Object.create(TwitterBot.prototype);
BotWithTestUtilities.prototype.constructor      = BotWithTestUtilities;
BotWithTestUtilities.prototype.tweet            = tweetAndStoreForCleanup;
BotWithTestUtilities.prototype.cleanupAllTweets = cleanupAllTweets;



/**
 * tweetAndStoreForCleanup - description
 *  
 * @param  {type} status   description 
 * @param  {type} options  description 
 * @param  {type} callback description 
 * @return {type}          description 
 */ 
function tweetAndStoreForCleanup(status, options, callback) {
  debug('tweetAndStoreForCleanup');
  this.bot.tweet(status, options)
    .then((data) => {
      debug('data: ', data);
      this.tweets.push(data);
    })
    .catch((err) => {
      throw err;
    });
}


/**
 * cleanupAllTweets - I
 *  
 * @return {Promise}  description 
 */ 
function cleanupAllTweets() {
  debug('cleanupAllTweets');
  let deleteRequests = this.tweets.map((tweet) => {
    return this.bot.twit.deleteTweetById(tweet.id);
  });
  return Promise.all(deleteRequests)
    .then((data) => {
      this.tweets = [];
      return data;
    });
}
