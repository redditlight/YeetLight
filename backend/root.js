// import Device from './Device';
const Device = require('./Device.js');

const dgram = require('dgram');
const queryString = require('querystring');
const url = require('url');
const net = require('net');

var http = require('http');
var express = require("express");
var parser = require("body-parser");
var app = express();
var cors = require('cors')
app.use(cors());
var snoowrap = require('snoowrap');

const myDevice = new Device('', '', '', '');

// Create server
http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('Hello World!');
}).listen(65010);

// Reddit API connection
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

app.post("/test", function (req, res) {
  snoowrap.fromAuthCode({
    code: req.body.code,
    userAgent: 'Reddit Light',
    clientId: 'LhIe-MiAlC4e2Q',
    clientSecret: 'OSutkDPi3aIYij21mYMFn2KetrI',
    redirectUri: 'http://localhost:3000'
  }).then(r => {
    // Now we have a requester that can access reddit through the user's account
    r.getKarma().then(console.log);
    res = r.getKarma();
  });
  return res;
});

app.listen(8080);


// Yeelight functions
function initialize() {

  var s = dgram.createSocket('udp4');
  var message = Buffer.from('M-SEARCH * HTTP/1.1\r\nHOST:239.255.255.250:1982\r\nMAN:"ssdp:discover"\r\nST:wifi_bulb\r\n');

  s.on('message', function (msg, rinfo) {
    console.log(rinfo.address + ':' + rinfo.port + ' - ' + message);
    const response = queryString.parse(msg.toString('utf8'), '\r\n', ':');

    myDevice.id = response.id;
    myDevice.address = rinfo.address;
    myDevice.port = rinfo.port;
    myDevice.location = response.Location;

    // myDevice.turnLight("on");
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

  function onBind() {
    s.send(message, 0, message.length, 1982, '239.255.255.250', success());
  }

  function success() {
    console.log('SUCCESS');
  }
}

// initialize().then(myDevice.printInformation());

// var promise = new Promise(function(resolve, reject){
//   resolve(myDevice.printInformation());
// });

// var promise = new Promise(function(resolve, reject) {
//
//   initialize();
//   if(true){
//     resolve('It worked!');
//   } else {
//     reject(Error('Error!'));
//   }
//
// });
//
//   promise.then(function(res){
//     console.log('SUCCESS');
//     // myDevice.turnLight("off");
//     myDevice.printInformation();
//   }, function(err) {
//     console.log('ERROR');
//   });

// initialize().then(myDevice.printInformation());


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


//   http://localhost:65010/authorize_callback
//  ex = r.getUser('kixxe').getSubmissions.then( response => {
//    console.log(response);

//  });
// r.getMe().then(console.log);
// console.log(authenticationUrl);
// r.config({debug: true});
//  console.log(ex);
