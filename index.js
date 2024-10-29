const getAccessToken = require("./auth/reddit/getAccessToken");
const checkDb = require("./handlers/checkDb");
const filterPosts = require("./handlers/filterPosts");
const getPosts = require("./handlers/getPosts");
const postUpdates = require("./handlers/postUpdates");

async function main() {
  // get reddit access token
  const accessToken = await getAccessToken();
  // get posts
  const posts = await getPosts(accessToken);

  // check in db for entries
  const updates = await checkDb(posts);

  // if no new updates return
  if (updates.length === 0) return console.log("No new updates.");

  console.log("🧾 New updates ready to be processed:\n");
  updates.map((update) => {
    console.log(update.data.title);
  });

  // filter post by AI
  const filteredPosts = await filterPosts(updates);

  console.log("✅ Headlines generated:\n");
  console.log(filteredPosts);

  // if no new updates return
  if (filteredPosts.length === 0) return console.log("No relevant updates.");

  // post on threads and twitter
  await postUpdates(filteredPosts);
}

module.exports.handler = main;
// main();
