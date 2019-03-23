import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Yeelight from './yeelight.js';
import Header from './components/layout/Header';
import SideMenu from './components/SideMenu';

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
        <div>
        <button onClick={this.handleClick}>
          {this.state.isToggleOn ? 'ON' : 'OFF'}
                </button>
          <h1>
          <Header/>
            <ul style={menuStyle}>
            <p>
              User Connected/Not Connected.
            </p>
            <p>
              Current post tracking:
              <p>
              <input
                  type="text"
                  value={this.state.value}
                  onChange={this.handleChange}
              />
              </p>
            </p>
            </ul>
            <SideMenu/>
          </h1>
        </div>
    );
  }
}

const menuStyle = {
  textAlign: 'left',
  padding: '0px',
  fontSize: '15px'
}
export default App;
