const Poster = require('../../models/schedule/poster.model');
const User = require('../../models/user.model');
const Work = require('../../models/work.model');

module.exports = {
  listSchedule,
  insertSchedule,
  updateSchedule,
  deleteSchedule,
  subscribePoster,
  unsubscribePoster
}

async function listSchedule(date) {
  return await Poster.find({
      'dates.date': { $in: date }
    })
    .sort({
      startTime: 1
    });
}

async function insertSchedule(schedule) {
  const poster = await new Poster(schedule).save();
  let workWithUser;

  if(poster.worksPoster){
    for (let index = 0; index < poster.worksPoster.length; index++) {
      workWithUser = await Work.findById({_id: poster.worksPoster[index].work}).select('authors');
      if(workWithUser.authors){

        for (let userCount = 0; userCount < workWithUser.authors.length; userCount++) {
          await subscribePoster(poster._id, workWithUser.authors[userCount].userId, workWithUser.authors[userCount].email);
        }
      }
    }
  }

  return poster;
}

async function updateSchedule(id, schedule) {
  return await Poster.findOneAndUpdate({ _id: id }, schedule);
}

async function deleteSchedule(id) {

  const poster = await Poster.findById({_id: id});
  let workWithUser;

  if(poster.worksPoster){
    for (let index = 0; index < poster.worksPoster.length; index++) {
      workWithUser = await Work.findById({_id: poster.worksPoster[index].work}).select('authors');
      if(workWithUser.authors){

        for (let userCount = 0; userCount < workWithUser.authors.length; userCount++) {
          await unsubscribePoster(poster._id, workWithUser.authors[userCount].userId);
          
        }
      }
    }
  }

  return await Poster.findOneAndRemove({ _id: id });

}


async function unsubscribePoster(workId, userId) {

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

  return await Poster.findOneAndUpdate({
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

async function subscribePoster(workId, userId, email) {
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
        icModalityId: 3
      }
    }
  }, (err, doc) => {
    if (err) {
      console.log("Erro ao atualizar o usuario subscribeMinicurso -> " + err);
    }
  });


  return await Poster.findOneAndUpdate({
    _id: workId
  }, {
    $addToSet: {
      'subscribers': userInsert
    }
  }, {
    new: true
  });
}
