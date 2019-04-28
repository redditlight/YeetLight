import React from 'react';
import About from './About';
import SubredditSelector from './SubredditSelector';
import { Menu, Button, Sidebar } from 'semantic-ui-react';
import '../css/sidebar.css';

export default class SidebarExampleMultiple extends React.Component {
    state = { visible: false }
  
    handleHideClick = () => this.setState({ visible: false })
    handleShowClick = () => this.setState({ visible: true })
    handleSidebarHide = () => this.setState({ visible: false })
  
    constructor(props) {
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
        <div id="sidebarmenu" className="top">
          {/* <Button.Group> */}
            <i className='big sidebar icon' disabled={visible} onClick={this.handleShowClick} />
            {/* /* 
            <Button disabled={!visible} onClick={this.handleHideClick}>
              Hide
            </Button>
          </Button.Group> */}
  

            <Sidebar
              as={Menu}
              animation='overlay'
              direction='left'
              icon='labeled'
              onHide={this.handleSidebarHide}
              vertical
              inverted
              visible={visible}
              width='thin'
            >

              <Menu.Item as='a' color={'violet'}>
                <About />
                About
              </Menu.Item>

              <Menu.Item as='a' href="https://github.com/redditlight" >
                <i className="user icon" ></i>
                Visit our Github
              </Menu.Item>
              <Menu.Item>
                <SubredditSelector accessToken={this.props.accessToken} getSubredditData={this.props.getSubredditData} getTime={this.props.getTime} />
              </Menu.Item>
            </Sidebar>
  

  
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