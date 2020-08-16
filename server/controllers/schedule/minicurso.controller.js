const Minicurso = require('../../models/schedule/minicurso.model');
const User = require('../../models/user.model');

module.exports = {
  listSchedule,
  insertSchedule,
  updateSchedule,
  deleteSchedule,
  unsubscribeMinicurso,
  subscribeMinicurso
}

async function listSchedule(date) {
  return await Minicurso.find({
      date: date
    })
    .sort({
      startTime: 1
    });
}

async function insertSchedule(schedule) {
  return await new Minicurso(schedule).save();
}

async function updateSchedule(id, schedule) {
  return await Minicurso.findOneAndUpdate({ _id: id }, schedule);
}

async function deleteSchedule(id) {
  return await Minicurso.findOneAndRemove({
    _id: id
  });

}

async function unsubscribeMinicurso(workId, userId) {

  await User.findOneAndUpdate({
    _id: userId
  }, {
    $pull: {
      'cursosInscritos': workId
    }
  }, function (err, doc) {
    if (err) {
      console.log("Erro ao remover inscricao do trabalho ", err);
    } else {
      console.log("Sucesso ao remover inscricao do trabalho: ", err);
    }
  });

  return await Minicurso.findOneAndUpdate({
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

async function subscribeMinicurso(workId, userId, email) {
  let userInsert = {
    userId: userId,
    userEmail: email
  }

  await User.findOneAndUpdate({
    _id: userId
  }, {
    $addToSet: {
      cursosInscritos: {
        idSchedule: workId,
        icModalityId: 4
      }
    }
  }, (err, doc) => {
    if (err) {
      console.log("Erro ao atualizar o usuario subscribeMinicurso -> " + err);
    }
  });


  return await Minicurso.findOneAndUpdate({
    _id: workId
  }, {
    $addToSet: {
      'subscribers': userInsert
    }
  }, {
    new: true
  });
}
