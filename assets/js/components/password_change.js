import React from 'react'
import axios from 'axios'



class PasswordChangeComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      old_password: "",
      new_password1: "",
      new_password2: "",
    }
    // Bindings 
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
    axios.post('auth/password/change/',{
      "old_password": this.state.old_password,
      "new_password1": this.state.new_password1,
      "new_password2": this.state.new_password2})
    .then(function (response) {
      console.log(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });


    event.preventDefault();

  }

  render() {
    return (<form onSubmit={this.handleSubmit}>
        <h2>Password Change Form</h2>
        <label>
          Old password:
          <input name="old_password" type="password" onChange={this.handleChange} />
        </label>      
        <label>
          New password:
          <input name="new_password1" type="password" onChange={this.handleChange} />
        </label>
        <label>
          Repeat new password:
          <input name="new_password2" type="password" onChange={this.handleChange} />
        </label>      
        <input className="btn btn-default" type="submit" value="Save" />
      </form>)
  }
  
}



export default PasswordChangeComponent;