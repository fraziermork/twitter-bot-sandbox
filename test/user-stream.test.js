/* eslint func-names: "off" */
/* eslint prefer-arrow-callback: "off" */

const chai       = require('chai');
const debug      = require('debug')('tb:user-stream-test');
const botManager = require('./lib/bot-manager');

const mainBot = botManager.addBot('mainBot', require('../index'));
const testBot = botManager.addBot('testBot', require('./lib/test-bot'));

const expect = chai.expect;

describe('user streams', function() {
  describe('direct mentions', function() {
    before('mention mainBot', function(done) {
      
    });
    it('should respond to a mention with "hello world"', function(done) {
      
      
    });
  });
});
