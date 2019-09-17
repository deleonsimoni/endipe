const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
//const userCtrl = require('../controllers/user.controller');
const newsCtrl = require('../controllers/news.controller');

const router = express.Router();
module.exports = router;


router.get('/news', getNews);


async function getNews(req, res) {
  let news = await newsCtrl.getNews();
  res.json(news);
}