const axios = require("axios");

module.exports = async (accessToken) => {
  try {
    // send request to r/soccer for last 10 post in rising
    const {
      data: { data },
    } = await axios.get("https://oauth.reddit.com/r/soccer/rising", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data.children;
  } catch (err) {
    console.error(err);
  }
};
