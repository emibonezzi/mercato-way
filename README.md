# README

## Project: Football News Bot

This project is a serverless application designed to scrape football news from Reddit, filter relevant posts, generate engaging headlines using OpenAI, and post updates on Twitter.

### Project Structure

```
root
├── index.js
├── auth
│   └── reddit
│       └── getAccessToken.js
├── handlers
│   ├── checkDb.js
│   ├── filterPosts.js
│   ├── getHeadlines.js
│   ├── getPosts.js
│   └── tweetUpdates.js
└── .env
```

### Files Description

- **index.js**: Main entry point of the application.
- **auth/reddit/getAccessToken.js**: Handles authentication to Reddit API.
- **handlers/checkDb.js**: Checks the database for existing entries and saves new ones.
- **handlers/filterPosts.js**: Filters Reddit posts by specific flairs and excludes unwanted domains.
- **handlers/getHeadlines.js**: Uses OpenAI to generate Bloomberg-style headlines.
- **handlers/getPosts.js**: Retrieves recent posts from Reddit.
- **handlers/tweetUpdates.js**: Tweets the generated headlines using Twitter API.
- **.env**: Environment variables configuration file.

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/football-news-bot.git
   cd football-news-bot
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add the necessary environment variables:
   ```sh
   REDDIT_CLIENT_ID=your_reddit_client_id
   REDDIT_CLIENT_SECRET=your_reddit_client_secret
   MONGO_DB_PASS=your_mongodb_password
   OPEN_AI_KEY=your_openai_key
   TWITTER_CONSUMER_KEY=your_twitter_consumer_key
   TWITTER_CONSUMER_SECRET=your_twitter_consumer_secret
   TWITTER_ACCESS_TOKEN=your_twitter_access_token
   TWITTER_TOKEN_SECRET=your_twitter_token_secret
   ```

### Usage

To run the project, use the following command:

```sh
serverless deploy
```

### Components

1. **Reddit Authentication**:

   ```javascript
   const getAccessToken = require("./auth/reddit/getAccessToken");
   ```

2. **Get Posts from Reddit**:

   ```javascript
   const getPosts = require("./handlers/getPosts");
   ```

3. **Filter Posts**:

   ```javascript
   const filterPosts = require("./handlers/filterPosts");
   ```

4. **Check Database**:

   ```javascript
   const checkDb = require("./handlers/checkDb");
   ```

5. **Generate Headlines**:

   ```javascript
   const getHeadlines = require("./handlers/getHeadlines");
   ```

6. **Tweet Updates**:
   ```javascript
   const tweetUpdates = require("./handlers/tweetUpdates");
   ```

### Example Workflow

1. **Main Function**: The `main` function in `index.js` orchestrates the workflow:
   - Retrieve Reddit access token.
   - Fetch posts from Reddit.
   - Filter posts based on predefined criteria.
   - Check the database for new entries.
   - Generate headlines using OpenAI.
   - Post updates to Twitter.

```javascript
async function main() {
  const accessToken = await getAccessToken();
  const posts = await getPosts(accessToken);
  const filteredPosts = filterPosts(posts);
  if (filteredPosts.length === 0) return console.log("No relevant posts.");

  const titles = filteredPosts.map((post) => ({
    title: post.data.title,
    url: post.data.url,
  }));

  const updates = await checkDb(titles);
  if (updates.length === 0) return console.log("No new updates.");

  const headlines = await getHeadlines(updates);
  console.log(headlines);

  await tweetUpdates(headlines);
}

module.exports.handler = main;
```

### Contributing

Feel free to open issues or submit pull requests if you find any bugs or have suggestions for improvements.

### License

This project is licensed under the MIT License.

### Acknowledgements

- [Reddit API](https://www.reddit.com/dev/api/)
- [Twitter API](https://developer.twitter.com/en/docs/api-reference-index)
- [OpenAI API](https://beta.openai.com/docs/)
- [Serverless Framework](https://www.serverless.com/)

---

For further information or assistance, please contact Emiliano Bonezzi.

---

Happy coding!
