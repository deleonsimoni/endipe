const Painel = require('../../models/schedule/painel.model');
const User = require('../../models/user.model');

module.exports = {
  listSchedule,
  insertSchedule,
  updateSchedule,
  deleteSchedule,
  unsubscribePainel,
  subscribePainel,
  
}

async function listSchedule(date) {
  return await Painel.find({
      'dates.date': { $in: date }
    })
    .sort({
      createAt: 1
    });
}

async function insertSchedule(schedule) {
  return await new Painel(schedule).save();
}

async function updateSchedule(id, schedule) {
  return await Painel.findOneAndUpdate({ _id: id }, schedule);
}

async function deleteSchedule(id) {
  return await Painel.findOneAndRemove({
    _id: id
  });

}

async function unsubscribePainel(workId, userId) {

  await User.findOneAndUpdate({
    _id: userId
  }, {
    $pull: {
      cursosInscritos:{
        'idSchedule': workId
      }
    }
  }, function (err, doc) {
    if (err) {
      console.log("Erro ao remover inscricao do trabalho ", err);
    } else {
      console.log("Sucesso ao remover inscricao do trabalho: ", err);
    }
  });

  return Painel.findOneAndUpdate({
    _id: workId
  }, {
    $pull: {
      subscribers: {
        userId: userId
      }
    }
  }, {
    new: true
  });
}

async function subscribePainel(workId, userId, email) {
  let userInsert = {
    userId: userId,
    userEmail: email
  }

  await User.findOneAndUpdate({
    _id: userId
  }, {
    $addToSet: {
      'cursosInscritos': {
        idSchedule: workId,
        icModalityId: 5
      }
    }
  }, {
    upsert: true,
    new: true
  }, (err, doc) => {
    if (err) {
      console.log("Erro ao atualizar o usuario painel -> " + err);
    }
  });

  return Painel.findOneAndUpdate({
    _id: workId
  }, {
    $addToSet: {
      'subscribers': userInsert
    }
  }, {
    new: true
  });
}
