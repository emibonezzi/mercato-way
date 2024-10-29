const axios = require("axios");

module.exports = async (query) => {
  const options = {
    method: "GET",
    url: `https://duckduckgo-image-search.p.rapidapi.com/search/image?q=${query}`,
    headers: {
      "x-rapidapi-host": "duckduckgo-image-search.p.rapidapi.com",
      "x-rapidapi-key": process.env.IMAGE_KEY,
    },
  };

  try {
    const response = await axios(options);
    const images = response.data.results;
    return images;
  } catch (error) {
    console.error("Error fetching images:", error);
  }
};
