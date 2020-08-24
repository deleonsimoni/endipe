const aberturaCtrl = require('../controllers/schedule/abertura.controller');
const simposioCtrl = require('../controllers/schedule/simposio.controller');
const lancamentoDeLivrosCtrl = require('../controllers/schedule/lancamentoDeLivros.controller');
const atividadeCulturalCtrl = require('../controllers/schedule/atividadeCultural.controller');
const sessoesEspeciaisCtrl = require('../controllers/schedule/sessoesEspeciais.controller');
const rodaReunioesEntidadesRedesCtrl = require('../controllers/schedule/rodaReunioesEntidadesRedes.controller');
const encerramentoCtrl = require('../controllers/schedule/encerramento.controller');



module.exports = {
  listVirtual
}

async function listVirtual(date) {


  let virtual = {};
  virtual.abertura = await aberturaCtrl.listSchedule(date);
  virtual.atividadeCultural = await atividadeCulturalCtrl.listSchedule(date);
  virtual.encerramento = await encerramentoCtrl.listSchedule(date);
  virtual.lancamentoDeLivros = await lancamentoDeLivrosCtrl.listSchedule(date);
  virtual.rodaReunioesEntidadesRedes = await rodaReunioesEntidadesRedesCtrl.listSchedule(date);
  virtual.sessoesEspeciais = await sessoesEspeciaisCtrl.listSchedule(date);
  virtual.simposio = await simposioCtrl.listSchedule(date);

  return virtual;
}
