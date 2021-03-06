/* eslint func-names: "off" */

const debug                = require('debug')('tb:bot-manager');
const Promise              = require('bluebird');
const BotWithTestUtilities = require('./bot-with-test-utilities');

module.exports = (function() {
  // Where all managed BotWithTestUtilities will be stored 
  const bots = {};
  
  const TweetManager = {
    addBot,
    cleanupAllTweets,
    deleteAllBotsFromBotManager,
  };
  
  
  /**  
   * addBot - Takes an instance of TwitterBot, wraps it as a BotWithTestUtilities, and stores it 
   *    
   * @param  {string}               botName   The name of the original TwitterBot   
   * @param  {TwitterBot}           bot       The TwitterBot to manage    
   * @return {BotWithTestUtilities}           The newly created and saved BotWithTestUtilities   
   */   
  function addBot(botName, bot) {
    debug('addBot');
    if (!bots[botName]) {
      debug('bot saved');
      bots[botName] = new BotWithTestUtilities(botName, bot);
      return bots[botName];
    } 
    throw new Error(`A bot named ${botName} already existed. Bot names must be unique.`);
  }
  
  
  /**  
   * deleteAllBotsFromBotManager - Deletes all bots from the bot manager 
   *    
   */   
  function deleteAllBotsFromBotManager() {
    debug('deleteAllBotsFromBotManager');
    Object.keys(bots).forEach((botName) => {
      delete bots[botName];
    });
  }
  
  
  /**  
   * cleanupAllTweets - Calls the cleanupAllTweets on all managed bots 
   *    
   * @return {Promise}  A promise that resolves with all tweets deleted or rejects with an error   
   */   
  function cleanupAllTweets() {
    debug('cleanupAllTweets');
    let deleteRequests = Object.keys(bots).map((botName) => {
      return bots[botName].cleanupAllTweets();
    });
    return Promise.all(deleteRequests);
  }
  
  return TweetManager;
})();
