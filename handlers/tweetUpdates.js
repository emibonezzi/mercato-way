const { TwitterApi } = require("twitter-api-v2");

const client = new TwitterApi({
  appKey: process.env.TWITTER_CONSUMER_KEY,
  appSecret: process.env.TWITTER_CONSUMER_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_TOKEN_SECRET,
});

const rwClient = client.readWrite;

module.exports = async (updates) => {
  try {
    await Promise.all(
      updates.map(async (update) => await rwClient.v2.tweet(update))
    );
  } catch (err) {
    console.log("Error while tweeting the updates...", err.message);
  }
};
