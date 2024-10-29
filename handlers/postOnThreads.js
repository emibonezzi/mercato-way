const axios = require("axios");

module.exports = async (text, url) => {
  try {
    if (!url) {
      // Throw a custom error to trigger the catch block
      throw new Error("URL is required to post with image.");
    }
    // create media container
    const mediaContainer = await axios.post(
      "https://graph.threads.net/v1.0/8063816050370756/threads",
      {
        media_type: "IMAGE",
        text: text,
        image_url: url,
        access_token: process.env.THREADS_ACCESS_TOKEN, // change token in 60 days from october 25 2024
      }
    );

    const mediaID = mediaContainer.data.id;
    console.log("***** MEDIA ID *****", mediaID);

    // Step 2: Check the status of the media container
    let status = "IN_PROGRESS";
    while (status !== "FINISHED") {
      console.log("Checking status for mediaID:", mediaID);
      const statusCheck = await axios.get(
        `https://graph.threads.net/v1.0/${mediaID}?fields=status&access_token=${process.env.THREADS_ACCESS_TOKEN}`
      );
      status = statusCheck.data.status;

      if (status !== "FINISHED") {
        // Wait for a few seconds before checking again
        await new Promise((resolve) => setTimeout(resolve, 2000)); // 5-second delay
      }
    }

    // post
    const postId = await axios.post(
      "https://graph.threads.net/v1.0/8063816050370756/threads_publish",
      {
        creation_id: mediaID,
        redirect_uri: "https://oauth.pstmn.io/v1/callback",
        access_token: process.env.THREADS_ACCESS_TOKEN,
      }
    );
    console.log("✅ News posted with image on Threads!");
  } catch (err) {
    console.log("Error in posting threads with image", err.message);
    // post without image
    try {
      // create media container
      const mediaContainer = await axios.post(
        "https://graph.threads.net/v1.0/8063816050370756/threads",
        {
          media_type: "TEXT",
          text: text,
          access_token: process.env.THREADS_ACCESS_TOKEN, // change token in 60 days from oct 25 2024
        }
      );
      const mediaID = mediaContainer.data.id;
      console.log("***** MEDIA ID *****", mediaID);
      // post
      await axios.post(
        "https://graph.threads.net/v1.0/8063816050370756/threads_publish",
        {
          creation_id: mediaID,
          access_token: process.env.THREADS_ACCESS_TOKEN,
        }
      );
      console.log("✅ News posted without image on Threads!");
    } catch (err) {
      console.log("Error in posting threads without image...", err.message);
    }
  }
};
