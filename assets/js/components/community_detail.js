import React from 'react'
import axios from 'axios'


import PostComponent from './post_list.js'
import CommentComponent from './comment.js'


class CommunityDetail extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      description:"",
      id:-1,
      name: "",
      url:"",
      user: "",
      posts: []
    };
  }

  get() {
    axios.get('api/communities/1/?format=json')
      .then(res => {
        let data = res.data
        this.setState(data)
        axios.get('api/posts/?format=json&?community=' + toString(this.state.id))
          .then(data =>
            this.setState({posts: data.data})
          )
    })

  }

  // TODO: Add pagination - load when the user reaches the bottom of the page

  
  componentDidMount() {
    this.get()
  }

  render() {
    return (
      <div>
        <h2>Communitiy Detail</h2>
        <ul>
          <div key={this.state.id} id={"community-" + this.state.id}>
            <h3>{this.state.name}</h3>
            <li key={this.state.id}>{this.state.description} by <a href={this.state.user.url}>{this.state.user.username}</a></li>
            {this.state.posts.map(post =>
            <div key={post.id} id={"post-" + post.id}>
              <li key={post.id}>{post.text} by {post.user.username}</li>
              <CommentComponent comments={post.comments} post_url={post.url} post_id={post.id}></CommentComponent>
            </div>
          )}
          </div>
        </ul>
      </div>
    );
  }

}


export default CommunityDetail;