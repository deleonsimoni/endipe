const aberturaCtrl = require('../schedule/abertura.controller');
const simposioCtrl = require('../schedule/simposio.controller');
const lancamentoDeLivrosCtrl = require('../schedule/lancamentoDeLivros.controller');
const atividadeCulturalCtrl = require('../schedule/atividadeCultural.controller');
const sessoesEspeciaisCtrl = require('../schedule/sessoesEspeciais.controller');
const rodaReunioesEntidadesRedesCtrl = require('../schedule/rodaReunioesEntidadesRedes.controller');
const encerramentoCtrl = require('../schedule/encerramento.controller');



module.exports = {
  listVirtual
}

async function listVirtual(date) {


  let virtual = {};
  if (date == "29/10") {
    virtual.abertura = await aberturaCtrl.listSchedule(date);
  }
  if (date == "12/11") {
    virtual.encerramento = await encerramentoCtrl.listSchedule(date);
  }
  else {
    virtual.atividadeCultural = await atividadeCulturalCtrl.listSchedule(date);
    virtual.lancamentoDeLivros = await lancamentoDeLivrosCtrl.listSchedule(date);
    virtual.rodaReunioesEntidadesRedes = await rodaReunioesEntidadesRedesCtrl.listSchedule(date);
    virtual.sessoesEspeciais = await sessoesEspeciaisCtrl.listSchedule(date);
    virtual.simposio = await simposioCtrl.listSchedule(date);
  }
  return await virtual;
}
