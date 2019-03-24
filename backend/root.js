// import Device from './Device';
const Device = require('./Device.js');

const http = require('http');
const dgram = require('dgram');
const queryString = require('querystring');
const url = require('url');

const net = require('net');

const myDevice = new Device('', '', '', '');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Hello World!');
}).listen(8080);

function initialize() {

  var s = dgram.createSocket('udp4');
  var message = Buffer.from('M-SEARCH * HTTP/1.1\r\nHOST:239.255.255.250:1982\r\nMAN:"ssdp:discover"\r\nST:wifi_bulb\r\n');

  s.on('message', function(msg, rinfo){
    console.log(rinfo.address + ':' + rinfo.port +' - ' + message);
    const response = queryString.parse(msg.toString('utf8'), '\r\n', ':');

    myDevice.id = response.id;
    myDevice.address = rinfo.address;
    myDevice.port = rinfo.port;
    myDevice.location = response.Location;
  })

  s.on('error', function(err){
    console.log(err.stack);
    s.close();
  })

  s.on('listening', function(){
    var address = s.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
  })

  s.bind(1982, ()=>onBind());

  function onBind(){
    s.send(message, 0, message.length, 1982, '239.255.255.250', success());
  }

  function success(){
    console.log('SUCCESS');
  }
}

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

