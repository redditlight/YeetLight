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

    let result = [];
    return fetch(url, params).then(res => res.json()).then(data => {
      let array = data.subreddits;
      // console.log(array);
      array.forEach(element => {
        result.push(element);
      });
      return result;
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

  async setOptions () {
    let options = [];
    if (this.props.accessToken != null) {
      let subs = await this.subreddits();
      let all = {
        value: "All",
        text: "All"
      }
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

}

componentDidUpdate () {
  if(this.props.accessToken != null) {
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