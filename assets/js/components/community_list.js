import React from 'react'
import axios from 'axios'




class CommunityList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      communities: []
    };
  }

  get() {
    axios.get('/api/communities/?format=json')
      .then(res => {
        this.setState({communities: res.data });
    })

  }

  // TODO: Add pagination - load when the user reaches the bottom of the page

  
  componentDidMount() {
    this.get()
  }

  render() {
    <div>
        <h2>Communities</h2>
        <ul>
          {this.state.communities.map(post =>
            <div key={post.id} id={"community-" + post.id}>
              <h3>{post.name}</h3>
              <li key={post.id}>{post.description} by <a href={post.user.url}>{post.user.username}</a></li>
            </div>
          )}
        </ul>
      </div>
  }

}


export default CommunityList;
