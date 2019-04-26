import React, { Component } from 'react';

class LightController extends React.Component {

  constructor(props) {
    super(props);
    this.snoowrap = require('snoowrap');
    // This binding is necessary to make `this` work in the callback
    this.connectLight = this.connectLight.bind(this);
    this.toggleLight = this.toggleLight.bind(this);
    this.turnLight = this.turnLight.bind(this);
    this.changeBrightness = this.changeBrightness.bind(this);
    this.resetLight = this.changeBrightness.bind(this);
  }

  connectLight() {

    var url = "http://localhost:8080/yeelight/initialize";

    const params = {
      method: "GET"
    };

    fetch(url, params).then(res => {
      console.log(res);
    });

  }

  toggleLight() {

    var url = "http://localhost:8080/yeelight/toggle";

    const params = {
      method: "GET"
    };

    fetch(url, params).then(res => {
      console.log(res);
    });

  }

  turnLight(turnOn) {

    var url = "http://localhost:8080/yeelight/" + turnOn;

    const params = {
      method: "GET"
    };

    fetch(url, params).then(res => {
      console.log(res);
    });

  }

  resetLight() {
    this.changeBrightness(100);
  }

  changeBrightness(value){
    var url = "http://localhost:8080/yeelight/brightness"
    const data = {
      value: value,
    }
    const params = {
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data),
      method: "POST"
    };

    fetch(url, params).then(res => {
      console.log(res);
    });
  }

  render(){
    return(
      <div></div>
    );
  }
}

export default LightController;