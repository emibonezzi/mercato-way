const axios = require("axios");

module.exports = async (title) => {
  try {
    // create media container
    const mediaContainer = await axios.post(
      "https://graph.threads.net/v1.0/8063816050370756/threads",
      {
        media_type: "TEXT",
        text: title,
        access_token: process.env.THREADS_ACCESS_TOKEN, // change token in 60 days from august 25 2024
      }
    );
    const mediaID = mediaContainer.data.id;
    console.log(
      "***** MEDIA ID *****",
      mediaID,
      "**** FULL MEDIA CONTAINER ****",
      mediaContainer
    );
    // post
    await axios.post(
      "https://graph.threads.net/v1.0/8063816050370756/threads_publish",
      {
        creation_id: mediaID,
        access_token: process.env.THREADS_ACCESS_TOKEN,
      }
    );
  } catch (err) {
    console.log("Error in uploading to Threads...moving on", err.message);
  }
};
