const express = require('express');
const passport = require('passport');

const virtualCtrl = require('../controllers/virtual.controller');

const router = express.Router();

module.exports = router;

router.get('/:date', listVirtual);



async function listVirtual(req, res) {

  let virtual = await virtualCtrl.listVirtual();
  res.json(virtual);
}
