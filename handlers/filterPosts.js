const axios = require("axios");

const input = `You are receiving a post object retrieved from the reddit API from the r/soccer subreddit. You need to analyze it and respond with a json object shaped like this: 
  { 
  originalRedditTitle: string // original reddit post title
  url: string // url linked to the post
  isRelevantNews: boolean // return false if the post doesn't involve major clubs/players in the world or if is a troll post by reddit users
  isVideo: boolean // return true if is_video is true OR if the url linked to the post is a video platform (e.g YouTube, Streamable, Streaminone, Caulse etc...) OR if the title is a goal update in this format or similar: [Team 1] - [Team 2] - [Goalscorer] [Minute]
  isTitleExhaustive: boolean // return false if the title it's not self explanatory but only reports the article title and it's inviting users to read the linked url/article (e.g title: "How Rodri wrestled the Ballon d’Or from the powerful grasp of La Liga" should return false)
  directImageUrl: string | null, // return the URL if the reddit post has direct image URL, null if it hasn't
  mainSubject: string //  two keywords related to originalRedditTitle
  tweet: string // take this style of reporting as an example: "🚨🆕 Eintracht Frankfurt are currently demanding a transfer fee of between €50-60m for Omar #Marmoush. Liverpool is indeed a serious option. The interest is real, and there has already been contact between the player’s camp and #LFC. #SGE are aware of it. Marmoush dreams of a move to the Premier League and would immediately agree to join Liverpool." and transform the title you're receiving in that format. Don't add any personal comment, stick to reporting.
  source: string | null // return source name if it is retrievable by the URL or post title else return null
  isSourceFromTwitter: boolean // return true if the reddit post url is from x/twitter
  } 
   Output only the JSON, without any additional text or explanations.`;

module.exports = async (posts) => {
  try {
    // get open ai to filter
    const postsFilteredByAI = await Promise.all(
      posts.map(async (post) => {
        const response = await axios.post(
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
                content: JSON.stringify(post),
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
        return response.data;
      })
    );
    return postsFilteredByAI
      .map((post) => JSON.parse(post.choices[0].message.content))
      .filter((post) => post.isRelevantNews) // exclude troll posts
      .filter((post) => !post.isVideo); // exclude videos
  } catch (err) {
    console.log("Error in filtering post with OpenAI", err.message);
    throw err;
  }
};
