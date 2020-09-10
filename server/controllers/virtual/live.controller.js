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
const Poster = require('../../models/schedule/poster.model');
const User = require('../../models/user.model');
const Work = require('../../models/work.model');
const Abertura = require('../../models/schedule/abertura.model');
const AtividadeCultural = require('../../models/schedule/atividadeCultural.model');
const Simposio = require('../../models/schedule/simposio.model');
const LancamentoLivros = require('../../models/schedule/lancamentoDeLivros.model');
const SessaoEspecial = require('../../models/schedule/sessoesEspeciais.model');
const ConexaoEntrevista = require('../../models/schedule/rodaReunioesEnidadesRedes.model');
const Encerramento = require('../../models/schedule/encerramento.model');
const S3Uploader = require('../../controllers/aws.controller');
const config = require('../../config/config');


module.exports = {
  listVirtual,
  listScheduleWorkPaginate,
  getSubscribersUser,
  calibrateAllPoster,
  calibrateAllWorksAuthors,
  scheduleBooksPaginate,
  getPresentationsUser
}


async function listScheduleWorkPaginate(req) {
  const pageSize = 5;
  const page = req.query.page || 1;
  const date = req.query.date;
  let schedule;
  let total;
  switch (Number(req.query.type)) {
    case 4:
      total = await Minicurso.find({'dates.date': { $in: date }}).count();
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
      total = await Painel.find({'dates.date': { $in: date }}).count();
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
      total = await RodasDeConversa.find({'dates.date': { $in: date }}).count();
      schedule = await RodasDeConversa.find({
        'dates.date': { $in: date }
      })
      .sort({
        createAt: 1
      })
      .skip(pageSize * page - pageSize)
      .limit(pageSize);
    break;

    case 3:
      total = await Poster.find({'dates.date': { $in: date }}).count();
      schedule = await Poster.find({
        'dates.date': { $in: date }
      })
      .sort({
        createAt: 1
      })
      .skip(pageSize * page - pageSize)
      .limit(pageSize);
    break;
    //FIM WORKS
    //INICIO GENERICS
    case 1:
      total = await Abertura.find({date: date}).count();

      schedule = await Abertura.find({
        date: date
      })
      .sort({
        createAt: 1
      })
      .skip(pageSize * page - pageSize)
      .limit(pageSize);
    break;
    case 7:
      total = await AtividadeCultural.find({date: date}).count();
      schedule = await AtividadeCultural.find({
        date: date
      })
      .sort({
        createAt: 1
      })
      .skip(pageSize * page - pageSize)
      .limit(pageSize);
    break;
    case 8:
      total = await Simposio.find({date: date}).count();
      schedule = await Simposio.find({
        date: date
      })
      .sort({
        createAt: 1
      })
      .skip(pageSize * page - pageSize)
      .limit(pageSize);
    break;
    case 9:
      total = await LancamentoLivros.find({date: date}).count();
      schedule = await LancamentoLivros.find({
        date: date
      })
      .sort({
        createAt: 1
      })
      .select('-books')
      .skip(pageSize * page - pageSize)
      .limit(pageSize);
    break;
    case 10:
      total = await SessaoEspecial.find({date: date}).count();
      schedule = await SessaoEspecial.find({
        date: date
      })
      .sort({
        createAt: 1
      })
      .skip(pageSize * page - pageSize)
      .limit(pageSize);
    break;
    case 11:
      total = await ConexaoEntrevista.find({date: date}).count();
      schedule = await ConexaoEntrevista.find({
        date: date
      })
      .sort({
        createAt: 1
      })
      .skip(pageSize * page - pageSize)
      .limit(pageSize);
    break;
    case 12:
      total = await Encerramento.find({date: date}).count();
      schedule = await Encerramento.find({
        date: date
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

async function scheduleBooksPaginate(req) {
  const pageSize = 5;
  const page = req.query.page || 1;
  const livro = await LancamentoLivros.findById(req.query.id).lean();
  const total = livro.books ? livro.books.length : 0;
  const begin = ((page - 1) * pageSize);
  const end = begin + pageSize;
  const books = livro.books.slice(begin, end);
  let retornoAws;

  for (let index = 0; index < books.length; index++) {
    retornoAws = await S3Uploader.downloadFile(config.PATH_S3_DEV ? config.PATH_S3_DEV + 'xxendiperio2020/books/' + books[index].nameMiniature : 'xxendiperio2020/books/' + books[index].nameMiniature);         
    books[index].miniature = retornoAws.data.Body;    
  }

  const pager = await paginate(total, page, pageSize);

  return {
    books,
    pager,
  };
}

async function getSubscribersUser(user) {

  let schedules = [];
  let schedule = {};
  if(user.cursosInscritos){

    for (let index = 0; index < user.cursosInscritos.length; index++) {
      
      switch (Number(user.cursosInscritos[index].icModalityId)) {
        case 4:
          schedule = await Minicurso.findById({_id: user.cursosInscritos[index].idSchedule }).lean();
          if(schedule) schedule.type = 4;
        break;
        case 5:
          schedule = await Painel.findById({_id: user.cursosInscritos[index].idSchedule }).lean();
          if(schedule) schedule.type = 5;
        break;
        case 2:
          schedule = await RodasDeConversa.findById({_id: user.cursosInscritos[index].idSchedule }).lean();
          if(schedule) schedule.type = 2;
        break;
        case 3:
          schedule = await Poster.findById({_id: user.cursosInscritos[index].idSchedule }).lean();
          if(schedule) schedule.type = 3;
        break;
      }

      schedules.push(schedule);

    }

    return schedules;
  }


}

async function getPresentationsUser(req) {
  
  let work = [];
  let response = [];
  let schedule;

  if(req.user.works) {
    
    for (let index = 0; index < req.user.works.length; index++) {   
      work.push(await Work.findById(req.user.works[index]._id).select('modalityId'));
    }

    for (let index = 0; index < work.length; index++) {
      switch (Number(work[index].modalityId)) {
        case 4:
          schedule = await Minicurso.findOne({work: work[index]._id }).lean();
          if(schedule) schedule.type = 4;
          response.push(schedule);
        break;
        case 5:
          schedule = await Painel.findOne({work: work[index]._id }).lean();
          if(schedule) schedule.type = 5;
          response.push(schedule);
        break;
        case 2:
          schedule = await RodasDeConversa.findOne({work: work[index]._id }).lean();
          if(schedule) schedule.type = 2;
          response.push(schedule);
        break;
      }
    }

  }


  return await response;

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

















async function calibrateAllWorksAuthors() {
  const posters = await Poster.find();
  const minicursos = await Minicurso.find();
  const rodaDeConversas = await RodasDeConversa.find();
  const painels = await Painel.find();

  let workWithUser;
  let namesAuthors = [];

  console.log('Trabalhando Poster')
  for (let posterIndex = 0; posterIndex < posters.length; posterIndex++) {
    const element = posters[posterIndex];
    
    if(element.worksPoster){
      for (let index = 0; index < element.worksPoster.length; index++) {
        if(!element.worksPoster[index].workTitle) continue;
        namesAuthors = [];
        workWithUser = await Work.findById({_id: element.worksPoster[index].work}).select('authors');
        if(workWithUser.authors){
          
          for (let autores = 0; autores < workWithUser.authors.length; autores++) {
            const autoresTrabalho = workWithUser.authors[autores];
            namesAuthors.push(await User.findById(autoresTrabalho.userId).select('-_id fullname'))
          }

          await Poster.findOneAndUpdate({ worksPoster: { $elemMatch: { _id: element.worksPoster[index]._id } } }, {$set: {"worksPoster.$.workAuthor": namesAuthors}}, function(err) {
            console.log(err ? err : 'success');
          });

        }
      }
    }
  }


  return 'autores feito';
}

async function calibrateAllPoster() {
  const poster = await Poster.find();
  let workWithUser;

  for (let posterIndex = 0; posterIndex < poster.length; posterIndex++) {
    const element = poster[posterIndex];
    if(element.worksPoster){
      for (let index = 0; index < element.worksPoster.length; index++) {
        if(!element.worksPoster[index].workTitle) continue;
        workWithUser = await Work.findById({_id: element.worksPoster[index].work}).select('authors');
        if(workWithUser.authors){
  
          for (let userCount = 0; userCount < workWithUser.authors.length; userCount++) {
            await subscribePoster(element._id, workWithUser.authors[userCount].userId, workWithUser.authors[userCount].email);
          }
        }
      }
    }
  }
  return 'feito';
}