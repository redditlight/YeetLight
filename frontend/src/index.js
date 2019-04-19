import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import LightController from './LightController';
import RedditController from './RedditController';
import * as serviceWorker from './serviceWorker';
import SubredditSelector from './components/SubredditSelector';

import { Container, Item, Card , Menu, Button, Icon, Form, Grid, Input, List, Divider, Modal } from 'semantic-ui-react';
import KarmaChart from './components/KarmaChart';

var itemStyle3 = { fontFamily: 'Times', fontSize: '30px', color: 'black', textAlign: 'center'};
var itemStyle4 = { fontFamily: 'monospace', fontSize: '15px', color: 'white'};
var itemStyle5 = { textAlign: 'center'};
var itemStyle6 = { fontSize: '15px'}

class TopMenu extends React.Component{
  render() {
    const itemStyle = { fontFamily: 'monospace', fontSize: '30px', color: 'white'};
    const itemStyle2 = { fontFamily: 'Times', fontSize: '15px', color: 'white'};
    
    return (
        <Container fluid>
        <Menu borderless>
          <Menu.Item style = {itemStyle}>YeeLight</Menu.Item>
          
          <Menu.Item style = {itemStyle2}
              position = 'right'
              icon = 'lightbulb'
              onClick={this.handleItemClick} />
        </Menu>
      </Container>
    )
  }
}

class Popup extends React.Component {
  constructor(props){
    super(props);
    this.lightController = new LightController(props);
    this.RedditController = new RedditController(props);
    // this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      accessToken: null
    };
  }

  // handleClose(){
  //   this.setState({show: false});
  // }

  componentDidMount() {
    // if (this.state.accessToken == null) {
    //   this.setState({
    //     show: true
    //   });
    // }
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
          accessToken: data.accessToken,
        });
        this.props.getAccessToken(this.state.accessToken); //CALLBACK to index.js
      });
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.show == true && prevState != this.state) {
  //     this.handleClose();
  //   }
  // }


  render() {
    return(
      <div>
        <Modal
          open={this.props.shown}
          size="large" centered> 
          <Modal.Header style = {itemStyle5}>Connect to Yeelight and link Reddit account</Modal.Header>
          <Container style = {itemStyle5}>
          <div class = "ui buttons">
          <button class = "ui left attached green inverted button"  onClick={this.lightController.connectLight} type = "submit">Light Connection</button>
          <button class = "ui right attached green inverted button" onClick = {this.RedditController.authenticateToReddit} type = "submit">Reddit Authentication</button>
          {/* <button class = "ui right red inverted button" onClick = {this.handleClose}>Close</button> */}
]          </div>
          </Container>
      </Modal>
      {/* if (this.RedditController.state.accessToken != null) {
            this.setState({show : false})
          } */}
    </div>
  );
}
}

// class MiddleForm extends React.Component{
//   constructor(props){
//     super(props);
//     this.lightController = new LightController(props);
//     this.RedditController = new RedditController(props);
//   }
//   render(){
//     return(
//       <form class = "ui form">
//         <h4 class = "ui dividing header">Settings</h4>
//         <div class = "field">
//         <label>Brightness</label>
//         <input type = "text" name = "brightness-value" placeholder = "1-500"></input>
//                 <button class = "ui button" onClick = {this.RedditController.authenticateToReddit} type = "submit">Connect to Yeelight</button>

//         </div>
//       </form>
//       // <form class = "ui form">
//       //   <div class = "field">
//       //   <label> Brightness </label>
//       //   <input type = "text" name = "brightness-value" placeholder = "1-500"></input>
//       //   </div>
//       //   <button class = "ui button" onClick = {this.RedditController.authenticateToReddit} type = "submit">Connect to Yeelight</button>
//       // </form>
//     )
//   }
// }

class MiddleData extends React.Component{
  constructor(props){
    super(props);
    this.lightController = new LightController(props);
    this.RedditController = new RedditController(props);
  }
  render(){
    return(
  <div id = "fullwidthbackground">
   <div class = "ui two cards">
   <Card>
           <Card.Content>
      <Card.Header style = {itemStyle3}> 
        How to use
      </Card.Header>
      </Card.Content>
      <Card.Content style = {itemStyle6}>
      Now that you’ve connected to the light and logged into Reddit, you can access the full functionality of the app.  
      </Card.Content>
      </Card>

          <Card>
            <Card.Content style = {itemStyle6}>
              <div class = "ui bulleted list">
                <div class = "item">Once connected, you can link to any of your active subreddits 
                and the light will respond accordingly</div>

                <div class = "item">The light will turn on whenever one of your comments
                is liked</div>

                <div class = "item">You can reset the light at any time, as well as toggle on and off</div>

                <div class = "item">Lastly, you can optionally have the light ping whenever a 
                message is received </div>
              </div>
            </Card.Content>
          </Card>

          <Card>
          <Card.Content>
            <div class = "ui list">
              <div class = "item">
                <Button color = 'black' animated fluid onClick = {this.lightController.changeBrightness(this.value)} type = "submit">
                  <Button.Content visible>Reset Light</Button.Content>
                  <Button.Content hidden>
                    <i class = "redo icon"></i>
                  </Button.Content>
                </Button>
              </div>

              {/*<div class = "item">*/}
                {/*<Item.Content>*/}
                {/*Subreddit selector goes here*/}
                {/*</Item.Content>*/}
                {/*</div>        */}

              <div class = "item">
               <Icon name='home' size='big'/> <div> {this.RedditController.state.unread} </div>
              </div>

              <div class = "item">
                <Button color = 'black' animated fluid onClick = {this.RedditController.checkInbox} type = "submit">
                  <Button.Content visible>Enable inbox checking</Button.Content>
                    <Button.Content hidden>
                      <i class = "inbox icon"></i>
                    </Button.Content>
                </Button>
              </div>
            </div>
            </Card.Content>

          </Card>

          <Card>
            <Card.Content>
              graph things here
            </Card.Content>
            </Card>
        </div>    
      </div>
  )
    }
  }



class FooterMenu extends React.Component {
  render(){
    return(
      <Container fluid className='b-background'>
      <Grid columns='equal' colorblocktop>
        <Grid.Column style = {itemStyle4}>
          Created using semantic ui
        </Grid.Column>

        <Grid.Column style = {itemStyle4}>
          Created by <Divider/>
          <List>
            <List.Item>Blaine</List.Item>
            <List.Item>Sam</List.Item>
            <List.Item>Sunny</List.Item>
            <List.Item>Justin</List.Item>
          </List>
        </Grid.Column>

        <Grid.Column style = {itemStyle4}>
          Contact <Divider/>
          <List>
            <List.Item>(707)775-5629</List.Item>
            <List.Item>https://github.com/redditlight/YeetLight</List.Item>
            <List.Item>2500 Campus Rd, Honolulu, HI 96822</List.Item>
          </List>
        </Grid.Column>
      </Grid>
    </Container>
    )
  }
}


export default class YeeLight extends React.Component{

  constructor(props){
    super(props);
    this.lightController = new LightController(props);
    this.state = {
      accessToken: null,
      subredditData: null,
      time: null
    };

    // Change this later based on user input
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getSubredditData = this.getSubredditData.bind(this);
    this.getTime = this.getTime.bind(this);
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

  render(){
    return(
        <div>
          {/* WHEN moving this make sure the props are being passed correctly.*/}
          <SubredditSelector accessToken={this.state.accessToken} getSubredditData={this.getSubredditData} getTime={this.getTime} />
          <TopMenu/>
          <MiddleData/>
          
          {/* KARMA CHART - Move this whole block. also make sure the props are being passed correctly */}
          {/* The props are mainly callbacks, so all you have to do is make sure that the functions they're being linked to go to the right place. */}
          {this.state.subredditData != null 
          ? <div className={"graph"}>
              <KarmaChart subredditData={this.state.subredditData} time={this.state.time}/> 
            </div>
           : ''}
           {/* KARMA CHART  */}

          <Popup getAccessToken={this.getAccessToken} shown={this.state.accessToken != null ? false : true}/>
          {/* <MiddleForm/> */}
          <FooterMenu/>
          <RedditController/>
          <RedditController getAccessToken={this.getAccessToken}/>
        </div>
    );
  }
}

ReactDOM.render(<YeeLight/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
