const bcrypt = require('bcrypt');
//const Joi = require('joi');
const User = require('../models/user.model');
const Prices = require('../config/prices');
const IncomingForm = require('formidable').IncomingForm;
const fs = require('fs');
const S3Uploader = require('./aws.controller');

module.exports = {
  getUsers
}

async function getUsers() {
  return await User.find()
                    .select('fullname email createdAt document phones modalityId payment works')
                    .sort({ fullname: 1 });
}
