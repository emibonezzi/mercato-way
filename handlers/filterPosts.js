const flairs = ["News", "Transfers", "Quotes", "Official Source"];
const domains = ["https://v.redd.it", "https://i.redd.it"];

module.exports = (posts) => {
  return posts.filter((post) => {
    const postFlair = post.data.link_flair_text;
    const postUrl = post.data.url;

    if (!flairs.includes(postFlair)) {
      return false;
    }

    // Check if the post URL does not start with any of the specified domains
    const isExcludedDomain = domains.some((domain) =>
      postUrl.startsWith(domain)
    );
    return !isExcludedDomain;
  });
};
