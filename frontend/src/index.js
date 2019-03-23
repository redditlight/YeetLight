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
    const itemStyle = { fontFamily: 'monospace', fontSize: '20px', color: 'black'};
    const { activeItem } = this.state;
    return (
        <Menu>
          <Menu.Item header>YeeLight</Menu.Item>
          <Menu.Item
              name='aboutUs'
              active={activeItem === 'aboutUs'}
              onClick={this.handleItemClick}
          />
          <Menu.Item name='brightness' active={activeItem === 'brightness'} onClick={this.handleItemClick} />
          <Menu.Item
              name='activity'
              active={activeItem === 'activity'}
              onClick={this.handleItemClick}
          />
        </Menu>
    )
  }

}

class YeeLight extends React.Component{

  render(){
    return(
        <div>
          <TopMenu/>
        </div>
    );
  }
}





ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
