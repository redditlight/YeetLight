var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Hello World!');
}).listen(8080);

const dgram = require('dgram')
var s = dgram.createSocket('udp4');
var message = Buffer.from('M-SEARCH * HTTP/1.1\r\nHOST:239.255.255.250:1982\r\nMAN:"ssdp:discover"\r\nST:wifi_bulb\r\n');

s.on('message', function(msg, rinfo){
  console.log(rinfo.address + ':' + rinfo.port +' - ' + message);
  // console.log(message.id);
  // console.log(msg.id);
})

s.on('error', function(err){
  console.log(err.stack);
  s.close();
})

s.on('listening', function(){
  var address = s.address();
  console.log('UDP Server listening on ' + address.address + ":" + address.port);
})

s.bind(43210, '0.0.0.0', ()=>onBind());

function toggleLight(){
  const call = JSON.stringify({"id":'192.168.10.15',"method":"toggle","params":[]});
  s.send(call, 0, call.length, 1982, '239.255.255.250');
}

function onBind(){
  s.send(message, 0, message.length, 1982, '239.255.255.250');
}

var promise = new Promise(function(resolve, reject) {

  toggleLight();
  if(true){
    resolve('It worked!');
  } else {
    reject(Error('Error!'));
  }

});

setTimeout(usePromise, 5000);

function usePromise(){
  promise.then(function(res){
    console.log('SUCCESS');
  }, function(err) {
    console.log('ERROR');
  });
}

// s.bind(1234, function() {
//   s.addMembership('224.0.0.114');
// });

