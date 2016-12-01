const mainBotName = process.env.npm_config_bot_name;
const testBot = require('./test-bot');

testBot.tweet(`@${mainBotName} hello ${mainBotName} it is ${(new Date()).toJSON()}`);
