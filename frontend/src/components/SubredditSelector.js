import React from 'react';
import LightController from '../LightController';
import { Dropdown } from 'semantic-ui-react'

class SubredditSelector extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        options: null
    };
    this.lightController = new LightController(props);
    // This binding is necessary to make `this` work in the callback
    this.subreddits = this.subreddits.bind(this);
    this.karma = this.karma.bind(this);
    this.setOptions = this.setOptions.bind(this);
    this.setSelected = this.setSelected.bind(this);
  }


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

  async karma(subreddit) {
    var url = "http://localhost:8080/karma";
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
    const res = await fetch(url, params);
    const json = await res.json();
      console.log(json[0]);
      console.log(json);
      let value = json[0].total + 50;
      if(value > 100) value = 100;
      if(value < 1) value = 1;
      this.lightController.changeBrightness(value);
    });
  }

  async setOptions () {
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

setSelected (subreddit) {
  if (subreddit != "stopTracking") {
    this.karma(subreddit);
    setInterval( () => this.karma(subreddit), 15000);
  }

}

componentDidUpdate (prevProps, prevState) {
  if(this.props.accessToken != null && prevProps != this.props) {
    this.setOptions();
  }
  
}


  render(){  

    return(
        <Dropdown 
        placeholder='Select a Subreddit'
        fluid
        search
        selection
        options={this.state.options}
        onChange={(event, data) => this.setSelected(data.value)}
        />
    );
  }
}

export default SubredditSelector;