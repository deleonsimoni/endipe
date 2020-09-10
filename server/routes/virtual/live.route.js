const express = require('express');
const passport = require('passport');
const asyncHandler = require("express-async-handler");
const virtualCtrl = require('../../controllers/virtual/live.controller');
const router = express.Router();

module.exports = router;

router.get('/calibratedAllPosters', asyncHandler(calibrateAllPoster));
router.get('/calibrateAllWorksAuthors', asyncHandler(calibrateAllWorksAuthors));



router.get('/getScheduleByDay/:date', asyncHandler(listVirtual));
router.get('/scheduleWorkPaginate', asyncHandler(listScheduleWorkPaginate));
router.get('/scheduleBooksPaginate', asyncHandler(scheduleBooksPaginate));

router.get('/getSubscribersUser',  passport.authenticate("jwt", { session: false, }), asyncHandler(getSubscribersUser));
router.get('/getPresentationsUser',  passport.authenticate("jwt", { session: false, }), asyncHandler(getPresentationsUser));


async function listScheduleWorkPaginate(req, res) {
  let rep = await virtualCtrl.listScheduleWorkPaginate(req);
  res.json(rep);
}

async function scheduleBooksPaginate(req, res) {
  let rep = await virtualCtrl.scheduleBooksPaginate(req);
  res.json(rep);
}

async function getSubscribersUser(req, res) {
  let rep = await virtualCtrl.getSubscribersUser(req.user);
  res.json(rep);
}

async function getPresentationsUser(req, res) {
  let rep = await virtualCtrl.getPresentationsUser(req);
  res.json(rep);
}

async function listVirtual(req, res) {

  let date = req.params.date;
  let virtual = await virtualCtrl.listVirtual(date);

  res.json(virtual);
}





async function calibrateAllPoster(req, res) {
    let users = await virtualCtrl.calibrateAllPoster();
    res.json(users);
}

async function calibrateAllWorksAuthors(req, res) {
    let users = await virtualCtrl.calibrateAllWorksAuthors();
    res.json(users);
}