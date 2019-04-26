import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import LightController from './LightController';
import RedditController from './RedditController';
import * as serviceWorker from './serviceWorker';
import SubredditSelector from './components/SubredditSelector';
import KarmaChart from './components/KarmaChart';

import { Container, Card , Menu, Button, Icon, Sidebar, Segment, Header, Image, Modal } from 'semantic-ui-react';

var itemStyle3 = { fontFamily: 'Helvetica', fontSize: '30px', color: 'black', textAlign: 'center'};
var itemStyle4 = { fontFamily: 'Helvetica', fontSize: '15px', color: 'white'};
var itemStyle5 = { fontFamily: 'Helvetica', textAlign: 'center'};
var itemStyle6 = { fontFamily: 'Helvetica', fontSize: '15px'}
var itemStyle7 = { fontFamily: 'Helvetica', color: 'black'}

// class TopMenu extends React.Component{
//   render() {
//     const itemStyle = { fontFamily: 'Helvetica', fontSize: '30px', color: 'white'};
//     const itemStyle2 = { fontFamily: 'Helvetica', fontSize: '15px', color: 'white'};
    
//     return (
//         <Container fluid>
//         <Menu borderless>
//           <Menu.Item style = {itemStyle}>YeeLight</Menu.Item>
          
//           <Menu.Item style = {itemStyle2}
//               position = 'right'
//               icon = 'lightbulb'
//               onClick={this.handleItemClick} />
//         </Menu>
//       </Container>
//     )
//   }
// }

class SidebarExampleMultiple extends React.Component {
state = { visible: false }

  handleHideClick = () => this.setState({ visible: false })
  handleShowClick = () => this.setState({ visible: true })
  handleSidebarHide = () => this.setState({ visible: false })

  constructor(props){
    super(props);
    // this.SubredditSelector = new SubredditSelector(props);
    // this.onClose = this.onClose.bind(this);
  }

  // onClose() {
  //   this.setState({open: false});
  // }

  render() {
    const { visible } = this.state
    return (
      <div id = "sidebarmenu">
        <Button.Group>
          <Button disabled={visible} onClick={this.handleShowClick}>
            Dashboard
          </Button>
          <Button disabled={!visible} onClick={this.handleHideClick}>
            Hide
          </Button>
        </Button.Group>

        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation='overlay'
            direction='left'
            icon='labeled'
            onHide={this.handleSidebarHide}
            vertical
            visible={visible}
            width='thin'
          >
            {/*<Menu.Item as='a'>*/}
              {/*<Icon name='home' />*/}
              {/*Home*/}
            {/*</Menu.Item>*/}
            <Menu.Item as ='a'>
              <About/>
              About
            </Menu.Item>
            {/*<Menu.Item as='a' onClick={this.setState({open: true})}>*/}
              {/*<Icon name = 'address card outline'></Icon>*/}
              {/*About Us*/}
            {/*</Menu.Item>*/}
            <Menu.Item as='a' href = "https://github.com/redditlight" >
            <i class="user icon" ></i>
              Visit our Github
            </Menu.Item>
            <Menu.Item>
            <SubredditSelector accessToken={this.props.accessToken} getSubredditData={this.props.getSubredditData} getTime={this.props.getTime} />
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher>
            <Segment basic>
              <MiddleData accessToken={this.props.accessToken}/>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>

        {/*<Modal open={this.state.open} onClose={this.onClose}>*/}
          {/*<Modal.Header>Select a Photo</Modal.Header>*/}
          {/*<Modal.Content image>*/}
            {/*<Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' />*/}
            {/*<Modal.Description>*/}
              {/*<Header>Default Profile Image</Header>*/}
              {/*<p>We've found the following gravatar image associated with your e-mail address.</p>*/}
              {/*<p>Is it okay to use this photo?</p>*/}
            {/*</Modal.Description>*/}
          {/*</Modal.Content>*/}
        {/*</Modal>*/}
      </div>
    )
  }
}

class About extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
      <Modal trigger={<Icon name = 'address card outline'></Icon>}>
        <Modal.Header>About</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <p>RedditLight is an ambient app that allows a Reddit and Yeelight smartbulb user to browse Reddit posts, view their karma per subreddit, and be notified of inbox messages together with optional Yeelight changes.</p>
            <p>Created by <a href="https://github.com/jpham79">Justin Pham</a>, <a href="https://github.com/blaine-wataru">Blaine Wataru</a>, <a href="https://github.com/SamZyskowski">Sam Zyskowski</a> and <a href="https://github.com/sunnysiu97">Sunny Siu.</a></p>
            <p>This project uses <a href="https://reactjs.org/">React</a>, <a href="https://nodejs.org/en/">Node</a>, <a href="https://react.semantic-ui.com/">Semantic Ui</a>, <a href="https://oauth.net/">OAuth</a>, and the <a href="https://www.reddit.com/dev/api/">Reddit</a> and <a href="https://www.yeelight.com/download/Yeelight_Inter-Operation_Spec.pdf">Yeelight</a> APIs.</p>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

// class SideMenu extends React.Component {
  
//   render(){
//     const sideBarStyles = {
//       sidebar: {
//         backgroundColor: 'black',
//         height: '100px'
//       }
//     }
//     return(
//     <Container className = "sidebarmenu" style = {sideBarStyles}>
//      <div class = "ui small left fixed vertical menu" >
//           <a class="item" style = {itemStyle5}>Features</a>
//            <div class = "ui fluid button" data-tooltip = "Created by Justin, Blaine, Sam and Sunny using React with Semantic UI"
//            data-position = "right center">
//            About Us
//            </div>
//            <a class = "ui fluid button" href = "https://github.com/redditlight" >Visit our github</a>
//      </div>
//      </Container>
//     )
//   }
// }

class Popup extends React.Component {
  constructor(props){
    super(props);
    this.lightController = new LightController(props);
    this.RedditController = new RedditController(props);
    // this.handleClose = this.handleClose.bind(this);

    // this.state = {
    //   accessToken: null
    // };
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
        // this.setState({
        //   accessToken: data.accessToken,
        // });
        this.props.getAccessToken(data.accessToken); //CALLBACK to index.js
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
          open={true}
          size="large" centered> 
          <Modal.Header style = {itemStyle5}>Welcome to RedditLight!</Modal.Header>
          <Container style = {itemStyle5}>
          <div class = "ui buttons">
          {/*<button class = "ui left attached white button" style = {itemStyle7} onClick={this.lightController.connectLight} type = "submit">Light Connection</button>*/}
          <button class = "ui right attached white button" style = {itemStyle7} onClick = {this.RedditController.authenticateToReddit} type = "submit">Log in with Reddit</button>
         
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

class MiddleData extends React.Component{
  constructor(props){
    super(props);
    this.lightController = new LightController(props);
    this.RedditController = new RedditController(props);
    this.SubredditSelector = new SubredditSelector(props);
  }
  render(){
    return(

  <div id = "fullwidthbackground">
   <div class = "ui centered cards">
   <Card>
           <Card.Content>
      <Card.Header style = {itemStyle3}> 
        How to use
      </Card.Header>
      </Card.Content>
      <Card.Content style = {itemStyle6}>
      Now that you’ve connected to the light and logged into Reddit, you can access the full functionality of the app. You can click on the Dashboard to pull up the Subreddit Selector bar, which will allow you to select a subreddit to view its karma. You can also enable inbox checking by clicking the button. The light, when connected, will respond accordingly with input from Reddit.
      </Card.Content>
      </Card>

          {/* <Card>
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
          </Card> */}

          <Card>
          <Card.Content>
            <div class = "ui list">
              <div class = "item">
                <RedditController accessToken={this.props.accessToken}/>
              </div>

              <div class = "item">
                <Button color = 'red' animated fluid onClick = {this.lightController.resetLight} type = "submit">
                  <Button.Content visible>Reset Brightness</Button.Content>
                  <Button.Content hidden>
                    <i class = "redo icon"></i>
                  </Button.Content>
                </Button>
              </div>

              <div class = "item">
                <Button color = 'green' animated fluid onClick = {this.lightController.connectLight} type = "submit">
                  <Button.Content visible>Connect to Light</Button.Content>
                  <Button.Content hidden>
                    <i class = "lightbulb outline icon"></i>
                  </Button.Content>
                </Button>
              </div>

            </div>
            </Card.Content>
          </Card>
        </div>    
      </div>
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
          {/*<SubredditSelector accessToken={this.state.accessToken} getSubredditData={this.getSubredditData} getTime={this.getTime} />*/}
          {/*<MiddleData accessToken={this.state.accessToken}/>*/}

           {/* <SubredditSelector accessToken={this.state.accessToken}/> */}
          {/* <TopMenu/> */}
          <SidebarExampleMultiple accessToken={this.state.accessToken} getSubredditData={this.getSubredditData} getTime={this.getTime}/>
          {/* <SideMenu/> */}

          {/* KARMA CHART - Move this whole block. also make sure the props are being passed correctly */}
          {/* The props are mainly callbacks, so all you have to do is make sure that the functions they're being linked to go to the right place. */}
          {this.state.subredditData != null 
          ? <div className={"graph"}>
              <KarmaChart subredditData={this.state.subredditData} time={this.state.time}/> 
            </div>
           : ''}
           {/* KARMA CHART  */}
          {this.state.accessToken != null ? null : <Popup getAccessToken={this.getAccessToken} /> }

          {/* <MiddleForm/> */}
          {/* <FooterMenu/> */}
          {/* <RedditController getAccessToken={this.getAccessToken}/> */}
          </div>
    );
  }
}

ReactDOM.render(<YeeLight/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
