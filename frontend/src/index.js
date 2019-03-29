import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import App from './App.js';
import Controller from './Controller';
import RController from './RController'
import * as serviceWorker from './serviceWorker';
import { Container, Feed, Card , Menu, Button, Icon, Grid, List, Divider } from 'semantic-ui-react';

var itemStyle3 = { fontFamily: 'didot', fontSize: '30px', color: 'black', textAlign: 'center'};
var itemStyle4 = { fontFamily: 'monospace', fontSize: '15px', color: 'white'};


class TopMenu extends React.Component{

  state = {};
  handleItemClick = (e, {name}) => this.setState({activeItem: name});

  render() {

    const itemStyle = { fontFamily: 'monospace', fontSize: '30px', color: 'white'};
    const itemStyle2 = { fontFamily: 'Times', fontSize: '15px', color: 'white'};

    const { activeItem } = this.state;
    return (
        <Container fluid>
        <Menu borderless>
          <Menu.Item style = {itemStyle}>
          YeeLight
          </Menu.Item>
          <Menu.Item
              style = {itemStyle2}
              position = 'right'
              name='Reddit Login'
              active={activeItem === 'Reddit Login'}
              onClick={Controller.handleClick}
          />
          <Menu.Item style = {itemStyle2}
              name='brightness'
              active={activeItem === 'brightness'}
              onClick={this.handleItemClick}
          />
        </Menu>
      </Container>
    )
  }

}

class SubRedditSelection extends React.Component {
  render() {
    return (
      <div class = "ui centered">
        <select className="ui search dropdown">
          <i className="dropdown icon"></i>
          <option type="hidden" value="">Please choose a SubReddit  </option>

        </select>
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
          Made using Semantic UI
        </Grid.Column>

        <Grid.Column>
          Created by <Divider/>
          <List>
            <List.Item>Blaine</List.Item>
            <List.Item>Sam</List.Item>
            <List.Item>Sunny</List.Item>
            <List.Item>Justin</List.Item>
          </List>
        </Grid.Column>

        <Grid.Column>
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


const CardExampleContentBlock = () => (
  <div class = "ui centered card">
    <Card.Content>
      <Card.Header style = {itemStyle3}>
      Activity
      </Card.Header>
    </Card.Content>
    <Card.Content>
      <Feed>
        <Feed.Event>
          <Feed.Content>
            <Feed.Summary>
              <div class = "ui basic center aligned segment">
              Current post tracking:
              </div>

              <div class = "ui fluid icon input">
              <input type = "text"></input>
              <i class = "users icon"></i>
              </div>
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>

        <Feed.Event>
          <Feed.Label> <i class = "blind icon"></i>
          </Feed.Label>
          <Feed.Content>
            <Feed.Summary>
            <Button center animated = 'vertical'>
            <Button.Content visible>On</Button.Content>
      <Button.Content hidden>
        <Icon name='lightbulb' />
      </Button.Content>
    </Button>
    <Button center animated='vertical'>
      <Button.Content hidden>
      <Icon name='moon' />
      </Button.Content>
      <Button.Content visible>
        Off
      </Button.Content>
    </Button>
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
      </Feed>
    </Card.Content>
    </div>
  )


class YeeLight extends React.Component{

  render(){
    return(
        <div>
          <TopMenu/>
          <CardExampleContentBlock/>
          <SubRedditSelection/>
          <FooterMenu/>
        </div>
    );
  }
}

ReactDOM.render(<YeeLight/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
