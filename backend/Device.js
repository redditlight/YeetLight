
export default class Device {
  id: string;
  address: string;
  port: string;
  socket: net.Socket;

  constructor(deviceId, deviceAddress, devicePort) {
    this.id = deviceId;
    this.address = deviceAddress;
    this.port = devicePort;
  }
}