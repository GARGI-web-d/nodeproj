
var moment = require('moment');
var CryptoJS = require("crypto-js");
const fetch = require('node-fetch');
var date = process.env.date;
var month = process.env.month;
const url = "https://history.muffinlabs.com/";

exports.test = (req, res) => {
  var event = req.body;
  event = JSON.stringify(event);
  body = body.replace(/event/ig, event);
  var events = CryptoJS.enc.Hex.stringify(CryptoJS.SHA1(date + month + body));

  function request1() {
    return new Promise((resolve, reject) => {

      var options = fetch(url+'/'+date+'/'+month, {
          method: 'post',
          body: body,
          headers: { 'Content-Type': 'application/json' },
      });

      options.then(res => {
          var result = res.json;
          console.log(result);
          resolve(result);
        })
        .catch(() => {
          console.log('Promise rejected');
          let rejectMessage = 'Sorry, an error occurred.';
          reject(rejectMessage); 
        });
    });
  }

  request1();
};
