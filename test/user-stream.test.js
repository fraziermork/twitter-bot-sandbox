/* eslint func-names: "off" */
/* eslint prefer-arrow-callback: "off" */

const chai         = require('chai');
const debug        = require('debug')('tb:user-stream-test');
const mainBot      = require('../index');
const testBot      = require('./lib/test-bot');
const tweetManager = require('./lib/tweet-manager');

// const expect = chai.expect;

describe('user streams', function() {
  describe('direct mentions', function() {
    before('mention mainBot', function(done) {
      
    });
    it('should respond to a mention with "hello world"', function(done) {
      
      
    });
  });
});
