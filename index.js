const getAccessToken = require("./auth/reddit/getAccessToken");
const checkDb = require("./handlers/checkDb");
const filterPosts = require("./handlers/filterPosts");
const getHeadlines = require("./handlers/getHeadlines");
const getPosts = require("./handlers/getPosts");
const tweetUpdates = require("./handlers/tweetUpdates");

async function main() {
  // get reddit access token
  const accessToken = await getAccessToken();
  // get posts
  const posts = await getPosts(accessToken);
  // filter post by flairs and exclude bad domains
  const filteredPosts = filterPosts(posts);
  // if empty return
  if (filteredPosts.length === 0) return console.log("No relevant posts.");

  // collect titles and sources
  const titles = filteredPosts.map((post) => ({
    title: post.data.title,
    url: post.data.url,
  }));

  // check in db for entries
  const updates = await checkDb(titles);

  // if no new updates return
  if (updates.length === 0) return console.log("No new updates.");

  // clean them with openAI
  const headlines = await getHeadlines(updates);

  console.log(headlines);

  // tweet the headlines
  await tweetUpdates(headlines);
}

module.exports.handler = main;
