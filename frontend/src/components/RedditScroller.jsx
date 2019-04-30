import React from 'react';

import { Segment, Card } from 'semantic-ui-react'


class RedditScroller extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
    // This binding is necessary to make `this` work in the callback
    this.parse = this.parse.bind(this);
  }

  async parse() {
    const data = await this.props.posts;
    const posts = data.posts;
    let redditPosts = [];
    console.log(data);
    // console.log(data.posts[0].data.title);
    // console.log(posts[0].data.title);
    posts.forEach(post => {
      let segment = {
        title: post.data.title,
        score: post.data.score,
        thumbnail: post.data.thumbnail,
        link: "reddit.com" + post.data.permalink,
      }
      redditPosts.push(segment);
    });

    console.log(redditPosts);

    return await redditPosts;
  }


  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.posts != this.props.posts) {
      if (this.props.posts != null) {
        const data = await this.props.posts;
        const posts = data.posts;
        let redditPosts = [];
        console.log(data);
        // console.log(data.posts[0].data.title);
        // console.log(posts[0].data.title);
        posts.forEach(post => {
          let segment = {
            title: post.data.title,
            score: post.data.score,
            thumbnail: post.data.thumbnail,
            link: "https://www.reddit.com" + post.data.permalink,
          }
          redditPosts.push(segment);
        });

        console.log(redditPosts);

        this.setState({
          posts: redditPosts
        });
      }
    }
  }


  render() {
    const posts = this.state.posts;
    const yeet = posts.map(post => {
      return (
      <a href={post.link} target="_blank">

      <Segment>
        <h1>{post.title}</h1>
        <img src={post.thumbnail} height="140" width="140"></img>
        <h2>{post.score}</h2>
      </Segment>
      </a>)

    })
    console.log(yeet);
    console.log(posts.title);


    return (
      <Segment style={{ overflow: 'auto', maxHeight: 400 }}>
        {yeet}
      </Segment>



    );
  }
}

export default RedditScroller;



