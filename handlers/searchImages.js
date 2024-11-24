const axios = require("axios");

module.exports = async (query) => {
  const options = {
    method: "GET",
    url: `https://google-search72.p.rapidapi.com/imagesearch?q=${query}`,
    headers: {
      "x-rapidapi-host": "google-search72.p.rapidapi.com",
      "x-rapidapi-key": process.env.IMAGE_KEY,
    },
  };

  try {
    const response = await axios(options);
    const images = response.data.items;
    return images;
  } catch (error) {
    console.error("Error fetching images:", error);
  }
};
