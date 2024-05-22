const axios = require("axios");

module.exports = async (accessToken) => {
  try {
    // send request to r/soccer for last 3 post in rising
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
    console.error(err);
  }
};
