const bcrypt = require('bcrypt');
//const Joi = require('joi');
const User = require('../models/user.model');
const Prices = require('../config/prices');
const IncomingForm = require('formidable').IncomingForm;
const fs = require('fs');
const S3Uploader = require('./aws.controller');

module.exports = {
  getUsers,
  validatePayment,
  invalidatePayment
}

async function getUsers() {
  return await User.find({ icAdmin: false })
    .select('fullname email createdAt document phones modalityId payment works')
    .sort({ fullname: 1 });
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
