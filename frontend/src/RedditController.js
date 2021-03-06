import React from 'react';
import LightController from './LightController';
import { Button, Header } from 'semantic-ui-react';

class RedditController extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      url: null,
      accessToken: null,
      unread: 0
    };
    this.snoowrap = require('snoowrap');

    this.lightController = new LightController(props);

    // This binding is necessary to make `this` work in the callback
    this.authenticateToReddit = this.authenticateToReddit.bind(this);
    this.subreddits = this.subreddits.bind(this);
    this.karma = this.karma.bind(this);
    this.test = this.test.bind(this);
    this.checkInbox = this.checkInbox.bind(this);
    this.checkInboxHelper = this.checkInboxHelper.bind(this);
  }

  authenticateToReddit() {
    var authenticationUrl = this.snoowrap.getAuthUrl({
      clientId: 'LhIe-MiAlC4e2Q',
      scope: ['identity', 'edit', 'flair', 'history', 'mysubreddits', 'privatemessages', 'read', 'report', 'save', 'submit', 'subscribe', 'vote', 'wikiedit', 'wikiread'],
      redirectUri: 'http://localhost:3000',
      permanent: false,

    });
    this.setState({
      url: authenticationUrl
    });
    window.location = authenticationUrl;
  }

  subreddits() {
    var url = "http://localhost:8080/subreddits";
    const data = {
      accessToken: this.props.accessToken
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
      accessToken: this.props.accessToken,
      subreddit: 'all'
    }

    const params = {
      method: "POST",
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    };
    fetch(url, params).then(res => res.json()).then(data => {
      console.log(data);
      let value = data.total + 50;
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


  checkInbox() {
    console.log("Inbox checking ON");
    this.checkInboxHelper();
    setInterval(this.checkInboxHelper, 15000);
  }

  checkInboxHelper() {
    var url = "http://localhost:8080/inbox";
    const data = {
      accessToken: this.props.accessToken
    }
    const params = {
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data),
      method: "POST"
    };

    fetch(url, params).then(res => res.json()).then(data => {
      console.log(data.unread);

      if(data.unread.length !== this.state.unread) {
        
        this.setState({
          unread: data.unread.length
        });

        if(this.state.unread !== 0) {
          this.lightController.turnLight("off");
        } else {
          this.lightController.turnLight("on");
        }
      } else {
        console.log("No Change.");
      }
    });
  }


  render(){
    return(
      <div>

        {/* <button onClick={this.subreddits}> Get Subreddit List</button>
        <button onClick={this.karma}> Brightness Based off Karma</button> */}
        {/*<button onClick={this.checkInbox}> Turn on inbox checking </button>*/}
        <div className = "ui center aligned container">
          <Header as='h2'>
            <i className = "mail outline icon" size="big"></i>{this.state.unread}
          </Header>
        </div>
        <div className = "item">
          <Button color = 'black' animated fluid onClick = {this.checkInbox} type = "submit">
            <Button.Content visible>Enable inbox checking</Button.Content>
            <Button.Content hidden><i className = "inbox icon"></i></Button.Content>
          </Button>
        </div>
      </div>
    );
  }
}
export default RedditController;
