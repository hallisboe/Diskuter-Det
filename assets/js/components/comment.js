import React from 'react'
import axios from 'axios'




class CommentComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      comments: this.props.comments,
    };
  }


  addComment() {
    let url = this.props.post_url
    
    axios.post('/api/comments/', {
          post: url,
          user: {username: "halvor1606", url: "http://127.0.0.1:8000/api/users/1/?format=json"},
          text: document.getElementsByName(url)[0].value,
          csrfmiddlewaretoken: document.getElementsByName("csrfmiddlewaretoken")[0].value},
          )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  vote(vote, id) {
    axios.post('/api/vote/',{"model": "comment", "id": id, "vote": vote})
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
        <input type="text" name={this.props.post_url}></input>
        <button className="btn btn-default" onClick={this.addComment.bind(this, this.props.post_url, this.props.post_id)}>Creates</button>
        <ul>
          {this.state.comments.map(comment =>
            <div key={comment.id}>
              <a href={comment.user.url}>{comment.user.username}</a>
              <span key={comment.id}>{comment.text}</span>
              <button className="btn btn-default" disabled>{comment._get_score}</button>
              <button className="btn btn-default" key={comment.id + "u"} onClick={this.vote.bind(this, "true", comment.id)}>Up</button>
              <button className="btn btn-default" key={comment.id + "d"} onClick={this.vote.bind(this, "false", comment.id)}>Down</button>
            </div>
          )}
        </ul>
      </div>
    );
  }

}


export default CommentComponent;
