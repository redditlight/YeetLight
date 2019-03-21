// import Device from './Device';

var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Hello World!');
}).listen(8080);

const dgram = require('dgram');
const queryString = require('querystring');
const url = require('url');

var net = require('net');
var s = dgram.createSocket('udp4');
var message = Buffer.from('M-SEARCH * HTTP/1.1\r\nHOST:239.255.255.250:1982\r\nMAN:"ssdp:discover"\r\nST:wifi_bulb\r\n');

s.on('message', function(msg, rinfo){
  console.log(rinfo.address + ':' + rinfo.port +' - ' + message);
  const response = queryString.parse(msg.toString('utf8'), '\r\n', ':');
  turnLight(response, "on");
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

function toggleLight(response){
  const call = JSON.stringify({"id":response.id,"method":"toggle","params":[]});
  const tcpS = new net.Socket();
  const urlData = url.parse(response.Location);
  tcpS.connect(urlData.port, urlData.hostname, () => tcpS.write(`${call}\r\n`));
}

function turnLight(response, turnOn){
  const call = JSON.stringify({"id":response.id,"method":"set_power","params":[turnOn, "smooth", 500]});
  const tcpS = new net.Socket();
  const urlData = url.parse(response.Location);
  tcpS.connect(urlData.port, urlData.hostname, () => tcpS.write(`${call}\r\n`));
}

function onBind(){
  s.send(message, 0, message.length, 1982, '239.255.255.250', success());
}

function success(){
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

