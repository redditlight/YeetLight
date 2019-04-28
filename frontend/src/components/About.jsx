import React from 'react';
import { Icon, Modal } from 'semantic-ui-react';
export default class About extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <Modal trigger={<Icon name='address card outline'></Icon>}>
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