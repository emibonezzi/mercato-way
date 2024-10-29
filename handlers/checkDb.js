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
      const existingNews = await News.findOne({
        url: titleObj.data.url,
      });

      // if news is not found
      if (!existingNews) {
        console.log("🚨 News not found", JSON.stringify(titleObj.data.title));
        const news = new News({
          title: titleObj.data.title,
          url: titleObj.data.url,
        });
        await news.save();
        // add to updates arr
        updates.push(titleObj);
      }
    }

    mongoose.connection.close();
    return updates;
  } catch (err) {
    console.log("Error in dealing with db...", err.message);
  }
};
