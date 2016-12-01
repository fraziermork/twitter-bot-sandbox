/* eslint func-names: "off" */
/* eslint prefer-arrow-callback: "off" */

const chai       = require('chai');
const debug      = require('debug')('tb:user-stream-test');
const botManager = require('./lib/bot-manager');

let mainBot = require('../index');
let testBot = require('./lib/test-bot');

debug('mainBot: ', mainBot);
debug('testBot: ', testBot);

mainBot = botManager.addBot('mainBot', mainBot);
testBot = botManager.addBot('testBot', testBot);

const mainBotName = process.env.npm_config_bot_name;

const expect = chai.expect;

describe('user streams', function() {
  afterEach('Clean up all tweets', function() {
    return botManager.cleanupAllTweets();
  });
  describe('direct mentions', function() {
    before('mention mainBot', function() {
      return testBot.tweet(`@${mainBotName} hello ${mainBotName} it is ${(new Date()).toJSON()}`);
    });
    it('should respond to a mention with "hello world"', function() {
      expect(true).to.equal(false);
    });
  });
});
