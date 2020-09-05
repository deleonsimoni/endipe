const Chat = require('../../models/virtual/chat-admin.model');

module.exports = {
  getChat,
  insertChat,
  updateChat,
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
