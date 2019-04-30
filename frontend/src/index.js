import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import LightController from './LightController';
import * as serviceWorker from './serviceWorker';
import KarmaChart from './components/KarmaChart.jsx';
import Popup from './components/Popup.jsx';
import SidebarExampleMultiple from './components/SidebarExampleMultiple.jsx';
import MiddleData from './components/MiddleData.jsx';

import { Sidebar, Segment } from 'semantic-ui-react';

export default class YeeLight extends React.Component {

  constructor(props) {
    super(props);
    this.lightController = new LightController(props);
    this.state = {
      accessToken: null,
      subredditData: null,
      time: null,
      posts: null
    };

    this.getAccessToken = this.getAccessToken.bind(this);
    this.getSubredditData = this.getSubredditData.bind(this);
    this.getTime = this.getTime.bind(this);
    this.getPosts = this.getPosts.bind(this);
    this.value = 100;
  }

  getAccessToken = (accessToken) => {
    if (accessToken != null) {
      this.setState({
        accessToken: accessToken
      });
    }
  }


  getSubredditData = (data) => {
    if (data != null) {
      this.setState({
        subredditData: data
      });
    }
  }


  getTime = (data) => {
    if (data != null) {
      this.setState({
        time: data
      });
    }
  }

  getPosts(data) {
    if (data != null) {
      this.setState({
        posts: data
      });
    }
  }

  auth() {
    let authCode = new URL(window.location.href).searchParams.get('code');
    if (authCode !== null && this.state.accessToken === null) {
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
        this.setState({accessToken: data.accessToken});
      });

    }
  }

  render() {
    if (this.state.accessToken === null) {
      this.auth();
    }
    return (
      <div>
          <Sidebar.Pushable as={Segment}>
          <SidebarExampleMultiple accessToken={this.state.accessToken} getSubredditData={this.getSubredditData} getTime={this.getTime} getPosts={this.getPosts}/>
            <Sidebar.Pusher>
              <Segment basic>
                <MiddleData accessToken={this.state.accessToken} subredditData={this.state.subredditData} time={this.state.time} posts={this.state.posts}/>
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>



        {this.state.accessToken != null ? null : <Popup />}

      </div>
    );
  }
}

ReactDOM.render(<YeeLight />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
