const net = require('net');
const url = require('url');

class Device {

  constructor(deviceId, deviceAddress, devicePort, deviceLocation) {
    this.id = deviceId;
    this.address = deviceAddress;
    this.port = devicePort;
    this.socket = new net.Socket();
    this.location = deviceLocation;
  }

  toggleLight(){
    const call = JSON.stringify({"id":this.id,"method":"toggle","params":[]});
    const tcpS = new net.Socket();
    const urlData = url.parse(this.location);
    tcpS.connect(urlData.port, urlData.hostname, () => tcpS.write(`${call}\r\n`));
  }

  turnLight(turnOn){
    const call = JSON.stringify({"id":this.id,"method":"set_power","params":[turnOn, "smooth", 500]});
    const tcpS = new net.Socket();
    const urlData = url.parse(this.location);
    tcpS.connect(urlData.port, urlData.hostname, () => tcpS.write(`${call}\r\n`));
  }

  changeBrightness(value){
    const call = JSON.stringify({"id":this.id,"method":"set_bright","params":[value, "smooth", 500]});
    const tcpS = new net.Socket();
    const urlData = url.parse(this.location);
    tcpS.connect(urlData.port, urlData.hostname, () => tcpS.write(`${call}\r\n`));
  }

  printInformation(){
    console.log('Printing Device data');
    console.log(' Id: ' + this.id);
    console.log(' Addr: ' + this.address);
    console.log(' Port: ' + this.port);
    console.log(' Socket: ' + this.socket);
    console.log(' Location: ' + this.location);
  }
}

module.exports = Device;