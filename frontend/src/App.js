import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Yeelight from './yeelight.js';
import Header from './components/layout/Header';
import SideMenu from './components/SideMenu';

//DEPRECATED

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
    this.handleClick4 = this.handleClick4.bind(this);
    this.handleClick5 = this.handleClick5.bind(this);
  }

  handleClick() {
    var authenticationUrl = this.snoowrap.getAuthUrl({
      clientId: 'LhIe-MiAlC4e2Q',
      // scope: ['identity', 'read', 'privatemessages', 'history', 'submit'],
      scope: ['identity', 'edit', 'flair', 'history', 'mysubreddits', 'privatemessages', 'read', 'report', 'save', 'submit', 'subscribe', 'vote', 'wikiedit', 'wikiread'],
      redirectUri: 'http://localhost:3000',
      permanent: false,
      // state: 'fe211bebc52eb3da9bef8db6e63104d3' // a random string, this could be validated when the user is redirected back
    });
    this.setState({
      url: authenticationUrl
    });
    // window.open(authenticationUrl, '_self');
    window.location = authenticationUrl;

  }

  handleClick2() {
    // const proxyurl = "https://cors-anywhere.herokuapp.com/";
    var url = "http://localhost:8080/auth";
    const data = {
      code: new URL(window.location.href).searchParams.get('code')
    }
    const params = {
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data),
      method: "POST"
    };

    fetch(url, params).then(res => res.json()).then(data => {
      // console.log(data);
    })

  }

  handleClick3() {

    var url = "http://localhost:8080/test";
    const data = {
      code: new URL(window.location.href).searchParams.get('code'),
      test: "test"
    }

    const params = {
      method: "POST",
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
      method: "POST"
    };
    fetch(url, params).then(res => {
      console.log(res)
    });
  }

  handleClick4() {

    var url = "http://localhost:8080/yeelight/initialize";
    const data = {
      code: new URL(window.location.href).searchParams.get('code')
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


  handleClick5() {

    var url = "http://localhost:8080/yeelight/toggle";
    const data = {
      code: new URL(window.location.href).searchParams.get('code')
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

  render() {

    console.log(this.props.code);
    return (
      <div>
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
        <button onClick={this.handleClick}> Reddit Sign In</button>
        <button onClick={this.handleClick2}> Authentication/deprecated</button>
        <button onClick={this.handleClick3}> Get karma</button>
        <button onClick={this.handleClick4}> Connect to Light</button>
        <button onClick={this.handleClick5}> Toggle Light</button>
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
