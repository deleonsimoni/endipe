const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const adminRoutes = require('./admin.route');
const newsRoutes = require('./news.route');
const reviewRoutes = require('./reviews.route');

const conferencistaRoutes = require('./conferencista.route');
const scheduleRoutes = require('./schedule.route');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/admin', adminRoutes);//passar o middleware
router.use('/news', newsRoutes);
router.use('/reviews', reviewRoutes);
router.use('/conferencista', conferencistaRoutes);
router.use('/schedule', scheduleRoutes);

module.exports = router;
