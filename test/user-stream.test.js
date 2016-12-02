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

const expect    = chai.expect;
const startTime = Date.now();

describe('user streams', function() {
  after('Clean up all tweets at the end after 5 second delay', function(done) {
    this.timeout(10000);
    setTimeout(() => {
      botManager.cleanupAllTweets()
        .then(() => {
          done();
        })
        .catch((err) => {
          throw err;
        });
    }, 5000);
  });
  describe('direct mentions', function() {
    before('mention mainBot', function(done) {
      this.timeout(10000);
      testBot.tweet(`@${mainBotName} hello ${mainBotName} it is ${(new Date()).toJSON()}`)
        .then((data) => {
          this.tweetData = data;
          setTimeout(done, 5000);
        })
        .catch(done);
    });
    it('should respond to a mention with the current time', function(done) {
      testBot.bot.twit.get('statuses/mentions_timeline', (err, data, response) => {
        debug('data: ', data);
        let indexOfMatchingTweet = -1;
        for (let i = 0; i < data.length; i++) {
          if (data[i].user.screen_name === mainBotName) {
            indexOfMatchingTweet = i;
            break;
          }
        }
        expect(indexOfMatchingTweet).to.not.equal(-1);
        let tweetText = data[indexOfMatchingTweet].text;
        
        // Get the time out of the tweet, Date.toISOString() yields a string 24 characters long 
        let dateString = tweetText.substr(tweetText.length - 24);
        let tweetDate  = new Date(dateString);
        expect(tweetDate.getTime()).to.be.above(startTime);
        done();
      });
    });
  });
});
