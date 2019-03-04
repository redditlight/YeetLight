import React, { Component } from 'react';
// import dgram from 'dgram';

export default class Yeelight {

  constructor(){

    // CreateSocket not a function????
    // Is it possible browser doesn't allow udp? Then that means this is impossible
    // console.log(dgram);
    const dgram = require('dgram');

    this.socket = dgram.createSocket('udp4');
    this.message = new Buffer('M-SEARCH * HTTP/1.1\r\nHOST:239.255.255.250:1982\r\nMAN:"ssdp:discover"\r\nST:wifi_bulb\r\n');
    // this.discover();
  }

  // discover(){
  //   this.socket.on('message', (msg, rinfo) => this.emit('message', msg, rinfo));
  //
  //   this.socket.on('error', () => this.emit('error'));
  //
  //   this.socket.on('listening', () => this.emit('listening'));
  //
  //   this.socket.bind(43210, '0.0.0.0', () => this.onBind());
  // }
  //
  // onBind() {
  //   this.socket.send(this.message, 0, this.message.length, 1982, '239.255.255.250');
  // }

  toggleYeelight(isOn) {
    console.log(isOn);

  }
}

