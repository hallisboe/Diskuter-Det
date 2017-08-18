import React from 'react'
import axios from 'axios'



import ProfileComponent from './profile.js'


class UserComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      user: [],
      pk: '',
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      profile: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.get = this.get.bind(this)

  }

  get() {
    var pk = -1
    axios.get('/auth/user/')
      .then(user => {
        this.setState(user.data);
        axios.get('/api/users/' + (this.state.pk) + '/?format=json')
        .then(user => {
          this.setState({
            user: user.data,
          });
        });
      });        
  }
  

  toggleEdit() {
    this.setState({edit: !this.state.edit})
  }

  
  componentDidMount() {
    this.get()
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

    axios.patch('/auth/user/', {
          username: this.state.username,
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          email: this.state.email,
          csrfmiddlewaretoken: document.getElementsByName("csrfmiddlewaretoken")[0].value
        })
    .then(function (response) {
      console.log(response.data["key"])
    })
    .catch(function (error) {
      console.log(error);
    });

    event.preventDefault();

    this.toggleEdit()

    this.get()

  }

  render() {
    if(this.state.edit) {
      return (<form onSubmit={this.handleSubmit}>
        <label>
          Username:
          <input name="username" value={this.state.username} type="text" onChange={this.handleChange} />
        </label>
        <label>
          First Name:
          <input name="first_name" value={this.state.first_name} type="text" onChange={this.handleChange} />
        </label>
        <label>
          Last Name:
          <input name="last_name" value={this.state.last_name} type="text" onChange={this.handleChange} />
        </label>
        <label>
          Email:
          <input name="email" value={this.state.email} type="text" onChange={this.handleChange} />
        </label>
       
        
        
        <input className="btn btn-default" type="submit" value="Save" />
      </form>)
    } else {
      if(this.state.pk === "") {
        return <span/>
      } else {
        return (
          <div>
            <h2>User Data</h2>
            <p>{this.state.username}</p>        
            <p>{this.state.user.url}</p>
            <p>{this.state.user.profile}</p>
            <input className="btn btn-default" type="button" value="Edit" onClick={this.toggleEdit.bind(this)}/>
            <ProfileComponent profile={this.state.pk}></ProfileComponent>
          </div>)
      }
    }
  }
}



export default UserComponent;