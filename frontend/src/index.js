import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import LightController from './LightController';
import RedditController from './RedditController';
import * as serviceWorker from './serviceWorker';
import { Container, Modal, Input , Menu, Button, Grid, List, Divider, Card, Feed} from 'semantic-ui-react';

var itemStyle3 = { fontFamily: 'Times', fontSize: '30px', color: 'black', textAlign: 'center'};
var itemStyle4 = { fontFamily: 'monospace', fontSize: '15px', color: 'white'};
var itemStyle5 = {textAlign: 'center'};

class TopMenu extends React.Component{
  render() {
    const itemStyle = { fontFamily: 'monospace', fontSize: '30px', color: 'white'};
    const itemStyle2 = { fontFamily: 'Times', fontSize: '15px', color: 'white'};
    
    return (
        <Container fluid>
        <Menu borderless>
          <Menu.Item style = {itemStyle}>YeeLight</Menu.Item>
          <Menu.Item
              style = {itemStyle2}
              position = 'right'
              name='aboutUs'
              onClick={this.handleItemClick}
          />
          <Menu.Item style = {itemStyle2}
              name='brightness'
              onClick={this.handleItemClick} />
          <Menu.Item style = {itemStyle2}
              name='activity'
              onClick={this.handleItemClick}
          />
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
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: true,
    };
  }

  handleClose(){
    this.setState({show: false});
  }


  render() {
    return(
      <div>
        <Modal
          open={this.state.show}
          size="large" centered> 
          <Modal.Header style = {itemStyle5}>Connect to Yeelight and link Reddit account</Modal.Header>
          <Container style = {itemStyle5}>
          <div class = "ui buttons">
          <button class = "ui left attached green inverted button"  onClick={this.lightController.connectLight} type = "submit">Light Connection</button>
          <button class = "ui right attached green inverted button" onClick = {this.RedditController.authenticateToReddit} type = "submit">Reddit Authentication</button>
          <button class = "ui right red inverted button" onClick = {this.handleClose}>Close</button>
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
  <div class = "ui centered card">
    <Card.Content>
      <Card.Header style = {itemStyle3}> 
      Functionality
      </Card.Header>
    </Card.Content>
    <Card.Content>
      <Feed>
        <Feed.Event>
          <Feed.Content>
            <Feed.Summary>
              <div class = "ui basic center aligned segments">
              <div class = "ui segment">
              <div class = "ui button" data-position = "right center" data-tooltip = "Connect to Yeelight" onClick={this.lightController.connectLight}>
              Step One
              </div>
              </div>
              <div class = "ui segment">
              <div class = "ui button" data-position = "right center" data-tooltip = "Reddit Signin" onClick = {this.RedditController.authenticateToReddit}>
        Step Two
        </div>
              </div>
              <div class = "ui segment">
              <div class = "ui button" data-position = "right center" data-tooltip = "Turn Light On/Off" onClick = {this.lightController.toggleLight}>
        Toggle YeeLight
        </div>
              </div>
              <div class = "ui segment">
              <div class = "ui right pointing dropdown link item" onClick={this.RedditController.subreddits}>
              Get Active Subreddits
              <i class = "dropdown icon"></i>
              {/* <div>
                <select>
                </select>
              </div>  */}
              </div>
              </div>  
      
              <div class = "ui segment">
              <div class = "ui button" data-position = "right center" data-tooltip = "Brightness Reset" onClick = {this.lightController.changeBrightness(100)}>
              Reset YeeLight
              </div>
              </div>
              </div>
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
        
        <Feed.Event>
          <Feed.Content>
            <Feed.Summary>
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
      </Feed>
    </Card.Content>
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

    // Change this later based on user input
    this.value = 100;
  }

  render(){
    return(
        <div>
          <TopMenu/>
          <MiddleData/>
          <Popup/>
          {/* <MiddleForm/> */}
          <FooterMenu/>
          <RedditController/>
        </div>
    );
  }
}


ReactDOM.render(<YeeLight/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
