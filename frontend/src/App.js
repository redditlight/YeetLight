import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Yeelight from './yeelight.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));

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

    // const dgram = require('dgram');
    // dgram.createSocket('udp4');

    const yeelight = new Yeelight();

    if(this.state.isToggleOn) {
      yeelight.toggleYeelight(true);
    } else {
      yeelight.toggleYeelight(false);
    }
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

export default App;
