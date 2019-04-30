import React from 'react';
import { Container, Modal } from 'semantic-ui-react';
import LightController from '../LightController';
import RedditController from '../RedditController';
export default class Popup extends React.Component {
    
    constructor(props) {
      super(props);
      this.lightController = new LightController(props);
      this.RedditController = new RedditController(props);
    }
  
  
    render() {
      return (
        <div>
          <Modal
            open={true}
            basic
            size="small" centered>
            <Modal.Header style={itemStyle5}>Welcome to RedditLight!</Modal.Header>
            <Container style={itemStyle5}>
              <div className="ui buttons">
                <button className="ui right attached white button" style={itemStyle7} onClick={this.RedditController.authenticateToReddit} type="submit">Log in with Reddit</button>
              </div>
            </Container>
          </Modal>
  
        </div>
      );
    }
  }

var itemStyle5 = { fontFamily: 'Helvetica', textAlign: 'center' };
var itemStyle7 = { fontFamily: 'Helvetica', color: 'black' }