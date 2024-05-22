const flairs = ["News", "Transfers", "Quotes", "Official Source"];
const domains = ["https://v.redd.it", "https://i.redd.it"];

module.exports = (posts) => {
  return posts.filter((post) => {
    let checkDomains = 0;
    if (flairs.includes(post.data.link_flair_text)) {
      for (let domain of domains) {
        if (!post.data.url.startsWith(domain)) {
          checkDomains++;
        }
      }
    }
    if (checkDomains === domains.length) return post;
  });
};
