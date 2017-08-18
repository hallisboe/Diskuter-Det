import React from 'react'
import axios from 'axios'




class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
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
    alert('A name was submitted: ' + this.state.username);

    axios.post('/auth/login/', {
          username: this.state.username,
          email: "halvor98@outlook.com",
          password: this.state.password,
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
      <h2>Login Form</h2>
        <label>
          Username:
          <input name="username" type="text" className="btn btn-default" value={this.state.value} onChange={this.handleChange} />
        </label>
        <label>
          Password:
          <input name="password"type="password" className="btn btn-default" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input className="btn btn-default" type="submit" value="Submit" />
      </form>
    );
  }
}


export default LoginForm;
