const aberturaCtrl = require('../schedule/abertura.controller');
const simposioCtrl = require('../schedule/simposio.controller');
const lancamentoDeLivrosCtrl = require('../schedule/lancamentoDeLivros.controller');
const atividadeCulturalCtrl = require('../schedule/atividadeCultural.controller');
const sessoesEspeciaisCtrl = require('../schedule/sessoesEspeciais.controller');
const rodaReunioesEntidadesRedesCtrl = require('../schedule/rodaReunioesEntidadesRedes.controller');
const encerramentoCtrl = require('../schedule/encerramento.controller');
const paginate = require("jw-paginate");
const Minicurso = require('../../models/schedule/minicurso.model');
const Painel = require('../../models/schedule/painel.model');
const RodasDeConversa = require('../../models/schedule/rodasDeConversa.model');



module.exports = {
  listVirtual,
  listScheduleWorkPaginate
}



async function listScheduleWorkPaginate(req) {
  const pageSize = 5;
  const page = req.query.page || 1;
  const date = req.query.date;
  const total = await Minicurso.find({'dates.date': { $in: date }}).count();
  let schedule;
  console.log(req.query.type)

  switch (Number(req.query.type)) {
    case 4:
      schedule = await Minicurso.find({
        'dates.date': { $in: date }
      })
      .sort({
        createAt: 1
      })
      .skip(pageSize * page - pageSize)
      .limit(pageSize);

    break;
  
    case 5:
      schedule = await Painel.find({
        'dates.date': { $in: date }
      })
      .sort({
        createAt: 1
      })
      .skip(pageSize * page - pageSize)
      .limit(pageSize);
    break;

    case 2:
      schedule = await RodasDeConversa.find({
        'dates.date': { $in: date }
      })
      .sort({
        createAt: 1
      })
      .skip(pageSize * page - pageSize)
      .limit(pageSize);
    break;

  }

  const pager = await paginate(total, page, pageSize);

  return {
    schedule,
    pager,
  };
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
