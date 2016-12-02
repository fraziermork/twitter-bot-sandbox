// This bot is used for testing purposes only
// This bot's config cannot be the same as the bot-config: 2 distinct sets of API keys are needed 

const testConfig = {
  consumer_key:        process.env.TWITTER_CONSUMER_KEY_TEST, 
  consumer_secret:     process.env.TWITTER_CONSUMER_SECRET_TEST, 
  access_token:        process.env.TWITTER_ACCESS_TOKEN_TEST, 
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET_TEST,
};

module.exports = testConfig;
