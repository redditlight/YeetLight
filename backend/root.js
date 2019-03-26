// import Device from './Device';
var http = require('http');
var express = require("express");
var parser = require("body-parser");
var app = express();
var cors = require('cors')
app.use(cors());
var snoowrap = require('snoowrap');

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('Hello World!');
}).listen(65010);

const dgram = require('dgram');
const queryString = require('querystring');
const url = require('url');

var net = require('net');
var s = dgram.createSocket('udp4');
var message = Buffer.from('M-SEARCH * HTTP/1.1\r\nHOST:239.255.255.250:1982\r\nMAN:"ssdp:discover"\r\nST:wifi_bulb\r\n');

s.on('message', function (msg, rinfo) {
  console.log(rinfo.address + ':' + rinfo.port + ' - ' + message);
  const response = queryString.parse(msg.toString('utf8'), '\r\n', ':');
  turnLight(response, "on");
})

s.on('error', function (err) {
  console.log(err.stack);
  s.close();
})

s.on('listening', function () {
  var address = s.address();
  console.log('UDP Server listening on ' + address.address + ":" + address.port);
})

s.bind(1982, () => onBind());

function toggleLight(response) {
  const call = JSON.stringify({ "id": response.id, "method": "toggle", "params": [] });
  const tcpS = new net.Socket();
  const urlData = url.parse(response.Location);
  tcpS.connect(urlData.port, urlData.hostname, () => tcpS.write(`${call}\r\n`));
}

function turnLight(response, turnOn) {
  const call = JSON.stringify({ "id": response.id, "method": "set_power", "params": [turnOn, "smooth", 500] });
  const tcpS = new net.Socket();
  const urlData = url.parse(response.Location);
  tcpS.connect(urlData.port, urlData.hostname, () => tcpS.write(`${call}\r\n`));
}

function onBind() {
  s.send(message, 0, message.length, 1982, '239.255.255.250', success());
}

function success() {
  console.log('SUCCESS');
}

// var s2 = dgram.createSocket('udp4');
//
// s2.on('message', function(msg, rinfo){
//   console.log(rinfo.address + ':' + rinfo.port +' - ' + message);
//   console.log(rinfo.ID);
//   // console.log(message.id);
//   // console.log(msg.id);
// })
//
// s2.on('error', function(err){
//   console.log(err.stack);
//   s2.close();
// })
//
// s2.on('listening', function(){
//   var address = s2.address();
//   console.log('UDP Server listening on ' + address.address + ":" + address.port);
// })
//
// s2.bind(1982, () => s2.addMembership('239.255.255.250'));

// var promise = new Promise(function(resolve, reject) {
//
//   toggleLight();
//   if(true){
//     resolve('It worked!');
//   } else {
//     reject(Error('Error!'));
//   }
//
// });
//
// setTimeout(usePromise, 5000);
//
// function usePromise(){
//   promise.then(function(res){
//     console.log('SUCCESS');
//   }, function(err) {
//     console.log('ERROR');
//   });
// }

// This package works
// const YeelightSearch = require('yeelight-wifi');
//
// const yeelightSearch = new YeelightSearch();
// yeelightSearch.on('found', (lightBulb) => {
//   lightBulb.toggle()
//     .then(() => {
//       console.log('toggled');
//     })
//     .catch((err) => {
//       console.log(`received some error: ${err}`);
//     });
// });

// app.use(myParser.urlencoded({extended : true}));
app.use(parser.json());
app.post("/auth", function (req, res) {
  console.log(req.body.code);

  var data = {
    grant_type: 'authorization_code',
    code: req.body.code,
    redirect_uri: 'http://localhost:3000'
  }

  var querystring = require('querystring')
  console.log(querystring.stringify(data));
  

  var options = {
    method: 'post',
    body: querystring.stringify(data), // Javascript object
    // json: true, // Use,If you are sending JSON data
    url: 'https://www.reddit.com/api/v1/access_token',
    headers: {
      Authorization: 'Basic TGhJZS1NaUFsQzRlMlE6T1N1dGtEUGkzYUlZaWoyMW1ZTUZuMktldHJJ',
      'content-type': 'application/x-www-form-urlencoded'
    }
  }
  const request = require('request');
  request(options, function (err, res, body) {
    if (err) {
      console.log('Error :', err)
      return
    }
    console.log(' Body :', body)
  });
  // .auth('LhIe-MiAlC4e2Q', 'OSutkDPi3aIYij21mYMFn2KetrI')
  return "hello";
});

app.post("/test", function (request, response) {
  console.log(request.body);
  console.log("wtf");
  return "hello";
});

app.listen(8080);



// var snoowrap = require('snoowrap');

// // const r = new snoowrap({
// //     userAgent: 'YeetLight',
// //     clientId: 'LhIe-MiAlC4e2Q',
// //     clientSecret: 'OSutkDPi3aIYij21mYMFn2KetrI',
// //     refreshToken: '38789487-hUBkRQno0H0Smi83U446t_sZR8g',
// //   });

//   var authenticationUrl = snoowrap.getAuthUrl({
//     clientId: 'LhIe-MiAlC4e2Q',
//     scope: ['identity', 'read', 'privatemessages', 'history', 'submit'],
//     redirectUri: 'http://localhost:3000',
//     permanent: false,
//     // state: 'fe211bebc52eb3da9bef8db6e63104d3' // a random string, this could be validated when the user is redirected back
//   });
//   var code = new URL(window.location.href).searchParams.get('code');

  snoowrap.fromAuthCode({
    code: 'TDUaemJhN5LKC-0n5GVfSTnt3Rc',
    userAgent: 'Reddit Light',
    clientId: 'LhIe-MiAlC4e2Q',
    clientSecret: 'OSutkDPi3aIYij21mYMFn2KetrI',
    redirectUri: 'http://localhost:3000'
  }).then(r => {
    // Now we have a requester that can access reddit through the user's account
    r.getKarma().then(console.log);
  })
//   http://localhost:65010/authorize_callback
//  ex = r.getUser('kixxe').getSubmissions.then( response => {
//    console.log(response);

//  });
// r.getMe().then(console.log);
// console.log(authenticationUrl);
// r.config({debug: true});
//  console.log(ex);
