const AWS = require('aws-sdk');

module.exports = {
    S3Uploader
}

function S3Uploader(request) {
    /*var jwtToken = request ? request.headers.cognitoauthorization : null;
    let credentials = {
      IdentityPoolId: "<IDENTITY POOL ID>",
      Logins: {}
    };
    credentials.Logins['cognito-idp.<COGNITO REGION>.amazonaws.com/<USER POOL ID>'] = jwtToken;
  
    AWS.config.update({
      credentials: new AWS.CognitoIdentityCredentials(credentials, {
        region: "<COGNITO REGION>"
      }),
      region: "<S3 BUCKET REGION>"
    });
    */
    let s3 = new AWS.S3();
    function uploadFile(key, file) {
      var s3Config = {
        Bucket: "<BUCKET NAME>",
        Key: key,
        Body: file
      };
      return new Promise((resolve, reject) => {
        s3.putObject(s3Config, (err, resp) => {
          if (err) {
            console.log(err);
            reject({success: false, data: err});
          }
          resolve({sucess: true, data: resp});
        })
      });
    }
  }