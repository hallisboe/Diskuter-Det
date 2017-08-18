import React from 'react'
import axios from 'axios'



class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      title: '',
      text: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.user);

    axios.post('/api/posts/?format=json', {
          user: "http://127.0.0.1:8000/api/users/1/?format=json",
          title: this.state.title,
          text: this.state.text,
          csrfmiddlewaretoken: document.getElementsByName("csrfmiddlewaretoken")[0].value
        })
    .then(function (response) {
      console.log(response.data["key"])
    })
    .catch(function (error) {
      console.log(error);
    });


    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Post Form</h2>
        <label>
          Title:
          <input name="title" type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <label>
          Text:
          <input name="text"type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <label>
        <input className="btn btn-default" type="submit" value="Submit" />
        </label>
      </form>
    );
  }
}



export default PostForm;
