const AWS = require('aws-sdk');
const config = require('../config/config');

module.exports = {
    uploadFile
}

function uploadFile(key, file) {
  
  const s3 = new AWS.S3({
    accessKeyId: config.AWS_ACCESS_KEY,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY
  });

  var s3Config = {
    Bucket: 'endiperio2020',
    Key: key,
    Body: file
  };

  return new Promise((resolve, reject) => {
    s3.putObject(s3Config, (err, resp) => {
      if (err) {
        console.log('Erro AWS', err);
        reject({success: false, data: err});
      }
      resolve({sucess: true, data: resp});
    })
  });
}