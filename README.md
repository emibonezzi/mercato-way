# Football News Bot

**A serverless application that:**

- **Scrapes** football news from Reddit's /r/soccer subreddit.
- **Filters** posts based on relevance and quality using OpenAI.
- **Generates** engaging headlines using OpenAI.
- **Posts** updates to Twitter and Threads, including relevant images.

**How it works:**

1. **Reddit Scraping:**
   - Fetches recent posts from the /r/soccer subreddit.
2. **Post Filtering:**
   - Uses OpenAI to filter posts based on relevance and quality.
   - Excludes posts that are primarily discussions, memes, or low-quality content.
3. **Headline Generation:**
   - Employs OpenAI to generate concise and engaging headlines for each filtered post.
4. **Image Search and Selection:**
   - If a post doesn't have a direct image link, searches for relevant images using a search engine API.
   - Uses OpenAI to select the most relevant image from the search results.
5. **Social Media Posting:**
   - **Twitter:** Posts updates with text and image (if available) to a specified Twitter account.
   - **Threads:** Posts updates with text and image (if available) to a specified Threads account.
