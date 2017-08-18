import React from 'react'
import axios from 'axios'




class ProfileComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      bio: '',
      location: '',
      pk: this.props.profile,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.get = this.get.bind(this)
  }

  get() {
    axios.get("http://127.0.0.1:8000/api/profiles/" + this.props.profile + "/?format=json")
      .then(profile => {
        this.setState(profile.data);
      });       
  }
  

  toggleEdit() {
    this.setState({edit: !this.state.edit})
    this.get()  
  }

  
  componentDidMount() {
    setTimeout(this.get(), 1000) 
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

    axios.patch("http://127.0.0.1:8000/api/profiles/" + this.props.profile + "/?format=json", {
          bio: this.state.bio,
          location: this.state.location,
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
          <input name="bio" value={this.state.bio} type="text" onChange={this.handleChange} />
        </label>
        <label>
          First Name:
          <input name="location" value={this.state.location} type="text" onChange={this.handleChange} />
        </label>
        
       
        
        
        <input className="btn btn-default" type="submit" value="Save" />
      </form>)
    } else {
    return (
      <div>
        <p>{this.state.bio}</p>        
        <p>{this.state.location}</p>
        <input className="btn btn-default" type="button" value="Edit" onClick={this.toggleEdit.bind(this)}/>
      </div>
      );
    }
  }
}



export default ProfileComponent;