const Anais = require('../models/anais.model');

module.exports = {
  getAnais,
  insertAnais,
  deleteAnais,
  updateAnais
}

async function getAnais() {
  return await Anais.find()
    .sort({
      createAt: -1
    });
}

async function insertAnais(anais, idUser) {
  anais.user = idUser;
  return await new Anais(anais).save();
}

async function updateAnais(anais, idUser) {
  anais.user = idUser;
  return await Anais.findOneAndUpdate({
      _id: anais._id
    },
    anais, {
      upsert: true
    },
    function (err, doc) {
      if (err) return res.send(500, {
        error: err
      });
      return doc;
    });
}

async function deleteAnais(id) {
  return await Anais.findOneAndRemove({
    _id: id
  });
}
