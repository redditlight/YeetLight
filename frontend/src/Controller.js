import React, { Component } from 'react';

class Controller extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true,
      url: null, 
      accessToken: null
    };
    this.snoowrap = require('snoowrap');
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
    this.handleClick3 = this.handleClick3.bind(this);
    this.handleClick4 = this.handleClick4.bind(this);
    this.handleClick5 = this.handleClick5.bind(this);
    this.handleClick6 = this.handleClick6.bind(this);
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
    var url = "http://localhost:8080/subreddits";
    const data = {
      accessToken: this.state.accessToken
    }
    const params = {
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data),
      method: "POST"
    };

    fetch(url, params).then(res => res.json()).then(data => {
      console.log(data.subreddits);
    });

  }

  handleClick3() {
    var url = "http://localhost:8080/karma";
    const data = {
      accessToken: this.state.accessToken,
      subreddit: 'all'
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
    fetch(url, params).then(res => res.json()).then(data => {
      console.log(data);
    });
  }


  handleClick4() {

    var url = "http://localhost:8080/yeelight/initialize";

    const params = {
      method: "GET"
    };

    fetch(url, params).then(res => {
      console.log(res);
    });

  }

  handleClick5() {

    var url = "http://localhost:8080/yeelight/toggle";

    const params = {
      method: "GET"
    };

    fetch(url, params).then(res => {
      console.log(res);
    });

  }

  handleClick6() {
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

  componentDidMount() {
    var authCode = new URL(window.location.href).searchParams.get('code');
    if (authCode != null) {
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
      var url = "http://localhost:8080/auth";
      fetch(url, params).then(res => res.json()).then(data => {
        this.setState({
          accessToken: data.accessToken
        });
      });
    }
  }

  render(){
    return(
      <div>
        <button onClick={this.handleClick}> Reddit Sign In</button>
        <button onClick={this.handleClick2}> Get Subreddit List</button>
        <button onClick={this.handleClick3}> Get karma</button>
        <button onClick={this.handleClick4}> Connect to Light</button>
        <button onClick={this.handleClick5}> Toggle Light</button>
        <button onClick={this.handleClick6}> Test </button>
      </div>
    );
  }
}

export default Controller;