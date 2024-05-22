const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: String,
  url: String,
});

const News = mongoose.model("News", newsSchema);

module.exports = async (titles) => {
  const updates = [];
  try {
    await mongoose.connect(
      `mongodb+srv://mercato:${process.env.MONGO_DB_PASS}@mercatonews.oopolye.mongodb.net/?retryWrites=true&w=majority&appName=MercatoNews`
    );

    for (const titleObj of titles) {
      const existingNews = await News.findOne({ title: titleObj.title });
      // if news is not found
      if (!existingNews) {
        const news = new News({
          title: titleObj.title,
          url: titleObj.url,
        });
        await news.save();
        // add to updates arr
        updates.push({
          title: titleObj.title,
          url: titleObj.url,
        });
      }
    }

    mongoose.connection.close();
    return updates;
  } catch (err) {
    console.log("Error in dealing with db...", err.message);
  }
};
