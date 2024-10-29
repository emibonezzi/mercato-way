const { TwitterApi } = require("twitter-api-v2");

const client = new TwitterApi({
  appKey: process.env.TWITTER_CONSUMER_KEY,
  appSecret: process.env.TWITTER_CONSUMER_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_TOKEN_SECRET,
});

const rwClient = client.readWrite;

module.exports = async (title, url) => {
  try {
    // Post the title article with url
    await rwClient.v2.tweet({
      text: `${title}\n${url}`,
    });
  } catch (err) {
    console.log("Error in posting article on twitter...", err.message);
  }
};
