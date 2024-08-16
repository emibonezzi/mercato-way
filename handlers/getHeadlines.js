const axios = require("axios");
const input =
  "You are receiving an update with a title and source url. Take this style of reporting as an example: `⚪️🇫🇷 Tottenham invest important fee on French winger Wilson Odobert as he was in the list of several clubs in UK and Italy.\n\n£25m fixed fee, £5m add-ons and also 10% sell-on clause for Burnley.\n\nFive year deal, shirt no. 29 and medical also completed in London. 🪄` and transform the title you're receiving in that format. Either extract the source name from the title or from the url string. Add a max of 3 relevant hashtags at the end and make sure you stay in an acceptable length typical of a tweet";

module.exports = async (titles) => {
  try {
    // send request to openAI
    const headlines = await Promise.all(
      titles.map(async (title) => {
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-4o",
            messages: [
              {
                role: "system",
                content: input,
              },
              {
                role: "user",
                content: `${title.title} ${title.url}`,
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
    return headlines.map((headline) => headline.choices[0].message.content);
  } catch (err) {
    console.log("Error in generating headlines with OpenAI...", err.message);
  }
};
