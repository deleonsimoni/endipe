const express = require('express');
const passport = require('passport');

const aberturaCtrl = require('../controllers/schedule/abertura.controller');
const minicursoCtrl = require('../controllers/schedule/minicurso.controller');
const simposioCtrl = require('../controllers/schedule/simposio.controller');
const posterCtrl = require('../controllers/schedule/poster.controller');
const lancamentoDeLivrosCtrl = require('../controllers/schedule/lancamentoDeLivros.controller');
const atividadeCulturalCtrl = require('../controllers/schedule/atividadeCultural.controller');
const rodasDeConversaCtrl = require('../controllers/schedule/rodasDeConversa.controller');
const painelCtrl = require('../controllers/schedule/painel.controller');
const sessoesEspeciaisCtrl = require('../controllers/schedule/sessoesEspeciais.controller');
const rodaReunioesEntidadesRedesCtrl = require('../controllers/schedule/rodaReunioesEntidadesRedes.controller');
const encerramentoCtrl = require('../controllers/schedule/encerramento.controller');


const router = express.Router();

module.exports = router;

router.get('/:idType?date=:data', listSchedule);

router.post('/:idType', passport.authenticate('jwt', {
  session: false
}), insertSchedule);

router.put('/:idType/:id', passport.authenticate('jwt', {
  session: false
}), updateSchedule);

router.put('/:idType?id=:id', passport.authenticate('jwt', {
  session: false
}), deleteSchedule);


async function listSchedule(req, res) {

  let schedules;

  switch (Number(req.params.idType)) {
    case 1:
      schedules = await aberturaCtrl.listSchedule(req.query.data);
      res.json(schedules);
      break;
    case 2:
      schedules = await minicursoCtrl.listSchedule(req.query.data);
      res.json(schedules);
      break;
    case 3:
      schedules = await simposioCtrl.listSchedule(req.query.data);
      res.json(schedules);
      break;
    case 4:
      schedules = await posterCtrl.listSchedule(req.query.data);
      res.json(schedules);
      break;
    case 5:
      schedules = await lancamentoDeLivrosCtrl.listSchedule(req.query.data);
      res.json(schedules);
      break;
    case 7:
      schedules = await atividadeCulturalCtrl.listSchedule(req.query.data);
      res.json(schedules);
      break;
    case 8:
      schedules = await rodasDeConversaCtrl.listSchedule(req.query.data);
      res.json(schedules);
      break;
    case 9:
      schedules = await painelCtrl.listSchedule(req.query.data);
      res.json(schedules);
      break;
    case 10:
      schedules = await sessoesEspeciaisCtrl.listSchedule(req.query.data);
      res.json(schedules);
      break;
    case 11:
      schedules = await rodaReunioesEntidadesRedesCtrl.listSchedule(req.query.data);
      res.json(schedules);
      break;
    case 12:
      schedules = await encerramentoCtrl.listSchedule(req.query.data);
      res.json(schedules);
      break;
  }
}


async function insertSchedule(req, res) {

  if (!user.icAdmin) {
    res.sendStatus(401);
  } else {
    req.body.user = req.user._id;
    let schedules;
    switch (Number(req.params.idType)) {
      case 1:
        schedules = await aberturaCtrl.insertSchedule(req.body);
        res.json(schedules);
        break;
      case 2:
        schedules = await minicursoCtrl.insertSchedule(req.body);
        res.json(schedules);
        break;
      case 3:
        schedules = await simposioCtrl.insertSchedule(req.body);
        res.json(schedules);
        break;
      case 4:
        schedules = await posterCtrl.insertSchedule(req.body);
        res.json(schedules);
        break;
      case 5:
        schedules = await lancamentoDeLivrosCtrl.insertSchedule(req.body);
        res.json(schedules);
        break;
      case 7:
        schedules = await atividadeCulturalCtrl.insertSchedule(req.body);
        res.json(schedules);
        break;
      case 8:
        schedules = await rodasDeConversaCtrl.insertSchedule(req.body);
        res.json(schedules);
        break;
      case 9:
        schedules = await painelCtrl.insertSchedule(req.body);
        res.json(schedules);
        break;
      case 10:
        schedules = await sessoesEspeciaisCtrl.insertSchedule(req.body);
        res.json(schedules);
        break;
      case 11:
        schedules = await rodaReunioesEntidadesRedesCtrl.insertSchedule(req.body);
        res.json(schedules);
        break;
      case 12:
        schedules = await encerramentoCtrl.insertSchedule(req.body);
        res.json(schedules);
        break;
    }
  }
}


async function updateSchedule(req, res) {

  if (!user.icAdmin) {
    res.sendStatus(401);
  } else {
    req.body.user = req.user._id;
    let schedules;
    switch (Number(req.params.idType)) {
      case 1:
        schedules = await aberturaCtrl.updateSchedule(req.params.id, req.body);
        res.json(schedules);
        break;
      case 2:
        schedules = await minicursoCtrl.updateSchedule(req.params.id, req.body);
        res.json(schedules);
        break;
      case 3:
        schedules = await simposioCtrl.updateSchedule(req.params.id, req.body);
        res.json(schedules);
        break;
      case 4:
        schedules = await posterCtrl.updateSchedule(req.params.id, req.body);
        res.json(schedules);
        break;
      case 5:
        schedules = await lancamentoDeLivrosCtrl.updateSchedule(req.params.id, req.body);
        res.json(schedules);
        break;
      case 7:
        schedules = await atividadeCulturalCtrl.updateSchedule(req.params.id, req.body);
        res.json(schedules);
        break;
      case 8:
        schedules = await rodasDeConversaCtrl.updateSchedule(req.params.id, req.body);
        res.json(schedules);
        break;
      case 9:
        schedules = await painelCtrl.updateSchedule(req.params.id, req.body);
        res.json(schedules);
        break;
      case 10:
        schedules = await sessoesEspeciaisCtrl.updateSchedule(req.params.id, req.body);
        res.json(schedules);
        break;
      case 11:
        schedules = await rodaReunioesEntidadesRedesCtrl.updateSchedule(req.params.id, req.body);
        res.json(schedules);
        break;
      case 12:
        schedules = await encerramentoCtrl.updateSchedule(req.params.id, req.body);
        res.json(schedules);
        break;
    }
  }
}


async function deleteSchedule(req, res) {

  if (!user.icAdmin) {
    res.sendStatus(401);
  } else {
    let schedules;

    switch (Number(req.params.idType)) {
      case 1:
        schedules = await aberturaCtrl.deleteSchedule(req.query.id);
        res.json(schedules);
        break;
      case 2:
        schedules = await minicursoCtrl.deleteSchedule(req.query.id);
        res.json(schedules);
        break;
      case 3:
        schedules = await simposioCtrl.deleteSchedule(req.query.id);
        res.json(schedules);
        break;
      case 4:
        schedules = await posterCtrl.deleteSchedule(req.query.id);
        res.json(schedules);
        break;
      case 5:
        schedules = await lancamentoDeLivrosCtrl.deleteSchedule(req.query.id);
        res.json(schedules);
        break;
      case 7:
        schedules = await atividadeCulturalCtrl.deleteSchedule(req.query.id);
        res.json(schedules);
        break;
      case 8:
        schedules = await rodasDeConversaCtrl.deleteSchedule(req.query.id);
        res.json(schedules);
        break;
      case 9:
        schedules = await painelCtrl.deleteSchedule(req.query.id);
        res.json(schedules);
        break;
      case 10:
        schedules = await sessoesEspeciaisCtrl.deleteSchedule(req.query.id);
        res.json(schedules);
        break;
      case 11:
        schedules = await rodaReunioesEntidadesRedesCtrl.deleteSchedule(req.query.id);
        res.json(schedules);
        break;
      case 12:
        schedules = await encerramentoCtrl.deleteSchedule(req.query.id);
        res.json(schedules);
        break;
    }
  }
}
