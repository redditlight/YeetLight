import React from 'react';
import LightController from '../LightController';
import {Button } from 'semantic-ui-react'


class RedditScroller extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      options: null,
      time: 0,
      interval: null
    };
    this.lightController = new LightController(props);
    // This binding is necessary to make `this` work in the callback
    this.subreddits = this.subreddits.bind(this);
    this.setOptions = this.setOptions.bind(this);
    this.setSelected = this.setSelected.bind(this);
    this.getPosts = this.getPosts.bind(this);
  }

  //grabs all the subreddits
  async subreddits() {
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

    let result = [];
    const res = await fetch(url, params);
    const json = await res.json();
    let array = json.subreddits;
    // console.log(array);
    array.forEach(element => {
      result.push(element);
    });
    return result;

  }

  async setOptions() {
    let options = [];
    if (this.props.accessToken != null) {
      let subs = await this.subreddits();
      let all = {
        value: "all",
        text: "all"
      }
      let stop = {
        value: "stopTracking",
        text: "Stop Tracking Karma"
      }
      options.push(stop);
      options.push(all);
      subs.forEach(sub => {
        var option = {
          value: sub,
          text: sub
        }
        options.push(option);
      });

    }
    this.setState({
      options: options
    });

    return await options;
  }

  setSelected(subreddit) {

    if (this.state.interval != null) {
      clearInterval(this.state.interval);
    }
    if (subreddit !== "stopTracking") {
      if (this.state.interval === null) {
        this.karma(subreddit);
        this.props.getTime(0);
      }
      this.setState({
        interval: setInterval(() => {
          this.setState({ time: this.state.time + 5 });
          this.karma(subreddit);
        }, 5000)
      });
      setInterval(() => this.getPosts(subreddit), 15000);
    }

  }

  async getPosts (subreddit) {
    var url = "http://localhost:8080/posts";
    const data = {
      accessToken: this.props.accessToken,
      subreddit: subreddit != null? subreddit : 'all'
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
    let postResult = [];
    const res = await fetch(url, params);
    const json = await res.json();
    //console.log(json);
    let postArray = res.json.getPosts;
    //console.log(postArray);
    postArray.forEach(element => {
      postResult.push(element);
    });
    return postResult;
  }
    //todo Take the response and pass it back to main component, then use to generate post text
    // Title is in res.body.body.data.children[X].data.title and test is in ....selftext I think
    // Use console.log network tab on posts call to check
    //todo Use res.json.posts to see the posts

    componentDidUpdate(prevProps, prevState)
    {
      if (this.props.accessToken !== null && prevProps !== this.props) {
        this.setOptions();
      }
    }

    render(){

      return (
          <Button onClick={this.getPosts("anime")}/>
      );
    }
}

export default RedditScroller;



