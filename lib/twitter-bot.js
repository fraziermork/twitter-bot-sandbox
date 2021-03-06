/** @module TwitterBot */

// npm modules 
const Twit    = require('twit');
const Promise = require('bluebird');
const _       = require('lodash');
const debug   = require('debug')('tb:Twitter-Bot');

const mainBotName = process.env.npm_config_bot_name;

module.exports = TwitterBot;

const endpoints = {
  post: {
    tweet:  'statuses/update',
    delete: 'statuses/destroy/:id',
  }, 
  get: {
    
  },
  stream: {
    user: 'user',
  },
};


/**
 * TwitterBot - Builds a new TwitterBot with a given set of credentials 
 * @constructor 
 * @param  {Object} credentials  The API keys to use for this bot 
 * @see {@link https://github.com/ttezel/twit|twit} 
 * @param  {Object} [options] Options to pass to the bot 
 * 
 */ 
function TwitterBot(credentials, options = {}) {
  debug('TwitterBot', credentials, options);
  this.twit      = new Twit(credentials);
  this.streaming = false;
  this.stream    = null;
}

TwitterBot.prototype.tweet                   = tweet;
TwitterBot.prototype.deleteTweetById         = deleteTweetById;
TwitterBot.prototype.createUserStream        = createUserStream;
TwitterBot.prototype.configureReplyToMention = configureReplyToMention;

/**
 * tweet - Tweets a string 
 *  
 * @param  {Object} status       The text to tweet 
 * @param  {Object} [options={}] Options to modify the tweet 
 * @return {Promise}             A promise that resolves on success or rejects on an error 
 */ 
function tweet(status, options = {}) {
  debug('tweet', status, options);
  let tweetInfo = _.assign({}, options, { status });
  return new Promise((resolve, reject) => {
    this.twit.post(endpoints.post.tweet, tweetInfo, (err, data, response) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
}


/**
 * deleteTweetById - Delete a tweet by id 
 *  
 * @param  {string} id The id of the tweet to delete 
 * @return {Promise}   A promise that resolves on success or rejects with an error 
 */ 
function deleteTweetById(id) {
  debug(`delete ${id}`);
  return new Promise((resolve, reject) => {
    this.twit.post(endpoints.post.delete, { id }, (err, data, response) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
}


/**
 * createUserStream - Creates a user stream for the bot 
 *  
 * @param  {Object} options Options to define the created user stream 
 * @return {EventEmitter}   A user steam event emitter  
 */ 
function createUserStream(options) {
  debug('createUserStream', options);
  if (this.streaming) return this.stream;
  this.stream    = this.twit.stream(endpoints.stream.user, options);
  this.streaming = true;
  return this.stream;
}

function configureReplyToMention(content, options = {}) {
  debug('configureReplyToMention');
  debug('this.stream: ', this.stream);
  this.stream.on('tweet', (tweet) => {
    debug('______________________________________________');
    debug('tweet.in_reply_to_screen_name === mainBotName: ', tweet.in_reply_to_screen_name === mainBotName);
    debug('!tweet.in_reply_to_status_id_str: ', !tweet.in_reply_to_status_id_str);
    debug('!tweet.retweeted: ', !tweet.retweeted);
    if (tweet.in_reply_to_screen_name === mainBotName && 
        !tweet.in_reply_to_status_id_str && 
        !tweet.retweeted) {
      // options.in_reply_to_status_id = tweet.id_str;    
      const status = content(tweet);
      
      if (typeof status === 'string') {
        this.tweet(status, options);
      }
      
      if (typeof status === 'Promise') {
        status
          .then((text) => {
            this.tweet(status, options);
          })
          .catch((err) => {
            debug(err);
          });
      }
    }
  });
}
