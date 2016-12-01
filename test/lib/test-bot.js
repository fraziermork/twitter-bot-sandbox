// Purpose of test bot is to create the events that will prompt behavior in the main bot 

// npm modules 
// const debug      = require('debug')('tb:test-bot');

// internal modules 
const TwitterBot  = require('../../lib/twitter-bot');
const credentials = require('../../config/test-config');

const testBot = new TwitterBot(credentials);

module.exports = testBot;
