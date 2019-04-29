import React from 'react';
import LightController from '../LightController';
import RedditController from '../RedditController';
import { Card, Button } from 'semantic-ui-react';
import KarmaChart from './KarmaChart.jsx';
import RedditScroller from './RedditScroller';

export default class MiddleData extends React.Component {
    constructor(props) {
      super(props);
      this.lightController = new LightController(props);
      // this.RedditController = new RedditController(props);
    }
    render() {
      return (

        <div id="fullwidthbackground">
          <div className="ui centered cards">
            <Card>
              <Card.Content>
                <Card.Header style={itemStyle3}>
                  How to use
        </Card.Header>
              </Card.Content>
              <Card.Content style={itemStyle6}>
                Now that you’ve connected to the light and logged into Reddit, you can access the full functionality of the app. You can click on the Dashboard to pull up the Subreddit Selector bar, which will allow you to select a subreddit to view its karma. You can also enable inbox checking by clicking the button. The light, when connected, will respond accordingly with input from Reddit.
        </Card.Content>
            </Card>


            <Card>
              <Card.Content>
                <div className="ui list">
                  <div className="item">
                    <RedditController accessToken={this.props.accessToken} />
                  </div>

                  <div className="item">
                    <Button color='red' animated fluid onClick={this.lightController.resetLight} type="submit">
                      <Button.Content visible>Reset Brightness</Button.Content>
                      <Button.Content hidden>
                        <i className="redo icon"></i>
                      </Button.Content>
                    </Button>
                  </div>

                  <div className="item">
                    <Button color='green' animated fluid onClick={this.lightController.connectLight} type="submit">
                      <Button.Content visible>Connect to Light</Button.Content>
                      <Button.Content hidden>
                        <i className="lightbulb outline icon"></i>
                      </Button.Content>
                    </Button>
                  </div>

                </div>
              </Card.Content>
            </Card>

              <Card>
                <Card.Content>
                </Card.Content>
              </Card>
            {this.props.subredditData != null
          ? <Card>
              <Card.Content>
                <KarmaChart subredditData={this.props.subredditData} time={this.props.time} />
              </Card.Content>
            </Card>
          : ''}

          </div>



        </div>
      )
    }
  }

var itemStyle3 = { fontFamily: 'Helvetica', fontSize: '30px', color: 'black', textAlign: 'center' };
var itemStyle6 = { fontFamily: 'Helvetica', fontSize: '15px' }
