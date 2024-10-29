const path = require("path");
const axios = require("axios");
const fs = require("fs");

module.exports = async (url) => {
  const imagePath = path.join("/tmp", `${Date.now()}.jpeg`);
  const writer = fs.createWriteStream(imagePath);
  try {
    // download image
    const response = await axios({
      url: url,
      method: "GET",
      responseType: "stream",
    });

    // pipe and wait for finish using a promise
    await new Promise((resolve, reject) => {
      response.data.pipe(writer);
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    console.log("Picture downloaded");
    return imagePath;
  } catch (err) {
    console.log("Error in downloading the image...", err.message);
  }
};
