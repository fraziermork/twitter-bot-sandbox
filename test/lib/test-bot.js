// Purpose of test bot is to create the events that will prompt behavior in the main bot 

// npm modules 
const Twit   = require('twit');
const debug  = require('debug')('tb:test-bot');

const config = require('../../config/test-config');

const t = new Twit(config);

module.exports = testBot;

function testBot() {
  debug('testBot');
  
  
}
