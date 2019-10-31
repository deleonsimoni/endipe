const bcrypt = require('bcrypt');
//const Joi = require('joi');
const User = require('../models/user.model');
const Work = require('../models/work.model');

const Prices = require('../config/prices');
const IncomingForm = require('formidable').IncomingForm;
const fs = require('fs');
const S3Uploader = require('./aws.controller');

module.exports = {
  getUsers,
  validatePayment,
  invalidatePayment,
  deleteByEmail,
  getUserWorks,
  getWorks
}

async function getUsers() {
  return await User.find({ icAdmin: false })
    .select('fullname email createdAt document phones modalityId payment works institution isPCD deficiencyType icForeign')
    .sort({ fullname: 1 });
}

async function deleteByEmail(emailDelete) {
  return await User.findOneAndRemove({ email: emailDelete }, function (err, doc) {
    if (err) {
      console.log("erro ao deletar o usuario: " + emailDelete, err);
    } else {
      console.log("Usuário deletado com sucesso: " + emailDelete);
    }
  });
}

async function getUserWorks(workId) {
  console.log(id);
  return await Work.findOne({ _id: workId }, function (err, doc) {
    if (err) {
      console.log("erro ao buscar trabalho: " + workId, err);
    } else {
      console.log("arquivo recuperado com sucesso: " + workId);
    }
  });
}

async function validatePayment(id) {

  return await User.findOneAndUpdate({ _id: id }, { $set: { 'payment.icPaid': true } }, function (err, doc) {
    if (err) {
      console.log("erro ao atualizar o usuario: ", err);
    } else {
      console.log("update document success");
    }
  });
}

async function invalidatePayment(id) {
  return await User.findOneAndUpdate({ _id: id }, { $set: { 'payment.icPaid': false } }, function (err, doc) {
    if (err) {
      console.log("erro ao atualizar o usuario: ", err);
    } else {
      console.log("update document success");
    }
  });
}

async function getWorks(axis) {
  return await Work.find({ axisId: axis });
}
