import React from 'react'
import axios from 'axios'


class LogoutForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.logout = this.logout.bind()
  }

  logout(event) {
    alert('A name was submitted: ');

    axios.post('/auth/logout/', {
          csrfmiddlewaretoken: document.getElementsByName("csrfmiddlewaretoken")[0].value
        })
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  render() {
    return <button className="btn btn-default" onClick={this.logout}>Logout</button>
  }

}




export default LogoutForm;
