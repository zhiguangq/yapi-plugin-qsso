const request = require('request');

module.exports = function (options) {
  const { loginUrl, emailPostfix } = options;

  this.bindHook('third_login', (ctx) => {
    let token = ctx.request.query.kgLoginTicket;
    return new Promise((resolve, reject) => {
      request(loginUrl + token, function (error, response, body) {
        console.log(body)
        if (!error && response.statusCode == 200) {
          let result = JSON.parse(body);
          if (result && result.returnCode === 0 ) {
            console.log(result);
            let ret = {
              email: result.data.userName + emailPostfix,
              username: result.data.userName
            };
            resolve(ret);
          } else {
            reject(result);
          }
        }
        reject(error);
      });
    });
  })
}

