import React from 'react';

import { Segment, Card } from 'semantic-ui-react'


class RedditScroller extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: null
    };
    // This binding is necessary to make `this` work in the callback
    this.parse = this.parse.bind(this);
  }

  async parse() {
    const data = await this.props.posts;
    const posts = data.posts;
    let redditPosts = [];
    // console.log(data);
    // console.log(data.posts[0].data.title);
    // console.log(posts[0].data.title);
    posts.forEach(post => {
      let segment = {
        title: post.data.title,
        score: post.data.score,
        thumbnail: post.data.thumbnail,
        link: "reddit.com" + post.data.permalink
      }
      redditPosts.push(segment);
    });

    console.log(redditPosts);

    return redditPosts;
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevProps.posts != this.props.posts) {
      this.setState({ posts: this.parse() });
    }
  }

  render() {
    let yeet = this.state.posts;
    // if (this.state.posts !== null) {
    //   var posts = (


    //   );
    // }


    return (
      <div>
        {yeet != null 
          ? <Segment style={{ overflow: 'auto', maxHeight: 200 }}>
          {yeet.map(item => {
            return (
              <a href={item.link}>
                <Segment>
                  <h1>{item.title}</h1>
                  <img src={item.thumbnail} height="140" width="140"></img>
                  <h2>{item.score}</h2>
                </Segment>
              </a>
            )

          })}
        </Segment>
        : null}
      </div>
    );
  }
}

export default RedditScroller;



