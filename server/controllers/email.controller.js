const nodemailer = require('nodemailer');
const config = require('../config/config');



module.exports = {
    sendMail
}


function sendMail(to, subject, text) {
    console.log('Enviando Email para: ' + to);

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: config.MAIL_FROM,
          pass: config.MAIL_SECRET
        }
      });
      
      var mailOptions = {
        from: config.MAIL_FROM,
        to: to,
        subject: subject,
        html: text
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log('Erro ao enviar Email: ' + error);
        } else {
          console.log('Email enviado: ' + info.response);
        }
      });
}
