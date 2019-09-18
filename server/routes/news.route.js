const express = require('express');
const passport = require('passport');
const newsCtrl = require('../controllers/news.controller');

const router = express.Router();
module.exports = router;


router.get('/news', getNews);
router.post('/news', passport.authenticate('jwt', { session: false }), insertNews);
router.delete('/news/:id', passport.authenticate('jwt', { session: false }), deleteNews);


async function getNews(req, res) {
  let news = await newsCtrl.getNews();
  res.json(news);
}

async function insertNews(req, res) {
  if (req.user.icAdmin) {
    let news = await newsCtrl.insertNews(req.body, req.user._id);
    res.json(news);
  } else {
    res.sendStatus(401);
  }
}

async function deleteNews(req, res) {
  if (req.user.icAdmin) {
    let news = await newsCtrl.deleteNews(req.params.id);
    res.json(news);
  } else {
    res.sendStatus(401);
  }
}