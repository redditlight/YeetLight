import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Yeelight from './yeelight.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true,
      url: null
    };
    this.code = new URL(window.location.href).searchParams.get('code');
    this.snoowrap = require('snoowrap');
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
    this.handleClick3 = this.handleClick3.bind(this);
  }

  handleClick() {
    // this.setState(prevState => ({
    //   isToggleOn: !prevState.isToggleOn
    // }));

    // // const YeelightSearch = require('yeelight-wifi');
    // //
    // // const yeelightSearch = new YeelightSearch();
    // // yeelightSearch.on('found', (lightBulb) => {
    // //   lightBulb.toggle()
    // //     .then(() => {
    // //       console.log('toggled');
    // //     })
    // //     .catch((err) => {
    // //       console.log(`received some error: ${err}`);
    // //     });
    // // });

    // // const dgram = require('dgram');
    // // dgram.createSocket('udp4');

    // const yeelight = new Yeelight();

    // if(this.state.isToggleOn) {
    //   yeelight.toggleYeelight(true);
    // } else {
    //   yeelight.toggleYeelight(false);
    // }
    var authenticationUrl = this.snoowrap.getAuthUrl({
      clientId: 'LhIe-MiAlC4e2Q',
      scope: ['identity', 'read', 'privatemessages', 'history', 'submit'],
      redirectUri: 'http://localhost:3000',
      permanent: false,
      // state: 'fe211bebc52eb3da9bef8db6e63104d3' // a random string, this could be validated when the user is redirected back
    });
    this.setState({
      url: authenticationUrl
    });
    window.open(authenticationUrl, '_self');


    // console.log(authenticationUrl);
    // window.open(authenticationUrl);



    // this.snoowrap.fromAuthCode({
    //   code: code,
    //   userAgent: 'Reddit Light',
    //   clientId: 'LhIe-MiAlC4e2Q',
    //   redirectUri: 'http://localhost:3000'
    // }).then(r => {
    //   // Now we have a requester that can access reddit through the user's account
    //   r.getKarma().then(console.log);
    // });
  }

  handleClick2() {
    // const proxyurl = "https://cors-anywhere.herokuapp.com/";
    var url = "http://localhost:8080/auth";
    const data = {
      // code: new URL(window.location.href).searchParams.get('code'),
      test: 'test'
    }
    const params = {
      headers: {
        "content-type": "application/json"
      },
      body: data,
      method: "POST"
    };

    fetch(url, params).then(res => { console.log(res)});
    console.log("test");
    console.log(new URL(window.location.href).searchParams.get('code').toString());
    

  }

  handleClick3() {
    // const proxyurl = "https://cors-anywhere.herokuapp.com/";
    var url = "http://localhost:8080/test";
    const data = {
      // code: new URL(window.location.href).searchParams.get('code'),
      test: "test"
    }
    const params = {
      method: "POST",
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)

    };

    fetch(url, params).then(res => { console.log(res)});
    

  }

  render() {
    // var code = new URL(window.location.href).searchParams.get('code');

    console.log(this.props.code);
    return (
      <div>      
        <button onClick={this.handleClick}> Auth </button>
        <button onClick={this.handleClick2}> test Request </button>
        <button onClick={this.handleClick3}> test </button>
      </div>


    );
  }
}

export default App;
