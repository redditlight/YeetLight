import React, { Component } from 'react';
import LightController from './LightController';

class RedditController extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      url: null,
      accessToken: null
    };
    this.snoowrap = require('snoowrap');

    this.lightController = new LightController(props);

    // This binding is necessary to make `this` work in the callback
    this.authenticateToReddit = this.authenticateToReddit.bind(this);
    this.subreddits = this.subreddits.bind(this);
    this.karma = this.karma.bind(this);
    this.test = this.test.bind(this);
  }

  authenticateToReddit() {
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

  subreddits() {
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

  karma() {
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
      const value = data.total + 50;
      if(value > 100) value = 100;
      if(value < 1) value = 1;
      this.lightController.changeBrightness(value);
    });
  }

  test() {
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
        this.props.getAccessToken(data.accessToken);
      });
    }
  }

  render(){
    return(
      <div>
        <button onClick={this.authenticateToReddit}> Reddit Sign In</button>
        {/* <button onClick={this.subreddits}> Get Subreddit List</button>
        <button onClick={this.karma}> Brightness Based off Karma</button> */}
        <button onClick={this.test}> Test </button>
      </div>
    );
  }
}

export default RedditController;