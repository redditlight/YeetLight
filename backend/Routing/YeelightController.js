const Device = require('../Device.js');
const express = require("express");
const cors = require('cors')
const dgram = require('dgram');
const queryString = require('querystring');
const url = require('url');
const net = require('net');

const app = express();

app.use(cors());
const myDevice = new Device('', '', '', '');

module.exports = {
  initializeYeelight: function(req, res) {
    initialize();
    res.status(200).send({ message: 'ok' });
  },
  toggleYeelight: function(req, res) {
    myDevice.toggleLight();
    res.status(200).send({ message: 'ok' });
  },
  changeBrightness: function(req, res) {
    // console.log(req.body.value);
    myDevice.changeBrightness(req.body.value);
    res.status(200).send({ message: 'ok' });
  }
}

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

    // myDevice.turnLight("off");
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
