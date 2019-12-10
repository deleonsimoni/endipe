const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const adminRoutes = require('./admin.route');
const newsRoutes = require('./news.route');
const conferencistaRoutes = require('./conferencista.route');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/admin', adminRoutes);//passar o middleware
router.use('/news', newsRoutes);
router.use('/conferencista', conferencistaRoutes);

module.exports = router;
