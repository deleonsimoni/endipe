const news = require('../models/news.model');

module.exports = {
  getNews
}

async function getNews() {
  return await news.findAll()
    .sort({ createAt: 1 });
}