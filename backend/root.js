const Device = require('./Device.js');
const YeelightController = require('./Routing/YeelightController');
const routes = require('./Routing/routes');

var http = require('http');
var parser = require("body-parser");
var express = require("express");
var app = express();

var cors = require('cors');
app.use(cors());

// Create server
http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('Hello World!');
}).listen(65010);

app.use(parser.json());

// Connect to router
app.use(routes);
app.use('/yeelight', routes);

app.listen(8080);


//////////////////////////////
// Saved code jsut in case
/////////////////////////////

// This package works (backup option, but shouldn't need
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
