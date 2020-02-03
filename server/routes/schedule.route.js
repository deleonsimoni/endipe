const express = require('express');
const passport = require('passport');

const scheduleCtrl = require('../controllers/schedule.controller');

const router = express.Router();

module.exports = router;

router.get('/listAll', listAllSchedules);
router.post('/insertSchedule', passport.authenticate('jwt', { session: false }), insertSchedule);
router.delete('/deleteSchedule/:id', passport.authenticate('jwt', { session: false }), deleteSchedule)

async function listAllSchedules(req, res) {
    const schedules = await scheduleCtrl.listAllSchedules();
    res.json(schedules);
}

async function insertSchedule(req, res) {
    console.log(req);
    const schedule = await scheduleCtrl.insertSchedule(req.body);
    res.json(schedule);
}

async function deleteSchedule(req, res) {
    console.log(req.params);
    const schedule = await scheduleCtrl.deleteSchedule(req.params.id);
    res.json(schedule);
}