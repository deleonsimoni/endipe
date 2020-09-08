const express = require('express');
const passport = require('passport');
const asyncHandler = require("express-async-handler");
const virtualCtrl = require('../../controllers/virtual/live.controller');
const router = express.Router();

module.exports = router;

router.get('/getScheduleByDay/:date', asyncHandler(listVirtual));
router.get('/scheduleWorkPaginate', asyncHandler(listScheduleWorkPaginate));
router.get('/getSubscribersUser',  passport.authenticate("jwt", { session: false, }), asyncHandler(getSubscribersUser));

async function listScheduleWorkPaginate(req, res) {
  let rep = await virtualCtrl.listScheduleWorkPaginate(req);
  res.json(rep);
}

async function getSubscribersUser(req, res) {
  let rep = await virtualCtrl.getSubscribersUser(req.user);
  res.json(rep);
}

async function listVirtual(req, res) {

  let date = req.params.date;
  let virtual = await virtualCtrl.listVirtual(date);

  res.json(virtual);
}
