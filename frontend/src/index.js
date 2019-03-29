import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import LightController from './LightController';
import RedditController from './RedditController';
import * as serviceWorker from './serviceWorker';
import { Container, Feed, Card , Menu, Button, Icon, Grid, List, Divider } from 'semantic-ui-react';

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
