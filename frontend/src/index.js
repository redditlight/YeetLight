import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import * as serviceWorker from './serviceWorker';
import { Container, Divider, Grid, Menu, Image, List } from 'semantic-ui-react';


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
          <Menu.Item style = {itemStyle}>YeeLight</Menu.Item>
          <Menu.Item
              style = {itemStyle2}
              position = 'right'
              name='aboutUs'
              active={activeItem === 'aboutUs'}
              onClick={this.handleItemClick}
          />
          <Menu.Item style = {itemStyle2}
              name='brightness'
              active={activeItem === 'brightness'}
              onClick={this.handleItemClick} />
          <Menu.Item style = {itemStyle2}
              name='activity'
              active={activeItem === 'activity'}
              onClick={this.handleItemClick}
          />
        </Menu>
      </Container>
    )
  }

}

class SideBar extends React.Component{
  render(){
    return(
        <div class = "ui visible left thin sidebar">
          <a class = "item">
            <i class = "home icon"></i>
            Home
          </a>
        </div>
    )
  }

}

class YeeLight extends React.Component{

  render(){
    return(
        <div>
          <TopMenu/>
          <SideBar/>
        </div>
    );
  }
}





ReactDOM.render(<YeeLight/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
