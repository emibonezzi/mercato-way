const axios = require("axios");
const input =
  "You are receving an update with a title and source url. Take this format: FED REPORT SHOWS 72% OF U.S. HOUSEHOLDS SAY THEY WERE AT LEAST OK  FINANCIALLY IN OCTOBER 2023 VS 73% A YEAR EARLIER AND LOWEST SHARE SINCE  2016 and transform the title you're receiving in that format. Either extract the source name from the title or from the url string. Make sure you stay in an acceptable length typical of a bloomberg terminal update";

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
    return headlines.map((headline) =>
      headline.choices[0].message.content.toUpperCase()
    );
  } catch (err) {
    console.error(err);
  }
};
