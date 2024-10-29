const axios = require("axios");

const input = `You are receiving an object with an array of images and an article title. You need to analyze the array and find the most relevant image to the given title, avoiding if possible stock photography websites (e.g alamy, getty images) . Respond with a json object shaped like this: 
  { 
  indexOfTheMostRelevantImage: number // the index of the relevant image
  } 
   Output only the JSON, without any additional text or explanations.`;

module.exports = async (images) => {
  try {
    // get open ai to filter
    const postsFilteredByAI = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o",
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content: input,
          },
          {
            role: "user",
            content: JSON.stringify(images),
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
        },
      }
    );
    return JSON.parse(postsFilteredByAI.data.choices[0].message.content)
      .indexOfTheMostRelevantImage;
  } catch (err) {
    if (err.response) {
      console.log("Error in uploading to Threads...");
      console.log("Status:", err.response.status);
      console.log("Headers:", err.response.headers);
      console.log("Data:", err.response.data);
    } else {
      console.log("Unknown error in uploading to Threads...", err.message);
    }
  }
};
