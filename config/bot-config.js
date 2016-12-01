// This is the configuration for the main bot 
// Its name should match with process.env.NPM_CONFIG_BOT_NAME 

const botConfig = {
  consumer_key:        process.env.TWITTER_CONSUMER_KEY, 
  consumer_secret:     process.env.TWITTER_CONSUMER_SECRET, 
  access_token:        process.env.TWITTER_ACCESS_TOKEN, 
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
};

module.exports = botConfig;
