const Chat = require('../../models/virtual/chat-admin.model');
const paginate = require("jw-paginate");

module.exports = {
  getChat,
  getChatAdmin,
  insertChat,
  updateChat,
  getHeaderChat,
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
