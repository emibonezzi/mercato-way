const searchImages = require("./searchImages");
const analyzeImages = require("./analyzeImages");
const postOnThreads = require("./postOnThreads");
const postOnTwitter = require("./postOnTwitter");
const postArticleOnThreads = require("./postArticleOnThreads");
const postArticleOnTwitter = require("./postArticleOnTwitter");

module.exports = async (updates) => {
  for (const update of updates) {
    // check if is title is not self explanatory and is not an image
    if (!update.directImageUrl && !update.isTitleExhaustive) {
      // post title and article's url on threads
      await postArticleOnThreads(update.tweet, update.url);
      // post title and article's url on threads
      await postArticleOnTwitter(update.tweet, update.url);
      continue;
    }
    // if post has direct image url
    if (update.directImageUrl) {
      // post on threads
      await postOnThreads(update.tweet, update.directImageUrl);
      // post on twitter
      await postOnTwitter(update.tweet, update.directImageUrl);
    } else {
      console.log("🔎 Searching relevant images...");
      // look up image
      const imageArray = await searchImages(update.mainSubject);
      // if unsuccessful post without image
      if (!imageArray || imageArray.length === 0) {
        console.log("No images available");
        // post on threads without image
        await postOnThreads(update.tweet, null);
        // post on twitter without image
        await postOnTwitter(update.tweet, null);
        continue;
      }
      console.log(
        `🧾 Found ${imageArray.length} images.\nSending the first ten to OpenAI`
      );
      // analyze results
      const bestImageIndex = await analyzeImages({
        title: update.originalRedditTitle,
        imageArray: imageArray.slice(0, 30),
      });
      console.log(
        "🔎 Analyzing images...\nBest relevant image is at index",
        bestImageIndex
      );
      // take best picture
      const firstRelevantPictureURL =
        imageArray[bestImageIndex].originalImageUrl;
      // post on threads with newly searched image
      await postOnThreads(update.tweet, firstRelevantPictureURL);
      // post on threads with newly searched image
      await postOnTwitter(update.tweet, firstRelevantPictureURL);
    }
  }
};
