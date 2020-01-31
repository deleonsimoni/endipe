const bcrypt = require('bcrypt');
//const Joi = require('joi');
const User = require('../models/user.model');
const Work = require('../models/work.model');

const Prices = require('../config/prices');
const IncomingForm = require('formidable').IncomingForm;
const fs = require('fs');
const S3Uploader = require('./aws.controller');

const paginate = require('jw-paginate');

module.exports = {
  getUsers,
  validatePayment,
  invalidatePayment,
  validateDoc,
  invalidateDoc,
  deleteByEmail,
  getUserWorks,
  getWorks,
  editUser
}

async function getUsers(req) {


  const pageSize = 5;
  const page = req.query.page || 1;
  let usersFound = [];
  console.log(req.query.search)
  let search = JSON.parse(req.query.search);
  search.icAdmin = false;

  usersFound = await User.find(search)
    .select('fullname email createdAt document phones modalityId payment works institution isPCD deficiencyType icForeign')
    .sort({ fullname: 1 })
    .skip((pageSize * page) - pageSize)
    .limit(pageSize);

  numbOfUsers = await User.count(search);

  const pager = paginate(numbOfUsers, page, pageSize);

  return { usersFound, pager }
}

async function editUser(user) {
  return await User.findOneAndUpdate({ _id: user._id }, user, { upsert: true });
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

async function validateDoc(id) {

  return await User.findOneAndUpdate({ _id: id }, { $set: { 'payment.icValid': true } }, function (err, doc) {
    if (err) {
      console.log("erro ao atualizar o usuario: ", err);
    } else {
      console.log("update document success");
    }
  });
}

async function invalidateDoc(id) {
  return await User.findOneAndUpdate({ _id: id }, { $set: { 'payment.icValid': false } }, function (err, doc) {
    if (err) {
      console.log("erro ao atualizar o usuario: ", err);
    } else {
      console.log("update document success");
    }
  });
}
