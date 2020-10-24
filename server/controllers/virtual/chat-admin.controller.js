const Chat = require('../../models/virtual/chat-admin.model');
const Mural = require('../../models/virtual/mural.model');
const ChatWork = require('../../models/virtual/chatWork.model');

const paginate = require("jw-paginate");

module.exports = {
  getChat,
  getChatAdmin,
  insertChat,
  updateChat,
  getHeaderChat,
  getChatMural,
  insertChatMural,
  updateChatMural,
  getChatWork,
  insertChatWork,
  updateChatWork,
}

async function getChatAdmin(idChat) {
  return await Chat.findById(idChat);
}

async function getHeaderChat(req) {
  const pageSize = 10;
  const page = req.query.page || 1;

  let chat = await Chat
    .find()
    .select('author icReply')
    .sort({
      createdAt: -1,
      icReply: false
    })
    .skip(pageSize * page - pageSize)
    .limit(pageSize);

  const total = await Chat.count();

  const pager = paginate(total, page, pageSize);

  return {
    chat,
    pager,
  };
}

async function getChat(idChat) {
  return await Chat.findOne({ 'author.user': idChat })
}

async function insertChat(mensagem, user) {
  let chat = {};
  chat.author = {
    user: user._id,
    name: user.fullname,
    email: user.email
  };

  chat.chat = [{
    content: mensagem,
    publisher: {
      user: user._id,
      name: user.fullname, 
      email: user.email,
      icAdmin: user.icAdmin
    }
  }];

  return await new Chat(chat).save();
}

async function updateChat(idChat, mensagem, user) {

  const chat = {
    content: mensagem,
    publisher: {
      user: user._id,
      name: user.fullname,
      email: user.email,
      icAdmin: user.icAdmin
    }
  };

  return await Chat.findOneAndUpdate({
    _id: idChat
    }, {
      icReply: user.icAdmin,
      $addToSet: {
        chat: chat
      }
    }, {
      new: true
    },
    function (err, doc) {
      if (err) return res.send(500, {
        error: err
      });
      return doc;
    });

}


//MURAL
async function getChatMural(idChat) {
  const dateNow = new Date();
  const date = dateNow.getDate().toString() + '/' + (dateNow.getMonth() + 1);
  return await Mural.findOne({ 'date': date })
}

async function insertChatMural(mensagem, user) {
  let chat = {};
  chat.author = {
    user: user._id,
    name: user.fullname,
    email: user.email
  };

  chat.chat = [{
    content: mensagem,
    publisher: {
      user: user._id,
      name: user.fullname, 
      email: user.email,
      icAdmin: user.icAdmin
    }
  }];

  return await new Chat(chat).save();
}

async function updateChatMural(idChat, mensagem, user) {

  const chat = {
    content: mensagem,
    publisher: {
      user: user._id,
      name: user.fullname,
      email: user.email,
      icAdmin: user.icAdmin
    }
  };

  return await Mural.findOneAndUpdate({
    _id: idChat
    }, {
      icReply: user.icAdmin,
      $addToSet: {
        chat: chat
      }
    }, {
      new: true
    },
    function (err, doc) {
      if (err) return res.send(500, {
        error: err
      });
      return doc;
    });

}


//WORK
async function getChatWork(idChat) {
  return await ChatWork.findOne({ 'idWork': idChat })
}

async function insertChatWork(idWork, mensagem, user) {

  let chatExist = await ChatWork.findOne({ 'idWork': idWork }).select("_id");

  if(chatExist){

    return updateChatWork(chatExist._id, mensagem, user);

  } else {
    let chat = {};

    chat.idWork = idWork;
   
    chat.chat = [{
      content: mensagem,
      publisher: {
        user: user._id,
        name: user.fullname, 
        email: user.email,
        icAdmin: user.icAdmin
      }
    }];
  
    return await new ChatWork(chat).save();
  }


}

async function updateChatWork(idChat, mensagem, user) {

  const chat = {
    content: mensagem,
    publisher: {
      user: user._id,
      name: user.fullname,
      email: user.email,
      icAdmin: user.icAdmin
    }
  };

  return await ChatWork.findOneAndUpdate({
    _id: idChat
    }, {
      icReply: user.icAdmin,
      $addToSet: {
        chat: chat
      }
    }, {
      new: true
    },
    function (err, doc) {
      if (err) return res.send(500, {
        error: err
      });
      return doc;
    });

}

