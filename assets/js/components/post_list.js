import React from 'react'
import axios from 'axios'



import CommentComponent from './comment.js'



class Post extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }

  get() {
    axios.get('/api/posts/?format=json')
      .then(res => {
        const posts = res.data.map(({id, user, url, _get_score, comments, title, text}) => ({
          id,
          user,
          url,
          _get_score,
          comments,
          title,
          text,
        }));

        this.setState({ posts });
    })
  }

  // TODO: Add pagination - load when the user reaches the bottom of the page

  
  componentDidMount() {
    this.get()
  }

  vote(vote, id) {
    axios.post('/api/vote/',{"model": "post", "id": id, "vote": vote})
    .then(function (response) {
      console.log(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <h2>Posts</h2>
        <ul>
          {this.state.posts.map(post =>
            <div key={post.id} id={"post-" + post.id}>
              <li key={post.id}>{post.text} by <a href={post.user.url}>{post.user.username}</a></li>
              <button className="btn btn-default" disabled>{post._get_score}</button>
              <button className="btn btn-default" key={post.id + "u"} onClick={this.vote.bind(this, "true", post.id)}>Up</button>
              <button className="btn btn-default" key={post.id + "d"} onClick={this.vote.bind(this, "false", post.id)}>Down</button>
              <CommentComponent comments={post.comments} post_url={post.url} post_id={post.id}></CommentComponent>
            </div>
          )}
        </ul>
      </div>
    );
  }

}


export default Post;
