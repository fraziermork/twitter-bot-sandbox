/** @module TwitterBot */

// npm modules 
const Twit    = require('twit');
const Promise = require('bluebird');
// const _       = require('lodash');
const debug   = require('debug')('tb:Twitter-Bot');

module.exports = TwitterBot;

const endpoints = {
  post: {
    tweet:  'statuses/update',
    delete: 'statuses/destroy/:id',
  }, 
  get: {
    
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
  this.twit = new Twit(credentials);
}

TwitterBot.prototype.tweet = tweet;
TwitterBot.prototype.deleteTweetById = deleteTweetById;


/**
 * tweet - Tweets a string 
 *  
 * @param  {Object} content      The text to tweet 
 * @param  {Object} [options={}] Options to modify the tweet 
 * @return {Promise}             A promise that resolves on success or rejects on an error 
 */ 
function tweet(content, options = {}) {
  debug('tweet');
  return new Promise((resolve, reject) => {
    this.twit.post(endpoints.post.tweet, {}, (err, data, response) => {
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
