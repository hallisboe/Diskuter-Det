import React from 'react'
import axios from 'axios'


class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password1: '',
      password2: '',
      email: ''
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

    axios.post('/auth/registration/', {
          username: this.state.username,
          email: this.state.email,
          password1: this.state.password1,
          password2: this.state.password2,
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
      <h2>Registration Form</h2>
        <label>
          Username:
          <input name="username" type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <label>
          Password:
          <input name="password1"type="password" value={this.state.value} onChange={this.handleChange} />
        </label>
        <label>
          Repeat password:
          <input name="password2"type="password" value={this.state.value} onChange={this.handleChange} />
        </label>
        <label>
          Email:
          <input name="email"type="email" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input className="btn btn-default" type="submit" value="Submit" />
      </form>
    );
  }
}



export default RegistrationForm;
