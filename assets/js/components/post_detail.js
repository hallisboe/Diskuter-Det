import React from 'react'
import axios from 'axios'


import CommentComponent from './comment.js'


class PostDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id:-1,
      title: "",
      text: "",
      url:"",
      user: "",
      comments: []
    };
  }

  get() {
    axios.get('/api/posts/' + this.props.params.postId + '/?format=json')
      .then(res => {
        let data = res.data
        this.setState(data)
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
            <h3>{this.state.title}</h3>
            <li key={this.state.id}>{this.state.text} by <a href={this.state.user.url}>{this.state.user.username}</a></li>
              <CommentComponent comments={this.state.comments} post_url={this.state.url} post_id={this.state.id}></CommentComponent>
          </div>
        </ul>
      </div>
    );
  }

}


export default PostDetail;