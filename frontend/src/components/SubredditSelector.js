import React from 'react';
import LightController from '../LightController';

class SubredditSelector extends React.Component {

  constructor(props) {
    super(props);
    
    
    this.state = {

    };
    this.lightController = new LightController(props);
    // This binding is necessary to make `this` work in the callback
    this.subreddits = this.subreddits.bind(this);
    this.karma = this.karma.bind(this);
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

  componentDidMount() {
      if (this.accessToken != null) {
          console.log("Test access-token" + this.accessToken);
          
      }
    
  } 



  render(){
    return(
        <div>
            <p>test</p>
        </div>
    );
  }
}

export default SubredditSelector;