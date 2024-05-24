const axios = require("axios");

module.exports = async (accessToken) => {
  try {
    // send request to r/soccer for last posts in rising
    const {
      data: { data },
    } = await axios.get("https://oauth.reddit.com/r/soccer/top", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        t: "hour",
      },
    });
    return data.children;
  } catch (err) {
    console.log("Error in retrieving reddit posts...", err.message);
  }
};
