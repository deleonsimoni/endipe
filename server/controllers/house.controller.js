const bcrypt = require('bcrypt');
const Joi = require('joi');
const House = require('../models/house.model');
const Device = require('../models/device.model');
const Room = require('../models/room.model');

module.exports = {
  insertRoom,
  insertDevice,
  insertHouse,
  getHouse,
  getDevice,
  getRoom
}

async function insertRoom(room) {
  return await new Room(room).save();
}

async function insertDevice(devices) {

  Device.collection.insert(devices, function (err, docs) {
    if (err){ 
        return console.error(err);
    } else {
      console.log("Multiple documents inserted to devices");
    }
  });

  //return await new Device(device).save();
}

async function insertHouse(house) {
  return await new House(house).save();
}

async function getRoom(id) {
  Room.findById(id, function(err, room) {  
    if (err) {  
      console.error('Erro de busca do cômodo ' + err);  
    }
    return room;  
  })  
}

async function getDevice(id) {
  Device.findById(id, function(err, device) {  
    if (err) {  
      console.error('Erro de busca do device ' + err);  
    }
    return device;  
  })  
}

async function getHouse(id) {
  House.findById(id, function(err, house) {  
    if (err) {  
      console.error('Erro de busca da house ' + err);  
    }
    return house;  
  })  
}