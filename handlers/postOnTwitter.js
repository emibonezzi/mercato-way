const { TwitterApi } = require("twitter-api-v2");
const downloadImage = require("./downloadImage");

const client = new TwitterApi({
  appKey: process.env.TWITTER_CONSUMER_KEY,
  appSecret: process.env.TWITTER_CONSUMER_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_TOKEN_SECRET,
});

const rwClient = client.readWrite;

module.exports = async (text, url) => {
  try {
    if (!url) {
      // Throw a custom error to trigger the catch block
      throw new Error("URL is required to post with image.");
    }
    console.log("🔽 Downloading image...\n");
    const image = await downloadImage(url);
    // Upload the image to Twitter
    const mediaId = await rwClient.v1.uploadMedia(image);
    // Post the tweet with the uploaded image
    await rwClient.v2.tweet({
      text: text,
      media: {
        media_ids: [mediaId],
      },
    });
    console.log("✅ News posted with image on Twitter!");
  } catch (err) {
    console.log("Error in posting on twitter with image...", err.message);
    try {
      // post without image
      await rwClient.v2.tweet({
        text: text,
      });
      console.log("✅ News posted without image on Twitter!");
    } catch (err) {
      console.log("Error in posting on twitter", err.message);
    }
  }
};
