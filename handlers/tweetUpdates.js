const { TwitterApi } = require("twitter-api-v2");
const downloadImage = require("./downloadImage");

const client = new TwitterApi({
  appKey: process.env.TWITTER_CONSUMER_KEY,
  appSecret: process.env.TWITTER_CONSUMER_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_TOKEN_SECRET,
});

const rwClient = client.readWrite;

module.exports = async (updates) => {
  try {
    for (const update of updates) {
      // check if post has image
      if (update.directImageUrl) {
        const image = await downloadImage(update.directImageUrl);
        // Upload the short video to Twitter
        const mediaId = await rwClient.v1.uploadMedia(image);
      }
    }
  } catch (err) {
    console.log("Error in uploading to twitter...", err.message);
  }
};
